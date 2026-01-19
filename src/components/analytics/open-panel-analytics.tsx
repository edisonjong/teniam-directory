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
    // Suppress OpenPanel errors in console to prevent 401 errors from cluttering logs
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('openpanel') || args[0]?.includes?.('api.openpanel.dev')) {
        // Silently ignore OpenPanel errors
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
  if (!clientId || clientId.trim() === "") {
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
    console.warn("OpenPanel analytics failed to initialize:", error);
    return null;
  }
}
