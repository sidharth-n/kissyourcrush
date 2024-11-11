import React from 'react';
import { Shield, Lock, Trash2, Star } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-light-purple bg-opacity-30 p-8 rounded-2xl">
            <h3 className="font-playfair text-2xl mb-6">Trust & Safety</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-deep-pink mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">
                    100% Private Processing
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your photos are processed securely and never stored
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Lock className="w-6 h-6 text-deep-pink mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">
                    Bank-Level Security
                  </h4>
                  <p className="text-sm text-gray-600">
                    Enterprise-grade encryption for all uploads
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Trash2 className="w-6 h-6 text-deep-pink mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">
                    Instant Photo Deletion
                  </h4>
                  <p className="text-sm text-gray-600">
                    All photos are permanently deleted after processing
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light-purple bg-opacity-30 p-8 rounded-2xl">
            <h3 className="font-playfair text-2xl mb-6">Quality Markers</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-pink mb-1">95%</div>
                <div className="text-sm text-gray-600">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-pink mb-1">&lt;30s</div>
                <div className="text-sm text-gray-600">Generation Speed</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-3xl font-bold text-deep-pink mb-1">
                  4.9
                  <Star className="w-5 h-5 ml-1" />
                </div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-pink mb-1">10K+</div>
                <div className="text-sm text-gray-600">Daily Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;