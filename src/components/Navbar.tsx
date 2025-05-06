import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2A3B4C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#D4AF37]" />
              <span className="font-serif text-xl font-bold">BookBound</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              <Link to="/browse" className="hover:text-[#D4AF37] transition-colors">Browse</Link>
              <Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Categories</Link>
              <Link to="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#D4AF37] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="block px-3 py-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;