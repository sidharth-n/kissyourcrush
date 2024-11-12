// TrustSection.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98] // Custom easing for smoother animation
      }
    }
  };

  const statsData = [
    { value: "95%", label: "Ai Accuracy" },
    { value: "<500s", label: "Generation Speed" },
    { value: "4.2", label: "User Rating", showStar: true },
    { value: "1K+", label: "Daily Users" }
  ];

  const securityFeatures = [
    {
      icon: "shield-tick.svg",
      title: "100% Private Processing",
      description: "Your photos are processed securely and never stored"
    },
    {
      icon: "lock.svg",
      title: "Bank Level Security",
      description: "Enterprise-grade encryption for all uploads"
    },
    {
      icon: "trash.svg",
      title: "Instant Photo Deletion",
      description: "All photos are permanently deleted after processing"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 mb-12"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center"
            >
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                {stat.showStar && <Star className="w-5 h-5 ml-1 text-orange-500" />}
              </div>
              <span className="text-gray-900 text-sm text-center mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 bg-gray-50 rounded-xl px-6 py-12"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-4"
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ rotate: 5 }}
              >
                <img 
                  src={`/${feature.icon}`} 
                  alt="" 
                  className="w-8 h-8"
                  style={{
                    filter: 'url(#pink-gradient)'
                  }}
                />
              </motion.div>
              <div>
                <motion.h3 
                  className="text-base font-bold text-gray-900 mb-2"
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-500 text-sm opacity-70"
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SVG Filters */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <filter id="pink-gradient-filter">
          <feFlood floodColor="url(#pink-gradient)" result="flood" />
          <feComposite operator="in" in="flood" in2="SourceGraphic" />
          <feBlend mode="normal" in2="SourceGraphic" />
        </filter>
      </svg>
    </motion.section>
  );
};

export default TrustSection;