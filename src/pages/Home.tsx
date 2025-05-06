import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { Book, getFeaturedBooks } from '../services/books';
import Slider from 'react-slick';

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const data = await getFeaturedBooks();
        const sorted = data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        setFeaturedBooks(sorted.slice(0, 10)); // Only display top 10 books
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const handleSearch = (query: string, filter: string) => {
    console.log('Search:', query, 'Filter:', filter);
    // Implement search logic here as needed.
  };

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Settings for react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-[#2A3B4C] text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <h1 className="font-serif text-4xl font-bold mb-4">
              Your Unlimited Literary Universe
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover thousands of books across hundreds of genres
            </p>
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-[#2A3B4C]">10k+</h3>
              <p className="text-gray-600">Books Available</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-[#2A3B4C]">100+</h3>
              <p className="text-gray-600">Genres</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-[#2A3B4C]">50k+</h3>
              <p className="text-gray-600">Active Readers</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-[#2A3B4C]">4.8</h3>
              <p className="text-gray-600">Average Rating</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Books Carousel Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#2A3B4C] mb-8">
            Top Rated Books
          </h2>
          {featuredBooks.length > 0 ? (
            <Slider {...sliderSettings}>
              {featuredBooks.map((book) => (
                <div key={book.id} className="px-2">
                  <BookCard {...book} />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No books found.</p>
          )}
          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/browse"
                className="inline-flex items-center px-6 py-3 bg-[#2A3B4C] text-white rounded-full hover:bg-[#1A2B3C] transition-colors"
              >
                Explore All Books
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
