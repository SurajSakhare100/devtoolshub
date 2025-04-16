import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - DevToolsHub",
  description: "Convert text or files to Base64 encoding, or decode Base64 strings back to readable content.",
  openGraph: {
    title: "Base64 Encoder/Decoder - DevToolsHub",
    description: "Convert text or files to Base64 encoding, or decode Base64 strings back to readable content.",
    url: "https://devtoolshub.com/tools/base64",
    siteName: "DevToolsHub",
  },
};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 