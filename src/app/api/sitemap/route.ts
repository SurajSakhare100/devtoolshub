import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { create } from "xmlbuilder2";

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = new Set<string>();

    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("javascript:")
      ) {
        // Normalize to full URL
        const fullUrl = new URL(href, url).href;
        // Only include links from the same domain
        if (fullUrl.startsWith(url)) {
          links.add(fullUrl);
        }
      }
    });

    const doc = create({ version: "1.0", encoding: "UTF-8" })
      .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" });

    links.forEach((link) => {
      doc.ele("url").ele("loc").txt(link);
    });

    const sitemap = doc.end({ prettyPrint: true });

    return NextResponse.json({ sitemap });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
}
