import React, { useState, useRef, useEffect, RefObject } from 'react';
import { Play } from 'lucide-react';

// Define type for example items
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

  // Set initial scroll position to show second item
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const itemWidth = scrollContainer.querySelector<HTMLDivElement>('.gallery-item')?.offsetWidth ?? 0;
      scrollContainer.scrollLeft = itemWidth - 40; // Adjust for the padding
    }
  }, []);

  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold px-6 mb-4">
          Watch the Magic
        </h2>

        <div className="relative">
          {/* Gallery Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto hide-scrollbar px-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Add initial padding div to allow first item to be fully visible */}
            <div className="flex-none w-[20px]" />
            
            {examples.map((example, index) => (
              <div
                key={example.id}
                className="gallery-item flex-none w-[280px] px-2"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img
                    src={example.image}
                    alt={`Example ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add final padding div to allow last item to be fully visible */}
            <div className="flex-none w-[20px]" />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {examples.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-deep-pink w-4' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
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
    </section>
  );
};

export default ExamplesGallery;
