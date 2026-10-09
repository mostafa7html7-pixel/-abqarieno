import React, { useState } from 'react';
import { soundManager } from '../services/soundEffects';
import { Check, RotateCcw, HelpCircle } from 'lucide-react';

interface CrosswordCell {
  row: number;
  col: number;
  solution: string;
  number?: number;
  isBlocked?: boolean;
}

export const InteractiveCrossword: React.FC = () => {
  // 5x5 vintage crossword grid
  // 1: ن ج ي ب (نجيب)
  // 2: ن ي ل (نيل)
  // 3: ا هـ ر ا م (أهرام)
  // 4: م ص ر (مصر)
  const initialGrid: (string | null)[][] = [
    ['ن', 'ج', 'ي', 'ب', '■'],
    ['ي', '■', 'و', '■', 'ا'],
    ['ل', '■', 'س', '■', 'هـ'],
    ['■', 'م', 'ف', '■', 'ر'],
    ['م', 'ص', 'ر', '■', 'ا'],
    ['■', '■', '■', '■', 'م'],
  ];

  const cellNumbers: { [key: string]: number } = {
    '0,0': 1,
    '0,1': 2,
    '0,2': 3,
    '0,4': 4,
    '4,0': 5,
  };

  const [userGrid, setUserGrid] = useState<{ [key: string]: string }>({});
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCellClick = (r: number, c: number, isBlocked: boolean) => {
    if (isBlocked) return;
    soundManager.playPencilScratch(0.5);
    setSelectedCell({ r, c });
  };

  const handleInputChange = (r: number, c: number, val: string) => {
    const char = val.trim().slice(-1);
    const key = `${r},${c}`;
    setUserGrid(prev => ({ ...prev, [key]: char }));
    soundManager.playPencilScratch(1.2);

    // Auto advance to next cell
    if (char && c < 4 && initialGrid[r][c + 1] !== '■') {
      setSelectedCell({ r, c: c + 1 });
    }
  };

  const handleCheck = () => {
    soundManager.playStampSound();
    let correct = true;
    let filled = 0;
    for (let r = 0; r < initialGrid.length; r++) {
      for (let c = 0; c < initialGrid[r].length; c++) {
        const sol = initialGrid[r][c];
        if (sol && sol !== '■') {
          filled++;
          if (userGrid[`${r},${c}`] !== sol) {
            correct = false;
          }
        }
      }
    }

    if (correct && Object.keys(userGrid).length >= filled) {
      setIsSolved(true);
      setFeedback('أحسنت صنعاً! الحل صحيح تماماً وبراعة صحفية');
    } else {
      setFeedback('هناك بعض الحروف تحتاج للمراجعة، حاول ثانيةً');
    }
  };

  const handleReset = () => {
    soundManager.playEraserRub();
    setUserGrid({});
    setIsSolved(false);
    setFeedback(null);
  };

  return (
    <div className="font-amiri border-2 border-stone-800 p-3 bg-amber-50/50 rounded-sm">
      <div className="flex items-center justify-between border-b-2 border-stone-800 pb-1.5 mb-2">
        <h4 className="font-aref font-bold text-stone-900 text-base">
          الكلمات المتقاطعة (عدد اليوم)
        </h4>
        <span className="text-xs text-stone-600 font-mono">إعداد: تحرير الأهرام</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {/* The Grid */}
        <div className="flex flex-col items-center">
          <div className="inline-grid grid-cols-5 border-2 border-stone-900 bg-stone-900 gap-[1px]">
            {initialGrid.map((row, r) =>
              row.map((val, c) => {
                const isBlocked = val === '■';
                const key = `${r},${c}`;
                const cellNumber = cellNumbers[key];
                const userVal = userGrid[key] || '';
                const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                if (isBlocked) {
                  return (
                    <div
                      key={key}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-stone-900"
                    />
                  );
                }

                return (
                  <div
                    key={key}
                    onClick={() => handleCellClick(r, c, isBlocked)}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 bg-[#faf6ec] flex items-center justify-center cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-100 ring-2 ring-amber-700 z-10' : 'hover:bg-amber-50'
                    }`}
                  >
                    {cellNumber && (
                      <span className="absolute top-0.5 right-0.5 text-[9px] font-mono leading-none text-stone-600 font-bold">
                        {cellNumber}
                      </span>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      value={userVal}
                      onChange={(e) => handleInputChange(r, c, e.target.value)}
                      className="w-full h-full text-center text-sm font-bold bg-transparent text-stone-900 focus:outline-none"
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCheck}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-900 text-amber-100 rounded flex items-center gap-1 shadow-sm transition-colors"
            >
              <Check className="w-3 h-3 text-emerald-400" />
              <span>تحقق من الحل</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 text-xs bg-stone-200 hover:bg-stone-300 text-stone-800 rounded flex items-center gap-1 transition-colors"
              title="مسح الشبكة"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة البدء</span>
            </button>
          </div>

          {feedback && (
            <p className={`text-xs mt-1 font-bold ${isSolved ? 'text-emerald-700' : 'text-amber-800'}`}>
              {feedback}
            </p>
          )}
        </div>

        {/* Clues */}
        <div className="text-xs space-y-2 text-stone-800 border-r border-stone-400/50 pr-2">
          <div>
            <h5 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5 mb-1 text-[13px]">
              أفقياً:
            </h5>
            <ul className="space-y-0.5 text-[11px] leading-relaxed">
              <li><strong>١-</strong> أديب نوبل المصري صاحب الثلاثية (٤ أحرف).</li>
              <li><strong>٥-</strong> كنانة الله في أرضه ومهد الحضارات (٣ أحرف).</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-stone-900 border-b border-stone-300 pb-0.5 mb-1 text-[13px]">
              رأسياً:
            </h5>
            <ul className="space-y-0.5 text-[11px] leading-relaxed">
              <li><strong>١-</strong> شريان الحياة الخالد في مصر (٣ أحرف).</li>
              <li><strong>٣-</strong> نبي الله الصديق صاحب أحسن القصص.</li>
              <li><strong>٤-</strong> إحدى عجائب الدنيا السبع بالجيزة (أهرام).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
