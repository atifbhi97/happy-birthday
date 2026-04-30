import { motion } from 'motion/react';

interface MascotProps {
  reaction: 'idle' | 'happy' | 'shocked' | 'relieved' | 'dance' | 'star';
  isZoomed?: boolean;
}

export function Mascot({ reaction, isZoomed }: MascotProps) {
  // Define expressions based on reaction
  let eyes = (
    <>
      <div className="w-2 h-2 rounded-full bg-slate-800" />
      <div className="w-2 h-2 rounded-full bg-slate-800" />
    </>
  );
  let mouth = <div className="w-4 h-1.5 border-b-2 border-slate-800 rounded-full" />;

  if (reaction === 'happy' || reaction === 'star' || reaction === 'dance') {
    eyes = (
      <>
        <div className="w-2.5 h-1 border-t-2 border-slate-800 rounded-full" />
        <div className="w-2.5 h-1 border-t-2 border-slate-800 rounded-full" />
      </>
    );
    mouth = (
      <div className="w-5 h-3 border-b-2 border-slate-800 rounded-b-full bg-red-100" />
    );
  } else if (reaction === 'shocked') {
    eyes = (
      <>
        <div className="w-3 h-3 rounded-full bg-slate-800" />
        <div className="w-3 h-3 rounded-full bg-slate-800" />
      </>
    );
    mouth = <div className="w-3 h-3 rounded-full bg-slate-800" />;
  } else if (reaction === 'relieved') {
    eyes = (
      <>
        <div className="w-2.5 h-1 border-b-2 border-slate-800 rounded-full" />
        <div className="w-2.5 h-1 border-b-2 border-slate-800 rounded-full" />
      </>
    );
    mouth = (
      <div className="w-4 h-1.5 border-t-2 border-slate-800 rounded-full mt-1" />
    );
  }

  return (
    <motion.div
      className="fixed z-50 flex items-center justify-center pointer-events-none"
      initial={{ top: 20, scale: 1 }}
      animate={
        isZoomed
          ? { top: '40%', scale: 4, y: '-50%' }
          : { top: 20, scale: 1, y: 0 }
      }
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <motion.div
        className="w-16 h-16 bg-white rounded-full shadow-lg border border-slate-200 flex flex-col items-center justify-center relative"
        animate={
          reaction === 'dance'
            ? { y: [0, -10, 0], rotate: [0, -10, 10, 0] }
            : reaction === 'star'
            ? { scale: [1, 1.1, 1] }
            : {}
        }
        transition={
          reaction === 'dance' || reaction === 'star'
            ? { repeat: Infinity, duration: 0.8 }
            : {}
        }
      >
        {/* Blush */}
        {(reaction === 'happy' || reaction === 'star') && (
          <>
            <div className="absolute top-8 left-2 w-3 h-1.5 bg-orange-200 rounded-full opacity-60 blur-[1px]" />
            <div className="absolute top-8 right-2 w-3 h-1.5 bg-orange-200 rounded-full opacity-60 blur-[1px]" />
          </>
        )}
        
        {/* Face */}
        <div className="flex gap-3 mb-1">{eyes}</div>
        <div className="mt-1">{mouth}</div>

        {/* Floating Star */}
        {reaction === 'star' && (
          <motion.div
            className="absolute -top-4 -right-2 text-yellow-400 text-xl"
            animate={{ y: [0, -10], opacity: [1, 0], rotate: [0, 90] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ⭐
          </motion.div>
        )}
        
        {/* Exclamation for shock */}
        {reaction === 'shocked' && (
          <motion.div
            className="absolute -top-6 text-red-500 font-bold text-xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            !
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}