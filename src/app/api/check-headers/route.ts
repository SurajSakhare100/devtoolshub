import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Make the request to the target URL
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "DevToolsHub HTTP Header Checker",
      },
      // Don't follow redirects to get the actual status code
      maxRedirects: 0,
      // Set a reasonable timeout
      timeout: 10000,
      // Don't validate SSL certificates to avoid issues with self-signed certs
      validateStatus: () => true,
    });

    // Extract headers
    const headers = Object.entries(response.headers).map(([name, value]) => ({
      name,
      value: Array.isArray(value) ? value.join(", ") : value,
    }));

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error("Error checking headers:", error);
    
    // Handle specific error types
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        return NextResponse.json(
          { error: "Connection refused. The server might be down or not accepting connections." },
          { status: 500 }
        );
      } else if (error.code === "ETIMEDOUT") {
        return NextResponse.json(
          { error: "Request timed out. The server took too long to respond." },
          { status: 500 }
        );
      } else if (error.code === "ENOTFOUND") {
        return NextResponse.json(
          { error: "Domain not found. Please check the URL and try again." },
          { status: 500 }
        );
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return NextResponse.json(
          { 
            error: `Server responded with status ${error.response.status}`,
            status: error.response.status,
            statusText: error.response.statusText,
            headers: Object.entries(error.response.headers).map(([name, value]) => ({
              name,
              value: Array.isArray(value) ? value.join(", ") : value,
            })),
          },
          { status: 200 } // Return 200 to the client so we can still display the headers
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to check headers. Please try again." },
      { status: 500 }
    );
  }
} 