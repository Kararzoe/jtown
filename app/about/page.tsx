import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About JosMKT</h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
            <p className="text-lg">
              JosMKT is the #1 platform for finding trusted service providers in Jos, Plateau State, Nigeria. We connect people who need services with verified professionals in their area.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p>
              To make it easy for everyone in Jos to find reliable, professional service providers — from plumbers and electricians to bakers and photographers — all in one place.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Connect customers with verified service providers in Jos</li>
              <li>Help businesses grow their visibility and reach more customers</li>
              <li>Provide a trusted platform for service discovery</li>
              <li>Support the local economy in Plateau State</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Coverage</h2>
            <p>
              We cover all areas in Jos including Bukuru, Rayfield, Terminus, Lamingo, Tudun Wada, Nassarawa, Hwolshe, Old Airport, Polo, British, Sukuwa, and surrounding areas in Plateau State.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            <p>
              📞 +234 911 514 6303<br />
              📧 support@josmkt.com.ng<br />
              📍 Jos, Plateau State, Nigeria
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
