import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHome,
  FaBuilding,
  FaPhone,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all duration-300 focus:outline-none"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      {/* Newsletter Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Stay up to date with the latest properties, news, and updates from
              Urban Square
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xl font-bold">Urban Square</span>
              </div>

              <p className="text-gray-400 mb-6">
                Your trusted partner in finding the perfect property. Whether
                you're buying, selling, or renting, we're here to help.
              </p>

              <div className="flex space-x-4 mb-8">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaFacebookF className="text-gray-300 hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaTwitter className="text-gray-300 hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaInstagram className="text-gray-300 hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaLinkedinIn className="text-gray-300 hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaHome className="mr-2 text-primary-500" /> Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaBuilding className="mr-2 text-primary-500" /> Property Types
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/properties?propertyType=house"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Houses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties?propertyType=apartment"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Apartments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties?propertyType=condo"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Condos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties?propertyType=land"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Land
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties?propertyType=commercial"
                    className="text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    Commercial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaPhone className="mr-2 text-primary-500" /> Contact Us
              </h3>
              <address className="not-italic text-gray-400 space-y-4">
                <p className="flex items-start">
                  <FaMapMarkerAlt className="text-primary-500 mr-3 mt-1" />
                  <span>
                    1234 Real Estate Ave
                    <br />
                    San Francisco, CA 94103
                  </span>
                </p>
                <p className="flex items-center">
                  <FaPhoneAlt className="text-primary-500 mr-3" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition-colors duration-200"
                  >
                    (123) 456-7890
                  </a>
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="text-primary-500 mr-3" />
                  <a
                    href="mailto:info@urbansquare.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    info@urbansquare.com
                  </a>
                </p>
              </address>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Urban Square. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-6">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
