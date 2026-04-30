import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Mascot } from './components/Mascot';
import { EnvelopeScene } from './components/EnvelopeScene';
import { DanceScene } from './components/DanceScene';
import { CakeScene } from './components/CakeScene';
import { MessageScene } from './components/MessageScene';
import { FeedbackScene } from './components/FeedbackScene';
import { GoodHabitScene } from './components/GoodHabitScene';
import { FinaleScene } from './components/FinaleScene';

export default function App() {
  const [scene, setScene] = useState(0);
  const [mascotReaction, setMascotReaction] = useState<'idle' | 'happy' | 'shocked' | 'relieved' | 'dance' | 'love' | 'oops'>('idle');
  const [mascotZoom, setMascotZoom] = useState(false);

  return (
    <div className="relative w-full h-[100dvh] bg-[#eff6ff] overflow-hidden flex flex-col justify-between items-center max-w-md mx-auto border-x border-blue-100 shadow-2xl">
      
      {/* Global Mascot Character */}
      {scene !== 7 && <Mascot reaction={mascotReaction} isZoomed={mascotZoom} />}

      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {scene === 0 && <EnvelopeScene key="s0" onOpen={() => setScene(1)} />}
          {scene === 1 && <DanceScene key="s1" onNext={() => setScene(2)} setMascotReaction={setMascotReaction} />}
          {scene === 2 && <CakeScene key="s2" onNext={() => setScene(3)} setMascotReaction={setMascotReaction} />}
          {scene === 3 && <MessageScene key="s3" onNext={() => setScene(4)} setMascotReaction={setMascotReaction} />}
          {scene === 4 && <FeedbackScene key="s4" onNext={() => setScene(5)} setMascotReaction={setMascotReaction} />}
          {scene === 5 && <GoodHabitScene key="s5" onNext={() => setScene(6)} setMascotReaction={setMascotReaction} />}
          {scene === 6 && <FinaleScene key="s6" setMascotReaction={setMascotReaction} setMascotZoom={setMascotZoom} onRestart={() => setScene(0)} />}
        </AnimatePresence>
      </div>

    </div>
  );
}
