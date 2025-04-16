"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

type CompressionLevel = "high" | "medium" | "low";
type ImageFormat = "jpeg" | "png" | "webp";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
  const [resizeWidth, setResizeWidth] = useState<number | "">("");
  const [resizeHeight, setResizeHeight] = useState<number | "">("");
  const [outputFormat, setOutputFormat] = useState<ImageFormat>("jpeg");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file (JPEG, PNG, or WebP)",
      });
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    setOriginalImage(URL.createObjectURL(file));
    setCompressedImage(null);
    setCompressedSize(0);
    setError("");
  };

  const getCompressionQuality = (level: CompressionLevel): number => {
    switch (level) {
      case "high":
        return 0.3;
      case "medium":
        return 0.6;
      case "low":
        return 0.9;
      default:
        return 0.6;
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      toast.error("No image selected", {
        description: "Please select an image to compress",
      });
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const img = new Image(0, 0);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          const errorMessage = "Could not get canvas context";
          setError(errorMessage);
          toast.error("Compression Failed", {
            description: errorMessage,
          });
          setLoading(false);
          return;
        }
        
        // Calculate new dimensions
        let newWidth = img.width;
        let newHeight = img.height;
        
        if (resizeWidth || resizeHeight) {
          if (resizeWidth && resizeHeight) {
            newWidth = Number(resizeWidth);
            newHeight = Number(resizeHeight);
          } else if (resizeWidth) {
            newWidth = Number(resizeWidth);
            if (maintainAspectRatio) {
              newHeight = (img.height * newWidth) / img.width;
            }
          } else if (resizeHeight) {
            newHeight = Number(resizeHeight);
            if (maintainAspectRatio) {
              newWidth = (img.width * newHeight) / img.height;
            }
          }
        }
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        const quality = getCompressionQuality(compressionLevel);
        const compressedDataUrl = canvas.toDataURL(`image/${outputFormat}`, quality);
        setCompressedImage(compressedDataUrl);
        
        // Calculate compressed size
        const base64String = compressedDataUrl.split(',')[1];
        const compressedBytes = atob(base64String).length;
        setCompressedSize(compressedBytes);
        toast.success("Image compressed successfully!", {
          description: "Your image has been compressed and is ready to download",
        });
        setLoading(false);
      };
      
      img.onerror = () => {
        const errorMessage = "Error loading image";
        setError(errorMessage);
        toast.error("Image Loading Failed", {
          description: errorMessage,
        });
        setLoading(false);
      };
      
      img.src = URL.createObjectURL(selectedFile);
    } catch (err) {
      console.error("Error compressing image:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to compress image. Please try again.";
      setError(errorMessage);
      toast.error("Compression Failed", {
        description: errorMessage,
      });
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) {
      toast.error("No compressed image to download", {
        description: "Please compress an image first",
      });
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = `compressed-image.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded", {
        description: "Your compressed image has been saved",
      });
    } catch (err) {
      console.error("Error downloading image:", err);
      toast.error("Download Failed", {
        description: "Failed to download the image. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Form reset", {
      description: "All fields have been cleared",
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Image Compressor</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Compress and resize your images with multiple options. Convert between JPG, PNG, and WebP formats.
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Upload Image
        </label>
        <div className="flex items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900/20 dark:file:text-blue-300
              hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />
        </div>
      </div>
      
      {originalImage && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Original Image</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <Image src={originalImage} alt="Original" width={500} height={500} className="max-w-full h-auto" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Size: {formatFileSize(originalSize)}
              </p>
            </div>
            
            {compressedImage && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Compressed Image</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <Image src={compressedImage} alt="Compressed" width={500} height={500} className="max-w-full h-auto" />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Size: {formatFileSize(compressedSize)}
                  {originalSize > 0 && (
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      ({Math.round((1 - compressedSize / originalSize) * 100)}% reduction)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compression Settings</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Compression Level
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="compression"
                      value="high"
                      checked={compressionLevel === "high"}
                      onChange={() => setCompressionLevel("high")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">High (Smaller file)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="compression"
                      value="medium"
                      checked={compressionLevel === "medium"}
                      onChange={() => setCompressionLevel("medium")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Medium (Balanced)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="compression"
                      value="low"
                      checked={compressionLevel === "low"}
                      onChange={() => setCompressionLevel("low")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Low (Better quality)</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as ImageFormat)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resize Settings</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Width (pixels)
                </label>
                <input
                  type="number"
                  value={resizeWidth}
                  onChange={(e) => setResizeWidth(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Auto"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Height (pixels)
                </label>
                <input
                  type="number"
                  value={resizeHeight}
                  onChange={(e) => setResizeHeight(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Auto"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Maintain aspect ratio</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleCompress}
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
                "Compress Image"
              )}
            </button>
            
            {compressedImage && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download Image
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About Image Compression</h3>
        <p className="text-blue-700 dark:text-blue-200">
          Image compression reduces file size while maintaining acceptable visual quality.
          This tool allows you to compress images with different quality levels, resize them to specific dimensions,
          and convert between formats. Compressed images load faster on websites and use less storage space.
        </p>
      </div>
    </div>
  );
} 