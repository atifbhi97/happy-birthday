import { motion } from 'motion/react';

export function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#eff6ff]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8 font-serif animate-pulse px-4">
          A special website for only you! ✨
        </h1>
        
        <motion.div 
          className="relative w-64 h-48 cursor-pointer mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
        >
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-indigo-300 rounded-md shadow-xl border-2 border-indigo-400"></div>
          
          {/* Envelope Paper (Inside) */}
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-white rounded flex items-center justify-center shadow-inner">
            <span className="text-indigo-500 font-medium text-4xl">💌</span>
          </div>

          {/* Envelope Front Left/Right flaps */}
          <div 
            className="absolute inset-0" 
            style={{ 
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              backgroundColor: '#a5b4fc'
            }} 
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              backgroundColor: '#a5b4fc'
            }} 
          />
          
          {/* Envelope Front Bottom flap */}
          <div 
            className="absolute inset-0" 
            style={{ 
              clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
              backgroundColor: '#818cf8'
            }} 
          />

          {/* Envelope Flap (Top) - Click to open */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-full origin-top"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
              backgroundColor: '#6366f1',
              zIndex: 10
            }}
          />
        </motion.div>
        
        <p className="mt-8 text-indigo-500 text-sm font-medium">Tap to open</p>
      </div>
    </motion.div>
  );
}