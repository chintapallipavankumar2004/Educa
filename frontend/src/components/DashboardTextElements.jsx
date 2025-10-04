import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function DashboardTextElements(){
  const titleControls = useAnimation();
  const quoteControls = useAnimation();

  useEffect(()=>{
    (async ()=>{
      await titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } });
      // start quote pulse
      quoteControls.start({ scale: [1, 1.03, 1], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } });
    })();
  },[titleControls, quoteControls]);

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={titleControls}
        className="text-4xl md:text-5xl font-extrabold text-emerald-700"
      >
        EDUCA — Learn with Calm
      </motion.h1>

      {/* Welcome message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
        className="text-lg text-gray-700"
      >
        Welcome back, Pavan 👋 Keep learning with peace of mind.
      </motion.p>

      {/* Section headings row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['My Courses','Progress Tracker','Quizzes','Mindfulness Tools'].map((s,i)=> (
          <motion.h3 key={s} whileHover={{ y: -4 }} className="text-sm font-semibold text-emerald-600">{s}</motion.h3>
        ))}
      </div>

      {/* Quick stats with count-up animations */}
      <div className="flex gap-4 items-center">
        {[
          {label:'Enrolled Courses', value: 8},
          {label:'Completed Quizzes', value: 14},
          {label:'Learning Streak', value: 7}
        ].map((s, idx)=> (
          <StatCard key={s.label} label={s.label} value={s.value} delay={0.2*idx} />
        ))}
      </div>

      {/* Motivational quote */}
      <motion.blockquote
        className="inline-block px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-sm shadow-md"
        initial={{ opacity: 0 }}
        animate={quoteControls}
      >
        “Your well-being matters as much as your learning.”
      </motion.blockquote>
    </div>
  );
}

function StatCard({ label, value, delay=0 }){
  const [current, setCurrent] = useState(0);

  useEffect(()=>{
    let raf;
    const duration = 900;
    const start = performance.now();

    function step(ts){
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const v = Math.round(progress * value);
      setCurrent(v);
      if(progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return ()=> cancelAnimationFrame(raf);
  },[value]);

  return (
    <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0, transition:{delay} }} whileHover={{ scale: 1.03 }} className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm flex-1">
      <div className="text-2xl font-bold text-emerald-700">{current}</div>
      <div className="text-xs text-emerald-600">{label}</div>
    </motion.div>
  );
}
