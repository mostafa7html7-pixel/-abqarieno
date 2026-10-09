import React, { useState, useRef, useEffect } from 'react';
import { RECITERS, SURAHS_LIST } from '../services/quranService';
import { ReciterId, QuranSurah } from '../types';
import { soundManager } from '../services/soundEffects';
import { Volume2, VolumeX, Play, Pause, Radio as RadioIcon, Music, ChevronDown, Sparkles } from 'lucide-react';

interface VintageRadioProps {
  onReciterChange?: (reciter: ReciterId) => void;
  isMorningMode?: boolean;
}

export const VintageRadio: React.FC<VintageRadioProps> = ({ isMorningMode }) => {
  const [selectedReciterId, setSelectedReciterId] = useState<ReciterId>('abdulbasit');
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah>(() => {
    return SURAHS_LIST.find(s => s.reciterId === 'abdulbasit') || SURAHS_LIST[0];
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentReciter = RECITERS.find(r => r.id === selectedReciterId) || RECITERS[0];
  const availableSurahs = SURAHS_LIST.filter(s => s.reciterId === selectedReciterId);

  // Auto-play morning Quran if user triggers morning mode and not playing
  useEffect(() => {
    if (isMorningMode && !isPlaying) {
      // Suggest playing Al-Fatiha or Ya-Sin with Abdulbasit or Minshawi
    }
  }, [isMorningMode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleReciterSelect = (id: ReciterId) => {
    soundManager.playBallpointScratch();
    setSelectedReciterId(id);
    const firstSurah = SURAHS_LIST.find(s => s.reciterId === id) || SURAHS_LIST[0];
    setSelectedSurah(firstSurah);
    setAudioError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = firstSurah.audioUrl;
      audioRef.current.load();
    }
  };

  const handleSurahSelect = (surah: QuranSurah) => {
    soundManager.playPaperTouch();
    setSelectedSurah(surah);
    setAudioError(null);
    if (audioRef.current) {
      audioRef.current.src = surah.audioUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play error:', err);
        setAudioError('تعذر البث مؤقتاً، جرب تلاوة أخرى');
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    soundManager.playPaperTouch();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(null);
      if (!audioRef.current.src || audioRef.current.src !== selectedSurah.audioUrl) {
        audioRef.current.src = selectedSurah.audioUrl;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error', err);
        setAudioError('يرجى التحقق من اتصال الإنترنت');
        setIsPlaying(false);
      });
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative font-amiri z-30 select-none">
      <audio
        ref={audioRef}
        src={selectedSurah.audioUrl}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setAudioError('تعذر تحميل الملف الصوتي');
          setIsPlaying(false);
        }}
      />

      {/* Main Vintage Wooden Radio Enclosure */}
      <div 
        className="rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, #3d2314 0%, #26160c 100%)',
          border: '3px solid #82532c',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,200,120,0.2)'
        }}
      >
        {/* Radio Header & Speaker Grill Bar */}
        <div className="px-4 py-2.5 bg-stone-900/60 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RadioIcon className={`w-4 h-4 ${isPlaying ? 'text-amber-400 animate-pulse' : 'text-amber-600'}`} />
            <span className="font-aref text-amber-200 text-sm font-bold tracking-wide">
              راديو الشرق • إذاعة القرآن الكريم
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Glowing Amber Vacuum Tube Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-amber-800/40 text-[11px] text-amber-300">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-stone-600'}`}></span>
              <span>{isPlaying ? 'بث مباشر' : 'جاهز'}</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-400/80 hover:text-amber-200 p-1 text-xs transition-colors"
              title={isExpanded ? 'طي الراديو' : 'فتح الراديو'}
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Collapsed Compact State */}
        {!isExpanded ? (
          <div className="p-3 flex items-center justify-between gap-3 bg-stone-950/40">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 hover:from-amber-600 hover:to-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
              </button>
              <div>
                <p className="text-xs text-amber-100 font-bold leading-tight">{selectedSurah.nameAr}</p>
                <p className="text-[11px] text-amber-300/70">{currentReciter.nameAr}</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs text-amber-300 underline underline-offset-2 hover:text-amber-100"
            >
              تغيير القارئ
            </button>
          </div>
        ) : (
          /* Full Expanded Radio Body */
          <div className="p-4 space-y-3.5 bg-gradient-to-b from-black/20 to-black/40">
            
            {/* Vintage Frequency Tuning Glass Scale */}
            <div className="rounded-lg p-2.5 bg-stone-950 border border-amber-700/50 relative overflow-hidden shadow-inner">
              <div className="flex justify-between text-[10px] text-amber-500/70 font-mono mb-1">
                <span>MW 550</span>
                <span>800</span>
                <span>1000</span>
                <span>1200</span>
                <span>1600 KHz</span>
              </div>

              {/* Frequency Pointer Needle */}
              <div className="relative h-6 flex items-center border-y border-amber-900/50 bg-amber-950/20 px-2">
                {/* Horizontal scale markings */}
                <div className="absolute inset-0 flex justify-between items-center opacity-30 px-3">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`w-0.5 bg-amber-400 ${i % 3 === 0 ? 'h-3' : 'h-1.5'}`}></div>
                  ))}
                </div>

                {/* Simulated Tuning Dial Position */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_8px_#ef4444] transition-all duration-500 z-10"
                  style={{
                    left: selectedReciterId === 'abdulbasit' ? '25%' :
                          selectedReciterId === 'minshawi' ? '50%' :
                          selectedReciterId === 'dossari' ? '75%' : '88%'
                  }}
                >
                  <div className="absolute -top-1 -left-1 w-3 h-2 bg-amber-400 rounded-sm"></div>
                </div>

                <div className="relative z-10 w-full flex justify-between text-[11px] text-amber-200/90 font-aref">
                  <span className={selectedReciterId === 'abdulbasit' ? 'text-amber-300 font-bold' : 'opacity-60'}>عبد الباسط</span>
                  <span className={selectedReciterId === 'minshawi' ? 'text-amber-300 font-bold' : 'opacity-60'}>المنشاوي</span>
                  <span className={selectedReciterId === 'dossari' ? 'text-amber-300 font-bold' : 'opacity-60'}>الدوسري</span>
                  <span className={selectedReciterId === 'radio_cairo' ? 'text-amber-300 font-bold' : 'opacity-60'}>إذاعة القاهرة</span>
                </div>
              </div>

              {/* Dynamic Sound Wave Visualizer when playing */}
              {isPlaying && (
                <div className="mt-2 h-3 flex items-end justify-center gap-1">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-amber-400/80 rounded-t transition-all duration-150"
                      style={{
                        height: `${Math.max(20, Math.sin((i + Date.now() / 200)) * 50 + 50)}%`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Reciters Selector Buttons (Segmented Controls) */}
            <div>
              <label className="block text-[11px] text-amber-200/80 mb-1.5 font-bold">
                اختر القارئ الكريم:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {RECITERS.map(reciter => {
                  const isSelected = reciter.id === selectedReciterId;
                  return (
                    <button
                      key={reciter.id}
                      onClick={() => handleReciterSelect(reciter.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs text-right transition-all flex flex-col justify-center border ${
                        isSelected
                          ? 'bg-amber-600/30 border-amber-500 text-amber-100 shadow-sm'
                          : 'bg-black/30 border-amber-900/30 text-amber-300/70 hover:bg-black/50 hover:text-amber-200'
                      }`}
                    >
                      <span className="font-bold leading-tight truncate">{reciter.nameAr}</span>
                      <span className="text-[10px] text-amber-400/60 truncate">{reciter.titleAr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Surah Selection List */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-amber-200/80 font-bold">
                  السور والتلاوات المتاحة:
                </label>
                <span className="text-[10px] text-amber-400/70">
                  {availableSurahs.length} تلاوة خاشعة
                </span>
              </div>

              <div className="max-h-28 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {availableSurahs.map(surah => {
                  const isCurSurah = surah.id === selectedSurah.id;
                  return (
                    <button
                      key={surah.id}
                      onClick={() => handleSurahSelect(surah)}
                      className={`w-full px-2.5 py-1.5 rounded text-xs flex items-center justify-between text-right transition-colors ${
                        isCurSurah
                          ? 'bg-amber-500/25 text-amber-100 font-bold border border-amber-500/40'
                          : 'bg-black/20 text-amber-200/75 hover:bg-black/40 hover:text-amber-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCurSurah && isPlaying ? (
                          <Music className="w-3 h-3 text-amber-400 animate-bounce" />
                        ) : (
                          <span className="text-[10px] text-amber-500/60 w-4">{surah.number || '•'}</span>
                        )}
                        <span>{surah.nameAr}</span>
                      </div>
                      {surah.ayahCount > 0 && (
                        <span className="text-[10px] text-amber-400/50">{surah.ayahCount} آية</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio Error Banner */}
            {audioError && (
              <div className="text-center text-xs text-rose-300 bg-rose-950/40 p-1.5 rounded border border-rose-800/40">
                {audioError}
              </div>
            )}

            {/* Controls Bar: Play / Pause, Time, Volume */}
            <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-stone-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0"
                title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل التلاوة'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-stone-950" />
                ) : (
                  <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                )}
              </button>

              <div className="flex-1">
                <p className="text-xs text-amber-100 font-bold truncate leading-tight">
                  {selectedSurah.nameAr}
                </p>
                <div className="flex items-center justify-between text-[10px] text-amber-400/70 font-mono mt-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : 'مباشر'}</span>
                </div>
              </div>

              {/* Volume Slider & Mute */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-amber-400/80 hover:text-amber-200 p-1"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-stone-900 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Morning Quran Recommendation Hint */}
            <div className="text-[11px] text-amber-300/80 flex items-center justify-center gap-1.5 pt-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>ابدأ صباحك ببركة آيات الذكر الحكيم</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
