import React from 'react';
import Products from './home4-products';
import Features from './home4-features';
import CallToAction from './home4-call-to-action';
import Pricing from './pricing';
import FAQs from './faqs';
import { NewsletterCard } from '../newsletter/newsletter-card';
import FAQsTwo from '../faqs-2';
import SubscribeSection from '@/app/(website)/(public)/sections/subscribe-section';

function HomeContent() {
  return (
    <>
      <div id="features">
        <Features />
      </div>
      <div id="solution">
        <Products />
      </div>

      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQsTwo />
      </div>
      <div id="about">
        <CallToAction />
      </div>
      <div>
        <SubscribeSection />
      </div>
    </>
  );
}

export default HomeContent;
