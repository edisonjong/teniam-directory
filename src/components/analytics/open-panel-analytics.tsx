'use client';

import { OpenPanelComponent } from "@openpanel/nextjs";
import { useEffect } from "react";

/**
 * OpenPanel Analytics (https://openpanel.dev)
 *
 * https://docs.openpanel.dev/docs/sdks/nextjs#options
 */
export default function OpenPanelAnalytics() {
  useEffect(() => {
    // Suppress OpenPanel network errors in console (401, 403, etc.)
    const originalError = console.error;
    const originalWarn = console.warn;

    // Suppress console.error for OpenPanel
    console.error = (...args) => {
      const errorMessage = args[0]?.toString() || '';
      if (
        errorMessage.includes('openpanel') ||
        errorMessage.includes('api.openpanel.dev') ||
        errorMessage.includes('op1.js') ||
        args.some(arg => arg?.toString?.()?.includes?.('openpanel'))
      ) {
        // Silently ignore OpenPanel errors
        return;
      }
      originalError.apply(console, args);
    };

    // Suppress console.warn for OpenPanel
    console.warn = (...args) => {
      const warnMessage = args[0]?.toString() || '';
      if (
        warnMessage.includes('openpanel') ||
        warnMessage.includes('api.openpanel.dev')
      ) {
        // Silently ignore OpenPanel warnings
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;

  // Don't initialize if clientId is missing or invalid
  if (!clientId || clientId.trim() === "" || clientId === "undefined") {
    return null;
  }

  // Only initialize in production if clientId is valid
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  try {
    return (
      <OpenPanelComponent
        clientId={clientId}
        trackScreenViews={true}
        trackAttributes={true}
        trackOutgoingLinks={true}
      />
    );
  } catch (error) {
    // Fail silently if OpenPanel fails to initialize
    return null;
  }
}
