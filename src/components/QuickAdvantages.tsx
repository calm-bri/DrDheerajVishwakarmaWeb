import React from "react";
import { motion } from "motion/react";

export default function QuickAdvantages() {
  const advantages = [
    {
      title: "8mm Incision",
      hindi: "केवल 8 मिमी का छोटा चीरा",
      src: "/icon_8mm.png",
      num: "01",
      theme: "gold",
      borderColor: "border-gold-400/30 text-gold-400"
    },
    {
      title: "Less Blood Loss",
      hindi: "न्यूनतम रक्तस्राव",
      src: "/icon_bloodloss.png",
      num: "02",
      theme: "gold",
      borderColor: "border-gold-400/30 text-gold-400"
    },
    {
      title: "Minimal Damage",
      hindi: "मांसपेशियों और हड्डियों को न्यूनतम नुकसान",
      src: "/icon_damage.png",
      num: "03",
      theme: "gold",
      borderColor: "border-gold-400/30 text-gold-400"
    },
    {
      title: "High Precision",
      hindi: "अत्यधिक सटीक सर्जरी",
      src: "/icon_precision.png",
      num: "04",
      theme: "gold",
      borderColor: "border-gold-400/30 text-gold-400"
    },
    {
      title: "Low Complications",
      hindi: "जटिलताओं की संभावना कम",
      src: "/icon_complications.png",
      num: "05",
      theme: "green",
      borderColor: "border-emerald-400/30 text-emerald-400"
    },
    {
      title: "Better Cosmetic Results",
      hindi: "बेहतर कॉस्मेटिक परिणाम",
      src: "/icon_cosmetic.png",
      num: "06",
      theme: "green",
      borderColor: "border-emerald-400/30 text-emerald-400"
    },
    {
      title: "Early Discharge",
      hindi: "जल्दी रिकवरी और शीघ्र छुट्टी",
      src: "/icon_discharge.png",
      num: "07",
      theme: "green",
      borderColor: "border-emerald-400/30 text-emerald-400"
    },
    {
      title: "Advanced Technique",
      hindi: "आधुनिक और उन्नत तकनीक",
      src: "/icon_advanced.png",
      num: "08",
      theme: "green",
      borderColor: "border-emerald-400/30 text-emerald-400"
    }
  ];

  return (
    <section className="relative py-16 bg-cosmic-bg overflow-hidden border-t border-b border-white/5">
      <style>{`
        .advantages-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 1024px) {
          .advantages-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .advantage-card {
          position: relative;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        /* Vertical separating lines */
        .advantage-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10%;
          bottom: 10%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08) 50%, transparent);
        }
        /* Hide left separating lines for first cards in a row */
        @media (max-width: 1023px) {
          .advantage-card:nth-child(2n+1)::before {
            display: none;
          }
        }
        @media (min-width: 1024px) {
          .advantage-card:nth-child(4n+1)::before {
            display: none;
          }
        }



        /* Glass sphere icon container */
        .advantage-card .icon-sphere {
          width: 6.2rem;
          height: 6.2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: hidden;
        }
        .advantage-card:hover .icon-sphere {
          transform: scale(1.06) translateY(-3px);
        }

        /* Dynamic background glows behind cards */
        .advantage-card .glow-backdrop {
          position: absolute;
          width: 7.5rem;
          height: 7.5rem;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
          opacity: 0.18;
          transition: opacity 0.3s ease;
        }
        .advantage-card:hover .glow-backdrop {
          opacity: 0.3;
        }

        .advantage-card .card-title {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.015em;
        }
        .advantage-card .card-subtitle {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #9ca3af;
          line-height: 1.4;
          max-width: 92%;
        }
      `}</style>

      {/* Grid Container */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="advantages-grid">
          {advantages.map((item, index) => {
            const isGold = item.theme === "gold";
            const glowColor = isGold ? "rgba(193, 161, 113, 0.4)" : "rgba(52, 211, 153, 0.4)";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="advantage-card group"
              >
                {/* Light reflection glow behind card */}
                <div
                  className="glow-backdrop"
                  style={{ backgroundColor: glowColor }}
                />

                {/* Large translucent glass sphere */}
                <div className="icon-sphere">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                {/* Card Title */}
                <h3 className="card-title">{item.title}</h3>

                {/* Card Hindi subtitle */}
                <p className="card-subtitle">{item.hindi}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
