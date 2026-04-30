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

export function FeedbackScene({ onNext, setMascotReaction }: { onNext: () => void, setMascotReaction: (r: any) => void }) {
  const [inputValue, setInputValue] = useState('');
  const [isShift, setIsShift] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMascotReaction('love'); // Mascot listening carefully
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
          name: 'Lee Shia (Bad Habit Feedback)',
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
      className="absolute inset-0 flex flex-col items-center justify-start bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] pt-[220px] px-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-sm">
        <h2 className="text-xl md:text-2xl font-black text-[#64748b] mb-2 text-center drop-shadow-sm leading-snug">
          나의 어떤 습관이 <br/><span className="text-[#f472b6]">제일 싫어?</span> 🤔
        </h2>
        <p className="text-xs text-slate-400 mb-6 text-center font-semibold tracking-wide">(What habit of mine do you hate the most?)</p>

        <div className="flex bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden focus-within:ring-4 focus-within:ring-[#fbcfe8] transition-all duration-300">
          <input 
            type="text" 
            readOnly
            value={inputValue}
            placeholder="여기에 적어줘..."
            className="flex-1 w-full bg-transparent px-5 py-4 text-lg text-[#334155] placeholder:text-[#cbd5e1] font-bold outline-none caret-[#f472b6]"
          />
          <button 
            onClick={handleSend}
            disabled={isSending || isSent || !inputValue.trim()}
            className="px-6 mx-1 my-1 bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold rounded-2xl hover:opacity-90 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 shadow-md transition-all active:scale-95 flex items-center justify-center min-w-[80px]"
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
            className="mt-6 px-6 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 font-extrabold rounded-full border border-green-200 shadow-md"
          >
            기록 완료! 고마워 ✨ (Noted! Thanks)
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 w-full px-2 flex flex-col items-center z-50">
        <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl p-3 pt-4 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-white/60">
          
          {currentLayout.map((row, i) => (
            <div key={i} className={`flex justify-center gap-1.5 mb-2.5 ${i === 1 ? 'px-4' : ''}`}>
              {row.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`
                    flex-1 flex items-center justify-center bg-white text-[#475569] font-extrabold rounded-2xl shadow-[0_3px_0_#e2e8f0] active:translate-y-[3px] active:shadow-none transition-all
                    ${key === 'Shift' ? (isShift ? 'bg-[#f472b6] text-white shadow-[0_3px_0_#db2777]' : 'bg-[#f1f5f9] text-[#64748b] shadow-[0_3px_0_#cbd5e1]') : ''}
                    ${key === 'Back' ? 'bg-[#f1f5f9] text-[#64748b] shadow-[0_3px_0_#cbd5e1]' : ''}
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
              className="w-3/4 h-12 bg-white text-[#475569] font-extrabold rounded-2xl shadow-[0_3px_0_#e2e8f0] active:translate-y-[3px] active:shadow-none text-xl transition-all"
            >
              간격 (Space)
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
