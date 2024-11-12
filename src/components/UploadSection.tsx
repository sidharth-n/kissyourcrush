// UploadSection.tsx
import React, { useState } from "react"
import { Upload, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const UploadSection = () => {
  const [uploadMode, setUploadMode] = useState<'solo' | 'couple'>('solo');
  const [soloPhoto1, setSoloPhoto1] = useState<string | null>(null);
  const [soloPhoto2, setSoloPhoto2] = useState<string | null>(null);
  const [couplePhoto, setCouplePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Existing handlers remain the same
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    target: 'solo1' | 'solo2' | 'couple'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        switch (target) {
          case 'solo1':
            setSoloPhoto1(imageUrl);
            break;
          case 'solo2':
            setSoloPhoto2(imageUrl);
            break;
          case 'couple':
            setCouplePhoto(imageUrl);
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = (target: 'solo1' | 'solo2' | 'couple') => {
    switch (target) {
      case 'solo1':
        setSoloPhoto1(null);
        break;
      case 'solo2':
        setSoloPhoto2(null);
        break;
      case 'couple':
        setCouplePhoto(null);
        break;
    }
  };

  const handleModeChange = (mode: 'solo' | 'couple') => {
    setUploadMode(mode);
    setSoloPhoto1(null);
    setSoloPhoto2(null);
    setCouplePhoto(null);
  };

  const isGenerateEnabled = uploadMode === 'solo' 
    ? soloPhoto1 && soloPhoto2 
    : couplePhoto;

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Video generated successfully!');
    }, 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}
      className="bg-gray-50 pt-16 pb-8 px-6 rounded-3xl"
    >
      <div className="max-w-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration:1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-6">Photo type to upload</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeChange('solo')}
              className={`relative flex items-center gap-2 px-2 py-3 rounded-xl flex-1 ${
                uploadMode === 'solo'
                  ? 'gradient-border-active'
                  : 'bg-gray-100 border border-gray-200'
              }`}
            >
              <img src="/soloicon.svg" alt="" className="w-6 h-6" />
              <span className="font-semibold text-sm">2 Solo Photos</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeChange('couple')}
              className={`relative flex items-center gap-2 px-2 py-2 rounded-xl  flex-1 ${
                uploadMode === 'couple'
                  ? 'gradient-border-active'
                  : 'bg-gray-100 border border-gray-200'
              }`}
            >
              <img src="/coupleicon.svg" alt="" className="w-6 h-6" />
              <span className="font-semibold text-sm">1 Couple Photo</span>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={uploadMode}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration:1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">Upload Photos</h2>
            
            {uploadMode === 'solo' ? (
              <div className="grid grid-cols-2 gap-6">
                {/* First Solo Photo */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r opacity-80" />
                  <label
                    htmlFor="solo-photo-1"
                    className="relative block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
                  >
                    <input
                      type="file"
                      id="solo-photo-1"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'solo1')}
                    />
                    <AnimatePresence mode="wait">
                      {soloPhoto1 ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative"
                        >
                          <img 
                            src={soloPhoto1} 
                            alt="First person" 
                            className="w-full h-[200px] object-cover"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              clearPhoto('solo1');
                            }}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center p-8 min-h-[200px]"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-500 text-center text-sm">
                            Upload first photo
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </motion.div>

                {/* Second Solo Photo */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-[1px] rounded-2xl opacity-80" />
                  <label
                    htmlFor="solo-photo-2"
                    className="relative block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
                  >
                    <input
                      type="file"
                      id="solo-photo-2"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'solo2')}
                    />
                    <AnimatePresence mode="wait">
                      {soloPhoto2 ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative"
                        >
                          <img 
                            src={soloPhoto2} 
                            alt="Second person" 
                            className="w-full h-[200px] object-cover"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              clearPhoto('solo2');
                            }}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center p-8 min-h-[200px]"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-500 text-center text-sm">
                            Upload second photo
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </motion.div>
              </div>
            ) : (
              // Couple Photo Upload
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl opacity-80" />
                <label
                  htmlFor="couple-photo"
                  className="relative block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
                >
                  <input
                    type="file"
                    id="couple-photo"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'couple')}
                  />
                  <AnimatePresence mode="wait">
                    {couplePhoto ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative"
                      >
                        <img 
                          src={couplePhoto} 
                          alt="Couple" 
                          className="w-full h-[200px] object-cover"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            clearPhoto('couple');
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-8 min-h-[200px]"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center text-sm">
                          Upload couple photo
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </label>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <motion.button
            onClick={handleGenerate}
            disabled={!isGenerateEnabled || loading}
            whileHover={{ scale: isGenerateEnabled ? 1.02 : 1 }}
            whileTap={{ scale: isGenerateEnabled ? 0.98 : 1 }}
            className={`w-full py-4 rounded-full font-bold text-white transition-all ${
              isGenerateEnabled
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Generate Video
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {!loading && isGenerateEnabled && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-green-500 text-center mt-4"
            >
              All set! Click generate to create your video
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Add gradient border styles */}
   <style jsx>{`
        .gradient-border-active {
          background: white;
          position: relative;
          z-index: 0;
        }
        
        .gradient-border-active::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset: -2.5px;
          background: linear-gradient(90deg, #EC4899, #F97316);
          border-radius: 20px;
        }
        
        .gradient-border-active::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          background: white;
          border-radius: 20px;
        }
      `}</style>
    </motion.section>
  );
};

export default UploadSection;