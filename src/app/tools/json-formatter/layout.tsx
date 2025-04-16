import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - DevToolsHub",
  description: "Format and validate JSON data with syntax highlighting and error detection.",
  openGraph: {
    title: "JSON Formatter - DevToolsHub",
    description: "Format and validate JSON data with syntax highlighting and error detection.",
    url: "https://devtoolshub.com/tools/json-formatter",
    siteName: "DevToolsHub",
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 