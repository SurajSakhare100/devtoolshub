import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - DevToolsHub",
  description: "Read our Privacy Policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At DevToolsHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our tools.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our contact forms</li>
            <li>Participate in our community forums</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Usage Data</h3>
          <p>
            We automatically collect certain information when you visit our website, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring websites</li>
            <li>IP address</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our Service</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about updates and changes</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Detect and prevent technical issues</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, or assist us in analyzing how our Service is used. These third parties have access to your personal information only to perform these tasks on our behalf.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
          <p>
            Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our Contact page.
          </p>
        </div>
      </div>
    </main>
  );
} 