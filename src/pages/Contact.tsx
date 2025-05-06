// Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Twitter, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { Toaster, toast } from "react-hot-toast";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const accessKey = "642ef6f4-e416-4e01-a778-a39ee2454ab0";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "Book Bound",
      subject: "New Contact Message",
    },
    onSuccess: () => {
      toast.success("✅ Message sent successfully!");
      reset();
    },
    onError: () => {
      toast.error("❌ Error sending message.");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Toast container */}
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl font-bold text-[#2A3B4C] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Any questions or suggestions? Write to us!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-serif text-2xl font-bold text-[#2A3B4C] mb-6">
                Our Contact Details
              </h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-[#D4AF37] mr-4" />
                  <p className="text-gray-600">hamzabelkadi25@gmail.com</p>
                </div>

                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-[#D4AF37] mr-4" />
                  <p className="text-gray-600">+212 679 084 271</p>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-[#D4AF37] mr-4" />
                  <p className="text-gray-600">Kenitra, Morocco</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="font-serif text-2xl font-bold text-[#2A3B4C] mb-6">
                Send Us a Message
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message", { required: true })}
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#2A3B4C] text-white py-3 rounded-lg flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
