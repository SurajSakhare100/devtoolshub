"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFormat = () => {
    setError("");
    setFormatted("");

    if (!input.trim()) {
      toast.error("Please enter JSON to format", {
        description: "The input field cannot be empty",
      });
      return;
    }

    setLoading(true);

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormatted(formatted);
      toast.success("JSON formatted successfully!", {
        description: "Your JSON has been properly formatted",
      });
    } catch (err) {
      console.error("Error formatting JSON:", err);
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON format";
      setError(errorMessage);
      toast.error("Formatting Failed", {
        description: "Please check your JSON syntax and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMinify = () => {
    setError("");
    setFormatted("");

    if (!input.trim()) {
      toast.error("Please enter JSON to minify", {
        description: "The input field cannot be empty",
      });
      return;
    }

    setLoading(true);

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      toast.success("JSON minified successfully!", {
        description: "Your JSON has been minified",
      });
    } catch (err) {
      console.error("Error minifying JSON:", err);
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON format";
      setError(errorMessage);
      toast.error("Minification Failed", {
        description: "Please check your JSON syntax and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!formatted) {
      toast.error("No formatted JSON to download", {
        description: "Please format or minify some JSON first",
      });
      return;
    }

    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded", {
      description: "Your formatted JSON has been saved",
    });
  };

  const handleCopy = () => {
    if (!formatted) {
      toast.error("No formatted JSON to copy", {
        description: "Please format or minify some JSON first",
      });
      return;
    }
    navigator.clipboard.writeText(formatted);
    toast.success("JSON copied to clipboard", {
      description: "The formatted JSON is ready to paste",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">JSON Formatter</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Format and validate your JSON data with proper indentation and syntax checking.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-64 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleFormat}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Format JSON"
          )}
        </button>

        <button
          onClick={handleMinify}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Minify JSON
        </button>

        <button
          onClick={() => setInput("")}
          className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      {formatted && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Formatted JSON</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download JSON
              </button>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto max-h-96">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {formatted}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About JSON Formatting</h3>
        <p className="text-blue-700 dark:text-blue-200">
          JSON formatting improves readability by adding proper indentation and spacing.
          This tool also validates your JSON syntax and helps identify any errors in your data structure.
          You can format JSON for better readability or minify it for production use.
        </p>
      </div>
    </div>
  );
} 