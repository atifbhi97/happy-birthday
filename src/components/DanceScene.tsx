import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const AnimeBoy = ({ isClapping, isDancing }: { isClapping: boolean, isDancing: boolean }) => (
  <motion.div 
    className="relative w-32 h-48 flex flex-col items-center justify-end drop-shadow-xl"
    animate={isDancing ? { y: [0, -15, 0] } : isClapping ? { y: [0, -5, 0] } : {}}
    transition={{ repeat: Infinity, duration: 0.5 }}
  >
    <svg viewBox="0 0 100 150" className="w-full h-full">
      {/* Body / Suit */}
      <motion.path 
        d="M25 150 L35 70 L65 70 L75 150 Z" 
        fill="#1e293b" 
        animate={isDancing ? { d: "M20 150 L30 70 L70 70 L80 150 Z" } : {}}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      <path d="M40 70 L50 90 L60 70 Z" fill="#f8fafc" />
      <path d="M50 90 L45 100 L55 100 Z" fill="#0f172a" />
      
      {/* Arms (Clapping / Dancing) */}
      <motion.path 
        d="M35 75 L20 120"
        stroke="#1e293b" strokeWidth="10" strokeLinecap="round"
        animate={isDancing ? { d: "M35 75 L15 60" } : isClapping ? { d: "M35 75 L45 100" } : { d: "M35 75 L20 120" }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      <motion.path 
        d="M65 75 L80 120"
        stroke="#1e293b" strokeWidth="10" strokeLinecap="round"
        animate={isDancing ? { d: "M65 75 L85 60" } : isClapping ? { d: "M65 75 L55 100" } : { d: "M65 75 L80 120" }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      
      {/* Head */}
      <circle cx="50" cy="50" r="18" fill="#ffebd2" />
      
      {/* Face details */}
      <ellipse cx="44" cy="48" rx="2" ry="3.5" fill="#0f172a" />
      <ellipse cx="56" cy="48" rx="2" ry="3.5" fill="#0f172a" />
      <path d="M46 56 Q50 60 54 56" fill="transparent" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Anime Hair */}
      <path d="M30 45 Q35 25 50 25 Q65 25 70 45 Q75 35 60 25 Q50 15 40 25 Q25 35 30 45 Z" fill="#0f172a" />
      <path d="M40 25 L45 40 L50 30 L55 42 L60 28" fill="#0f172a" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

const AnimeGirl = ({ isClapping, isDancing }: { isClapping: boolean, isDancing: boolean }) => (
  <motion.div 
    className="relative w-32 h-48 flex flex-col items-center justify-end drop-shadow-xl"
    animate={isDancing ? { y: [0, -15, 0] } : isClapping ? { y: [0, -5, 0] } : {}}
    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
  >
    <svg viewBox="0 0 100 150" className="w-full h-full">
      {/* Back Hair */}
      <path d="M30 50 Q20 100 35 140 Q50 150 65 140 Q80 100 70 50 Z" fill="#4a3b32" />
      
      {/* Dress */}
      <motion.path 
        d="M40 70 L25 150 L75 150 L60 70 Z" 
        fill="#f472b6" 
        animate={isDancing ? { d: "M35 70 L15 145 L85 145 L65 70 Z" } : {}}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      
      {/* Arms (Clapping / Dancing) */}
      <motion.path 
        d="M40 75 L25 110"
        stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round"
        animate={isDancing ? { d: "M40 75 L20 60" } : isClapping ? { d: "M40 75 L48 95" } : { d: "M40 75 L25 110" }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      <motion.path 
        d="M60 75 L75 110"
        stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round"
        animate={isDancing ? { d: "M60 75 L80 60" } : isClapping ? { d: "M60 75 L52 95" } : { d: "M60 75 L75 110" }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }}
      />
      
      {/* Head */}
      <circle cx="50" cy="50" r="16" fill="#ffebd2" />
      
      {/* Anime Eyes */}
      <ellipse cx="44" cy="49" rx="3" ry="4" fill="#2d1b11" />
      <circle cx="44.5" cy="47.5" r="1" fill="white" />
      <ellipse cx="56" cy="49" rx="3" ry="4" fill="#2d1b11" />
      <circle cx="56.5" cy="47.5" r="1" fill="white" />
      
      {/* Blush & Mouth */}
      <ellipse cx="39" cy="53" rx="3" ry="1.5" fill="#fca5a5" opacity="0.6" />
      <ellipse cx="61" cy="53" rx="3" ry="1.5" fill="#fca5a5" opacity="0.6" />
      <path d="M47 55 Q50 58 53 55" fill="transparent" stroke="#2d1b11" strokeWidth="1" strokeLinecap="round" />
      
      {/* Front Hair / Bangs */}
      <path d="M34 50 Q50 25 66 50 Q66 30 50 20 Q34 30 34 50 Z" fill="#5c4538" />
      <path d="M34 50 Q45 40 50 50 Q55 40 66 50 Q50 35 34 50 Z" fill="#4a3b32" />
    </svg>
  </motion.div>
);

export function DanceScene({ onNext, setMascotReaction }: { onNext: () => void, setMascotReaction: (r: any) => void }) {
  const [step, setStep] = useState(0); 

  useEffect(() => {
    setMascotReaction('happy');
    
    const t1 = setTimeout(() => setStep(1), 1500); // dance
    const t2 = setTimeout(() => {
      setStep(2); // clap
      setMascotReaction('dance');
    }, 4500); 
    const t3 = setTimeout(() => {
      setStep(3); // text
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa']
      });
      setMascotReaction('star');
    }, 7000);
    
    const t4 = setTimeout(() => {
      onNext();
    }, 11500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#eff6ff] to-blue-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute bottom-20 w-[90%] md:w-80 h-32 bg-indigo-300 rounded-[100%] opacity-40 blur-2xl" />
      
      <div className="relative w-full h-64 flex items-end justify-center gap-4 md:gap-12 z-10 pb-4">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <AnimeBoy isDancing={step === 1} isClapping={step === 2} />
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <AnimeGirl isDancing={step === 1} isClapping={step === 2} />
        </motion.div>
      </div>

      {step === 3 && (
        <motion.div 
          className="absolute top-1/4 text-center z-20 w-[90%] max-w-lg px-2"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 drop-shadow-md bg-white/90 py-3 px-4 sm:py-4 sm:px-6 rounded-3xl backdrop-blur-md border-4 border-blue-300 leading-snug">
            Happy Birthday<br className="block sm:hidden" /> Lee Shia! 🎉
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
}