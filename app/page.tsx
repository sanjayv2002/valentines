'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // "Runaway" button state
  const [noPos, setNoPos] = useState({ top: "auto", left: "auto", position: "static" });

  useEffect(() => {
    // Attempt autoplay on mount
    if (audioRef.current) {
        audioRef.current.volume = 0.5; 
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
             playPromise.catch(error => {
                 console.log("Autoplay prevented:", error);
             });
        }
    }

    const handleInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        }
        ['click', 'touchstart', 'keydown'].forEach(event => 
            document.removeEventListener(event, handleInteraction)
        );
    };

    ['click', 'touchstart', 'keydown'].forEach(event => 
        document.addEventListener(event, handleInteraction)
    );

    return () => {
        ['click', 'touchstart', 'keydown'].forEach(event => 
            document.removeEventListener(event, handleInteraction)
        );
    };
  }, []);

  useEffect(() => {
     if (audioRef.current) {
         audioRef.current.muted = isMuted;
     }
  }, [isMuted]);

  useEffect(() => {
    // Check if mobile for specific logic adjustments
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNoInteraction = () => {
    setNoCount(noCount + 1);
    
    // Calculate random position within the viewport
    if (typeof window !== 'undefined') {
      // More aggressive padding for mobile to prevent off-screen buttons
      const padding = isMobile ? 40 : 150; 
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - padding * 2) + padding;
      
      setNoPos({
        top: `${y}px`,
        left: `${x}px`,
        position: "fixed" 
      } as any);
    }
  };

  const getNoText = () => {
    const phrases = [
      "No", "Are you sure?", "Really?", "Think again!", "Last chance!", 
      "Surely not?", "You might regret this!", "Give it another thought!", 
      "Are you absolutely certain?", "This could be a mistake!", "Have a heart!", 
      "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?", 
      "Is that your final answer?", "You're breaking my heart :("
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <main className="relative flex flex-col items-center justify-start md:justify-center min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-50 via-white to-rose-100 font-[var(--font-poppins)] selection:bg-rose-100 py-20 md:py-0 touch-none">
      
      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop autoPlay />
      
      {/* Mute/Unmute Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/80 transition-all text-2xl"
        aria-label="Toggle sound"
      >
        {isMuted ? "🔇" : "🎵"}
      </button>

      {/* Soft Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-pink-200/30 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-rose-200/30 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <video 
        src="/sparkle_heart.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none z-0" 
      />

      <AnimatePresence mode="wait">
        {yesPressed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            {/* Cute Couple Video */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-6 relative w-full max-w-xs md:max-w-md"
            >
               <video 
                 src="/cute_couple.mp4" 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/50"
               />
               <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-4xl md:text-6xl animate-bounce delay-75">💖</div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-[var(--font-great-vibes)] text-5xl md:text-8xl text-rose-500 mb-4"
            >
              Yay!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-rose-800/90 font-normal leading-relaxed w-full max-w-[90vw] md:max-w-2xl mx-auto drop-shadow-sm px-4"
            >
               Hey there, one of the most important person of my life. We have been through love and hatered, fights and supporting eachother. I love you from the bottom of my heart. Everything we talk about, every update, every call makes us more US. I just am grateful to god everyday that I get a second chance with you to prove that I'm here to stay. I am you ride or die. I love you. I hope this bought a smile of your face. ✨
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center text-center px-4 w-full max-w-2xl"
          >
            {/* Cute Bear Video */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="mb-6 md:mb-8 relative w-[70%] max-w-[250px]"
            >
              <video 
                src="/cute_bear.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto rounded-3xl shadow-xl border-4 border-white/50"
              />
            </motion.div>

            <h1 className="font-[var(--font-great-vibes)] text-4xl md:text-7xl text-rose-600 mb-8 md:mb-12 drop-shadow-sm leading-tight px-2">
              Will you be my Valentine?
            </h1>

            {/* Button Container */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full relative h-32 md:h-24">
              {/* YES BUTTON */}
              <motion.button
                layout
                className={`bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-md shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] transition-all flex items-center justify-center gap-2 z-20 ${
                  noCount >= 12
                    ? "fixed inset-0 w-full h-full text-7xl md:text-9xl z-[100]" // Full screen giant mode
                    : "px-10 py-4 md:px-20 md:py-8 text-xl md:text-3xl min-w-[200px] md:min-w-[240px]" // Responsive padding & size
                }`}
                whileHover={noCount < 12 ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                style={noCount < 12 ? {
                  scale: 1 + noCount * 0.2, // Smoother growth on mobile
                } : {}}
                onClick={() => setYesPressed(true)}
              >
                {noCount >= 12 ? "YES!!!!" : (
                  <>Yes <span className="text-2xl md:text-4xl">💕</span></>
                )}
              </motion.button>
              
              {/* NO BUTTON (Only visible before limit) */}
              {noCount < 12 && (
                <motion.button
                  className="bg-white hover:bg-stone-50 text-stone-500 font-medium rounded-md px-10 py-4 md:px-20 md:py-8 shadow-md hover:shadow-lg border border-stone-100 transition-all text-xl md:text-3xl min-w-[200px] md:min-w-[240px]"
                  style={{
                      position: noPos.position as any,
                      top: noPos.top,
                      left: noPos.left,
                  }}
                  // Add both mouse and touch events
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  onTouchStart={(e: React.TouchEvent) => {
                    e.preventDefault(); // Prevent accidental clicks while trying to touch
                    handleNoInteraction();
                  }}
                >
                  {getNoText()}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 mb-6 text-rose-300/80 text-[10px] md:text-xs font-medium tracking-widest uppercase relative z-10 pointer-events-none">
         Made with ❤️
      </footer>
    </main>
  );
}

