import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import {
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  Users,
  HeartPulse,
  BookOpen,
  Compass,
  ShieldCheck,
  Cpu
} from "lucide-react";

export default function AboutMe() {
  const [step, setStep] = useState(0);
  const [delayedStep, setDelayedStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 3500); // smooth flip interval
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedStep(step);
    }, 400); // Wait 400ms (half of 800ms transition) before updating the hidden side
    return () => clearTimeout(timer);
  }, [step]);

  const isFlipped = step % 2 === 1;

  // Track the actual face index to display on Front (even steps) and Back (odd steps)
  // During flip, keep the hidden side constant (displaying delayedStep % 3) until it is completely out of view.
  const frontFace = step % 2 === 0
    ? (step % 3)
    : (delayedStep === step ? ((step + 1) % 3) : (delayedStep % 3));

  const backFace = step % 2 === 1
    ? (step % 3)
    : (delayedStep === step ? ((step + 1) % 3) : (delayedStep % 3));

  const renderFaceContent = (faceIndex: number) => {
    if (faceIndex === 0) {
      return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-950/20 to-cosmic-card/90">
          <Logo mode="full" className="scale-[0.75]" />
        </div>
      );
    } else if (faceIndex === 1) {
      return (
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <img
            src="/doctor_white_coat.png"
            alt="Dr. Dheeraj Vishwakarma"
            className="w-full h-full object-cover rounded-2xl scale-[1.35] origin-center"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent animate-fade-in" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-10">
            <span className="font-mono text-[8px] text-gold-400 uppercase tracking-[0.25em] block mb-0.5 font-bold">SURGEON-IN-CHIEF</span>
            <h4 className="font-display font-black text-sm tracking-wide text-white">Dr. Dheeraj Vishwakarma</h4>
            <p className="font-sans text-[10px] text-gray-300">Monoportal Endoscopic Spine Specialist</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <img
            src="/doctor_scrubs_provided.jpg"
            alt="Dr. Dheeraj Vishwakarma in Scrubs"
            className="w-full h-full object-cover rounded-2xl scale-[1.35] origin-center"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent animate-fade-in" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-10">
            <span className="font-mono text-[8px] text-gold-400 uppercase tracking-[0.25em] block mb-0.5 font-bold">CLINICAL EXCELLENCE</span>
            <h4 className="font-display font-black text-sm tracking-wide text-white">Dr. Dheeraj Vishwakarma</h4>
            <p className="font-sans text-[10px] text-gray-300">Minimally Invasive Spine Specialist</p>
          </div>
        </div>
      );
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const educationalMilestones = [
    {
      degree: "Advanced Clinical Training in Full Monoportal Endoscopic Spine Surgery (FESS)",
      institution: "St. Anna Hospital, Germany",
      period: "2024",
      location: "Herne, Germany",
      details: "Advanced clinical training in Full Monoportal Endoscopic Spine Surgery under the mentorship of Professor Dr. Sebastian Rutten and Professor Dr. Martin Komp, internationally renowned pioneers."
    },
    {
      degree: "Fellowship in Minimally Invasive Spine Surgery (MISS) & Full Monoportal Endoscopic Spine Surgery (FESS)",
      institution: "Asian Spine Hospital, Hyderabad",
      period: "2024",
      location: "Hyderabad, India",
      details: "Trained under Dr. Sukumar Sura, a leading authority in endoscopic spine surgery."
    },
    {
      degree: "Magister Chirurgiae (M.Ch) in Neurosurgery",
      institution: "Govind Ballabh Pant Institute of Post Graduate Medical Education and Research (GIPMER), New Delhi",
      period: "2020 - 2023",
      location: "New Delhi",
      details: "Specialized residency and rigorous surgical drilling at one of India's premier, highest-volume neurosurgical referral centers."
    },
    {
      degree: "Master of Surgery (MS)",
      institution: "Sawai Man Singh (SMS) Medical College, Jaipur",
      period: "2017 - 2020",
      location: "Jaipur, Rajasthan",
      details: "In-depth clinical training in complex general and trauma surgery guidelines."
    },
    {
      degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
      institution: "BJ Government Medical College, Pune",
      period: "2009 - 2014",
      location: "Pune, Maharashtra",
      details: "Solid medicine foundation at a highly reputed state institution."
    }
  ];

  const executiveStrengths = [
    {
      title: "Full Monoportal Endoscopic Spine Surgery (FESS)",
      desc: "Mastery in monoportal endoscopic discectomy and neural decompressions. Able to operate through ultra-precision channels under 8mm with single-stitch closure."
    },
    {
      title: "Cervical, Dorsal & Lumbar Monoportal Decompression",
      desc: "Pioneered advanced keyhole spinal decompressions. Among the first in the nation to perform complex cervical-dorsal monoportal endoscopic spine surgery to international standards."
    },
    {
      title: "General Neurosurgery & Microsurgical Reconstruction",
      desc: "Skilled in complex brain tumor excisions, micro-neurotrauma reconstruction, shunt installations, and neurovascular interventions."
    }
  ];

  const majorAchievementsList = [
    {
      type: "Asia & India Book of Records",
      title: "Youngest Pediatric Endoscopic Discectomy",
      event: "Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records."
    },
    {
      type: "State Landmark Milestone",
      title: "First Monoportal Surgery in Rajasthan",
      event: "Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan."
    },
    {
      type: "Cervical Spine Milestone",
      title: "First Cervical Monoportal Discectomy",
      event: "Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan."
    },
    {
      type: "Dorsal Spine Milestone",
      title: "First Dorsal Monoportal Discectomy",
      event: "Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan."
    },
    {
      type: "Minimally Invasive Expertise",
      title: "Single-Stitch Spine Surgery",
      event: "Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma."
    },
    {
      type: "Academic Book Chapter",
      title: "Lumbar Canal Stenosis",
      event: "Contributed a key instructional chapter to 'A Practical Manual on Full Monoportal Endoscopic Spine Surgery', sharing clinical principles with peers."
    }
  ];

  const memberships = [
    "Bharat Academy of Spine Endoscopy (BASE)",
    "Neurosurgical Society of India (NSI)",
    "Neurological Surgeons Society of India (NSSI)",
    "Cerebrovascular Society of India (CVSI)",
    "Skull Base Surgery Society of India (SBSSI)",
    "Dandy International Neurosurgical Society (WFNS Affiliate)"
  ];

  return (
    <section
      id="about-section"
      className="relative py-28 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-gradient-to-b from-cosmic-bg via-[#050811] to-cosmic-bg overflow-hidden"
    >
      {/* Background spotlights & visual ambient grid lines */}
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[350px] bg-gold-glow opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[350px] bg-sky-500/10 opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-16">

        {/* Editorial Title Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/5 text-sky-300">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">About the Surgeon-in-Chief</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
              Decade of Academic Excellence & <span className="text-gold-400">700+ Successes.</span>
            </h1>
          </div>
          <div className="md:col-span-4 text-left md:text-right pb-1">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block">
              TRAINED AT GIPMER, NEW DELHI
            </span>
          </div>
        </div>

        {/* Major Medical Bento Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >

          {/* Column 1: Main Surgeon Credential and Resume Bio */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-3xl glassmorphism border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent space-y-8 relative overflow-hidden"
          >
            {/* Visual shine overlay */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold-400/5 blur-3xl rounded-full pointer-events-none" />

            <div className="space-y-6">
              {/* Interactive 3D Flip Card: Logo Front / Doctor Portrait Back */}
              <div className="flex justify-center border-b border-white/5 pb-6">
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setStep((prev) => prev + 1)}
                  className="relative w-full max-w-[280px] aspect-[4/5] cursor-pointer perspective-1000"
                >
                  <div
                    className="relative w-full h-full transform-style-3d"
                    style={{
                      transform: `rotateY(${step * 180}deg)`,
                      transition: "transform 800ms cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Front Side */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-zinc-950 ${frontFace === 0 ? "border border-white/10" : "border border-gold-400/20"
                      }`}>
                      {renderFaceContent(frontFace)}
                    </div>

                    {/* Back Side */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl rotate-y-180 bg-zinc-950 ${backFace === 0 ? "border border-white/10" : "border border-gold-400/20"
                      }`}>
                      {renderFaceContent(backFace)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white">Dr. Dheeraj Vishwakarma</h3>
                  <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">M.Ch Neurosurgery, MS, MBBS</p>
                </div>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                Dr. Dheeraj Vishwakarma is a Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures. He completed his prestigious Magister Chirurgiae (M.Ch) residency at GIPMER, New Delhi.
              </p>

              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Bringing clinical pedigree and advanced procedural innovation, Dr. Dheeraj specializes in ultra-minimally invasive techniques. Through a single-stitch keyhole incision under 8mm, he decompresses nerve routes cleanly—minimizing diagnostic hospital stay and returning mobility in hours.
              </p>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs text-white font-medium">Top-tier Training</p>
                    <p className="text-[10px] text-gray-500">M.Ch residency completed from elite GIPMER, Delhi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs text-white font-medium">700+ Endoscopic Successes</p>
                    <p className="text-[10px] text-gray-500">Documented back, neck and sciatica releases</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/2 rounded-2xl p-4 border border-white/5 space-y-2">
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">high-volume residency output</p>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Managed a critical volume of <strong className="text-white">20+ complex spine and neurosurgeries</strong> and outpatient operations of <strong className="text-white">400+ patients per week</strong> at a high volume referral center in New Delhi (2020-2023).
              </p>
            </div>
          </motion.div>

          {/* Column 2: Rigorous Education & Experience Timelines */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 flex flex-col p-6 sm:p-8 rounded-3xl glassmorphism border border-white/5 bg-gradient-to-br from-sky-500/[0.01] to-transparent space-y-8"
          >
            <div className="flex items-center gap-2 text-gold-400">
              <GraduationCap className="w-5 h-5" />
              <h2 className="font-display font-medium text-lg text-white">Surgical Training & Degrees</h2>
            </div>

            <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-3 space-y-8">
              {educationalMilestones.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline point node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-[9px] h-[9px] bg-sky-500 rounded-full border-4 border-cosmic-bg group-hover:bg-gold-400 transition-colors duration-200" />

                  <div className="space-y-1.5 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-gold-300 transition-colors">
                        {milestone.degree}
                      </h4>
                      <span className="font-mono text-[10px] text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold shrink-0">
                        {milestone.period}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-medium">
                      {milestone.institution} — <span className="text-gray-500">{milestone.location}</span>
                    </p>

                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans max-w-2xl">
                      {milestone.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-sky-400">
                <Briefcase className="w-5 h-5 text-sky-400" />
                <h3 className="font-display font-semibold text-sm text-white">Clinical Strengths & Surgical Capabilities</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {executiveStrengths.map((str, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-1.5 hover:border-gold-400/20 transition-all duration-300">
                    <p className="font-display text-xs text-gold-300 font-semibold">{str.title}</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{str.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </motion.div>

        {/* Achievements Timeline & Paper Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">

          {/* Awards & Chapters Bento Box */}
          <div className="lg:col-span-8 flex flex-col p-6 sm:p-8 rounded-3xl glassmorphism border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent space-y-6">
            <div className="flex items-center gap-2 text-gold-400">
              <Award className="w-5 h-5" />
              <h2 className="font-display font-medium text-lg text-white">Prestigious Awards & Academic Contributions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              {majorAchievementsList.map((ach, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between space-y-3 relative group hover:border-gold-400/20 transition-all duration-300">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-sky-400 uppercase tracking-widest font-bold">
                      {ach.type}
                    </span>
                    <h4 className="font-display font-semibold text-xs text-white group-hover:text-gold-300 transition-colors mt-0.5">
                      {ach.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                    {ach.event}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Memberships Panel & Workshops */}
          <div className="lg:col-span-4 flex flex-col p-6 sm:p-8 rounded-3xl glassmorphism border border-white/5 bg-gradient-to-br from-gold-400/[0.01] to-transparent justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-gold-400">
                <Users className="w-5 h-5" />
                <h2 className="font-display font-medium text-lg text-white">Board Memberships</h2>
              </div>

              <ul className="space-y-3 font-sans text-xs text-left">
                {memberships.map((memb, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span className="leading-tight">{memb}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-sky-400/10 text-left space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono text-[8px] uppercase tracking-widest font-bold">Active Continuous Study</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                Dr. Dheeraj Vishwakarma routinely participates in cadaveric workshops, live spine training symposia, and global neuroendovascular assemblies to continually perfect keyhole medical science.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
