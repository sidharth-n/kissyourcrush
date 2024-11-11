import React from "react"
import { Heart, Star } from "lucide-react"

const Hero = () => {
  return (
    <section className="p-4">
      <div className="bg-gradient-to-b from-soft-pink via-deep-pink to-deep-purple rounded-[15px] h-[500px] flex flex-col items-center justify-center px-4 py-0 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto mb-4 text-rose-gold " />
            <h1 className="font-playfair text-4xl md:text-7xl font-bold mb-2">
              KissYourCrush
            </h1>
            <p className="font-poppins text-l md:text-2xl mb-6">
              Make Your Fantasy Kisses Come True
            </p>
          </div>

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
          <button className="font-montserrat bg-rose-gold hover:bg-opacity-90 text-white mt-16 px-12 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all">
            Kiss somebody now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
