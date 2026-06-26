"use client";

import Script from "next/script";

// =====================================================
// TAWK.TO SETUP - Baad mein yahan update karna:
// Step 1: tawk.to/signup par account banao
// Step 2: Dashboard > Administration > Property Settings > Widget
// Step 3: Niche dono values apni ID se replace karo:
//   TAWKTO_PROPERTY_ID  → e.g. "683c4f9b..."
//   TAWKTO_WIDGET_ID    → e.g. "1iscnk..."
// =====================================================
const TAWKTO_PROPERTY_ID = "YOUR_PROPERTY_ID";
const TAWKTO_WIDGET_ID = "YOUR_WIDGET_ID";

export function FloatingButtons() {
  const handleTawktoClick = () => {
    if (typeof window !== "undefined" && (window as any).Tawk_API) {
      (window as any).Tawk_API.toggle();
    }
  };

  return (
    <>
      {/* ── Tawk.to Script (auto-load) ── */}
      <Script
        id="tawkto-widget"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script");
              var s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/${TAWKTO_PROPERTY_ID}/${TAWKTO_WIDGET_ID}';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
        }}
      />

      {/* ── Floating Buttons — fixed bottom-right ── */}
      <div
        className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3"
        aria-label="Quick Contact Buttons"
      >

        {/* 1. WhatsApp Button */}
        <a
          href="https://wa.me/919509599502"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          style={{
            width: 52,
            height: 52,
            background: "#25D366",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(37,211,102,0.45)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.6)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,211,102,0.45)";
          }}
        >
          {/* WhatsApp SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26" height="26" fill="white">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.823.737 5.471 2.027 7.773L0 32l8.437-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.272 13.272 0 01-6.76-1.845l-.485-.288-5.008 1.192 1.213-4.876-.316-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.2-2.355-1.163-2.72-1.295-.365-.133-.63-.2-.895.2-.266.398-1.03 1.295-1.263 1.56-.232.266-.465.3-.863.1-.398-.2-1.68-.619-3.2-1.977-1.183-1.055-1.982-2.357-2.215-2.755-.232-.398-.025-.614.175-.812.179-.178.398-.465.598-.698.199-.232.265-.398.398-.664.132-.265.066-.498-.034-.697-.1-.199-.895-2.157-1.228-2.954-.323-.774-.652-.669-.895-.681l-.762-.013c-.265 0-.697.1-1.063.498-.365.398-1.394 1.362-1.394 3.32s1.427 3.85 1.626 4.116c.2.266 2.807 4.285 6.802 6.011.95.41 1.691.655 2.269.838.953.303 1.821.26 2.507.158.765-.113 2.355-.963 2.687-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.266-.763-.465z" />
          </svg>
        </a>

        {/* 2. Tawk.to Live Chat Button */}
        <button
          onClick={handleTawktoClick}
          aria-label="Open Live Chat"
          title="Live Chat Support"
          style={{
            width: 52,
            height: 52,
            background: "#03A9F4",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(3,169,244,0.45)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(3,169,244,0.6)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(3,169,244,0.45)";
          }}
        >
          {/* Chat Bubble SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 2C6.477 2 2 6.254 2 11.5c0 2.657 1.153 5.058 3 6.752V22l3.723-2.01A10.84 10.84 0 0012 21c5.523 0 10-4.254 10-9.5S17.523 2 12 2zm0 17a8.866 8.866 0 01-2.963-.507L7 19.5v-2.04C5.16 16.063 4 13.9 4 11.5 4 7.358 7.582 4 12 4s8 3.358 8 7.5S16.418 19 12 19zm-4-8h8v1.5H8V11zm0 3h5v1.5H8V14z" />
          </svg>
        </button>

      </div>
    </>
  );
}
