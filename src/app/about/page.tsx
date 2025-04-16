import { Metadata } from "next";
import { Code, Users, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About DevToolsHub - Our Mission and Team",
  description: "Learn about DevToolsHub, our mission to provide free developer tools, and the team behind our platform.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About DevToolsHub</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-xl mb-6">
            DevToolsHub is a free, open-source platform providing essential developer tools to help streamline your workflow and boost productivity.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to empower developers with high-quality, accessible tools that make their work more efficient and enjoyable. We believe that essential developer tools should be free, easy to use, and available to everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Open Source</h3>
              </div>
              <p>We believe in transparency and community collaboration. Our tools are open source and available on GitHub.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Efficiency</h3>
              </div>
              <p>We focus on creating tools that save you time and effort, allowing you to focus on what matters most.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Privacy</h3>
              </div>
              <p>Your data privacy is our priority. We process data locally when possible and never store sensitive information.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            DevToolsHub was created by a team of passionate developers who understand the challenges of modern web development. Our diverse team brings together expertise in frontend, backend, UI/UX design, and security.
          </p>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md my-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Join Our Community</h3>
            </div>
            <p>
              We&apos;re always looking for contributors and feedback to improve our tools. Whether you&apos;re a developer, designer, or user, we&apos;d love to hear from you. Visit our GitHub repository or contact us to get involved.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            DevToolsHub started as a simple collection of tools that we used in our own development workflows. We realized that many developers were facing the same challenges and could benefit from these tools. What began as a small project has grown into a comprehensive platform serving developers worldwide.
          </p>
          <p>
            Today, we continue to expand our collection of tools based on community feedback and emerging developer needs. Our goal is to create the most useful and accessible developer tools platform available.
          </p>
        </div>
      </div>
    </main>
  );
} 