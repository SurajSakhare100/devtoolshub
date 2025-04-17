import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - DevToolsHub",
  description: "Format and validate JSON data with syntax highlighting and error detection.",
  keywords: "json, json formatter, online json formatter, beautify json, json viewer, online json viewer, json validator, validate json online, json prettifier, pretty print json, json editor, json parser, json linter, json syntax checker, json compare, json diff, compare json files, compare json objects, json comparison tool, json structure viewer, json error checker, json tree viewer, json document viewer, json checker, json validator tool, json format checker, check json format, check json syntax, validate json string, json full form, what is json, json tutorial, json example, json meaning, learn json, json basics, json data types, json vs xml, json vs csv, json stringify, json parse, parse json javascript, json to csv, csv to json, json to xml, xml to json, json to excel, excel to json, json to yaml, yaml to json, json to text, text to json, json to html, html to json, json to table, json to pdf, pdf to json, json to sql, sql to json, json to mysql, mysql to json, json to dart, dart to json, json to java, java to json, json to python, python to json, json file, json file viewer, json format, format json, json online tool, json online parser, json response viewer, json beautifier online, json visualizer, json online viewer tool, free json viewer, simple json formatter, best json formatter, clean json formatter, json tree visualizer, interactive json viewer, view json tree online, json api viewer, json in web development, json in api, json in python, json in javascript, json in java, json editor online, json viewer web, json file format, open json file online, convert json online, online json compare, json structure compare, json diff viewer, json comparison online, highlight json differences, online json validator, debug json online, test json format, verify json format, fix json errors, json tool, json online tools, json utilities, json to string, string to json, history of json, uses of json, json development tools, json file checker, json response checker, json decode viewer, json syntax validator, json data viewer, json request viewer",
  openGraph: {
    title: "JSON Formatter - DevToolsHub",
    description: "Format and validate JSON data with syntax highlighting and error detection.",
    url: "https://devstoolhub.vercel.app/tools/json-formatter",
    siteName: "DevToolsHub",
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 