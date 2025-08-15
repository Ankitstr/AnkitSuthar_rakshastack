import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white dark:text-yellow-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="text-2xl font-bold text-white dark:text-yellow-300">
            RaKsHa PG
          </h2>
          <p className="text-sm text-white/80 dark:text-gray-400">
            Find your perfect PG with comfort, affordability, and verified amenities.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <div className="flex items-center gap-2 text-white/90 dark:text-gray-300">
            <EnvelopeIcon className="h-5 w-5" />
            <span>contact@pgRaksha.com</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 dark:text-gray-300">
            <PhoneIcon className="h-5 w-5" />
            <span>+91 98765 43210</span>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col space-y-4 items-start">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-yellow-300 transition"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-yellow-300 transition"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-yellow-300 transition"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-yellow-300 transition"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-white/70 dark:text-gray-400">
        © {new Date().getFullYear()} RaKsHa PG. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
