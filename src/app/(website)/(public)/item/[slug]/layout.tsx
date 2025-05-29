import Container from '@/components/container';
import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import type React from 'react';
import SubscribeSection from '../../sections/subscribe-section';

export default function ItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16">
      <Container className="mt-8">{children}</Container>
      <SubscribeSection />

      {/* <Container className="mt-16">
        <NewsletterCard />
      </Container> */}
    </div>
  );
}
