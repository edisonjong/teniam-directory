'use client';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { urlForIcon } from '@/lib/image';

const coreTechnologies = [
  {
    name: 'React',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
    description:
      'Component-based UI library for building interactive interfaces',
  },
  {
    name: 'Next.js',
    logo: 'https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png',
    description: 'React framework with server-side rendering and routing',
  },
  {
    name: 'TypeScript',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png',
    description: 'Strongly typed programming language built on JavaScript',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/320px-Tailwind_CSS_Logo.svg.png',
    description: 'Utility-first CSS framework for rapid UI development',
  },
  {
    name: 'Supabase',
    logo: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png',
    description: 'Open source Firebase alternative with PostgreSQL',
  },
  {
    name: 'Shadcn/UI',
    logo: 'https://ui.shadcn.com/favicon.ico',
    description:
      'Beautifully designed components built with Radix UI and Tailwind',
  },
  {
    name: 'Vercel',
    logo: 'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png',
    description: 'Platform for frontend frameworks and static sites',
  },
];

export default function CoreTechnologiesSection({ coreTechnologies }) {
  return (
    <section className="">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-4">Core Technologies</h2>
          <p className="text-muted-foreground">
            Explore the powerful technologies that make modern web development
            efficient, scalable, and enjoyable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 gap-6"
        >
          {coreTechnologies && coreTechnologies.length > 0 ? (
            coreTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-center bg-background size-12 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex-shrink-0">
                  {tech?.icon && (
                    <Avatar className="h-11 w-11 bg-transparent">
                      <AvatarImage
                        src={urlForIcon(tech.icon)?.src || '/placeholder.svg'}
                        alt={tech.icon.alt || `icon of ${tech.name}`}
                        className="aspect-square rounded-full object-contain p-1"
                      />
                      <AvatarFallback>
                        {tech.name?.[0]?.toUpperCase() || 'CN'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">{tech.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No core technologies added.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
