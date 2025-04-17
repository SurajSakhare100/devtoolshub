import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap Generator - DevToolsHub",
  description: "Generate an XML sitemap for your website quickly and easily. Validate URLs and download the sitemap as an XML file.",
  keywords: "sitemap generator, xml sitemap, website sitemap, search engine optimization, seo tools,",
  openGraph: {
    title: "Sitemap Generator - DevToolsHub",
    description: "Generate an XML sitemap for your website quickly and easily. Validate URLs and download the sitemap as an XML file.",
    url: "https://devstoolhub.vercel.app/tools/sitemap",
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