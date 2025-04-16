"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Copy, Download, Info } from "lucide-react";
type RegexFlag = "g" | "i" | "m" | "s" | "u" | "y";

type MatchResult = {
  match: string;
  index: number;
  groups: string[];
  groupIndices: { start: number; end: number }[];
};

type PredefinedTestCase = {
  name: string;
  pattern: string;
  testString: string;
  flags: RegexFlag[];
  description: string;
};

const PREDEFINED_TEST_CASES: PredefinedTestCase[] = [
  {
    name: "Email Address",
    pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",
    testString: `
      user@example.com
      another.user@domain.co.uk
      invalid.email
      user@.com
      test@site.io
    `,
    flags: ["i"],
    description: "Matches standard email addresses",
  },
  {
    name: "Phone Number",
    pattern: "(\\+?\\d{1,3}[-. ]?)?\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}",
    testString: `
      +1 (555) 123-4567
      (555) 123-4567
      555-123-4567
      5551234567
      12345
    `,
    flags: [],
    description: "Matches various phone number formats",
  },
  {
    name: "URL",
    pattern: "(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?",
    testString: `
      https://www.example.com
      http://sub.example.co.uk/path
      www.example.com
      invalid_url
      example
    `,
    flags: ["i"],
    description: "Matches URLs with or without protocol",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])",
    testString: `
      2023-01-15
      2023-04-31
      2023-13-01
      2023-02-29
      2022-12-12
    `,
    flags: [],
    description: "Matches dates in YYYY-MM-DD format",
  },
  {
    name: "Credit Card",
    pattern: "(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})",
    testString: `
      4532123456788901
      5412756789012345
      6011111111111117
      1234567890123456
      abc123
    `,
    flags: [],
    description: "Matches common credit card numbers",
  },
  {
    name: "Website URL",
    pattern: "(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w-./?%&=]*)?",
    testString: `
      https://habitpulse.xyz/
      http://example.com/path?param=value
      www.test-site.com
      subdomain.domain.co.uk/path
      not-a-url
    `,
    flags: ["i"],
    description: "Matches website URLs with various formats",
  },
];



export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState<RegexFlag[]>([]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState(true);
  const [selectedTestCase, setSelectedTestCase] = useState<string>("");
  const [highlightedTestString, setHighlightedTestString] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groupColors, setGroupColors] = useState<string[]>([]);
  
  const testStringRef = useRef<HTMLDivElement>(null);
  
  // Generate colors for capture groups
  useEffect(() => {
    const colors = [
      "bg-blue-200 dark:bg-blue-800",
      "bg-green-200 dark:bg-green-800",
      "bg-yellow-200 dark:bg-yellow-800",
      "bg-purple-200 dark:bg-purple-800",
      "bg-pink-200 dark:bg-pink-800",
      "bg-indigo-200 dark:bg-indigo-800",
      "bg-red-200 dark:bg-red-800",
      "bg-orange-200 dark:bg-orange-800",
      "bg-teal-200 dark:bg-teal-800",
      "bg-cyan-200 dark:bg-cyan-800",
    ];
    setGroupColors(colors);
  }, []);

  // Validate regex pattern and find matches
  useEffect(() => {
    if (!pattern) {
      setIsValid(true);
      setError("");
      setMatches([]);
      setHighlightedTestString(testString);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags.join(""));
      const results: MatchResult[] = [];
      let match;

      // Reset state
      setError("");
      setMatches([]);
      setHighlightedTestString(testString);

      // Find all matches
      while ((match = regex.exec(testString)) !== null) {
        results.push(createMatchResult(match));
      }

      setMatches(results);

      // Highlight matches in the test string
      if (results.length === 0) {
        setHighlightedTestString(testString);
        return;
      }
      
      // Create a simple HTML representation with proper escaping
      let html = "";
      let lastIndex = 0;
      
      // Sort matches by index to process them in order
      const sortedMatches = [...results].sort((a, b) => a.index - b.index);
      
      for (const result of sortedMatches) {
        // Add text before the match
        if (result.index > lastIndex) {
          html += escapeHtml(testString.slice(lastIndex, result.index));
        }
        
        // Add the highlighted match
        html += `<span class="bg-yellow-200 dark:bg-yellow-800">${escapeHtml(result.match)}</span>`;
        
        lastIndex = result.index + result.match.length;
      }
      
      // Add any remaining text
      if (lastIndex < testString.length) {
        html += escapeHtml(testString.slice(lastIndex));
      }
      
      setHighlightedTestString(html);
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
      setHighlightedTestString(testString);
    }
  }, [pattern, testString, flags]);

  // Create a match result object
  const createMatchResult = (match: RegExpExecArray): MatchResult => {
    const groups: string[] = [];
    const groupIndices: { start: number; end: number }[] = [];
    
    // Add the full match
    groups.push(match[0]);
    groupIndices.push({ start: match.index, end: match.index + match[0].length });
    
    // Add capture groups
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== undefined) {
        groups.push(match[i]);
        
        // Find the position of this group in the original string
        const groupStart = match.index + match[0].indexOf(match[i]);
        groupIndices.push({ start: groupStart, end: groupStart + match[i].length });
      } else {
        groups.push("");
        groupIndices.push({ start: -1, end: -1 });
      }
    }
    
    return {
      match: match[0],
      index: match.index,
      groups,
      groupIndices,
    };
  };

  // Escape HTML special characters
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Handle flag toggle
  const toggleFlag = (flag: RegexFlag) => {
    if (flags.includes(flag)) {
      setFlags(flags.filter(f => f !== flag));
    } else {
      setFlags([...flags, flag]);
    }
  };

  // Load a predefined test case
  const loadTestCase = (testCaseName: string) => {
    const testCase = PREDEFINED_TEST_CASES.find(tc => tc.name === testCaseName);
    if (testCase) {
      setPattern(testCase.pattern);
      setTestString(testCase.testString);
      setFlags(testCase.flags);
      setSelectedTestCase(testCaseName);
    }
  };

  // Handle group selection
  const handleGroupClick = (groupIndex: number) => {
    setSelectedGroup(groupIndex);
  };

  // Copy regex pattern to clipboard
  const handleCopyPattern = () => {
    try {
      navigator.clipboard.writeText(pattern);
      toast.success("Pattern copied to clipboard", {
        description: "The regex pattern is ready to paste",
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard. Please try again.",
      });
    }
  };

  // Copy test string to clipboard
  const handleCopyTestString = () => {
    try {
      navigator.clipboard.writeText(testString);
      toast.success("Test string copied to clipboard", {
        description: "The test string is ready to paste",
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard. Please try again.",
      });
    }
  };

  // Download results as JSON
  const handleDownload = () => {
    if (matches.length === 0) {
      toast.error("No matches to download", {
        description: "Please enter a valid regex pattern and test string",
      });
      return;
    }

    try {
      const data = {
        pattern,
        flags: flags.join(""),
        testString,
        matches,
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "regex-results.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Results downloaded", {
        description: "Your regex test results have been saved",
      });
    } catch (err) {
      console.error("Error downloading results:", err);
      toast.error("Download Failed", {
        description: "Failed to download the results. Please try again.",
      });
    }
  };

  // Clear all inputs
  const handleClear = () => {
    setPattern("");
    setTestString("");
    setFlags([]);
    setMatches([]);
    setError("");
    setIsValid(true);
    setSelectedTestCase("");
    setHighlightedTestString("");
    setSelectedGroup(null);
    toast.success("Form cleared", {
      description: "All fields have been reset",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Regex Tester</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Test and debug regular expressions with real-time validation, highlighting, and capture group inspection.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Regex Pattern</CardTitle>
            <CardDescription>
              Enter your regular expression pattern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="/your-regex-pattern/"
                  className={`font-mono ${!isValid ? "border-red-500" : ""}`}
                />
                <Button variant="outline" size="icon" onClick={handleCopyPattern}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              {!isValid && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Invalid Regex</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="mb-4">
              <Label className="mb-2 block">Regex Flags</Label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-g" 
                    checked={flags.includes("g")} 
                    onCheckedChange={() => toggleFlag("g")} 
                  />
                  <Label htmlFor="flag-g" className="text-sm">Global (g)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-i" 
                    checked={flags.includes("i")} 
                    onCheckedChange={() => toggleFlag("i")} 
                  />
                  <Label htmlFor="flag-i" className="text-sm">Case-insensitive (i)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-m" 
                    checked={flags.includes("m")} 
                    onCheckedChange={() => toggleFlag("m")} 
                  />
                  <Label htmlFor="flag-m" className="text-sm">Multi-line (m)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-s" 
                    checked={flags.includes("s")} 
                    onCheckedChange={() => toggleFlag("s")} 
                  />
                  <Label htmlFor="flag-s" className="text-sm">Dot-all (s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-u" 
                    checked={flags.includes("u")} 
                    onCheckedChange={() => toggleFlag("u")} 
                  />
                  <Label htmlFor="flag-u" className="text-sm">Unicode (u)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="flag-y" 
                    checked={flags.includes("y")} 
                    onCheckedChange={() => toggleFlag("y")} 
                  />
                  <Label htmlFor="flag-y" className="text-sm">Sticky (y)</Label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="mb-2 block">Predefined Test Cases</Label>
              <Select value={selectedTestCase} onValueChange={loadTestCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test case" />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_TEST_CASES.map((testCase) => (
                    <SelectItem key={testCase.name} value={testCase.name}>
                      {testCase.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTestCase && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {PREDEFINED_TEST_CASES.find(tc => tc.name === selectedTestCase)?.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
            <CardDescription>
              Enter the text to test your regex against
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder="Enter text to test..."
                  className="min-h-[100px] font-mono"
                />
                <Button variant="outline" size="icon" onClick={handleCopyTestString}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="mb-2 block">Highlighted Results</Label>
              <div 
                ref={testStringRef}
                className="border rounded-md p-3 min-h-[100px] font-mono whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightedTestString || testString }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.hasAttribute('data-group')) {
                    const groupIndex = parseInt(target.getAttribute('data-group') || '0');
                    handleGroupClick(groupIndex);
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Match Results</CardTitle>
          <CardDescription>
            {matches.length > 0 
              ? `Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}` 
              : "No matches found"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {matches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Match #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Full Match
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Length
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Capture Groups
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {matches.map((match, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {match.match}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {match.index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {match.match.length}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex flex-wrap gap-2">
                          {match.groups.map((group, groupIndex) => (
                            groupIndex > 0 && (
                              <Badge 
                                key={groupIndex}
                                variant="outline" 
                                className={`${groupColors[(groupIndex - 1) % groupColors.length]} cursor-pointer ${selectedGroup === groupIndex ? 'ring-2 ring-primary' : ''}`}
                                onClick={() => handleGroupClick(groupIndex)}
                              >
                                Group {groupIndex}: {group || '(empty)'}
                              </Badge>
                            )
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {isValid && pattern && testString ? (
                <div>
                  <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No matches found for this pattern in the test string.</p>
                </div>
              ) : (
                <div>
                  <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>Enter a regex pattern and test string to see matches.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <Button onClick={handleDownload} disabled={matches.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">About Regular Expressions</h3>
        <p className="text-blue-700 dark:text-blue-200">
          Regular expressions (regex) are powerful patterns used to match, search, and manipulate text.
          They are widely used in programming for tasks like validation, parsing, and text processing.
          This tool helps you test and debug regex patterns with real-time feedback and visualization.
        </p>
      </div>
    </div>
  );
} 