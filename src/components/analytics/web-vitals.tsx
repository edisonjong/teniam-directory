"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      // You can send to your analytics provider here
      // Example for Google Analytics (if you're using it):
      // if (typeof window !== "undefined" && window.gtag) {
      //   window.gtag("event", metric.name, {
      //     value: Math.round(metric.value),
      //     event_label: metric.id,
      //     non_interaction: true,
      //   });
      // }

      // Example for OpenPanel or other analytics:
      // You can implement custom tracking here
      
      // Log to console in development
      console.log("[Web Vitals]", metric);
    }
  });

  return null;
}

