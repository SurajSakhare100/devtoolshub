import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DevToolsHub</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Free online developer tools to help streamline your workflow and boost productivity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/devtoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/devtoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/devtoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/json-formatter" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/base64" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Base64 Encoder/Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/sitemap" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Sitemap Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/http-header-checker" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  HTTP Header Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/regex-tester" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Regex Tester
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for updates and new tools.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DevToolsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 