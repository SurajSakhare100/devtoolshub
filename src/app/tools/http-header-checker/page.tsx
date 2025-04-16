"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Clock, Copy, Download, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type HeaderInfo = {
  name: string;
  value: string;
  isSecurity: boolean;
  isCors: boolean;
  isRecommended: boolean;
};

type HeaderResponse = {
  status: number;
  statusText: string;
  responseTime: number;
  headers: HeaderInfo[];
  missingSecurityHeaders: string[];
};

const RECOMMENDED_SECURITY_HEADERS = [
  "Strict-Transport-Security",
  "Content-Security-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "X-XSS-Protection",
  "Referrer-Policy",
  "Permissions-Policy",
];

export default function HttpHeaderChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [headerData, setHeaderData] = useState<HeaderResponse | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const parsedUrl = new URL(inputUrl);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setHeaderData(null);

    if (!url.trim()) {
      toast.error("Please enter a URL", {
        description: "The URL field cannot be empty",
      });
      return;
    }

    if (!validateUrl(url)) {
      const errorMessage = "Please enter a valid HTTP/HTTPS URL (e.g., https://example.com)";
      setError(errorMessage);
      toast.error("Invalid URL", {
        description: errorMessage,
      });
      return;
    }

    setLoading(true);

    try {
      const startTime = performance.now();
      
      const response = await fetch("/api/check-headers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      if (!response.ok) {
        let errorMessage = "Failed to check headers";
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
      
      if (!data.headers) {
        throw new Error("No header data received from server");
      }
      
      // Process headers and identify missing security headers
      const processedHeaders: HeaderInfo[] = data.headers.map((header: { name: string; value: string }) => {
        const name = header.name;
        return {
          name,
          value: header.value,
          isSecurity: name.toLowerCase().includes("security") || 
                     name.toLowerCase().includes("policy") || 
                     name.toLowerCase().includes("frame") || 
                     name.toLowerCase().includes("xss") || 
                     name.toLowerCase().includes("hsts") || 
                     name.toLowerCase().includes("csp"),
          isCors: name.toLowerCase().includes("access-control"),
          isRecommended: RECOMMENDED_SECURITY_HEADERS.includes(name),
        };
      });

      const missingSecurityHeaders = RECOMMENDED_SECURITY_HEADERS.filter(
        header => !processedHeaders.some(h => h.name === header)
      );

      setHeaderData({
        status: data.status,
        statusText: data.statusText,
        responseTime,
        headers: processedHeaders,
        missingSecurityHeaders,
      });

      toast.success("Headers retrieved successfully!", {
        description: `Found ${processedHeaders.length} headers for ${url}`,
      });
    } catch (err) {
      console.error("Error checking headers:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to check headers. Please try again.";
      setError(errorMessage);
      toast.error("Header Check Failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (format: "json" | "txt") => {
    if (!headerData) {
      toast.error("No header data to download", {
        description: "Please check headers first",
      });
      return;
    }

    try {
      let content: string;
      let mimeType: string;
      let filename: string;

      if (format === "json") {
        content = JSON.stringify(headerData, null, 2);
        mimeType = "application/json";
        filename = "headers.json";
      } else {
        content = `HTTP ${headerData.status} ${headerData.statusText}\n`;
        content += `Response Time: ${headerData.responseTime}ms\n\n`;
        content += headerData.headers.map(h => `${h.name}: ${h.value}`).join("\n");
        mimeType = "text/plain";
        filename = "headers.txt";
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Headers downloaded", {
        description: `Your headers have been saved as ${filename}`,
      });
    } catch (err) {
      console.error("Error downloading headers:", err);
      toast.error("Download Failed", {
        description: "Failed to download the headers. Please try again.",
      });
    }
  };

  const handleCopy = () => {
    if (!headerData) {
      toast.error("No header data to copy", {
        description: "Please check headers first",
      });
      return;
    }
    
    try {
      const content = JSON.stringify(headerData, null, 2);
      navigator.clipboard.writeText(content);
      toast.success("Headers copied to clipboard", {
        description: "The header data is ready to paste",
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard. Please try again.",
      });
    }
  };

  const handleClear = () => {
    setUrl("");
    setHeaderData(null);
    setError("");
    toast.success("Input cleared", {
      description: "All fields have been reset",
    });
  };

  const handleVisitWebsite = () => {
    if (!url) return;
    
    try {
      window.open(url , '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Error opening website:", err);
      toast.error("Failed to open website", {
        description: "Could not open the website in a new tab",
      });
    }
  };

  const filteredHeaders = headerData?.headers.filter(header => {
    if (activeTab === "all") return true;
    if (activeTab === "security") return header.isSecurity;
    if (activeTab === "cors") return header.isCors;
    return true;
  }) || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">HTTP Header Checker</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Analyze HTTP response headers for any website to check security, CORS, and other important configurations.
      </p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Website URL
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </span>
              ) : (
                "Check Headers"
              )}
            </Button>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter any valid HTTP/HTTPS URL to analyze its headers
          </p>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {headerData && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center justify-between gap-1">
                  <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 " 
                            onClick={handleVisitWebsite}
                            title="Visit website"
                          >
                            <Globe className="h-4 w-4 mt-1" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visit this website</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {url}
               
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant={headerData.status >= 200 && headerData.status < 300 ? "default" : "destructive"}>
                        {headerData.status} {headerData.statusText}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        {headerData.responseTime}ms
                      </div>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload("json")}>
                    <Download className="h-4 w-4 mr-2" />
                    JSON
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload("txt")}>
                    <Download className="h-4 w-4 mr-2" />
                    TXT
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {headerData.missingSecurityHeaders.length > 0 && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Missing Security Headers</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {headerData.missingSecurityHeaders.map(header => (
                        <Badge key={header} variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                          {header}
                        </Badge>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Headers</TabsTrigger>
                  <TabsTrigger value="security">Security Headers</TabsTrigger>
                  <TabsTrigger value="cors">CORS Headers</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="max-h-[500px] overflow-y-auto">
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Header Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {filteredHeaders.map((header, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {header.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 break-all">
                              {header.value}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex gap-1">
                                {header.isSecurity && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                          Security
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Security-related header</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {header.isCors && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                                          CORS
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Cross-Origin Resource Sharing header</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {header.isRecommended && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                                          <CheckCircle2 className="h-3 w-3 mr-1" />
                                          Recommended
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Recommended security header</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About HTTP Headers</h3>
        <p className="text-blue-700 dark:text-blue-200">
          HTTP headers provide important information about the server, content, and security policies of a website.
          Security headers like Content-Security-Policy and Strict-Transport-Security help protect against common web vulnerabilities.
          This tool helps you analyze headers to ensure your website follows security best practices.
        </p>
      </div>
    </div>
  );
} 