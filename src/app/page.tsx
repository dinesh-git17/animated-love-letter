"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FloatingHearts from "../components/FloatingHearts";
import useHasMounted from "../hooks/useHasMounted";

// Sparkle Rain
const SparkleRain = () => {
  const sparkles = Array.from({ length: 35 });
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {sparkles.map((_, i) => (
        <span
          key={i}
          className="absolute sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const hasMounted = useHasMounted();
  const [stage, setStage] = useState<
    "ask" | "correct" | "wrong" | "letter" | "letter2" | "final" | "iloveyou" | "ending"
  >("ask");
  const [name, setName] = useState("");
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWords2, setTypedWords2] = useState<string[]>([]);
  const [wordIndex2, setWordIndex2] = useState(0);
  const [showClickHint1, setShowClickHint1] = useState(false);
  const [showClickHint2, setShowClickHint2] = useState(false);
  const [showClickHint3, setShowClickHint3] = useState(false);
  const [noClickScale, setNoClickScale] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const letter1 = `Dear Carolina,

Ever since your name entered my world, something in me changed.
You feel like a Sunday morning — calm, warm, and full of light.
You are my home, even before I step through the door.

I don't just love you...
I see you as the one I want to wake up next to every morning.
The woman I want to grow old with.
The mother of my children.
My future wife.

If this letter makes you smile, then my heart is smiling too.

Yours forever,
Dinesh`;

  const letter2 = `Carolina,

I hope you're still smiling.

I want to tell you something else...

You are breathtaking.
The way you move.
The way you smile.
The way your eyes hold oceans.

You are beautiful in ways words don’t fully capture.
But this letter is my attempt anyway.

Forever yours,
Dinesh`;

  const words1 = letter1.split(/(\s+)/);
  const words2 = letter2.split(/(\s+)/);

  const handleSubmit = () => {
    if (name.trim().toLowerCase() === "carolina") {
      setStage("correct");
    } else {
      setStage("wrong");
    }
  };

  const goToLetter = () => {
    setTypedWords([]);
    setWordIndex(0);
    setStage("letter");
  };

  const goToLetter2 = () => {
    setTypedWords2([]);
    setWordIndex2(0);
    setStage("letter2");
  };

  const goToFinal = () => {
    setNoClickScale(1);
    setStage("final");
  };

  const goToILoveYou = () => {
    setStage("iloveyou");
    setShowClickHint3(true);
    setTimeout(() => setShowClickHint3(false), 2000);
  };

  const goToEnding = () => {
    if (audioRef.current) {
      const fade = setInterval(() => {
        if (audioRef.current!.volume > 0.05) {
          audioRef.current!.volume -= 0.05;
        } else {
          audioRef.current!.volume = 0;
          clearInterval(fade);
        }
      }, 300);
    }
    setStage("ending");
  };

  useEffect(() => {
    if (stage === "letter" && wordIndex < words1.length) {
      const timeout = setTimeout(() => {
        setTypedWords((prev) => [...prev, words1[wordIndex]]);
        setWordIndex((prev) => prev + 1);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [wordIndex, stage]);

  useEffect(() => {
    if (stage === "letter2" && wordIndex2 < words2.length) {
      const timeout = setTimeout(() => {
        setTypedWords2((prev) => [...prev, words2[wordIndex2]]);
        setWordIndex2((prev) => prev + 1);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [wordIndex2, stage]);

  useEffect(() => {
    if ((stage === "letter" || stage === "letter2") && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [stage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typedWords, typedWords2]);

  useEffect(() => {
    if (stage === "letter" && wordIndex >= words1.length) {
      setShowClickHint1(true);
      const t = setTimeout(() => setShowClickHint1(false), 2000);
      return () => clearTimeout(t);
    }
    if (stage === "letter2" && wordIndex2 >= words2.length) {
      setShowClickHint2(true);
      const t = setTimeout(() => setShowClickHint2(false), 2000);
      return () => clearTimeout(t);
    }
  }, [stage, wordIndex, wordIndex2]);

  if (!hasMounted) return null;

  // Layout & variants to be reused
  const cardBase =
    "bg-white/80 p-8 sm:p-12 rounded-3xl shadow-lg backdrop-blur-md max-w-2xl w-full text-center overflow-hidden";

  const variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const transition = { duration: 0.6 };

  return (
    <div className="relative w-screen h-screen bg-[#FFB6C1] overflow-hidden px-4">
      <FloatingHearts />
      <audio ref={audioRef} src="/love_theme.mp3" loop />
      <div className="relative z-10 w-full h-full max-w-2xl mx-auto overflow-y-auto min-h-screen py-6">
        <div className="flex flex-col justify-center items-center min-h-full">
          <AnimatePresence mode="wait">
            {stage === "ask" && (
              <motion.div {...motionProps} className={cardBase}>
                <h1 className="text-3xl sm:text-4xl text-pink-800 mb-6">What’s your name, my love?</h1>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 text-pink-800 placeholder-pink-400"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {stage === "correct" && (
              <motion.div {...motionProps} className={cardBase}>
                <h1 className="text-3xl sm:text-4xl text-pink-700 mb-6">
                  Perfect. You’re the one I was looking for.
                </h1>
                <button
                  onClick={goToLetter}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                >
                  Read Something From Me
                </button>
              </motion.div>
            )}

            {stage === "wrong" && (
              <motion.div {...motionProps} className={cardBase}>
                <h1 className="text-3xl text-red-600 mb-6">Oops! Wrong person.</h1>
                <button
                  onClick={() => {
                    setName("");
                    setStage("ask");
                  }}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {(stage === "letter" || stage === "letter2") && (
              <motion.div
                key={stage}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className={`${cardBase} text-left text-pink-800 whitespace-pre-line leading-relaxed relative`}
              >
                {(stage === "letter" && wordIndex >= words1.length) ||
                (stage === "letter2" && wordIndex2 >= words2.length) ? <SparkleRain /> : null}

                <div className="text-base sm:text-lg">
                  {stage === "letter" ? typedWords.join("") : typedWords2.join("")}
                  <span className="ml-1 animate-blink">|</span>
                </div>

                <div ref={scrollRef} />

                {stage === "letter" && wordIndex >= words1.length && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {showClickHint1 && (
                      <span className="text-sm text-pink-700 animate-pulse">Click this</span>
                    )}
                    <button
                      onClick={goToLetter2}
                      className="text-3xl text-pink-500 hover:text-pink-700 animate-wiggle"
                    >
                      ↓
                    </button>
                  </div>
                )}

                {stage === "letter2" && wordIndex2 >= words2.length && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {showClickHint2 && (
                      <span className="text-sm text-pink-700 animate-pulse">Click this</span>
                    )}
                    <button
                      onClick={goToFinal}
                      className="text-3xl text-pink-500 hover:text-pink-700 animate-wiggle"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {stage === "final" && (
              <motion.div {...motionProps} className={cardBase}>
                <h1 className="text-2xl sm:text-3xl text-pink-800 text-center mb-4">
                  You’re mine forever, there’s no refunds 🌹🌹
                </h1>
                <h2 className="text-xl sm:text-2xl text-pink-700 mb-6">Do you love me?</h2>
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={goToILoveYou}
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-all"
                  >
                    Yes
                  </button>
                  {noClickScale > 0 && (
                    <button
                      onClick={() => setNoClickScale((prev) => Math.max(0, prev - 0.2))}
                      className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-all"
                      style={{
                        transform: `scale(${noClickScale})`,
                        opacity: noClickScale,
                      }}
                    >
                      No
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {stage === "iloveyou" && (
              <motion.div {...motionProps} className={cardBase}>
                <h1 className="text-2xl sm:text-3xl text-pink-700 text-center leading-snug">
                  You&apos;re the best. I love you 💖🥹🌸
                </h1>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {showClickHint3 && (
                    <span className="text-sm text-pink-700 animate-pulse">Click this</span>
                  )}
                  <button
                    onClick={goToEnding}
                    className="text-3xl text-pink-500 hover:text-pink-700 animate-wiggle"
                  >
                    ↓
                  </button>
                </div>
              </motion.div>
            )}

            {stage === "ending" && (
              <motion.div
                key="ending"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className={`${cardBase} flex flex-col items-center justify-center`}
              >
                {/* Heart Fill with Fade */}
                <svg
                  viewBox="0 0 32 29.6"
                  className="w-32 h-32 mb-6 animate-heartFade"
                >
                  <path
                    d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,7,7.6,11.7,16,21.2
                    c8.4-9.6,16-14.2,16-21.2C32,3.8,28.2,0,23.6,0z"
                    fill="#f43f5e"
                  />
                </svg>

                {/* Centered Handwritten Text */}
                <svg
                  viewBox="0 0 300 80"
                  className="w-full max-w-xs sm:max-w-md stroke-pink-700"
                >
                  <text
                    x="50%"
                    y="50"
                    textAnchor="middle"
                    fontSize="40"
                    fontFamily="'Sacramento', cursive"
                    fill="none"
                    strokeWidth="1"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    className="animate-writeText"
                  >
                    I love you
                  </text>
                </svg>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }

        @keyframes sparkle-fall {
          0% { transform: translateY(-20%); opacity: 0.9; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        .sparkle {
          background: radial-gradient(ellipse at center, #fff 0%, #ffd1dc 60%, transparent 100%);
          border-radius: 50%;
          position: absolute;
          top: 0;
          animation: sparkle-fall 3s linear infinite;
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.6s ease-in-out infinite;
        }

        @keyframes writeText {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-writeText {
          animation: writeText 3s ease forwards;
        }

        @keyframes heartFill {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-heartFill {
          animation: heartFill 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

const motionProps = {
  variants: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.6 },
};
