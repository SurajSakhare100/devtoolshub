"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function SitemapGenerator() {
  const [url, setUrl] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const validateUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSitemap("");

    if (!url.trim()) {
      toast.error("Please enter a URL", {
        description: "The URL field cannot be empty",
      });
      return;
    }

    if (!validateUrl(url)) {
      const errorMessage = "Please enter a valid URL (e.g., https://example.com)";
      setError(errorMessage);
      toast.error("Invalid URL", {
        description: errorMessage,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sitemap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate sitemap";
        try {
          const errorData = await response.json();
          if (errorData && typeof errorData.error === 'string') {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.sitemap) {
        throw new Error("No sitemap received from server");
      }
      
      setSitemap(data.sitemap);
      toast.success("Sitemap generated successfully!", {
        description: "Your sitemap has been created",
      });
    } catch (err) {
      console.error("Error generating sitemap:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to generate sitemap. Please try again.";
      setError(errorMessage);
      toast.error("Generation Failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!sitemap) {
      toast.error("No sitemap to download", {
        description: "Please generate a sitemap first",
      });
      return;
    }

    try {
      const blob = new Blob([sitemap], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sitemap.xml";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Sitemap downloaded", {
        description: "Your sitemap has been saved",
      });
    } catch (err) {
      console.error("Error downloading sitemap:", err);
      toast.error("Download Failed", {
        description: "Failed to download the sitemap. Please try again.",
      });
    }
  };

  const handleClear = () => {
    setUrl("");
    setSitemap("");
    setError("");
    toast.success("Input cleared", {
      description: "All fields have been reset",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sitemap Generator</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Generate a sitemap for any website to help search engines better understand the site structure.
      </p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter any valid website URL
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Sitemap"
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      {sitemap && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Sitemap</h2>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Download XML
            </button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto max-h-96">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {sitemap}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About Sitemaps</h3>
        <p className="text-blue-700 dark:text-blue-200">
          A sitemap is an XML file that lists the URLs on a website. It helps search engines discover and understand the website structure.
          This tool generates a sitemap for any website, making it easier for search engines to crawl and index the pages.
        </p>
      </div>
    </div>
  );
} 