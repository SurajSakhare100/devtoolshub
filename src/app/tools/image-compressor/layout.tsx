import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor - DevToolsHub",
  description: "Compress and resize your images with multiple options. Convert between JPG, PNG, and WebP formats.",
  openGraph: {
    title: "Image Compressor - DevToolsHub",
    description: "Compress and resize your images with multiple options. Convert between JPG, PNG, and WebP formats.",
    url: "https://devtoolshub.com/tools/image-compressor",
    siteName: "DevToolsHub",
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 