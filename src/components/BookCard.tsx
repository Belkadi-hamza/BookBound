import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../services/books';

interface BookCardProps extends Book {}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  rating,
  isbn
}) => {
  return (
    <Link to={`/book/${id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-xl shadow-md overflow-hidden h-full"
      >
        <div className="relative aspect-[2/3]">
          <img
            src={cover || 'https://placehold.co/400x600?text=No+Cover'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {title.length > 15 ? title.substring(0, 15) + "..." : title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">{author}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
              <span className="ml-2 text-sm">{rating?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;