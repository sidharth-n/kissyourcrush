import React from 'react';
import { Heart, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className=" flex flex-col items-center justify-center px-4 py-16 text-white text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 mx-auto mb-4 text-rose-gold animate-pulse" />
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4">
            KissYourCrush
          </h1>
          <p className="font-poppins text-xl md:text-2xl mb-6">
            Make Your Fantasy Kiss Come True
          </p>
          <p className="text-lg opacity-90 mb-8">
            World's Most Advanced AI Kiss Generator
          </p>
        </div>

        <button className="font-montserrat bg-rose-gold hover:bg-opacity-90 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
          Kiss somebody now
        </button>

        <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold">95%</p>
            <p className="text-sm opacity-75">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">10K+</p>
            <p className="text-sm opacity-75">Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm opacity-75">Private</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;