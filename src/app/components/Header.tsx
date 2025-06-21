"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // or use react-icons

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 m-2 rounded-3xl  text-white px-4 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex p-5 justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Ohara Library
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/explore" className="hover:text-gray-300">Explore</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <Link href="/explore" className="block hover:text-gray-300">Explore</Link>
          <Link href="/about" className="block hover:text-gray-300">About</Link>
          <Link href="/contact" className="block hover:text-gray-300">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
