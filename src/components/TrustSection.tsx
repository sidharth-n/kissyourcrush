import React from 'react';
import { Star } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {/* AI Accuracy */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
              95%
            </span>
            <span className="text-gray-900 text-sm">Ai Accuracy</span>
          </div>

          {/* Generation Speed */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
              &lt;500s
            </span>
            <span className="text-gray-900 text-sm text-center">Generation Speed</span>
          </div>

          {/* User Rating */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                4.2
              </span>
              <Star className="w-5 h-5 ml-1 text-orange-500" />
            </div>
            <span className="text-gray-900 text-sm">User Rating</span>
          </div>

          {/* Daily Users */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
              1K+
            </span>
            <span className="text-gray-900 text-sm">Daily Users</span>
          </div>
        </div>

        {/* Security Features */}
        <div className="space-y-12 bg-gray-50 rounded-xl px-6 py-12">
          {/* Private Processing */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src="/shield-tick.svg" 
                alt="" 
                className="w-8 h-8"
                style={{
                  filter: 'url(#pink-gradient)'
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                100% Private Processing
              </h3>
              <p className="text-gray-500 text-sm opacity-70">
                Your photos are processed securely and never stored
              </p>
            </div>
          </div>

          {/* Bank Level Security */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src="/lock.svg" 
                alt="" 
              className="w-8 h-8"
                style={{
                  filter: 'url(#pink-gradient)'
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Bank Level Security
              </h3>
              <p className="text-gray-500 text-sm opacity-70">
                 Enterprise-grade encryption for all uploads
              </p>
           
            </div>
          </div>

          {/* Instant Photo Deletion */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src="/trash.svg" 
                alt="" 
              className="w-8 h-8"
                style={{
                  filter: 'url(#pink-gradient)'
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Instant Photo Deletion
              </h3>
              <p className="text-gray-500 text-sm opacity-70">
                All photos are permanently deleted after processing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Filters for Icon Gradients */}
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
    </section>
  );
};

export default TrustSection;