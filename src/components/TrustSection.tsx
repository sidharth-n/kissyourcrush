// TrustSection.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  // Smoother animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother motion
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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
      transition={{ duration: 1.5 }}
      viewport={{ once: true, margin: "-20%" }}
      className="bg-white py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          className="grid grid-cols-2 gap-4 mb-12"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center transform-gpu"
            >
              <motion.div 
                className="flex items-center"
                variants={textVariants}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                {stat.showStar && (
                  <motion.div
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Star className="w-5 h-5 ml-1 text-orange-500" />
                  </motion.div>
                )}
              </motion.div>
              <motion.span 
                variants={textVariants}
                className="text-gray-900 text-sm text-center mt-2"
              >
                {stat.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          className="space-y-12 bg-gray-50 rounded-xl px-6 py-12"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                x: 5,
                transition: { duration: 0.3 }
              }}
              className="flex items-start gap-4 transform-gpu"
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ 
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.img 
                  src={`/${feature.icon}`} 
                  alt="" 
                  className="w-8 h-8"
                  style={{
                    filter: 'url(#pink-gradient)'
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </motion.div>
              <div>
                <motion.h3 
                  variants={textVariants}
                  className="text-base font-bold text-gray-900 mb-2"
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  variants={textVariants}
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