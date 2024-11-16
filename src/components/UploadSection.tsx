import React, { useState, useEffect } from "react"
import { Upload, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fal } from "@fal-ai/client"

// Configure fal client
fal.config({
  credentials: import.meta.env.VITE_FAL_KEY
});



const UploadSection = () => {
  const [uploadMode, setUploadMode] = useState<'solo' | 'couple'>('solo');
  const [soloPhoto1, setSoloPhoto1] = useState<string | null>(null);
  const [soloPhoto2, setSoloPhoto2] = useState<string | null>(null);
  const [stitchedImage, setStitchedImage] = useState<string | null>(null);
  const [couplePhoto, setCouplePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  // Stitch images when both solo photos are uploaded
  useEffect(() => {
    if (soloPhoto1 && soloPhoto2) {
      stitchImages(soloPhoto1, soloPhoto2);
    }
  }, [soloPhoto1, soloPhoto2]);

  const stitchImages = (img1Src: string, img2Src: string) => {
    const img1 = new Image();
    const img2 = new Image();

    img1.onload = () => {
      img2.src = img2Src;
    };

    img2.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const maxHeight = Math.max(img1.height, img2.height);
      canvas.width = img1.width + img2.width;
      canvas.height = maxHeight;

      ctx.drawImage(img1, 0, 0);
      ctx.drawImage(img2, img1.width, 0);

      setStitchedImage(canvas.toDataURL('image/jpeg'));
    };

    img1.src = img1Src;
  };

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
    setGeneratedVideo(null);
    setProgress("");
    setStitchedImage(null);
  };

  const handleGenerate = async () => {
    const imageToProcess = uploadMode === 'couple' ? couplePhoto : stitchedImage;
    if (!imageToProcess) return;

    setLoading(true);
    setProgress("Uploading image...");

    try {
      const imageFile = await fetch(imageToProcess)
        .then(r => r.blob())
        .then(blob => new File([blob], "input.jpg", { type: "image/jpeg" }));
      
      const uploadedImageUrl = await fal.storage.upload(imageFile);
      
      setProgress("Generating video...");
      
      const result = await fal.subscribe("fal-ai/minimax-video/image-to-video", {
        input: {
          prompt: "two people kissing each other",
          image_url: uploadedImageUrl,
          prompt_optimizer: true
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            const lastLog = update.logs[update.logs.length - 1]?.message;
            if (lastLog) setProgress(lastLog);
          }
        },
      });

      if (result.data.video?.url) {
        setGeneratedVideo(result.data.video.url);
        setProgress("");
      }
    } catch (error) {
      console.error("Error generating video:", error);
      setProgress("Error generating video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isGenerateEnabled = uploadMode === 'couple' 
    ? couplePhoto !== null 
    : stitchedImage !== null;

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
              onClick={() => setUploadMode('solo')}
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
              onClick={() => setUploadMode('couple')}
              className={`relative flex items-center gap-2 px-2 py-2 rounded-xl flex-1 ${
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
          {uploadMode === 'solo' ? (
            <motion.div
              key="solo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              {/* Solo Photo Uploads */}
              {[
                { state: soloPhoto1, setState: setSoloPhoto1, id: 'solo1', label: 'first' },
                { state: soloPhoto2, setState: setSoloPhoto2, id: 'solo2', label: 'second' }
              ].map((photo, index) => (
                <motion.div 
                  key={photo.id}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-[1px] rounded-2xl opacity-80" />
                  <label
                    htmlFor={photo.id}
                    className="relative block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
                  >
                    <input
                      type="file"
                      id={photo.id}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, photo.id as 'solo1' | 'solo2')}
                    />
                    <AnimatePresence mode="wait">
                      {photo.state ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative"
                        >
                          <img 
                            src={photo.state} 
                            alt={`Person ${index + 1}`} 
                            className="w-full h-[200px] object-cover"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              clearPhoto(photo.id as 'solo1' | 'solo2');
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
                            Upload {photo.label} photo
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </motion.div>
              ))}

              {/* Stitched Image Preview */}
              {stitchedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 mt-4"
                >
                  <h3 className="text-lg font-semibold mb-3">Stitched Preview</h3>
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src={stitchedImage} 
                      alt="Stitched preview" 
                      className="w-full object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="couple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              {/* Couple Photo Upload */}
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
            </motion.div>
          )}
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
                  {progress || "Generating..."}
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

        {/* Generated Video Player */}
        <AnimatePresence>
          {generatedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <video
                  src={generatedVideo}
                  controls
                  className="w-full aspect-video"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Messages */}
        <AnimatePresence>
          {progress && !loading && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-orange-500 text-center mt-4"
            >
              {progress}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient border styles */}
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