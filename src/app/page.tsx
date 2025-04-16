import Link from "next/link";
import {  FileJson, Globe, Hash, Search, Shield, ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Developer Tools for <span className="text-blue-600 dark:text-blue-400">Modern Web Development</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A comprehensive collection of free online tools to help developers streamline their workflow and boost productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools/sitemap" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
              <Link href="/tools" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Developer Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of free online tools designed to help developers work more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sitemap Generator */}
            <Link href="/tools/sitemap" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sitemap Generator</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Generate XML sitemaps for your website to improve SEO and help search engines index your content.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>

            {/* JSON Formatter */}
            <Link href="/tools/json-formatter" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                  <FileJson className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">JSON Formatter</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Format, validate, and beautify your JSON data with our easy-to-use tool.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>

            {/* Image Compressor */}
            <Link href="/tools/image-compressor" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <ImageIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Image Compressor</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Compress your images without losing quality to improve website performance.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>

            {/* Base64 Encoder/Decoder */}
            <Link href="/tools/base64" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-4">
                  <Hash className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Base64 Encoder/Decoder</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Encode and decode Base64 strings for data transmission and storage.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>

            {/* Regex Tester */}
            <Link href="/tools/regex-tester" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
                  <Search className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Regex Tester</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Test and debug regular expressions with real-time validation and highlighting.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>

            {/* HTTP Header Checker */}
            <Link href="/tools/http-header-checker" className="group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">HTTP Header Checker</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Check HTTP response headers for any website to analyze security and performance.
              </p>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose DevToolsHub?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our tools are designed with developers in mind, offering a seamless experience for all your development needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Free to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our tools are completely free to use, with no hidden fees or subscriptions required.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No Registration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start using our tools immediately without the need to create an account or register.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Privacy Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data stays on your device. We don&apos;t store or process your information on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our collection of developer tools and start streamlining your workflow today.
          </p>
          <Link href="/tools" className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            Browse All Tools
          </Link>
        </div>
      </section>
    </main>
  );
}
