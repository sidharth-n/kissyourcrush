import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const UploadSection = () => {
  const [uploadMode, setUploadMode] = useState<'couple' | 'solo'>('couple');
  const [files, setFiles] = useState<File[]>([]);
  const [stitchedImage, setStitchedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (uploadMode === 'couple') {
      setFiles(newFiles.slice(0, 1));
    } else if (uploadMode === 'solo' && newFiles.length > 0) {
      if (files.length === 0) {
        setFiles([newFiles[0]]);
      } else {
        // Stitch the second image with the first
        stitchImages(files[0], newFiles[0]);
      }
    }
  };

  const stitchImages = (file1: File, file2: File) => {
    const img1 = new Image();
    const img2 = new Image();

    img1.src = URL.createObjectURL(file1);
    img2.src = URL.createObjectURL(file2);

    img1.onload = () => {
      img2.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const targetHeight = 300; // Setting a target height for consistent preview size
        const img1AspectRatio = img1.width / img1.height;
        const img2AspectRatio = img2.width / img2.height;

        const img1Width = targetHeight * img1AspectRatio;
        const img2Width = targetHeight * img2AspectRatio;

        canvas.width = img1Width + img2Width;
        canvas.height = targetHeight;

        ctx?.drawImage(img1, 0, 0, img1Width, targetHeight);
        ctx?.drawImage(img2, img1Width, 0, img2Width, targetHeight);

        setStitchedImage(canvas.toDataURL('image/jpeg'));
        setFiles([file1, file2]);
      };
    };
  };

  const handleClearFile = () => {
    setFiles([]);
    setStitchedImage(null);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Video generation complete! Video will appear here.');
      // Placeholder for video preview or additional actions
    }, 5000);
  };

  return (
    <section className="bg-light-purple py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Upload Mode Selection */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setUploadMode('couple');
                handleClearFile();
              }}
              className={`flex-1 py-3 rounded-full font-montserrat ${
                uploadMode === 'couple'
                  ? 'bg-deep-pink text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Couple Photo
            </button>
            <button
              onClick={() => {
                setUploadMode('solo');
                handleClearFile();
              }}
              className={`flex-1 py-3 rounded-full font-montserrat ${
                uploadMode === 'solo'
                  ? 'bg-deep-pink text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Solo Photos
            </button>
          </div>

          {/* Upload Section */}
          <div className="dropzone rounded-lg p-8 text-center bg-gray-50">
            <input
              type="file"
              accept="image/*"
              multiple={uploadMode === 'solo'}
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              disabled={uploadMode === 'couple' ? files.length >= 1 : files.length >= 2}
            />
            <label
              htmlFor="fileInput"
              className={`block cursor-pointer ${
                files.length >= (uploadMode === 'couple' ? 1 : 2) ? 'opacity-50' : ''
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-deep-pink" />
              <p className="text-lg mb-2">
                {uploadMode === 'couple'
                  ? 'Click to select your couple photo'
                  : files.length === 0
                  ? 'Click to upload first photo'
                  : 'Click to upload second photo'}
              </p>
            </label>
          </div>

          {/* Preview Section */}
          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="font-playfair text-xl mb-4">Preview</h3>
              <div className="relative">
                {uploadMode === 'couple' && files.length > 0 && (
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt="Couple Photo Preview"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                )}
                {uploadMode === 'solo' && stitchedImage && (
                  <img
                    src={stitchedImage}
                    alt="Stitched Photo Preview"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                )}
                <button
                  onClick={handleClearFile}
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                >
                  <X className="w-5 h-5 text-deep-pink" />
                </button>
              </div>
              <button
                onClick={handleGenerate}
                className={`w-full mt-6 bg-deep-pink text-white py-4 rounded-full font-montserrat font-semibold hover:bg-opacity-90 transition-colors ${
                  loading ||
                  (uploadMode === 'couple' && files.length < 1) ||
                  (uploadMode === 'solo' && !stitchedImage)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={
                  loading ||
                  (uploadMode === 'couple' && files.length < 1) ||
                  (uploadMode === 'solo' && !stitchedImage)
                }
              >
                {loading ? 'Generating...' : 'Generate Video'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
