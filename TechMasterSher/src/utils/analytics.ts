/**
 * Google Analytics 4 (GA4) and Google Tag Manager (GTM) Integration Utility
 * Supports SPA Route tracking, environment variables, and graceful no-op fallbacks.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isInitialized = false;

export const initAnalytics = (gaId?: string, gtmId?: string) => {
  if (typeof window === "undefined" || isInitialized) return;

  const measurementId = gaId || (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;
  const containerId = gtmId || (import.meta as any).env?.VITE_GTM_ID;

  // Initialize DataLayer
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }

  // 1. Google Analytics 4
  if (measurementId && !document.getElementById("ga4-script")) {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false, // SPA will manually dispatch pageviews
    });
  }

  // 2. Google Tag Manager
  if (containerId && !document.getElementById("gtm-script")) {
    const gtmScript = document.createElement("script");
    gtmScript.id = "gtm-script";
    gtmScript.async = true;
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
    document.head.appendChild(gtmScript);
  }

  isInitialized = true;
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window === "undefined") return;

  const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;

  // Dispatch via gtag if available
  if (window.gtag && measurementId) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    });
  }

  // Dispatch to GTM dataLayer if present
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "virtualPageView",
      pagePath: pagePath,
      pageTitle: pageTitle,
    });
  }
};
