import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap Generator - DevToolsHub",
  description: "Generate an XML sitemap for your website quickly and easily. Validate URLs and download the sitemap as an XML file.",
  openGraph: {
    title: "Sitemap Generator - DevToolsHub",
    description: "Generate an XML sitemap for your website quickly and easily. Validate URLs and download the sitemap as an XML file.",
    url: "https://devtoolshub.com/tools/sitemap",
    siteName: "DevToolsHub",
  },
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 