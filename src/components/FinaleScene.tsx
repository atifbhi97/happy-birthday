import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export function FinaleScene({ setMascotReaction, setMascotZoom, onRestart }: { setMascotReaction: (r: any) => void, setMascotZoom: (z: boolean) => void, onRestart: () => void }) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    setMascotReaction('happy');

    // Notice mistake
    const t1 = setTimeout(() => {
      setPhase(1); 
      setMascotZoom(true);
      setMascotReaction('oops');
    }, 2000);

    // Friend word shoots up!
    const t2 = setTimeout(() => {
      setPhase(2); 
    }, 3500);

    // Friends word slots in!
    const t3 = setTimeout(() => {
      setPhase(3); 
      setMascotZoom(false);
      setMascotReaction('relieved');
      
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#fbbf24', '#f472b6']
      });
    }, 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      setMascotZoom(false); 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 4) {
    return (
      <motion.div 
        className="absolute inset-0 bg-slate-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-blue-900/40 text-sm font-medium tracking-widest">See you later! ✨</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-[80px] opacity-20" />
         <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400 rounded-full blur-[80px] opacity-20" />
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="z-10 text-center flex flex-col items-center justify-center mt-20 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl max-w-[90vw] relative min-h-[140px]">
        
        <LayoutGroup>
          <motion.div 
            layout 
            className={`flex items-center justify-center flex-wrap gap-x-2 gap-y-2 text-3xl md:text-4xl font-extrabold text-[#1e293b] font-serif transition-all duration-300 ${phase === 1 ? 'blur-[3px] opacity-40 scale-95' : 'blur-0 opacity-100 scale-100'}`}
          >
            <motion.span layout>Made by your</motion.span>
            
            <AnimatePresence>
              {phase >= 3 && (
                <motion.span 
                  layout
                  layoutId="friend-word"
                  className="text-white text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.5)] -rotate-3 z-20"
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  friend,
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span layout className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm z-10">
                Atif
            </motion.span>
          </motion.div>
        </LayoutGroup>

        {/* Phase 2: Word shoots from bottom */}
        {phase === 2 && (
          <motion.div
             layoutId="friend-word"
             className="absolute bottom-[-60px] text-white text-3xl md:text-4xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2 rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.8)] font-bold font-serif whitespace-nowrap z-50 pointer-events-none"
             initial={{ y: 200, scale: 0.2, rotate: 15 }}
             animate={{ y: 0, scale: 1.1, rotate: -5 }}
             transition={{ type: 'spring', stiffness: 150, damping: 10 }}
          >
            friend,
          </motion.div>
        )}

      </div>

      {phase >= 3 && (
        <motion.div 
          className="absolute bottom-20 flex flex-col items-center gap-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="px-6 py-2 bg-blue-50 text-blue-800 font-bold rounded-full shadow-md border border-blue-200">
            Thank you for seeing this! ✨
          </div>

          <div className="flex gap-4">
            <motion.button
              className="px-8 py-3 bg-white text-[#1e293b] font-bold rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-transform border-2 border-[#1e293b]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
            >
              Again 🔄
            </motion.button>

            <motion.button
              className="px-8 py-3 bg-[#1e293b] text-white font-bold rounded-full shadow-2xl hover:bg-slate-700 active:scale-95 transition-transform border border-slate-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(4)}
            >
              Close ✖
            </motion.button>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}