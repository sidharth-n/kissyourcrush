import React, { useState, useRef, useEffect, RefObject } from 'react';
import { motion } from 'framer-motion';

interface ExampleItem {
  id: number;
  video: string;
}

const examples: ExampleItem[] = [
  { id: 1, video: "/demo/sample_video1.mp4" },
  { id: 2, video: "/demo/sample_video2.mp4" },
  { id: 3, video: "/demo/sample_video4.mp4" },
  { id: 4, video: "/demo/sample_video5.mp4" },
  { id: 5, video: "/demo/sample_video6.mp4" }, 
  { id: 6, video: "/demo/sample_video3.mp4" }
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
      transition={{ delay: 1, duration: 1 }}
      viewport={{ once: true }}
      className="bg-white py-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
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
                  className="relative rounded-2xl overflow-hidden aspect-video bg-black"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={example.video} type="video/mp4" />
                  </video>
                </motion.div>
              </motion.div>
            ))}
            
            <div className="flex-none w-[20px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
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