import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadSection = () => {
  const [uploadMode, setUploadMode] = useState<'solo' | 'couple'>('solo');

  return (
    <section className="bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Photo Type Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Photo type to upload</h2>
          
          <div className="flex gap-4">
            <button
              onClick={() => setUploadMode('solo')}
              className={`flex items-center gap-2 px-2 py-2 rounded-xl flex-1 border transition-all ${
                uploadMode === 'solo'
                  ? 'bg-white shadow-lg border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
                  : 'bg-white border-gray-200'
              }`}
            >
              <img src="/soloicon.svg" alt="" className="w-6 h-6" />
              <span className={`font-bold text-sm ${
                uploadMode === 'solo' ? 'text-white' : 'text-gray-900'
              }`}>2 Solo Photos</span>
            </button>

            <button
              onClick={() => setUploadMode('couple')}
              className={`flex items-center gap-2 px-1 py-2 rounded-xl flex-1 border transition-all ${
                uploadMode === 'couple'
                  ? 'bg-white shadow-lg border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
                  : 'bg-white border-gray-200'
              }`}
            >
              <img src="/coupleicon.svg" alt="" className="w-6 h-6" />
              <span className={`font-bold text-sm ${
                uploadMode === 'couple' ? 'text-white' : 'text-gray-900'
              }`}>1 Couple Photo</span>
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 ">Upload Photos</h2>
          
          <div className="relative">
            {/* Gradient Border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-50" 
                 style={{ padding: '1px' }} />
            
            {/* Upload Zone */}
            <label 
              htmlFor="photo-upload"
              className="relative block bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 cursor-pointer"
            >
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                multiple={uploadMode === 'solo'}
              />
              
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">
                  {uploadMode === 'solo' 
                    ? 'Upload 2 solo photos' 
                    : 'Upload 1 couple photo'}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      {/* CSS for gradient border animation */}
      <style jsx>{`
        @keyframes borderAnimation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default UploadSection;