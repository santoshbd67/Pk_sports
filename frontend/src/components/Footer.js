import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-400 mb-3 sm:mb-4">PK Sports</h3>
            <p className="text-secondary-300 mb-4 text-sm sm:text-base leading-relaxed">
              Your ultimate destination for sports equipment, apparel, and accessories. 
              Quality products for every athlete.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-400 transition-colors p-2 -m-2">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-400 transition-colors p-2 -m-2">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/punkyakoti_sports_shop_mudalagi_mahalingpu" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-400 transition-colors p-2 -m-2">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+918884344214" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Help Center
                </a>
              </li>
              <li>
                <a href="tel:+918884344214" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="tel:+918884344214" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Returns
                </a>
              </li>
              <li>
                <a href="tel:+918884344214" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-300 text-sm sm:text-base">Mahalingpur, Karnataka, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+918884344214" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base">+91-8884344214</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@pksports.com" className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base break-all">info@pksports.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-secondary-400 text-sm sm:text-base">
            © 2024 PK Sports - Punyakoti Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;