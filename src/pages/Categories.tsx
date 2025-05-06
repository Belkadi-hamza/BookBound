import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Book, Heart, School, Users, Music, 
  Globe, Coffee, Gamepad2, Code, Camera, Brain,
  Telescope, Leaf, Dumbbell, Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    { 
      name: 'Fiction', 
      icon: BookOpen, 
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      count: 2547,
      description: 'Explore imaginative worlds and compelling stories'
    },
    { 
      name: 'Non-Fiction', 
      icon: Book, 
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      count: 1832,
      description: 'Discover real-world knowledge and insights'
    },
    { 
      name: 'Romance', 
      icon: Heart, 
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      count: 1245,
      description: 'Fall in love with heartwarming stories'
    },
    { 
      name: 'Education', 
      icon: School, 
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      count: 987,
      description: 'Learn and grow with educational content'
    },
    { 
      name: 'Biography', 
      icon: Users, 
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      count: 756,
      description: 'Read inspiring life stories'
    },
    { 
      name: 'Arts & Music', 
      icon: Music, 
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600',
      count: 654,
      description: 'Immerse yourself in creative expression'
    },
    { 
      name: 'Travel', 
      icon: Globe, 
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600',
      count: 432,
      description: 'Journey through global adventures'
    },
    { 
      name: 'Lifestyle', 
      icon: Coffee, 
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      count: 321,
      description: 'Enhance your daily living'
    },
    { 
      name: 'Gaming', 
      icon: Gamepad2, 
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600',
      count: 289,
      description: 'Level up your gaming knowledge'
    },
    { 
      name: 'Technology', 
      icon: Code, 
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-cyan-600',
      count: 567,
      description: 'Stay ahead in the digital world'
    },
    { 
      name: 'Photography', 
      icon: Camera, 
      color: 'bg-violet-500',
      gradient: 'from-violet-500 to-violet-600',
      count: 234,
      description: 'Capture moments through the lens'
    },
    { 
      name: 'Psychology', 
      icon: Brain, 
      color: 'bg-rose-500',
      gradient: 'from-rose-500 to-rose-600',
      count: 445,
      description: 'Understand the human mind'
    },
    { 
      name: 'Science', 
      icon: Telescope, 
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600',
      count: 678,
      description: 'Explore scientific discoveries'
    },
    { 
      name: 'Nature', 
      icon: Leaf, 
      color: 'bg-lime-500',
      gradient: 'from-lime-500 to-lime-600',
      count: 345,
      description: 'Connect with the natural world'
    },
    { 
      name: 'Fitness', 
      icon: Dumbbell, 
      color: 'bg-amber-500',
      gradient: 'from-amber-500 to-amber-600',
      count: 432,
      description: 'Achieve your fitness goals'
    },
    { 
      name: 'Art History', 
      icon: Palette, 
      color: 'bg-fuchsia-500',
      gradient: 'from-fuchsia-500 to-fuchsia-600',
      count: 234,
      description: 'Journey through artistic evolution'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl font-bold text-[#2A3B4C] mb-4">Explore Our Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive into our carefully curated collection of books across diverse genres.
            Whether you're seeking knowledge, entertainment, or inspiration, we have something for every reader.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCategory(category.name)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Link
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="block h-full"
              >
                <motion.div
                  className={`relative h-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl
                    ${hoveredCategory === category.name ? 'scale-105' : ''}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                  <div className="relative p-6">
                    <category.icon className="h-12 w-12 text-white mb-4" />
                    <h3 className="font-serif text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-sm">{category.count.toLocaleString()} Books</span>
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: hoveredCategory === category.name ? 0 : -10,
                          opacity: hoveredCategory === category.name ? 1 : 0
                        }}
                        className="text-white text-sm"
                      >
                        Explore →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <Link
            to="/browse"
            className="inline-flex items-center px-6 py-3 bg-[#2A3B4C] text-white rounded-full hover:bg-[#1A2B3C] transition-colors"
          >
            Browse All Books
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;