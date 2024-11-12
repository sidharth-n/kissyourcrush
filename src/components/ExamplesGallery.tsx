// ExamplesGallery.tsx
import React, { useState, useRef, useEffect, RefObject } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExampleItem {
  id: number;
  image: string;
}

const examples: ExampleItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1622495966027-e0173192c728?w=800",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?w=800",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1622495966027-e0173192c728?w=800",
  }
];

const ExamplesGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = scrollContainer.querySelector<HTMLDivElement>('.gallery-item')?.offsetWidth ?? 0;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const itemWidth = scrollContainer.querySelector<HTMLDivElement>('.gallery-item')?.offsetWidth ?? 0;
      scrollContainer.scrollLeft = itemWidth - 40;
    }
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      viewport={{ once: true }}
      className="bg-white py-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
          viewport={{ once: true }}
          className="text-xl font-bold px-4 mb-4"
        >
          Watch the Magic
        </motion.h2>

        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto hide-scrollbar px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex-none w-[20px]" />
            
            {examples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
              
                viewport={{ once: true }}
                className="gallery-item flex-none w-[280px] px-2 snap-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative rounded-2xl overflow-hidden aspect-video"
                >
                  <img
                    src={example.image}
                    alt={`Example ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            <div className="flex-none w-[20px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-2 mt-6"
          >
            {examples.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-deep-pink w-4' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
};

export default ExamplesGallery;