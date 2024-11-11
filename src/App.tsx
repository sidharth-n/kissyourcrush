import React from 'react';
import Hero from './components/Hero';
import ExamplesGallery from './components/ExamplesGallery';
import UploadSection from './components/UploadSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen ">
      <Hero />
      <ExamplesGallery />
      <UploadSection />
      <TrustSection />
      <Footer />
    </div>
  );
}

export default App;