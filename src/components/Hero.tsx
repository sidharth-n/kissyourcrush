import React from "react";

const Hero = () => {
  return (
    <section className="p-3 ">
      <div className="w-full max-w-3xl mx-auto overflow-hidden  rounded-[40px]">
        <div 
          className="relative min-h-[450px] p-8 flex flex-col items-center justify-center overflow-hidden"
          style={{
            borderRadius: '40px',
          }}
        >
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{
              borderRadius: '40px',
            }}
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>

          {/* Content Container with overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-16">
              <img 
                src="/Kyclogo.png" 
                alt="KissYourCrush Logo" 
                className="h-12 object-contain"
              />
            </div>

            {/* Main Content */}
            <div className="text-center max-w-xl mx-auto mb-6">
              <h1 
                className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 mt-44 leading-tight"
              >
                Wanna kiss your
                <br />
                fantasy crush ?
              </h1>
            </div>

            {/* CTA Button */}
            <div className="w-full max-w-md">
              <button 
                className="w-full bg-white text-black text-lg font-bold py-4 px-8 shadow-xl transition-all duration-300 hover:opacity-90"
                style={{
                  borderRadius: '24px',
                }}
              >
                Try It Free
              </button>
            </div>

            {/* Trial Text */}
            <p className="text-white/60 mt-4 text-xs font-thin">
              Trial applicable for 1 output
            </p>
          </div>

          {/* Dark Overlay for better text visibility */}
          <div 
            className="absolute inset-0 bg-black/40 pointer-events-none" 
            style={{ 
              borderRadius: '40px',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero
