import React from 'react';
import { AtmosphereType } from '../types';

interface AtmosphereLightingProps {
  atmosphere: AtmosphereType;
}

export const AtmosphereLighting: React.FC<AtmosphereLightingProps> = ({ atmosphere }) => {
  return (
    <>
      {/* Dynamic Lighting Overlay Layer */}
      <div 
        className={`pointer-events-none fixed inset-0 z-25 transition-all duration-700 ${
          atmosphere === 'morning' ? 'lighting-morning' :
          atmosphere === 'lamp' ? 'lighting-lamp' :
          atmosphere === 'night' ? 'lighting-night' :
          atmosphere === 'horror' ? 'lighting-horror' : 'lighting-cafe'
        }`}
      />

      {/* Horror / Thunder occasional lightning flash pulse */}
      {atmosphere === 'horror' && (
        <div className="pointer-events-none fixed inset-0 z-26 bg-indigo-200/10 mix-blend-screen animate-pulse" />
      )}

      {/* Desk Ambient Accessories (Placed naturally along the vintage wooden desk border) */}
      
      {/* 1. Vintage Egyptian Tea Glass with Mint and Rising Steam (كوباية شاي مصري بالنعناع وبخار متصاعد) */}
      <div className="hidden xl:flex fixed bottom-8 right-6 z-28 flex-col items-center pointer-events-none select-none">
        {/* Steam */}
        <div className="relative w-8 h-10 mb-[-4px]">
          <div className="absolute left-2 w-1.5 h-6 bg-white/40 blur-[2px] rounded-full animate-steam-1" />
          <div className="absolute left-4 w-2 h-7 bg-white/30 blur-[2px] rounded-full animate-steam-2" />
        </div>

        {/* Realistic Glass Cup */}
        <div 
          className="relative w-14 h-20 rounded-b-xl border-2 border-amber-200/40 shadow-2xl overflow-hidden flex flex-col justify-end p-1"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(120,40,10,0.6) 40%, rgba(70,20,5,0.9) 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset 0 0 10px rgba(255,200,100,0.3)'
          }}
        >
          {/* Tea Level */}
          <div className="h-14 w-full bg-gradient-to-t from-[#4a1806] to-[#a3380e] rounded-b-lg relative overflow-hidden">
            {/* Mint Leaves in tea */}
            <div className="absolute bottom-2 left-2 w-3 h-4 bg-emerald-600/80 rounded-full transform -rotate-45" />
            <div className="absolute bottom-3 left-4 w-2.5 h-3 bg-emerald-500/70 rounded-full transform rotate-12" />
            {/* Spoon reflection */}
            <div className="absolute top-0 right-3 w-1 h-14 bg-stone-300/60 rounded-full transform rotate-6" />
          </div>
        </div>

        {/* Small Glass Saucer */}
        <div className="w-20 h-2 bg-stone-900/60 border border-amber-500/30 rounded-full mt-[-2px] shadow-lg" />
        <span className="text-[10px] text-amber-300/60 font-aref mt-1">شاي بالنعناع</span>
      </div>

      {/* 2. Vintage Reading Glasses (نظارة القراءة الكلاسيكية بإطار ذهبي) */}
      <div className="hidden 2xl:flex fixed top-24 left-8 z-28 flex-col items-center pointer-events-none select-none opacity-85">
        <div className="flex items-center gap-1">
          {/* Left Lens */}
          <div className="w-10 h-8 rounded-full border-2 border-amber-600/80 bg-amber-100/10 backdrop-blur-[1px] shadow-md flex items-center justify-center">
            <div className="w-6 h-0.5 bg-white/20 transform -rotate-45 rounded-full" />
          </div>
          {/* Bridge */}
          <div className="w-3 h-1 border-t-2 border-amber-600/80 rounded-full" />
          {/* Right Lens */}
          <div className="w-10 h-8 rounded-full border-2 border-amber-600/80 bg-amber-100/10 backdrop-blur-[1px] shadow-md flex items-center justify-center">
            <div className="w-6 h-0.5 bg-white/20 transform -rotate-45 rounded-full" />
          </div>
        </div>
        <span className="text-[9px] text-amber-400/50 font-amiri mt-0.5">نظارة القراءة</span>
      </div>
    </>
  );
};
