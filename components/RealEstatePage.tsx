"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Phone, ArrowLeft, Bed, Bath, Home as HomeIcon, Hotel } from "lucide-react";

const properties = [
  {
    type: "For Rent",
    title: "3 Bedroom Flat",
    image: "🏠",
    price: 500000,
    period: "/year",
    bedrooms: 3,
    bathrooms: 2,
    agent: { name: "Mr. John Danjuma", avatar: "👨‍💼", rating: 4.9, phone: "+234 813 456 7890", company: "Jos Prime Properties" },
    location: "Rayfield, Jos"
  },
  {
    type: "For Sale",
    title: "4 Bedroom Duplex",
    image: "🏡",
    price: 25000000,
    period: "",
    bedrooms: 4,
    bathrooms: 3,
    agent: { name: "Mrs. Grace Okoro", avatar: "👩‍💼", rating: 4.8, phone: "+234 814 567 8901", company: "Plateau Homes Ltd" },
    location: "Bukuru, Jos"
  },
  {
    type: "For Rent",
    title: "2 Bedroom Apartment",
    image: "🏘️",
    price: 350000,
    period: "/year",
    bedrooms: 2,
    bathrooms: 1,
    agent: { name: "Mr. David Gyang", avatar: "👨‍💼", rating: 4.7, phone: "+234 815 678 9012", company: "Jos Prime Properties" },
    location: "Terminus, Jos"
  },
  {
    type: "For Sale",
    title: "5 Bedroom Mansion",
    image: "🏰",
    price: 45000000,
    period: "",
    bedrooms: 5,
    bathrooms: 4,
    agent: { name: "Mrs. Grace Okoro", avatar: "👩‍💼", rating: 4.8, phone: "+234 814 567 8901", company: "Plateau Homes Ltd" },
    location: "Lamingo, Jos"
  },
  {
    type: "Hotel",
    title: "Hill Station Hotel",
    image: "🏨",
    price: 15000,
    period: "/night",
    bedrooms: 50,
    bathrooms: 50,
    agent: { name: "Mr. Samuel Pam", avatar: "👔", rating: 4.9, phone: "+234 816 789 0123", company: "Hill Station Hotel" },
    location: "Rayfield, Jos"
  },
  {
    type: "Hotel",
    title: "Plateau Suites",
    image: "🏩",
    price: 12000,
    period: "/night",
    bedrooms: 30,
    bathrooms: 30,
    agent: { name: "Mrs. Esther Musa", avatar: "👩‍💼", rating: 4.7, phone: "+234 817 890 1234", company: "Plateau Suites" },
    location: "Bukuru, Jos"
  },
  {
    type: "Hotel",
    title: "Jos Continental",
    image: "🏨",
    price: 20000,
    period: "/night",
    bedrooms: 80,
    bathrooms: 80,
    agent: { name: "Mr. Ibrahim Yakubu", avatar: "👨‍💼", rating: 4.8, phone: "+234 818 901 2345", company: "Jos Continental" },
    location: "Terminus, Jos"
  },
  {
    type: "For Rent",
    title: "Self Contain",
    image: "🏠",
    price: 150000,
    period: "/year",
    bedrooms: 1,
    bathrooms: 1,
    agent: { name: "Mr. David Gyang", avatar: "👨‍💼", rating: 4.7, phone: "+234 815 678 9012", company: "Jos Prime Properties" },
    location: "Angwan Rogo, Jos"
  },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Home & Properties</h1>
          <p className="text-gray-600">Find houses for rent, sale, and hotels in Jos</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property, idx) => (
            <motion.div
              key={property.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <div className="h-40 md:h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-6xl md:text-8xl">
                  {property.image}
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary-500 text-white rounded-full font-semibold">
                  {property.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{property.location}</span>
                </div>

                {property.type !== "Hotel" ? (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Hotel className="w-4 h-4" />
                      <span>{property.bedrooms} Rooms Available</span>
                    </div>
                  </div>
                )}

                <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                  ₦{property.price.toLocaleString()}{property.period}
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-2xl">
                      {property.agent.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{property.agent.name}</h4>
                      <p className="text-xs text-gray-600">{property.agent.company}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span>{property.agent.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">{property.agent.phone}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contact Agent
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
