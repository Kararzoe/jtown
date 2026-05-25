import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: May 2026</p>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By using JosMKT (www.josmkt.com.ng), you agree to these Terms of Service. If you do not agree, please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Use of Service</h2>
            <p>JosMKT is a platform that connects customers with service providers in Jos. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when registering</li>
              <li>Not use the platform for illegal activities</li>
              <li>Not impersonate others or provide false credentials</li>
              <li>Respect other users and service providers</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Service Providers</h2>
            <p>
              Service providers listed on JosMKT are independent professionals. JosMKT does not employ them and is not responsible for the quality of their work. We verify providers to the best of our ability but recommend you exercise your own judgment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Account Responsibility</h2>
            <p>
              You are responsible for maintaining the security of your account. Do not share your password. You are responsible for all activities under your account.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Content</h2>
            <p>
              By submitting content (business info, reviews, images), you grant JosMKT the right to display it on the platform. You must own or have rights to any content you submit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms, provide false information, or engage in harmful behavior.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Limitation of Liability</h2>
            <p>
              JosMKT is provided "as is." We are not liable for any disputes between customers and service providers, or for any damages arising from use of the platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Contact</h2>
            <p>
              Questions about these terms? Contact us:<br />
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
