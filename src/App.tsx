// App.tsx
import React, { useRef } from "react"
import Hero from "./components/Hero"
import ExamplesGallery from "./components/ExamplesGallery"
import UploadSection from "./components/UploadSection"
import TrustSection from "./components/TrustSection"
import Footer from "./components/Footer"
import { motion } from "framer-motion"

function App() {
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Hero onTryClick={scrollToUpload} />
      <ExamplesGallery />
      <div ref={uploadSectionRef}>
        <UploadSection />
      </div>
      <TrustSection />
      <Footer />
    </motion.div>
  )
}

export default App