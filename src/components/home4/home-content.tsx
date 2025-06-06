import React from "react";
import Products from "./home-products";
import Features from "./home-features";
import CallToAction from "./home-call-to-action";
import { PricingPlans } from "./home-pricing";
import FAQsTwo from "./home-faqs";
import SubscribeSection from "@/app/(website)/(public)/sections/subscribe-section";

import SolutionSection from "./home-solution";

function HomeContent() {
  return (
    <>
      <div id="features">
        <Features />
      </div>

      <div id="products">
        <Products />
      </div>
      <div id="solution">
        <SolutionSection />
      </div>
      <div id="pricing">
        <PricingPlans />
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
