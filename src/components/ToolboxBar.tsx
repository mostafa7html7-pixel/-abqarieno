import React, { useState } from 'react';
import { ToolType, InkColor, StampType } from '../types';
import { soundManager } from '../services/soundEffects';
import { 
  PenTool, 
  Eraser, 
  Stamp, 
  Hand, 
  Trash2, 
  Sparkles,
  Download
} from 'lucide-react';

interface ToolboxBarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  inkColor: InkColor;
  onColorSelect: (color: InkColor) => void;
  pencilSharpness: number;
  onSharpenPencil: () => void;
  activeStamp: StampType;
  onStampSelect: (stamp: StampType) => void;
  onClearPage: () => void;
}

export const ToolboxBar: React.FC<ToolboxBarProps> = ({
  activeTool,
  onToolSelect,
  inkColor,
  onColorSelect,
  pencilSharpness,
  onSharpenPencil,
  activeStamp,
  onStampSelect,
  onClearPage,
}) => {
  const [showShavingAnim, setShowShavingAnim] = useState<boolean>(false);

  const handleToolClick = (tool: ToolType) => {
    onToolSelect(tool);
    if (tool === 'pencil') {
      soundManager.playPencilScratch(1);
    } else if (tool === 'ballpoint' || tool === 'fountain') {
      soundManager.playBallpointScratch();
    } else if (tool === 'eraser') {
      soundManager.playEraserRub();
    } else if (tool === 'touch') {
      soundManager.playPaperTouch();
    } else if (tool === 'stamp') {
      soundManager.playStampSound();
    }
  };

  const handleSharpen = () => {
    soundManager.playPencilSharpener();
    setShowShavingAnim(true);
    onSharpenPencil();
    setTimeout(() => {
      setShowShavingAnim(false);
    }, 1200);
  };

  return (
    <div className="relative font-amiri z-30 select-none">
      {/* Wooden Desk Accessory Tray */}
      <div 
        className="px-4 py-2.5 rounded-xl shadow-xl flex flex-wrap items-center justify-between gap-3"
        style={{
          background: 'linear-gradient(180deg, #382415 0%, #22140a 100%)',
          border: '2px solid #5a381e',
          boxShadow: '0 8px 25px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)'
        }}
      >
        {/* Left Section: Drawing Instruments */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Pencil (قلم رصاص) */}
          <div className="flex items-center gap-1 bg-stone-900/40 p-1 rounded-lg border border-amber-900/30">
            <button
              onClick={() => handleToolClick('pencil')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'pencil'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                  : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-800/40'
              }`}
              title="قلم رصاص فحم للجرافيت"
            >
              <span className="text-sm">✏️</span>
              <span>قلم رصاص</span>
            </button>

            {/* Pencil Sharpness Meter */}
            <div className="flex flex-col items-center px-1" title={`حدة سن القلم: ${Math.round(pencilSharpness)}%`}>
              <div className="w-10 h-1.5 bg-stone-950 rounded-full overflow-hidden border border-amber-900/50">
                <div
                  className={`h-full transition-all duration-300 ${
                    pencilSharpness > 40 ? 'bg-amber-400' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.max(5, pencilSharpness)}%` }}
                />
              </div>
              <span className="text-[9px] text-amber-400/80 font-mono">{Math.round(pencilSharpness)}%</span>
            </div>

            {/* Sharpener Button (براية القلم الخشبية) */}
            <button
              onClick={handleSharpen}
              className="relative px-2 py-1 text-xs bg-amber-900/60 hover:bg-amber-700/80 text-amber-100 rounded border border-amber-700/60 flex items-center gap-1 shadow-sm transition-transform active:scale-90"
              title="ابري القلم بالبراية الخشبية"
            >
              <span>⚙️</span>
              <span className="hidden sm:inline">ابري القلم</span>
            </button>
          </div>

          {/* Ballpoint Pen (قلم جاف) */}
          <button
            onClick={() => handleToolClick('ballpoint')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 border ${
              activeTool === 'ballpoint'
                ? 'bg-amber-600/30 border-amber-400 text-amber-100 font-bold'
                : 'bg-stone-900/40 border-amber-900/30 text-amber-200/80 hover:bg-stone-800/40'
            }`}
            title="قلم جاف أصلي"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>قلم جاف</span>
          </button>

          {/* Fountain Pen (قلم حبر عتيق) */}
          <button
            onClick={() => handleToolClick('fountain')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 border ${
              activeTool === 'fountain'
                ? 'bg-amber-600/30 border-amber-400 text-amber-100 font-bold'
                : 'bg-stone-900/40 border-amber-900/30 text-amber-200/80 hover:bg-stone-800/40'
            }`}
            title="ريشة حبر كلاسيكية عريضة"
          >
            <span>✒️</span>
            <span>حبر عتيق</span>
          </button>

          {/* Eraser (أستيكة) */}
          <button
            onClick={() => handleToolClick('eraser')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 border ${
              activeTool === 'eraser'
                ? 'bg-rose-900/40 border-rose-400 text-rose-100 font-bold'
                : 'bg-stone-900/40 border-amber-900/30 text-amber-200/80 hover:bg-stone-800/40'
            }`}
            title="أستيكة لمسح الرصاص"
          >
            <Eraser className="w-3.5 h-3.5 text-rose-300" />
            <span>أستيكة</span>
          </button>

          {/* Paper Touch / Inspect (ملمس الورق) */}
          <button
            onClick={() => handleToolClick('touch')}
            className={`px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 border ${
              activeTool === 'touch'
                ? 'bg-amber-400/20 border-amber-300 text-amber-100 font-bold'
                : 'bg-stone-900/40 border-amber-900/30 text-amber-300/70 hover:bg-stone-800/40'
            }`}
            title="لمس ملمس الورق والجريدة"
          >
            <Hand className="w-3.5 h-3.5 text-amber-400" />
            <span>ملمس الورق</span>
          </button>
        </div>

        {/* Ink Colors & Stamps */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Ink Color Selector (for Ballpoint & Fountain) */}
          {(activeTool === 'ballpoint' || activeTool === 'fountain') && (
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-amber-900/40">
              <span className="text-[10px] text-amber-300/70 ml-1">لون الحبر:</span>
              {(['blue', 'black', 'red', 'sepia'] as InkColor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundManager.playBallpointScratch();
                    onColorSelect(c);
                  }}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    c === 'blue' ? 'bg-blue-600' :
                    c === 'black' ? 'bg-stone-900' :
                    c === 'red' ? 'bg-red-600' : 'bg-[#593a1e]'
                  } ${inkColor === c ? 'scale-125 border-white ring-2 ring-amber-400' : 'border-stone-500 opacity-60'}`}
                />
              ))}
            </div>
          )}

          {/* Vintage Stamps Picker */}
          <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-amber-900/40">
            <button
              onClick={() => handleToolClick('stamp')}
              className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 font-bold ${
                activeTool === 'stamp' ? 'bg-amber-600 text-stone-950' : 'text-amber-200/80 hover:text-amber-100'
              }`}
            >
              <Stamp className="w-3.5 h-3.5" />
              <span>أختام مصرية:</span>
            </button>
            <select
              value={activeStamp}
              onChange={(e) => {
                soundManager.playStampSound();
                onStampSelect(e.target.value as StampType);
                onToolSelect('stamp');
              }}
              className="bg-stone-900 text-amber-200 text-xs rounded border border-amber-800/40 px-1.5 py-0.5 focus:outline-none"
            >
              <option value="urgent">عاجل (برقية حمراء)</option>
              <option value="approved">طالع وقُرئ (رئيس التحرير)</option>
              <option value="archive">أرشيف الأهرام (دار المحفوظات)</option>
              <option value="editor">مكتب النشر (أجيز للطبع)</option>
            </select>
          </div>

          {/* Clear Annotations */}
          <button
            onClick={() => {
              soundManager.playEraserRub();
              onClearPage();
            }}
            className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors"
            title="مسح كتابات هذه الصفحة"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flying Pencil Shavings Animation (شارة تطاير نشارة الخشب عند بري القلم) */}
      {showShavingAnim && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-stone-900/90 text-amber-200 px-6 py-3 rounded-xl border border-amber-600/60 shadow-2xl flex items-center gap-3 backdrop-blur-sm animate-bounce">
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="font-aref font-bold text-base text-amber-300">تم بري سن القلم بنجاح!</p>
              <p className="text-xs text-amber-100/70">تطايرت النشارة والسن حاد كالسيف الآن</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      )}
    </div>
  );
};
