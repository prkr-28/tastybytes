import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-yellow-200 text-gray-800 p-8 border-t border-green-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand/Logo */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-orange-600">TastyBites</h1>
          <p className="text-sm text-gray-600">
            Serving happiness with every bite.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-orange-500 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="#"
              className="hover:text-orange-500 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a
              href="#"
              className="hover:text-orange-500 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <Link
            to="/"
            className="hover:text-orange-500 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-orange-500 transition-all duration-300"
          >
            Cart
          </Link>

          <Link
            to="/about"
            className="hover:text-orange-500 transition-all duration-300"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="hover:text-orange-500 transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Location Info */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-2">Visit Us</h2>
          <p className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
            <span>123 Food Street, Flavor Town, CA</span>
          </p>
          <p>Open: Mon - Sun, 10am - 10pm</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} TastyBites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
