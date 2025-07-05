import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Contact Info */}
        <div className="space-y-4 max-w-sm">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-3 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-green-400" /> 123 Garden St, Green City, Earth
          </p>
          <p className="flex items-center gap-3 text-sm text-gray-300">
            <FaPhone className="text-green-400" /> +1 (234) 567-890
          </p>
          <p className="flex items-center gap-3 text-sm text-gray-300">
            <FaEnvelope className="text-green-400" /> contact@gardenly.com
          </p>
        </div>

        {/* Terms & Links */}
        <div className="space-y-2 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-3">Legal</h3>
          <a href="/terms" className="hover:text-green-400 text-sm text-gray-300 transition-colors">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-green-400 text-sm text-gray-300 transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* Social Links */}
        <div className="space-y-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-5 text-xl">
            <a
              href="https://facebook.com/gardenly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-400 text-gray-300 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/gardenly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-400 text-gray-300 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/gardenly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-400 text-gray-300 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-green-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Gardenly. All rights reserved.
      </div>
    </footer>
  );
}
