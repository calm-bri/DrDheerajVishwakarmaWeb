import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Initializing biomechanical telemetry...");

  useEffect(() => {
    // Elegant incremental progress to simulate precision calibration
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // extra grace period
          return 100;
        }
        
        // Progress stage captions
        if (prev === 25) setStageText("Simulating endoscopic optical 4K feed...");
        if (prev === 55) setStageText("Calibrating micro-portal instrument vectors...");
        if (prev === 85) setStageText("Forming multi-lumbar anatomical rendering...");
        
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loading-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-bg text-white overflow-hidden"
      >
        {/* Futuristic Grid Overlay behind the loader */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial-glow opacity-60 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col items-center max-w-sm px-6 text-center z-10">
          {/* Pulsing Micro-icon container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 w-16 h-16 rounded-full glassmorphism flex items-center justify-center border border-white/10"
          >
            {progress < 40 ? (
              <Activity className="w-6 h-6 text-sky-400 animate-pulse" />
            ) : progress < 80 ? (
              <HeartPulse className="w-6 h-6 text-gold-400 animate-pulse" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-green-400 animate-pulse" />
            )}
          </motion.div>

          {/* Luxury Typographical Medical Authority Mark */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-2"
          >
            <h2 className="font-display font-medium text-xs tracking-[0.3em] uppercase text-gold-300">
              Dr. Dheeraj Vishwakarma
            </h2>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
              FULL MONOPORTAL ENDOSCOPIC SPINE CLINICAL DEPARTMENT
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-48 h-[1px] bg-white/5 my-6 relative overflow-hidden"
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-400 to-gold-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </motion.div>

          {/* Incrementing percentage with Space-tech monospace font */}
          <div className="font-mono text-4xl font-extrabold tracking-tighter text-white/90">
            {progress.toString().padStart(3, "0")}
            <span className="text-gold-400 text-lg font-normal ml-0.5">%</span>
          </div>

          {/* Active status messages changing on stages */}
          <div className="h-5 overflow-hidden mt-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={stageText}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-mono tracking-wider text-gray-400 uppercase"
              >
                {stageText}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Ambient watermark footer representing medical authority */}
        <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none opacity-25">
          <p className="font-mono text-[9px] text-gray-600 tracking-widest uppercase">
            ESTABLISHED SPECIALTY / ENDOSCOPIC MONOPORTAL SPINE SURGERY
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
