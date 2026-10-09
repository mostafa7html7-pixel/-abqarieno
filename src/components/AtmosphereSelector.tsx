import React from 'react';
import { AtmosphereType } from '../types';
import { soundManager } from '../services/soundEffects';
import { Sun, Lamp, Moon, CloudLightning, Coffee } from 'lucide-react';

interface AtmosphereSelectorProps {
  currentAtmosphere: AtmosphereType;
  onAtmosphereChange: (atmosphere: AtmosphereType) => void;
}

export const AtmosphereSelector: React.FC<AtmosphereSelectorProps> = ({
  currentAtmosphere,
  onAtmosphereChange,
}) => {
  const atmospheres: {
    id: AtmosphereType;
    labelAr: string;
    descriptionAr: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'morning',
      labelAr: 'شمس الصباح',
      descriptionAr: 'خيوط شمس دافئة وزقزقة عصافير القاهرة مع نسمات الصباح',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      color: 'from-amber-500/20 to-yellow-500/10'
    },
    {
      id: 'lamp',
      labelAr: 'مصباح مكتبي',
      descriptionAr: 'ضوء أباجورة كلاسيكية دافئة تركّز على صفحات الجريدة',
      icon: <Lamp className="w-4 h-4 text-amber-300" />,
      color: 'from-amber-600/20 to-orange-600/10'
    },
    {
      id: 'night',
      labelAr: 'ليل وسكينة',
      descriptionAr: 'سكون الليل الهادئ وضياء القمر الخافت للتدبر والقراءة',
      icon: <Moon className="w-4 h-4 text-blue-300" />,
      color: 'from-blue-600/20 to-indigo-900/20'
    },
    {
      id: 'horror',
      labelAr: 'جو مرعب وغامض',
      descriptionAr: 'أجواء عاصفة ممطرة وميض البرق وشموع ترتجف في الظلام',
      icon: <CloudLightning className="w-4 h-4 text-purple-400" />,
      color: 'from-purple-900/30 to-rose-950/30'
    },
    {
      id: 'cafe',
      labelAr: 'مقهى مصري مبهج',
      descriptionAr: 'بهجة القهوة البلدي وصوت رشفة الشاي وطقطقة الملاعق',
      icon: <Coffee className="w-4 h-4 text-amber-500" />,
      color: 'from-amber-700/20 to-amber-900/20'
    }
  ];

  const handleSelect = (id: AtmosphereType) => {
    soundManager.playPaperTouch();
    soundManager.setAtmosphereAmbience(id);
    onAtmosphereChange(id);
  };

  return (
    <div className="font-amiri select-none">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-950/80 border border-amber-900/40 backdrop-blur-md shadow-lg overflow-x-auto">
        <span className="text-[11px] text-amber-300/80 font-bold px-2 whitespace-nowrap">
          الإضاءة والأجواء:
        </span>
        {atmospheres.map((atm) => {
          const isActive = atm.id === currentAtmosphere;
          return (
            <button
              key={atm.id}
              onClick={() => handleSelect(atm.id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                isActive
                  ? 'bg-amber-600/30 border-amber-400 text-amber-100 font-bold shadow-sm'
                  : 'border-transparent text-stone-300 hover:text-amber-200 hover:bg-stone-900/60'
              }`}
              title={atm.descriptionAr}
            >
              {atm.icon}
              <span>{atm.labelAr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
