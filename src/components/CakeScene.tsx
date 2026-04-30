import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const HandsomeGuy = ({ phase }: { phase: string }) => {
  const isHappy = phase === 'guyEating';
  return (
    <svg viewBox="0 0 100 120" className="w-56 h-72 drop-shadow-2xl overflow-visible">
      {/* Shoulders / Shirt */}
      <path d="M 10 120 L 30 70 L 70 70 L 90 120 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <path d="M 30 70 L 50 95 L 70 70 Z" fill="#f1f5f9" />
      
      {/* Dark Suit Jacket */}
      <path d="M 0 120 L 25 75 L 45 120 Z" fill="#0f172a" />
      <path d="M 100 120 L 75 75 L 55 120 Z" fill="#0f172a" />

      {/* Neck */}
      <rect x="44" y="55" width="12" height="15" fill="#ffebd2" />

      {/* Head */}
      <circle cx="50" cy="45" r="22" fill="#ffebd2" />

      {/* Hair (Handsome Anime Style) */}
      <path d="M 25 40 Q 30 10 50 15 Q 70 10 75 40 Q 75 25 50 5 Q 25 25 25 40 Z" fill="#1e293b" />
      <path d="M 28 35 L 40 22 L 45 35 L 55 20 L 60 35 L 70 25 L 72 40" fill="#1e293b" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />

      {/* Face details */}
      {isHappy ? (
        <>
          {/* Cute closed > < eyes */}
          <polyline points="38,40 43,43 38,46" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="62,40 57,43 62,46" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Blush */}
          <ellipse cx="38" cy="48" rx="5" ry="2.5" fill="#fca5a5" opacity="0.9" />
          <ellipse cx="62" cy="48" rx="5" ry="2.5" fill="#fca5a5" opacity="0.9" />
          {/* Happy Mouth */}
          <path d="M 45 52 L 48 56 L 52 56 L 55 52 Z" fill="#fca5a5" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round"/>
        </>
      ) : (
        <>
          {/* Handsome gentle eyes */}
          <path d="M 37 42 Q 41 39 45 42" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="41" cy="44" rx="2" ry="2.5" fill="#0f172a" />
          <path d="M 55 42 Q 59 39 63 42" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="59" cy="44" rx="2" ry="2.5" fill="#0f172a" />
          {/* Gentle smile */}
          <path d="M 46 54 Q 50 57 54 54" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export function CakeScene({ onNext, setMascotReaction }: { onNext: () => void, setMascotReaction: (r: any) => void }) {
  const [phase, setPhase] = useState<'candle'|'blown'|'guyArrives'|'cutting'|'feeding'|'povBite'|'guyEating'>('candle');
  const [isShaking, setIsShaking] = useState(false);
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);

  useEffect(() => {
    setMascotReaction('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === 'candle') {
      const t = setTimeout(() => setShowPromptDropdown(true), 2000);
      const t2 = setTimeout(() => setShowPromptDropdown(false), 5000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    } else {
      setShowPromptDropdown(false);
    }
  }, [phase]);

  const handleSequence = () => {
    setPhase('blown');
    setMascotReaction('happy');
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#60a5fa', '#34d399', '#fcd34d', '#f472b6']
    });

    setTimeout(() => setPhase('guyArrives'), 1500); // 1.5s: Guy fades in
    setTimeout(() => setPhase('cutting'), 3000); // 3s: Cut piece, full cake slides away
    
    setTimeout(() => {
      setPhase('feeding'); // 4.5s: Comes close to feed Lee Shia
      setMascotReaction('star');
    }, 4500);
    
    setTimeout(() => {
      setPhase('povBite'); // 7s: User "bites", screen shakes
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400); // shake stops
    }, 7000);

    setTimeout(() => {
      setPhase('guyEating'); // 9s: Guy eats his bite
      setMascotReaction('happy');
    }, 9000);

    setTimeout(() => {
      onNext(); // 12.5s: transition out
    }, 12500);
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#eff6ff] to-blue-100 overflow-hidden"
      animate={isShaking ? { opacity: 1, x: [-15, 15, -15, 15, 0], y: [-10, 10, -10, 10, 0] } : { opacity: 1, x: 0, y: 0 }}
      transition={isShaking ? { duration: 0.4 } : { duration: 0.8 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, scale: 1.1 }}
    >
      <div className="relative w-full h-[80%] max-w-sm flex flex-col items-center justify-end pb-20">
        
        {/* Handsome Guy Background */}
        <motion.div
           className="absolute bottom-20 z-0 origin-bottom flex flex-col items-center"
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={
             phase === 'candle' || phase === 'blown' ? { opacity: 0, y: 50, scale: 0.9 } :
             phase === 'guyArrives' || phase === 'cutting' ? { opacity: 1, y: 0, scale: 1 } :
             phase === 'feeding' || phase === 'povBite' ? { opacity: 1, y: 20, scale: 1.3 } :
             phase === 'guyEating' ? { opacity: 1, y: 0, scale: 1.15 } : {}
           }
           transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <HandsomeGuy phase={phase} />
        </motion.div>

        {/* Text Overlays depending on phase */}
        <AnimateText phase={phase} />

        {/* The Full Cake */}
        <motion.div 
          className="absolute bottom-10 flex flex-col items-center z-10"
          animate={phase === 'candle' || phase === 'blown' || phase === 'guyArrives' ? { opacity: 1, x: 0 } : { opacity: 0, x: 300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={(phase !== 'candle' && phase !== 'blown' && phase !== 'guyArrives') ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 65% 100%, 50% 40%, 35% 100%, 0% 100%)" } : {}}
        >
          <div className="relative w-3 h-10 bg-yellow-100 rounded-t-lg shadow-inner z-10 border border-yellow-200">
            {phase === 'candle' && (
              <motion.div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_15px_#f97316]"
                animate={{ scale: [1, 1.1, 0.9, 1], rotate: [-2, 2, -1, 1] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
              />
            )}
          </div>
          
          <div className="w-32 h-12 bg-sky-200 rounded-t-xl border-x-4 border-t-4 border-sky-300 relative z-10">
             <div className="absolute top-[-5px] left-4 w-4 h-4 bg-sky-400 rounded-full" />
             <div className="absolute top-[-5px] right-4 w-4 h-4 bg-sky-400 rounded-full" />
             <div className="absolute top-[-5px] left-14 w-4 h-4 bg-sky-400 rounded-full" />
          </div>
          <div className="w-48 h-16 bg-blue-300 rounded-lg shadow-lg border-x-4 border-b-4 border-blue-400 flex items-center justify-around px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-8 bg-blue-400 rounded-full opacity-50"></div>
            ))}
          </div>
          <div className="w-56 h-4 bg-gray-200 rounded-[100%] shadow-xl mt-[-5px] z-0" />
        </motion.div>

        {/* The Slice taking its own journey */}
        <motion.div
           className="absolute bottom-10 z-20 flex flex-col items-center"
           initial={{ opacity: 0, scale: 0.5, y: 0 }}
           animate={
             phase === 'cutting' ? { opacity: 1, scale: 1, y: -20, x: -10, rotate: -5 } :
             phase === 'feeding' || phase === 'povBite' ? { opacity: 1, scale: 3.5, y: -160, x: 0, rotate: 5 } : // Right up to the screen!
             phase === 'guyEating' ? { opacity: 1, scale: 1.5, y: -110, x: -10, rotate: -10 } : // Goes back to guy
             { opacity: 0 }
           }
           transition={{ type: "spring", stiffness: 50, damping: 12 }}
        >
          {/* Slice SVG - Layered with Hand */}
          <div className="relative w-20 h-20">
            {/* BACK LAYER: Fingers tucked behind stick */}
            {(phase !== 'candle' && phase !== 'blown' && phase !== 'guyArrives') && (
              <div className="absolute top-[76px] left-[40px] z-10 flex flex-col items-start -rotate-[15deg]">
                 {/* Index (top, slightly smaller) */}
                 <div className="w-[14px] h-[7px] bg-gradient-to-r from-[#eab281] to-[#fcd9ab] rounded-[20px] -mb-[2px]"></div>
                 {/* Middle (larger) */}
                 <div className="w-[17px] h-[8px] bg-gradient-to-r from-[#eab281] to-[#fcd9ab] rounded-[20px] -mb-[2px]"></div>
                 {/* Ring (larger) */}
                 <div className="w-[15px] h-[8px] bg-gradient-to-r from-[#eab281] to-[#fcd9ab] rounded-[20px] -mb-[2px]"></div>
                 {/* Pinky (bottom, smallest) */}
                 <div className="w-[12px] h-[6px] bg-gradient-to-r from-[#eab281] to-[#fcd9ab] rounded-[20px]"></div>
              </div>
            )}

            {/* MIDDLE LAYER: Cake and Stick */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible relative z-20">
              <defs>
                <mask id="biteMask">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  {/* First bite by user */}
                  {(phase === 'povBite' || phase === 'guyEating') && (
                    <path d="M 30 -5 Q 50 40 70 -5 Z" fill="black" />
                  )}
                  {/* Second bite by guy */}
                  {phase === 'guyEating' && (
                    <circle cx="20" cy="70" r="20" fill="black" />
                  )}
                </mask>
              </defs>
              <g mask="url(#biteMask)">
                <polygon points="50,10 90,80 10,80" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round" />
                <line x1="42" y1="35" x2="58" y2="35" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                <line x1="32" y1="55" x2="68" y2="55" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              </g>
              
              {/* Fake little fork */}
              <rect x="48" y="75" width="4" height="45" fill="#94a3b8" />
              <path d="M 45 75 L 45 65 L 48 65 L 48 75 Z" fill="#94a3b8" />
              <path d="M 52 75 L 52 65 L 55 65 L 55 75 Z" fill="#94a3b8" />
            </svg>
            
            {/* FRONT LAYER: Thumb crossing over the stick horizontally */}
            {(phase !== 'candle' && phase !== 'blown' && phase !== 'guyArrives') && (
              <div className="absolute top-[80px] left-[36px] z-30 flex items-center justify-center -rotate-[10deg]">
                 {/* Thumb (horizontal pill shape crossing the stick) */}
                 <div className="w-[18px] h-[9px] bg-gradient-to-b from-[#ffebd2] to-[#fcd9ab] rounded-[20px] shadow-[0_2px_3px_rgba(0,0,0,0.15)] border-[0.5px] border-[#eab281]"></div>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {phase === 'candle' && (
        <>
          <motion.button
            className="absolute bottom-16 left-1/2 -translate-x-1/2 px-8 py-4 bg-white text-blue-600 font-extrabold rounded-full shadow-2xl border-4 border-blue-200 active:scale-95 z-30 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSequence}
          >
            촛불을 불어주세요! 🌬️
          </motion.button>
          
          <AnimatePresence>
            {showPromptDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 10, x: "-50%" }}
                className="absolute bottom-6 left-1/2 text-slate-500 font-serif font-black text-sm tracking-wide pointer-events-none z-20 text-center whitespace-nowrap"
              >
                👆 이 버튼을 클릭해 주세요!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </motion.div>
  );
}

// Separate component for text transitions
function AnimateText({ phase }: { phase: string }) {
  let text = "";
  if (phase === 'feeding') text = "아~ 해봐! 🍰 (Say Ah~!)";
  if (phase === 'povBite') text = "맛있지? ㅎㅎ (Delicious, right?)";
  if (phase === 'guyEating') text = "우와, 진짜 맛있다! 😍 (Wow, it's so good!)";

  return (
    <motion.div 
      className="absolute top-1/4 z-30 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: text ? 1 : 0, y: text ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {text !== "" && (
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 bg-white/80 py-3 px-6 rounded-3xl shadow-lg border-2 border-blue-200">
          {text}
        </h2>
      )}
    </motion.div>
  );
}