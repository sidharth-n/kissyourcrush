import React, { useState } from "react"
import { Upload, X } from "lucide-react"

const UploadSection = () => {
  const [uploadMode, setUploadMode] = useState<'solo' | 'couple'>('solo');
  const [soloPhoto1, setSoloPhoto1] = useState<string | null>(null);
  const [soloPhoto2, setSoloPhoto2] = useState<string | null>(null);
  const [couplePhoto, setCouplePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      alert('Video generated successfully!');
    }, 2000);
  };

  return (
    <section className="bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Photo Type Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Photo type to upload</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleModeChange('solo')}
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
              onClick={() => handleModeChange('couple')}
              className={`flex items-center gap-2 px-2 py-2 rounded-xl flex-1 border transition-all ${
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
          <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
          
          {uploadMode === 'solo' ? (
            // Solo Photos Upload
            <div className="grid grid-cols-2 gap-4">
              {/* First Solo Photo */}
              <div className="relative">
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
                  {soloPhoto1 ? (
                    <div className="relative">
                      <img 
                        src={soloPhoto1} 
                        alt="First person" 
                        className="w-full h-[200px] object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          clearPhoto('solo1');
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center text-sm">
                        Upload first photo
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {/* Second Solo Photo */}
              <div className="relative">
                <div className="absolute -inset-[1px] rounded-2xl  opacity-80" />
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
                  {soloPhoto2 ? (
                    <div className="relative">
                      <img 
                        src={soloPhoto2} 
                        alt="Second person" 
                        className="w-full h-[200px] object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          clearPhoto('solo2');
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center text-sm">
                        Upload second photo
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          ) : (
            // Couple Photo Upload
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-2xl  opacity-80" />
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
                {couplePhoto ? (
                  <div className="relative">
                    <img 
                      src={couplePhoto} 
                      alt="Couple" 
                      className="w-full h-[200px] object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        clearPhoto('couple');
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-center text-sm">
                      Upload couple photo
                    </p>
                  </div>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!isGenerateEnabled || loading}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            isGenerateEnabled
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </section>
  )
}

export default UploadSection;