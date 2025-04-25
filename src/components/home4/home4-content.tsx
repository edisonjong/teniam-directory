import React from "react";
import Products from "./home4-products";
import Features from "./home4-features";
import CallToAction from "./home4-call-to-action";
import Pricing from "./pricing";

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
      <div id="about">
        <CallToAction />
      </div>
    </>
  );
}

export default HomeContent;
