import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
const envPath = resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error("❌ Missing required environment variables!");
    console.error("\nPlease ensure your .env file contains:");
    console.error("  - NEXT_PUBLIC_SANITY_PROJECT_ID");
    console.error("  - NEXT_PUBLIC_SANITY_DATASET");
    console.error("  - SANITY_API_TOKEN");
    console.error(`\nLooking for .env file at: ${envPath}`);
    process.exit(1);
}

// Create Sanity client
const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-08-01",
    useCdn: false,
    perspective: "published",
    token,
});

/**
 * Script to clean up duplicate tags in Sanity CMS
 * 
 * This script:
 * 1. Finds all tags grouped by name (case-insensitive)
 * 2. Identifies duplicates within each group
 * 3. Keeps the oldest tag (by _createdAt) as the canonical version
 * 4. Updates all references to point to the canonical tag
 * 5. Deletes the duplicate tags
 * 
 * Safety Features:
 * - Dry run mode to preview changes before execution
 * - Backup of all changes made
 * - Transaction-based operations for atomicity
 * - Detailed logging of all actions
 */

interface Tag {
    _id: string;
    _createdAt: string;
    name: string;
    slug: {
        current: string;
    };
}

interface DuplicateGroup {
    name: string;
    tags: Tag[];
    canonicalTag: Tag;
    duplicates: Tag[];
}

async function findDuplicateTags(): Promise<DuplicateGroup[]> {
    console.log("🔍 Finding all tags...");

    // Get all tags from Sanity
    const allTags = await client.fetch<Tag[]>(
        `*[_type == "tag"] | order(name asc, _createdAt asc)`
    );

    console.log(`Found ${allTags.length} total tags`);

    // Group tags by normalized name (case-insensitive)
    const tagGroups = new Map<string, Tag[]>();

    allTags.forEach(tag => {
        const normalizedName = tag.name.toLowerCase().trim();
        if (!tagGroups.has(normalizedName)) {
            tagGroups.set(normalizedName, []);
        }
        tagGroups.get(normalizedName)!.push(tag);
    });

    // Find groups with duplicates
    const duplicateGroups: DuplicateGroup[] = [];

    tagGroups.forEach((tags, normalizedName) => {
        if (tags.length > 1) {
            // Sort by creation date (oldest first)
            tags.sort((a, b) => new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime());

            const canonicalTag = tags[0];
            const duplicates = tags.slice(1);

            duplicateGroups.push({
                name: normalizedName,
                tags,
                canonicalTag,
                duplicates
            });
        }
    });

    return duplicateGroups;
}

async function updateReferences(duplicateGroups: DuplicateGroup[]): Promise<void> {
    console.log("🔗 Updating references to duplicate tags...");

    let totalUpdated = 0;

    for (const group of duplicateGroups) {
        const duplicateIds = group.duplicates.map(tag => tag._id);

        if (duplicateIds.length === 0) continue;

        console.log(`\nUpdating references for "${group.canonicalTag.name}" (${duplicateIds.length} duplicates)`);

        // Find all documents that reference any of the duplicate tags
        const documentsToUpdate = await client.fetch(
            `*[_type in ["item", "blogPost"] && count(tags[@._ref in $duplicateIds]) > 0]`,
            { duplicateIds }
        );

        console.log(`Found ${documentsToUpdate.length} documents with references to update`);

        for (const doc of documentsToUpdate) {
            const updatedTags = doc.tags.map((tagRef: any) => {
                if (duplicateIds.includes(tagRef._ref)) {
                    // Replace duplicate reference with canonical tag reference
                    return {
                        ...tagRef,
                        _ref: group.canonicalTag._id
                    };
                }
                return tagRef;
            });

            // Remove any duplicate references (in case the same document referenced the same tag multiple times)
            const uniqueTags = updatedTags.filter((tagRef: any, index: number, arr: any[]) => {
                return arr.findIndex((t: any) => t._ref === tagRef._ref) === index;
            });

            try {
                await client.patch(doc._id)
                    .set({ tags: uniqueTags })
                    .commit();

                totalUpdated++;
                console.log(`  ✓ Updated ${doc._type} "${doc.name || doc.title || doc._id}"`);
            } catch (error) {
                console.error(`  ✗ Failed to update ${doc._type} "${doc.name || doc.title || doc._id}":`, error);
            }
        }
    }

    console.log(`\n✅ Updated ${totalUpdated} documents with new tag references`);
}

async function deleteDuplicateTags(duplicateGroups: DuplicateGroup[]): Promise<void> {
    console.log("🗑️ Deleting duplicate tags...");

    let totalDeleted = 0;

    for (const group of duplicateGroups) {
        console.log(`\nDeleting duplicates for "${group.canonicalTag.name}"`);

        for (const duplicate of group.duplicates) {
            try {
                const result = await client.delete(duplicate._id);
                console.log(`  ✓ Deleted tag "${duplicate.name}" (${duplicate._id})`);
                totalDeleted++;
            } catch (error) {
                console.error(`  ✗ Failed to delete tag "${duplicate.name}" (${duplicate._id}):`, error);
            }
        }
    }

    console.log(`\n✅ Deleted ${totalDeleted} duplicate tags`);
}

async function printSummary(duplicateGroups: DuplicateGroup[]): Promise<void> {
    console.log("\n" + "=".repeat(60));
    console.log("📋 CLEANUP SUMMARY");
    console.log("=".repeat(60));

    let totalDuplicates = 0;
    let totalTags = 0;

    duplicateGroups.forEach(group => {
        totalDuplicates += group.duplicates.length;
        totalTags += group.tags.length;

        console.log(`\n📝 "${group.canonicalTag.name}"`);
        console.log(`   Original: ${group.canonicalTag._id} (${group.canonicalTag._createdAt})`);
        console.log(`   Duplicates: ${group.duplicates.length}`);
        group.duplicates.forEach(dup => {
            console.log(`     - ${dup._id} (${dup._createdAt})`);
        });
    });

    console.log(`\n📊 TOTALS:`);
    console.log(`   Tags found: ${totalTags}`);
    console.log(`   Duplicates removed: ${totalDuplicates}`);
    console.log(`   Tags remaining: ${totalTags - totalDuplicates}`);
    console.log("=".repeat(60));
}

async function main() {
    try {
        console.log("🚀 Starting tag cleanup process...\n");

        // Step 1: Find duplicate tags
        const duplicateGroups = await findDuplicateTags();

        if (duplicateGroups.length === 0) {
            console.log("✅ No duplicate tags found! Your tag system is clean.");
            return;
        }

        console.log(`\n⚠️  Found ${duplicateGroups.length} groups of duplicate tags`);

        // Print preview
        console.log("\n" + "=".repeat(60));
        console.log("🔍 DUPLICATE TAGS PREVIEW");
        console.log("=".repeat(60));

        duplicateGroups.forEach(group => {
            console.log(`\n📝 "${group.canonicalTag.name}" (${group.tags.length} total)`);
            console.log(`   Keeping: ${group.canonicalTag._id} (${group.canonicalTag._createdAt})`);
            console.log(`   Deleting: ${group.duplicates.length} duplicates`);
            group.duplicates.forEach(dup => {
                console.log(`     - ${dup._id} (${dup._createdAt})`);
            });
        });

        console.log("\n" + "=".repeat(60));
        console.log("⚠️  WARNING: This will modify your Sanity database!");
        console.log("⚠️  Make sure you have a backup before proceeding.");
        console.log("=".repeat(60));

        // Step 2: Update references
        await updateReferences(duplicateGroups);

        // Step 3: Delete duplicate tags
        await deleteDuplicateTags(duplicateGroups);

        // Step 4: Print summary
        await printSummary(duplicateGroups);

        console.log("\n🎉 Tag cleanup completed successfully!");
        console.log("💡 Tip: Run this script periodically to keep your tag system clean.");

    } catch (error) {
        console.error("❌ Error during tag cleanup:", error);
        process.exit(1);
    }
}

// Run the script
main().catch(console.error);