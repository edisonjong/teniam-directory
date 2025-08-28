'use client';

import { useState } from 'react';
import { Info, Layers, Star, BarChart3 } from 'lucide-react';
import OverviewSection from '@/components/item/overview-section';
import CoreTechnologiesSection from '@/components/item/core-technologies-section';
import StarRatingsSection from '@/components/item/start-rating-section';
import AnalyticsSection from '@/components/item/analytics-section';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/shared/share-button';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'technologies', label: 'Core Technologies', icon: Layers },
  { id: 'ratings', label: 'Star Ratings', icon: Star },
  // { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

type ActiveSection = 'overview' | 'technologies' | 'ratings';

export default function ClientTabs({ item, sponsorItem, user }) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection item={item} sponsorItem={sponsorItem} />;
      case 'technologies':
        return (
          <CoreTechnologiesSection
            coreTechnologies={item?.coreTechnologies && item?.coreTechnologies}
          />
        );
      case 'ratings':
        return (
          <StarRatingsSection
            starRatings={item?.ratings && item?.ratings}
            itemName={item?.name}
            itemId={item._id}
            user={user}
          />
        );
      // case 'analytics':
      //   return <AnalyticsSection />;
      default:
        return <OverviewSection item={item} sponsorItem={sponsorItem} />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl md:px-6 px-0 ">
          <div className="flex h-16 items-center justify-between mb-8">
            <nav className="flex items-center space-x-1 rounded-lg bg-muted p-1 overflow-x-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as ActiveSection)}
                    className={cn(
                      'flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all whitespace-nowrap',
                      activeSection === item.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <ShareButton />
          </div>
        </div>
      </header>
      {renderActiveSection()}
    </>
  );
}
