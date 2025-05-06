import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string, filter: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = () => {
    onSearch(searchQuery, activeFilter);
  };

  const filters = ['all', 'title', 'author', 'genre'];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or genre..."
          className="w-full px-6 py-4 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <Search className="h-6 w-6 text-gray-500" />
        </motion.button>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === filter
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;