import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: 2020, title: "BookBound Launch", description: "Started with a vision to make literature accessible to all" },
    { year: 2021, title: "100K Users", description: "Reached our first major milestone in user growth" },
    { year: 2022, title: "Mobile App Launch", description: "Expanded our platform to mobile devices" },
    { year: 2023, title: "Global Expansion", description: "Now serving readers in over 50 countries" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl font-bold text-[#2A3B4C] mb-4">Our Mission</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At BookBound, we believe in the transformative power of literature.
            Our mission is to create an inclusive digital space where readers can discover,
            explore, and engage with books that inspire, educate, and entertain.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: BookOpen, label: "Books Available", value: "50K+" },
            { icon: Users, label: "Active Readers", value: "100K+" },
            { icon: Globe, label: "Countries", value: "50+" },
            { icon: Award, label: "Awards", value: "15+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto text-[#D4AF37] mb-2" />
              <h3 className="text-2xl font-bold text-[#2A3B4C]">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#2A3B4C] mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="w-24 text-2xl font-bold text-[#D4AF37]">{milestone.year}</div>
                <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2A3B4C] mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;