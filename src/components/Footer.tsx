import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2A3B4C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#D4AF37]" />
              <span className="font-serif text-xl font-bold">BookBound</span>
            </Link>
            <p className="text-sm text-gray-300">Your unlimited literary universe</p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="hover:text-[#D4AF37] transition-colors">Browse Books</Link></li>
              <li><Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Fiction</Link></li>
              <li><Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Non-Fiction</Link></li>
              <li><Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Science Fiction</Link></li>
              <li><Link to="/categories" className="hover:text-[#D4AF37] transition-colors">Educational</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center text-sm text-gray-300">
            <p>© {new Date().getFullYear()} BookBound. All rights reserved.</p>
            <p className="mt-2">Developed by <span className="text-[#D4AF37]">BELKADI HAMZA</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;