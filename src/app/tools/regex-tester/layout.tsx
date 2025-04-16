import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online | DevTools Hub",
  description: "Test and debug regular expressions with real-time validation, highlighting, and capture group inspection. Free online tool for developers.",
  openGraph: {
    title: "Regex Tester - Test Regular Expressions Online | DevTools Hub",
    description: "Test and debug regular expressions with real-time validation, highlighting, and capture group inspection. Free online tool for developers.",
    type: "website",
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 