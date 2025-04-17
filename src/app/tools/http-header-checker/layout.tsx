import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTTP Header Checker - Check HTTP Response Headers | DevTools Hub",
  description: "Check HTTP response headers for any website. Analyze security headers, CORS headers, and more. Free online tool for web developers.",
  keywords:"http header checker, check http response headers, analyze security headers, cors headers, web developers, free online tool",
  openGraph: {
    title: "HTTP Header Checker - Check HTTP Response Headers | DevTools Hub",
    description: "Check HTTP response headers for any website. Analyze security headers, CORS headers, and more. Free online tool for web developers.",
    type: "website",
    url: "https://devstoolhub.vercel.app/tools/http-header-checker",
    siteName: "DevToolsHub",
  },
};

export default function HttpHeaderCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 