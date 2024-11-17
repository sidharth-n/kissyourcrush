import React, { useState, useEffect, useCallback } from "react";
import { Upload, X, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fal } from "@fal-ai/client";
import { v4 as uuidv4 } from 'uuid';

// Configure fal client
fal.config({
  credentials: import.meta.env.VITE_FAL_KEY,
});

// Types
interface GenerationState {
  id: string;
  status: 'pending' | 'completed' | 'error';
  progress: string;
  videoUrl: string | null;
  timestamp: number;
  uploadMode: 'solo' | 'couple';
  images: {
    solo1?: string;
    solo2?: string;
    couple?: string;
    stitched?: string;
  };
}

const STORAGE_KEY = 'video_generation_state';
const NOTIFICATION_SOUND = '/notification.mp3';
const ESTIMATED_GENERATION_TIME = 400; // seconds

const UploadSection = () => {
  // State Management
  const [uploadMode, setUploadMode] = useState<'solo' | 'couple'>('solo');
  const [soloPhoto1, setSoloPhoto1] = useState<string | null>(null);
  const [soloPhoto2, setSoloPhoto2] = useState<string | null>(null);
  const [stitchedImage, setStitchedImage] = useState<string | null>(null);
  const [couplePhoto, setCouplePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationState>('default');
  const [showEstimatedTime, setShowEstimatedTime] = useState(false);
  
  // Initialize notification sound
  const notificationSound = new Audio(NOTIFICATION_SOUND);

  // Notification Management
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;
    
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const sendNotification = useCallback((title: string, body: string) => {
    if (Notification.permission === "granted") {
      try {
        const notification = new Notification(title, {
          body,
          icon: "/icon.png",
          badge: "/icon.png",
          vibrate: [200, 100, 200],
        });

        notificationSound.play().catch(console.error);
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    }
  }, []);

  // Local Storage Management
  const saveGenerationState = (state: GenerationState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving generation state:", error);
    }
  };

  const loadGenerationState = (): GenerationState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading generation state:", error);
      return null;
    }
  };

  // Video Download Handler
  const handleDownload = async () => {
    if (!generatedVideo) return;
    
    try {
      const response = await fetch(generatedVideo);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Failed to download video. Please try again.');
    }
  };

  // Video Share Handler
  const handleShare = async () => {
    if (!generatedVideo) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Generated Video',
          text: 'Check out this amazing video I created!',
          url: generatedVideo
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          await navigator.clipboard.writeText(generatedVideo);
          alert('Video URL copied to clipboard!');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(generatedVideo);
        alert('Video URL copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Failed to copy video URL. Please try again.');
      }
    }
  };

  // Image Processing
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

  // File Upload Handler
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'solo1' | 'solo2' | 'couple'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
  };

  // Clear Photo Handler
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
    localStorage.removeItem(STORAGE_KEY);
  };

  // Generation Status Polling
  const pollGenerationStatus = async (imageUrl: string, genId: string) => {
    try {
      const result = await fal.subscribe("fal-ai/minimax-video/image-to-video", {
        input: {
          prompt: "two people kissing each other",
          image_url: imageUrl,
          prompt_optimizer: true
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            const lastLog = update.logs[update.logs.length - 1]?.message;
            if (lastLog) {
              setProgress(lastLog);
              saveGenerationState({
                id: genId,
                status: 'pending',
                progress: lastLog,
                videoUrl: null,
                timestamp: Date.now(),
                uploadMode,
                images: {
                  solo1: soloPhoto1 || undefined,
                  solo2: soloPhoto2 || undefined,
                  couple: couplePhoto || undefined,
                  stitched: stitchedImage || undefined
                }
              });
            }
          }
        },
      });

      if (result.data.video?.url) {
        setGeneratedVideo(result.data.video.url);
        setProgress("");
        setLoading(false);
        setShowEstimatedTime(false);
        
        saveGenerationState({
          id: genId,
          status: 'completed',
          progress: '',
          videoUrl: result.data.video.url,
          timestamp: Date.now(),
          uploadMode,
          images: {
            solo1: soloPhoto1 || undefined,
            solo2: soloPhoto2 || undefined,
            couple: couplePhoto || undefined,
            stitched: stitchedImage || undefined
          }
        });

        sendNotification(
          '🎉 Video Generation Complete!',
          'Your video is ready to view. Click to check it out!'
        );
      }
    } catch (error) {
      console.error("Error during generation:", error);
      setProgress("Error generating video. Please try again.");
      setLoading(false);
      setShowEstimatedTime(false);
      
      saveGenerationState({
        id: genId,
        status: 'error',
        progress: 'Generation failed',
        videoUrl: null,
        timestamp: Date.now(),
        uploadMode,
        images: {
          solo1: soloPhoto1 || undefined,
          solo2: soloPhoto2 || undefined,
          couple: couplePhoto || undefined,
          stitched: stitchedImage || undefined
        }
      });
    }
  };

  // Generate Video Handler
  const handleGenerate = async () => {
    const imageToProcess = uploadMode === 'couple' ? couplePhoto : stitchedImage;
    if (!imageToProcess) return;

    await requestNotificationPermission();
    
    setLoading(true);
    setShowEstimatedTime(true);
    setProgress("Preparing for video generation...");
    
    const newGenerationId = uuidv4();
    setGenerationId(newGenerationId);

    try {
      const imageFile = await fetch(imageToProcess)
        .then(r => r.blob())
        .then(blob => new File([blob], "input.jpg", { type: "image/jpeg" }));
      
      const uploadedImageUrl = await fal.storage.upload(imageFile);
      
      setProgress("Video generation started - estimated time: ~7 minutes");
      
      saveGenerationState({
        id: newGenerationId,
        status: 'pending',
        progress: 'Generation started',
        videoUrl: null,
        timestamp: Date.now(),
        uploadMode,
        images: {
          solo1: soloPhoto1 || undefined,
          solo2: soloPhoto2 || undefined,
          couple: couplePhoto || undefined,
          stitched: stitchedImage || undefined
        }
      });

      pollGenerationStatus(uploadedImageUrl, newGenerationId);
    } catch (error) {
      console.error("Error initiating generation:", error);
      setProgress("Failed to start video generation. Please try again.");
      setLoading(false);
      setShowEstimatedTime(false);
    }
  };

  // Effect for image stitching
  useEffect(() => {
    if (soloPhoto1 && soloPhoto2) {
      stitchImages(soloPhoto1, soloPhoto2);
    }
  }, [soloPhoto1, soloPhoto2]);

  // Effect for restoring state on mount
  useEffect(() => {
    const savedState = loadGenerationState();
    if (savedState && savedState.status === 'pending') {
      setGenerationId(savedState.id);
      setLoading(true);
      setProgress(savedState.progress);
      setUploadMode(savedState.uploadMode);
      setShowEstimatedTime(true);
      
      if (savedState.images) {
        if (savedState.uploadMode === 'solo') {
          setSoloPhoto1(savedState.images.solo1 || null);
          setSoloPhoto2(savedState.images.solo2 || null);
          setStitchedImage(savedState.images.stitched || null);
        } else {
          setCouplePhoto(savedState.images.couple || null);
        }
      }

      // Resume polling if generation was in progress
      if (savedState.id) {
        pollGenerationStatus(savedState.id, savedState.id);
      }
    }
  }, []);

  const isGenerateEnabled = uploadMode === 'couple' 
    ? couplePhoto !== null 
    : stitchedImage !== null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-50 pt-16 pb-8 px-6 rounded-3xl"
    >
      <div className="max-w-xl mx-auto">
        {/* Upload Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Choose Upload Type</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUploadMode('solo')}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 ${
                uploadMode === 'solo'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Upload className="w-5 h-5" />
              Solo Photos
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUploadMode('couple')}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 ${
                uploadMode === 'couple'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Upload className="w-5 h-5" />
              Couple Photo
            </motion.button>
          </div>
        </motion.div>

{/* Photo Upload Section */}
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
                { state: soloPhoto1, id: 'solo1', label: 'First Person' },
                { state: soloPhoto2, id: 'solo2', label: 'Second Person' }
              ].map((photo) => (
                <motion.div 
                  key={photo.id}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <label
                    htmlFor={photo.id}
                    className="block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
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
                            alt={photo.label} 
                            className="w-full h-[200px] object-cover"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              clearPhoto(photo.id as 'solo1' | 'solo2');
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center p-8 h-[200px]"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-500 text-center text-sm">
                            Upload {photo.label}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </motion.div>
              ))}

              {/* Stitched Preview */}
              {stitchedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 mt-4"
                >
                  <h3 className="text-lg font-semibold mb-3">Preview</h3>
                  <div className="rounded-2xl overflow-hidden bg-white shadow">
                    <img 
                      src={stitchedImage} 
                      alt="Combined preview" 
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
                <label
                  htmlFor="couple"
                  className="block bg-white rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden"
                >
                  <input
                    type="file"
                    id="couple"
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
                          className="w-full h-[300px] object-cover"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            clearPhoto('couple');
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-8 h-[300px]"
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

        {/* Generation Button */}
        <motion.button
          onClick={handleGenerate}
          disabled={!isGenerateEnabled || loading}
          whileHover={isGenerateEnabled ? { scale: 1.02 } : undefined}
          whileTap={isGenerateEnabled ? { scale: 0.98 } : undefined}
          className={`w-full py-4 rounded-full font-semibold text-white transition-all ${
            isGenerateEnabled && !loading
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {progress || "Generating..."}
            </div>
          ) : (
            "Generate Video"
          )}
        </motion.button>

        {/* Estimated Time Message */}
        <AnimatePresence>
          {showEstimatedTime && loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-blue-50 rounded-xl"
            >
              <p className="text-blue-800 text-sm">
                Video generation takes approximately 7 minutes. Feel free to take a break - 
                we'll send you a notification when it's ready! ☕️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Player and Controls */}
        <AnimatePresence>
          {generatedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
                <video
                  src={generatedVideo}
                  controls
                  className="w-full aspect-video"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Download and Share buttons */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {progress && !loading && progress.includes("Error") && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-red-500 text-sm text-center"
            >
              {progress}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default UploadSection;