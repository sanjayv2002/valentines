'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // "Runaway" button state
  const [noPos, setNoPos] = useState({ top: "auto", left: "auto", position: "static" });

  const handleNoHover = () => {
    setNoCount(noCount + 1);
    
    // Calculate random position within the viewport, keeping it somewhat central but random
    // Using fixed/absolute positioning for the "run" effect
    if (typeof window !== 'undefined') {
      const x = Math.random() * (window.innerWidth - 150) + 20; // Padding to avoid edges
      const y = Math.random() * (window.innerHeight - 150) + 20;
      
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
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-100 font-[var(--font-poppins)] selection:bg-rose-100">
      
      {/* Soft Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-200/30 rounded-full blur-[100px]" />
      </div>

      <video 
        src="/sparkle_heart.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none z-0" 
      />

      <AnimatePresence mode="wait">
        {yesPressed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Cute Couple Video */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-6 relative"
            >
               <video 
                 src="/cute_couple.mp4" 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="w-80 h-auto rounded-3xl shadow-2xl border-4 border-white/50"
               />
               <div className="absolute -top-6 -right-6 text-6xl animate-bounce delay-75">💖</div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-[var(--font-great-vibes)] text-6xl md:text-8xl text-rose-500 mb-4"
            >
              Yay!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-rose-800/80 font-light"
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
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="mb-8 relative"
            >
              <video 
                src="/cute_bear.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-64 h-auto rounded-3xl shadow-xl border-4 border-white/50"
              />
            </motion.div>

            <h1 className="font-[var(--font-great-vibes)] text-5xl md:text-7xl text-rose-600 mb-12 drop-shadow-sm leading-normal">
              Will you be my Valentine?
            </h1>

            {/* Button Container */}
            <div className="flex flex-wrap items-center justify-center gap-6 w-full relative h-24">
              {/* YES BUTTON */}
              <motion.button
                layout
                className={`bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-md shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] transition-all flex items-center justify-center gap-2 z-20 ${
                  noCount >= 12
                    ? "fixed inset-0 w-full h-full text-9xl z-[100]" // Full screen giant mode
                    : "px-20 py-8 text-3xl min-w-[240px]" // Bigger padding & equal start size
                }`}
                whileHover={noCount < 12 ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                style={noCount < 12 ? {
                  scale: 1 + noCount * 0.4, // Fast growth (0.4 increment)
                } : {}}
                onClick={() => setYesPressed(true)}
              >
                {noCount >= 12 ? "YES!!!!" : (
                  <>Yes <span className="text-4xl">💕</span></>
                )}
              </motion.button>
              
              {/* NO BUTTON (Only visible before limit) */}
              {noCount < 12 && (
                <motion.button
                  className="bg-white hover:bg-stone-50 text-stone-500 font-medium rounded-md px-20 py-8 shadow-md hover:shadow-lg border border-stone-100 transition-all text-3xl min-w-[240px]"
                  style={{
                      position: noPos.position as any,
                      top: noPos.top,
                      left: noPos.left,
                  }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                >
                  {getNoText()}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 text-rose-300/80 text-xs font-medium tracking-widest uppercase">
         Made with ❤️
      </footer>
    </main>
  );
}

