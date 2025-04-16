"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setOutput("");
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(file.size);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (mode === "encode") {
          const base64 = event.target?.result as string;
          setInput(base64.split(",")[1] || "");
        } else {
          setInput(event.target?.result as string);
        }
        setOutput("");
        setError("");
      };
      
      if (mode === "encode") {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
    setFileName("");
    setFileSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please enter some text or upload a file");
      toast.error("Input Required", {
        description: "Please enter some text or upload a file",
      });
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(input);
        setOutput(encoded);
        toast.success("Text encoded successfully", {
          description: "Your text has been converted to Base64",
        });
      } else {
        try {
          const decoded = atob(input);
          setOutput(decoded);
          toast.success("Text decoded successfully", {
            description: "Your Base64 string has been decoded",
          });
        } catch (e) {
          const errorMessage = "Invalid Base64 string. Please check your input.";
          setError(errorMessage);
          toast.error("Decoding Failed", {
            description: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error("Error converting:", error);
      const errorMessage = "Failed to convert. Please check your input.";
      setError(errorMessage);
      toast.error("Conversion Failed", {
        description: errorMessage,
      });
    }
  };

  const handleDownload = () => {
    if (!output) {
      toast.error("No output to download", {
        description: "Please encode or decode some text first",
      });
      return;
    }

    try {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("File downloaded", {
        description: "Your file has been saved",
      });
    } catch (err) {
      console.error("Error downloading file:", err);
      toast.error("Download Failed", {
        description: "Failed to download the file. Please try again.",
      });
    }
  };

  const handleCopy = () => {
    if (!output) {
      toast.error("No output to copy", {
        description: "Please encode or decode some text first",
      });
      return;
    }
    
    try {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard", {
        description: "The result has been copied to your clipboard",
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard. Please try again.",
      });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setFileName("");
    setFileSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Form cleared", {
      description: "All fields have been reset",
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Base64 Encoder/Decoder</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Convert text or files to Base64 encoding, or decode Base64 strings back to readable content.
      </p>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleModeChange("encode")}
            className={`px-4 py-2 rounded-md ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange("decode")}
            className={`px-4 py-2 rounded-md ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <textarea
            value={input}
            onChange={handleTextChange}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
            className="w-full h-40 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Or Upload a File
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900/20 dark:file:text-blue-300
              hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />
          {fileName && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              File: {fileName} ({formatFileSize(fileSize)})
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleConvert}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === "encode" ? "Encoded Result" : "Decoded Result"}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download
              </button>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto max-h-96">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
              {output}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About Base64 Encoding</h3>
        <p className="text-blue-700 dark:text-blue-200">
          Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format.
          It's commonly used to encode binary data like images or files into text that can be safely transmitted over text-based protocols.
          This tool allows you to encode text or files to Base64 and decode Base64 strings back to their original form.
        </p>
      </div>
    </div>
  );
} 