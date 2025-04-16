"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Declare the adsbygoogle type
declare global {
  interface Window {
    adsbygoogle: Array<{
      push: (config: Record<string, unknown>) => void;
    }>;
  }
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Load AdSense script only on client side
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Error loading AdSense:", err);
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">{children}</div>
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Advertisement
              </h3>
              <div className="ad-container">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="YYYYYYYYYY"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} DevToolsHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 