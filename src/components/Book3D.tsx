import React from 'react';
import { motion } from 'framer-motion';

interface Book3DProps {
  cover: string;
  title: string;
  author: string;
}

const Book3D: React.FC<Book3DProps> = ({ cover, title, author }) => {
  return (
    <div className="relative group perspective-1000">
      <motion.div 
        className="relative w-[300px] h-[450px] transform-style-preserve-3d transition-transform duration-500 ease-in-out hover:rotate-y-10"
        whileHover={{ rotateY: 15 }}
      >
        {/* Front Cover */}
        <div className="absolute w-full h-full rounded-lg shadow-xl overflow-hidden">
          <img 
            src={cover} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Spine */}
        <div 
          className="absolute left-0 w-[30px] h-full bg-[#2A3B4C] origin-right transform -translate-x-[30px] rotate-y-90"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white text-sm font-serif rotate-180 writing-vertical-lr">
              {title}
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg font-bold text-[#2A3B4C]">{title}</h3>
        <p className="text-gray-600">{author}</p>
      </div>
    </div>
  );
};

export default Book3D;