import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Left - Logo/Name */}
        <div className="text-xl font-bold">
          Ohara Library
          <p className="text-sm text-gray-400">Powered by Internet Archive API</p>
        </div>

        {/* Center - Navigation Links */}
        <div className="space-x-4">
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/privacy" className="hover:text-gray-300">Privacy</a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Ohara Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
