import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import * as Hangul from 'hangul-js';
import emailjs from '@emailjs/browser';

const K_LAYERS = {
  normal: [
    ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
    ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
    ['Shift','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','Back']
  ],
  shift: [
    ['ㅃ','ㅉ','ㄸ','ㄲ','ㅆ','ㅛ','ㅕ','ㅑ','ㅒ','ㅖ'],
    ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
    ['Shift','ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ','Back']
  ]
};

// Animated background elements (Hearts / Stars)
const FloatingParticles = () => {
  const particles = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        // Randomization based on index to ensure deterministic rendering
        // or just use math.random but since it's a fixed array it's fine
        const randomLeft = 5 + Math.random() * 90;
        const randomDelay = Math.random() * 8;
        const randomDuration = 8 + Math.random() * 6;
        const randomSize = 15 + Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute bottom-[-60px] opacity-70 flex items-center justify-center font-bold drop-shadow-sm"
            style={{ left: `${randomLeft}%`, fontSize: `${randomSize}px` }}
            animate={{
              y: [0, -1200],
              x: [0, i % 2 === 0 ? 40 : -40, 0],
              rotate: [0, 360],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🎂' : '🌟'}
          </motion.div>
        );
      })}
    </div>
  );
};

export function GoodHabitScene({ onNext, setMascotReaction }: { onNext: () => void, setMascotReaction: (r: any) => void }) {
  const [inputValue, setInputValue] = useState('');
  const [isShift, setIsShift] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMascotReaction('happy'); // Mascot feeling happy for compliments
  }, []);

  const handleKeyPress = (key: string) => {
    if (key === 'Shift') {
      setIsShift(!isShift);
      return;
    }
    if (key === 'Back') {
      const disassembled = Hangul.disassemble(inputValue);
      disassembled.pop();
      setInputValue(Hangul.assemble(disassembled));
      return;
    }
    if (key === 'Space') {
      setInputValue(inputValue + ' ');
      return;
    }
    
    // Default key press
    const disassembled = Hangul.disassemble(inputValue);
    disassembled.push(key);
    setInputValue(Hangul.assemble(disassembled));
    if (isShift) setIsShift(false); // auto unshift usually
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setIsSending(true);
    
    try {
      await emailjs.send(
        'service_wpbz95p',
        'template_etbzwdr',
        {
          name: 'Lee Shia (Good Habit Feedback)',
          message: inputValue,
          time: new Date().toLocaleString(),
        },
        'TYtqv9fsulNlXj2-p'
      );
      
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onNext();
      }, 2000);
    } catch (e) {
      console.error(e);
      alert("Error sending. Going next anyway!");
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onNext();
      }, 2000);
    }
  };

  const currentLayout = isShift ? K_LAYERS.shift : K_LAYERS.normal;

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-start bg-gradient-to-b from-[#fffbeb] to-[#fef3c7] pt-[220px] px-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingParticles />

      <div className="w-full max-w-sm z-10 relative">
        <h2 className="text-xl md:text-2xl font-black text-[#57534e] mb-2 text-center drop-shadow-sm leading-snug">
          나의 어떤 습관이 <br/><span className="text-[#f59e0b]">제일 좋아?</span> 
        </h2>
        <p className="text-xs text-amber-600/70 mb-6 text-center font-semibold tracking-wide">(What habit of mine do you like the most?)</p>

        <div className="flex bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white overflow-hidden focus-within:ring-4 focus-within:ring-[#fde68a] transition-all duration-300">
          <input 
            type="text" 
            readOnly
            value={inputValue}
            placeholder="여기에 적어줘..."
            className="flex-1 w-full bg-transparent px-5 py-4 text-lg text-[#44403c] placeholder:text-[#d6d3d1] font-bold outline-none caret-[#f59e0b]"
          />
          <button 
            onClick={handleSend}
            disabled={isSending || isSent || !inputValue.trim()}
            className="px-6 mx-1 my-1 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-white font-bold rounded-2xl hover:opacity-90 disabled:from-amber-100 disabled:to-amber-200 disabled:text-amber-400 shadow-md transition-all active:scale-95 flex items-center justify-center min-w-[80px]"
          >
            {isSent ? "전송 완료 💌" : isSending ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "전송 💌"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-extrabold rounded-full border border-yellow-200 shadow-md z-10 relative"
          >
            기록 완료! 너무 고마워 ✨ (Noted! Thanks)
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 w-full px-2 flex flex-col items-center z-50">
        <div className="w-full max-w-sm bg-white/70 backdrop-blur-xl p-3 pt-4 rounded-[2rem] shadow-[0_-10px_40px_rgba(245,158,11,0.08)] border border-white">
          
          {currentLayout.map((row, i) => (
            <div key={i} className={`flex justify-center gap-1.5 mb-2.5 ${i === 1 ? 'px-4' : ''}`}>
              {row.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`
                    flex-1 flex items-center justify-center bg-white text-[#57534e] font-extrabold rounded-2xl shadow-[0_3px_0_#e7e5e4] active:translate-y-[3px] active:shadow-none transition-all
                    ${key === 'Shift' ? (isShift ? 'bg-[#f59e0b] text-white shadow-[0_3px_0_#d97706]' : 'bg-[#fafaf9] text-[#78716c] shadow-[0_3px_0_#d6d3d1]') : ''}
                    ${key === 'Back' ? 'bg-[#fafaf9] text-[#78716c] shadow-[0_3px_0_#d6d3d1]' : ''}
                    ${key === 'Shift' || key === 'Back' ? 'text-sm flex-[1.5]' : 'text-lg h-12'}
                  `}
                >
                  {key === 'Back' ? '⌫' : key === 'Shift' ? '⇧' : key}
                </button>
              ))}
            </div>
          ))}
          
          <div className="flex justify-center gap-2 px-1 mt-1">
            <button
              onClick={() => handleKeyPress('Space')}
              className="w-3/4 h-12 bg-white text-[#57534e] font-extrabold rounded-2xl shadow-[0_3px_0_#e7e5e4] active:translate-y-[3px] active:shadow-none text-xl transition-all"
            >
              간격 (Space)
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
