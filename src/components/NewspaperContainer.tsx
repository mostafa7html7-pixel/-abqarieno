import React, { useState, useEffect } from 'react';
import { NewspaperPage } from './NewspaperPage';
import { DrawingCanvas } from './DrawingCanvas';
import { ToolType, InkColor, StampType, PaperCrease } from '../types';
import { soundManager } from '../services/soundEffects';
import { ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';

interface NewspaperContainerProps {
  activeTool: ToolType;
  inkColor: InkColor;
  pencilSharpness: number;
  onPencilUse: (delta: number) => void;
  activeStamp: StampType;
  clearPageTrigger: number;
}

export const NewspaperContainer: React.FC<NewspaperContainerProps> = ({
  activeTool,
  inkColor,
  pencilSharpness,
  onPencilUse,
  activeStamp,
  clearPageTrigger
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [creases, setCreases] = useState<PaperCrease[]>([]);

  const totalPages = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      soundManager.playPageFlip();
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p + 1);
        setIsFlipping(false);
      }, 260);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isFlipping) {
      soundManager.playPageFlip();
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p - 1);
        setIsFlipping(false);
      }, 260);
    }
  };

  const handleJumpToPage = (pageNum: number) => {
    if (pageNum !== currentPage && !isFlipping) {
      soundManager.playPageFlip();
      setFlipDirection(pageNum > currentPage ? 'next' : 'prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageNum);
        setIsFlipping(false);
      }, 260);
    }
  };

  const handleAddCrease = (crease: PaperCrease) => {
    setCreases(prev => [...prev.slice(-25), crease]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't flip page if user is focused inside crossword text input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handleNextPage();
      } else if (e.key === 'ArrowRight') {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  return (
    <div className="relative font-amiri w-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Page Tabs / Section Ribbon */}
      <div className="w-full flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {[
            { num: 1, title: 'المانشيت والصفحة الأولى' },
            { num: 2, title: 'مقالات الرأي والفكر' },
            { num: 3, title: 'الكلمات المتقاطعة والكاريكاتير' },
            { num: 4, title: 'الفنون وكلاسيكيات زمان' },
            { num: 5, title: 'كشكول الملاحظات الحرة' },
          ].map(p => {
            const isActive = p.num === currentPage;
            return (
              <button
                key={p.num}
                onClick={() => handleJumpToPage(p.num)}
                className={`px-3 py-1 rounded-t-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border-t border-x ${
                  isActive
                    ? 'bg-[#f5eedc] text-stone-950 border-stone-800 shadow-md transform -translate-y-0.5'
                    : 'bg-stone-900/60 text-amber-200/70 border-stone-800 hover:text-amber-100 hover:bg-stone-800/80'
                }`}
              >
                <Bookmark className={`w-3 h-3 ${isActive ? 'text-amber-700' : 'text-stone-500'}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Page Flip Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-2.5 py-1 bg-stone-900/80 text-amber-100 rounded border border-amber-900/40 text-xs flex items-center gap-1 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="الصفحة السابقة (سهم يمين)"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="hidden sm:inline">السابقة</span>
          </button>
          <span className="text-xs text-amber-300 font-bold px-1 font-mono">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-2.5 py-1 bg-stone-900/80 text-amber-100 rounded border border-amber-900/40 text-xs flex items-center gap-1 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="الصفحة التالية (سهم يسار)"
          >
            <span className="hidden sm:inline">التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Realistic Broadsheet Newspaper Card */}
      <div className="relative w-full shadow-2xl transition-transform duration-300">
        
        {/* Layer of stacked underlying paper pages giving 3D physical book depth */}
        <div className="absolute inset-0 bg-[#e3d7be] rounded-sm transform translate-x-1.5 translate-y-2 shadow-lg" />
        <div className="absolute inset-0 bg-[#ebe1cb] rounded-sm transform translate-x-1 translate-y-1 shadow-md" />

        {/* Active Newspaper Broadsheet Paper Sheet */}
        <div 
          className={`newspaper-paper paper-vignette relative rounded-sm border-2 border-stone-800 min-h-[620px] sm:min-h-[740px] overflow-hidden transition-all duration-300 ${
            isFlipping ? (flipDirection === 'next' ? 'scale-[0.985] opacity-90' : 'scale-[0.985] opacity-90') : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1400px'
          }}
        >
          {/* Subtle Authentic Newspaper Center Fold Line */}
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-stone-900/10 pointer-events-none z-10 hidden md:block" />

          {/* Corner Curl Click Affordance (Right Corner for Next Page in RTL) */}
          {currentPage < totalPages && (
            <div
              onClick={handleNextPage}
              className="absolute top-0 left-0 w-12 h-12 cursor-pointer z-30 group"
              title="انقر لقلب الصفحة التالية"
            >
              <div className="w-full h-full page-curl-corner group-hover:scale-110 transition-transform origin-top-left" />
            </div>
          )}

          {/* Corner Curl Click Affordance (Left Corner for Prev Page in RTL) */}
          {currentPage > 1 && (
            <div
              onClick={handlePrevPage}
              className="absolute top-0 right-0 w-12 h-12 cursor-pointer z-30 group"
              title="انقر للرجوع للصفحة السابقة"
            >
              <div className="w-full h-full page-curl-corner transform scale-x-[-1] group-hover:scale-110 transition-transform origin-top-right" />
            </div>
          )}

          {/* Newspaper Content Layer */}
          <div className="relative z-10 w-full h-full">
            <NewspaperPage pageNumber={currentPage} />
          </div>

          {/* Interactive Drawing Canvas Layer (Synchronized per page) */}
          <DrawingCanvas
            key={`canvas-page-${currentPage}-${clearPageTrigger}`}
            currentPage={currentPage}
            activeTool={activeTool}
            inkColor={inkColor}
            pencilSharpness={pencilSharpness}
            onPencilUse={onPencilUse}
            activeStamp={activeStamp}
            creases={creases}
            onAddCrease={handleAddCrease}
          />
        </div>
      </div>

      {/* Tactile interaction help hint */}
      <div className="text-center text-[11px] text-amber-300/70 mt-3 flex items-center justify-center gap-2">
        <span>💡 نصيحة الملمس:</span>
        <span>يمكنك النقر والضغط المتكرر في نفس المكان على الورق لإحداث أثر التجعد والتآكل الحقيقي.</span>
      </div>

    </div>
  );
};
