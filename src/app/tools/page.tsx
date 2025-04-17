import { Metadata } from "next";
import Link from "next/link";
import { 
  Image, 
  Hash, 
  Search,
  FileJson,
  File,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Tools - DevToolsHub",
  description: "Explore our comprehensive collection of developer tools. From code formatters to image compressors, find the perfect tool for your needs.",
};

const tools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data with syntax highlighting",
    icon: FileJson,
    href: "/tools/json-formatter",
    category: "Data Formatting"
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings and files",
    icon: Hash,
    href: "/tools/base64",
    category: "Encoding"
  },
  {
    name: "Image Compressor",
    description: "Compress images while maintaining quality",
    icon: Image,
    href: "/tools/image-compressor",
    category: "Media"
  },
  {
    name: "Sitemap Generator",
    description: "Generate XML sitemaps for your website",
    icon: File,
    href: "/tools/sitemap",
    category: "SEO"
  },
  {
    name: "HTTP Header Checker",
    description: "Check HTTP response headers for any website",
    icon: File,
    href: "/tools/http-header-checker",
    category: "Web Development"
  },
];

export default function ToolsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">All Tools</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <tool.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{tool.description}</p>
                  <span className="text-sm text-blue-600 dark:text-blue-400">{tool.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 