import React, { useEffect } from 'react';
import Script from 'next/script';

const ViewAnalyticsPage = () => {
  useEffect(() => {
    // Send a request to record a view
    fetch('/api/views', { method: 'POST' }).catch(console.error);

    // Track page view with Google Analytics
    if (typeof window !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <main className='flex justify-center items-center h-screen bg-black text-white'>
      <h1 className='text-2xl md:text-4xl animate-pulse'>Coming soon...</h1>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
          `,
        }}
      />
    </main>
  );
};

export default ViewAnalyticsPage;
