import React from "react";
import Link from "next/link";
import Logo from "../../../../../api-gateway/src/assets/LofgoImage.png"

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo + About */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src={Logo}
                alt="B2bAgroAfrica Logo"
                className="h-10 w-auto"
              />
              <div className="flex flex-col leading-tight">
    <h2 className="text-md text-orange-600 font-bold">b2b</h2>
    <span className="text-green-950 text-md font-bold">AgroAfrica</span>
  </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">
              B2bAgroAfrica is your trusted marketplace for connecting farmers,
              suppliers, and buyers across Africa. We simplify agricultural
              trade, empower communities, and drive growth in the agro industry.
            </p>
          </div>

        
  {/* Wrap the three link columns in their own sub-grid */}
  <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-gray-200">
        <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
        <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
        <li><Link href="/products" className="hover:text-orange-400">Products</Link></li>
        <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
      </ul>
    </div>

    {/* Customer Support */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
      <ul className="space-y-2 text-gray-200">
        <li><Link href="/faq" className="hover:text-orange-400">FAQ</Link></li>
        <li><Link href="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
        <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
        <li><Link href="/shipping" className="hover:text-orange-400">Shipping & Returns</Link></li>
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <p className="text-gray-200 text-sm">
        Email:{" "}
        <a href="mailto:support@b2bagroafrica.com" className="hover:text-orange-400">
          support@b2bagroafrica.com
        </a>
      </p>
      <p className="text-gray-200 text-sm">Phone: +234 913 136 2276</p>
      <p className="text-gray-200 text-sm">Address: Lagos, Nigeria</p>
      <div className="flex space-x-4 mt-4">
        <a href="#" aria-label="Facebook" className="hover:text-orange-400"><Facebook /></a>
        <a href="#" aria-label="Twitter" className="hover:text-orange-400"><Twitter /></a>
        <a href="#" aria-label="Instagram" className="hover:text-orange-400"><Instagram /></a>
        <a href="#" aria-label="LinkedIn" className="hover:text-orange-400"><Linkedin /></a>
      </div>
    </div>
  </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} B2bAgroAfrica. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
