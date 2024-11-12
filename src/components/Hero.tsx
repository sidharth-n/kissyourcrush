// Hero.tsx
import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onTryClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTryClick }) => {
  return (
    <motion.section 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-3"
    >
      <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-[40px]">
        <div 
          className="relative min-h-[450px] p-8 flex flex-col items-center justify-center overflow-hidden"
          style={{ borderRadius: '40px' }}
        >
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ borderRadius: '40px' }}
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>

          {/* Content Container with overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            {/* Logo Section */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 mb-16"
            >
              <img 
                src="/Kyclogo.png" 
                alt="KissYourCrush Logo" 
                className="h-12 object-contain"
              />
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center max-w-xl mx-auto mb-6"
            >
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 mt-44 leading-tight">
                Wanna kiss your
                <br />
                fantasy crush ?
              </h1>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-full max-w-md"
            >
              <motion.button 
                onClick={onTryClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black text-lg font-bold py-4 px-8 shadow-xl transition-all duration-300 hover:opacity-90"
                style={{ borderRadius: '24px' }}
              >
                Try It Free
              </motion.button>
              <p className="text-white/60 mt-4 text-xs font-thin text-center">
                Trial applicable for 1 output
              </p>
            </motion.div>
          </div>

          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 pointer-events-none" 
            style={{ borderRadius: '40px' }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;