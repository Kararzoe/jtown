import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: May 2026</p>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p>When you use JosMKT, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number when you register</li>
              <li>Business/service information when you apply as a provider</li>
              <li>Usage data such as pages visited and features used</li>
              <li>Device information and IP address for security</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To connect customers with service providers</li>
              <li>To send verification codes and important updates</li>
              <li>To ensure platform security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Data Sharing</h2>
            <p>
              We do not sell your personal data. We only share information when:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You choose to make your service profile public</li>
              <li>Required by law or legal process</li>
              <li>Necessary to protect our rights or safety</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Cookies</h2>
            <p>
              We use cookies and analytics (Vercel Analytics) to understand how our site is used. You can accept or decline cookies when prompted. Declining cookies will not affect core functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Data Security</h2>
            <p>
              We protect your data using encryption (SSL/TLS), secure password hashing (bcrypt), and JWT authentication tokens. Your data is stored on secure servers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Contact</h2>
            <p>
              For privacy-related questions, contact us at:<br />
              📧 support@josmkt.com.ng<br />
              📞 +234 911 514 6303
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
