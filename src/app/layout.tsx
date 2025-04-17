import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/ui/navbar";
import { Analytics } from "@vercel/analytics/react"
import { Footer } from "@/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevToolsHub - Developer Tools Dashboard",
  description: "A comprehensive dashboard of developer tools including Sitemap Generator, JSON Formatter, and more.",
  keywords: "developer tools, sitemap generator, json formatter, web development, SEO tools",
  authors: [{ name: "DevToolsHub" }],
  openGraph: {
    title: "DevToolsHub - Developer Tools Dashboard",
    description: "A comprehensive dashboard of developer tools including Sitemap Generator, JSON Formatter, and more.",
    url: "https://devstoolhub.vercel.app",
    siteName: "DevToolsHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolsHub - Developer Tools Dashboard",
    description: "A comprehensive dashboard of developer tools including Sitemap Generator, JSON Formatter, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-adsense-account" content="ca-pub-7623182087547549"/>
      <meta name="google-site-verification" content="b7yDmUftzFJzjwP96Jv0AQ6E3alSjSkx7felqcdVwqs" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B6XNVFN1V1"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-B6XNVFN1V1');
  `
}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Footer/>

        <Analytics />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
