import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const examples = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1522098635833-216c03d81fbe?w=800",
    after: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800",
    after: "https://images.unsplash.com/photo-1622495966027-e0173192c728?w=800",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    after: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?w=800",
  },
];

const ExamplesGallery = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12">
          See The Magic In Action
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-6 snap-x">
          {examples.map((example) => (
            <div
              key={example.id}
              className="flex-none w-80 snap-center card-hover"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={example.before}
                  alt="Before"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
               
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="font-montserrat inline-flex items-center bg-deep-pink text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors">
            Create Your Own
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ExamplesGallery;