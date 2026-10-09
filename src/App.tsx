import React, { useState } from 'react';
import { NewspaperContainer } from './components/NewspaperContainer';
import { ToolboxBar } from './components/ToolboxBar';
import { AtmosphereSelector } from './components/AtmosphereSelector';
import { VintageRadio } from './components/VintageRadio';
import { AtmosphereLighting } from './components/AtmosphereLighting';
import { ToolType, InkColor, StampType, AtmosphereType } from './types';
import { soundManager } from './services/soundEffects';
import { Volume2, VolumeX, Sparkles, Feather } from 'lucide-react';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('pencil');
  const [inkColor, setInkColor] = useState<InkColor>('blue');
  const [pencilSharpness, setPencilSharpness] = useState<number>(100);
  const [activeStamp, setActiveStamp] = useState<StampType>('urgent');
  const [atmosphere, setAtmosphere] = useState<AtmosphereType>('morning');
  const [clearPageTrigger, setClearPageTrigger] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handlePencilUse = (delta: number) => {
    setPencilSharpness(prev => Math.max(5, prev - delta));
  };

  const handleSharpenPencil = () => {
    setPencilSharpness(100);
  };

  const handleClearPage = () => {
    setClearPageTrigger(prev => prev + 1);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  return (
    <div className="min-h-screen bg-wood-desk text-stone-200 flex flex-col justify-between selection:bg-amber-800 selection:text-amber-100 relative overflow-x-hidden font-amiri" dir="rtl">
      
      {/* Dynamic Lighting & Atmospheric Overlays */}
      <AtmosphereLighting atmosphere={atmosphere} />

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="relative z-40 flex items-center justify-between gap-8 px-6 py-3.5 border-b border-amber-950/60 bg-stone-950/90 backdrop-blur-md">
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <Feather className="w-5 h-5 text-amber-500" />
          <a href="#" className="text-xl font-aref font-black tracking-tight text-amber-200 whitespace-nowrap">
            جريدة الأهرام • ديوان مصر الخالد
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-amiri text-stone-300">
          <span className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
            الصفحة الأولى والمانشيت
          </span>
          <span className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
            أعمدة الفكر ونجيب محفوظ
          </span>
          <span className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
            الكلمات المتقاطعة والكاريكاتير
          </span>
          <span className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
            كوكب الشرق وإعلانات زمان
          </span>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            className="px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95"
            title={isMuted ? 'تشغيل الأصوات الفيزيائية' : 'كتم أصوات الورق'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? 'صوت صامت' : 'مؤثرات الملمس'}</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Desk Working Area */}
      <main className="relative z-30 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
        
        {/* Top Control Strips: Atmosphere Bar & Toolbox */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <AtmosphereSelector
            currentAtmosphere={atmosphere}
            onAtmosphereChange={setAtmosphere}
          />

          <ToolboxBar
            activeTool={activeTool}
            onToolSelect={setActiveTool}
            inkColor={inkColor}
            onColorSelect={setInkColor}
            pencilSharpness={pencilSharpness}
            onSharpenPencil={handleSharpenPencil}
            activeStamp={activeStamp}
            onStampSelect={setActiveStamp}
            onClearPage={handleClearPage}
          />
        </div>

        {/* Main Content Layout: Broadsheet Paper Center + Radio Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pt-1">
          {/* Newspaper Broadsheet (Main Focus) */}
          <div className="xl:col-span-8 order-2 xl:order-1">
            <NewspaperContainer
              activeTool={activeTool}
              inkColor={inkColor}
              pencilSharpness={pencilSharpness}
              onPencilUse={handlePencilUse}
              activeStamp={activeStamp}
              clearPageTrigger={clearPageTrigger}
            />
          </div>

          {/* Side Desk Companion: Vintage Radio for Quran & Reciters */}
          <div className="xl:col-span-4 order-1 xl:order-2 space-y-4">
            <VintageRadio
              isMorningMode={atmosphere === 'morning'}
            />

            {/* Antique Egyptian Editorial Note */}
            <div 
              className="p-4 rounded-xl border border-amber-900/40 text-stone-300 space-y-2 text-xs"
              style={{
                background: 'linear-gradient(145deg, rgba(30, 18, 10, 0.85) 0%, rgba(15, 8, 4, 0.95) 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,200,100,0.1)'
              }}
            >
              <div className="flex items-center gap-1.5 text-amber-300 font-bold font-aref text-sm border-b border-amber-900/40 pb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>دليل التجربة الصحفية ولمس الورق:</span>
              </div>
              <ul className="space-y-1.5 text-[12px] leading-relaxed text-amber-100/80">
                <li>• <strong>الكتابة بالقلم الرصاص:</strong> يتآكل سن القلم تدريجياً كلما كتبت، اضغط على «ابري القلم» لسماع صوت البراية وتطاير النشارة.</li>
                <li>• <strong>القلم الجاف والأستيكة:</strong> اختر ألوان الحبر، واستخدم الأستيكة التي تترك فتاتاً واقعياً يمكنك نفخه.</li>
                <li>• <strong>حساسية الورق:</strong> اضغط متكرراً على أي موضع في الورق لإحداث أثر التجعد والتأثر الحقيقي بالضغط.</li>
                <li>• <strong>القرآن الكريم والصباح:</strong> استمع لأعذب تلاوات الشيخ عبد الباسط والمنشاوي والدوسري وإذاعة القرآن الكريم من القاهرة.</li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      {/* Clean Desk Base Footer */}
      <footer className="relative z-30 py-3 px-6 border-t border-amber-950/60 bg-stone-950/90 text-center text-xs text-amber-400/60 font-amiri">
        <p>جريدة الأهرام التفاعلية • محاكاة ملمس الورق والطباعة الصحفية العريقة • القاهرة ١٨٧٥</p>
      </footer>

    </div>
  );
}
