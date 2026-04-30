import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const MESSAGES = [
  "다시 한 번 생일 축하해, 시아야! 🎉",
  "(Once again happy birthday Shia! 🎉)",
  "",
  "너는 나에게 너무 소중한 친구야.",
  "(You are such a precious friend to me.)",
  "",
  "이 케이크처럼, 오늘이 세상에서 가장 달콤한 하루가 되길 바라.",
  "(Like this cake, I hope today is the sweetest day in the world.)",
  "",
  "맛있게 먹었어? ㅎㅎ",
  "(Did you enjoy eating it? haha)",
  "",
  "태어나줘서 고마워, 앞으로도 계속 웃자!",
  "(Thank you for being born, let's keep smiling!)"
];

export function MessageScene({ onNext, setMascotReaction }: { onNext: () => void, setMascotReaction: (r: any) => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    setMascotReaction('star');

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < MESSAGES.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800); 

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allVisible = visibleLines >= MESSAGES.length;

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-800 to-slate-900" />
      
      <div className="z-10 w-full px-5 text-center flex flex-col gap-2 mt-8">
        {MESSAGES.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={visibleLines > idx ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {msg === "" ? (
              <div className="h-2" /> 
            ) : (
              <h2 className={`font-serif ${idx % 3 === 0 ? 'text-xl md:text-2xl text-blue-300 font-bold drop-shadow-md' : 'text-xs md:text-sm text-blue-100/60 italic'}`}>
                {msg}
              </h2>
            )}
          </motion.div>
        ))}
      </div>

      {allVisible && (
        <motion.button
          className="absolute bottom-12 px-10 py-3 bg-blue-600/90 text-white font-bold rounded-full border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          다음으로 (Next) ➡️
        </motion.button>
      )}
    </motion.div>
  );
}