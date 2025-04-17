import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - DevToolsHub",
  description: "Convert text or files to Base64 encoding, or decode Base64 strings back to readable content.",
  keywords: "base64 encoder, base64 decoder, base64 converter, base64 encoding, base64 decoding, base64 tool, base64 online tool, base64 online converter, base64 online encoder, base64 online decoder",
  openGraph: {
    title: "Base64 Encoder/Decoder - DevToolsHub",
    description: "Convert text or files to Base64 encoding, or decode Base64 strings back to readable content.",
    url: "https://devstoolhub.vercel.app/tools/base64",
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