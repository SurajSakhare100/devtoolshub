import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTTP Header Checker - Check HTTP Response Headers | DevTools Hub",
  description: "Check HTTP response headers for any website. Analyze security headers, CORS headers, and more. Free online tool for web developers.",
  openGraph: {
    title: "HTTP Header Checker - Check HTTP Response Headers | DevTools Hub",
    description: "Check HTTP response headers for any website. Analyze security headers, CORS headers, and more. Free online tool for web developers.",
    type: "website",
  },
};

export default function HttpHeaderCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 