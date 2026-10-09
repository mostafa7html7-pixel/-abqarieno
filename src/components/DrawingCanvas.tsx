import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ToolType, InkColor, StampType, PaperCrease, EraserCrumb } from '../types';
import { soundManager } from '../services/soundEffects';

interface DrawingCanvasProps {
  currentPage: number;
  activeTool: ToolType;
  inkColor: InkColor;
  pencilSharpness: number;
  onPencilUse: (delta: number) => void;
  activeStamp: StampType;
  creases: PaperCrease[];
  onAddCrease: (crease: PaperCrease) => void;
}

interface StoredPageDrawing {
  [page: number]: ImageData | null;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  currentPage,
  activeTool,
  inkColor,
  pencilSharpness,
  onPencilUse,
  activeStamp,
  creases,
  onAddCrease
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [pageDrawings, setPageDrawings] = useState<StoredPageDrawing>({});
  const [crumbs, setCrumbs] = useState<EraserCrumb[]>([]);
  const recentClicksRef = useRef<{ x: number; y: number; time: number }[]>([]);

  // Get ink color hex
  const getInkHex = useCallback((color: InkColor): string => {
    switch (color) {
      case 'blue': return '#1d4ed8'; // Vintage Royal Blue
      case 'black': return '#18181b'; // Deep Carbon Black
      case 'red': return '#b91c1c'; // Editorial Red
      case 'sepia': return '#593a1e'; // Antique Fountain Ink
      default: return '#18181b';
    }
  }, []);

  // Save current page canvas into memory before page flips
  const saveCurrentCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPageDrawings(prev => ({ ...prev, [currentPage]: data }));
    } catch {}
  }, [currentPage]);

  // Restore canvas when currentPage changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas dimensions to match display
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pageDrawings[currentPage]) {
      ctx.putImageData(pageDrawings[currentPage]!, 0, 0);
    }
  }, [currentPage, pageDrawings]);

  // Handle repeated clicking in one spot to create paper creases/wear
  const checkRepeatedClicks = (x: number, y: number) => {
    const now = Date.now();
    // Filter clicks within last 4 seconds
    const valid = recentClicksRef.current.filter(c => now - c.time < 4000);
    valid.push({ x, y, time: now });
    recentClicksRef.current = valid;

    // Check if 3 or more clicks happened within 35px radius
    const nearby = valid.filter(c => Math.hypot(c.x - x, c.y - y) < 35);
    if (nearby.length >= 3) {
      soundManager.playPaperCrease();
      onAddCrease({
        id: `crease-${Date.now()}-${Math.random()}`,
        x,
        y,
        intensity: Math.min(1, 0.4 + nearby.length * 0.15),
        radius: 20 + nearby.length * 6
      });
      // Clear to avoid infinite triggers in one stroke
      recentClicksRef.current = [];
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    return { x: 0, y: 0 };
  };

  const applyStamp = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    soundManager.playStampSound();

    ctx.save();
    ctx.translate(x, y);
    // Slight random rotation for vintage authenticity (-6 to +6 deg)
    const angle = (Math.random() - 0.5) * 0.15;
    ctx.rotate(angle);

    let text = 'عاجل';
    let subtext = 'برقية الأهرام';
    let color = '#b91c1c';

    if (activeStamp === 'approved') {
      text = 'طالع وقُرئ';
      subtext = 'رئيس التحرير';
      color = '#15803d';
    } else if (activeStamp === 'archive') {
      text = 'أرشيف الأهرام';
      subtext = 'دار المحفوظات ١٩٥٨';
      color = '#4c1d95';
    } else if (activeStamp === 'editor') {
      text = 'مكتب النشر';
      subtext = 'أجيز للطبع والنشر';
      color = '#1e3a8a';
    }

    // Outer double border
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(-75, -35, 150, 70);
    ctx.lineWidth = 1;
    ctx.strokeRect(-70, -30, 140, 60);

    // Subtle distressed ink pattern
    ctx.globalAlpha = 0.88;
    ctx.font = 'bold 22px "Aref Ruqaa", "Amiri", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, -8);

    ctx.font = '12px "Amiri", serif';
    ctx.fillText(subtext, 0, 16);

    ctx.restore();
    saveCurrentCanvas();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    checkRepeatedClicks(x, y);

    if (activeTool === 'stamp') {
      applyStamp(x, y);
      return;
    }

    if (activeTool === 'touch') {
      soundManager.playPaperTouch();
      return;
    }

    setIsDrawing(true);
    setLastPoint({ x, y });

    // Sound feedback
    if (activeTool === 'pencil') {
      soundManager.playPencilScratch(1.2);
    } else if (activeTool === 'ballpoint' || activeTool === 'fountain') {
      soundManager.playBallpointScratch();
    } else if (activeTool === 'eraser') {
      soundManager.playEraserRub();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    const dist = Math.hypot(x - lastPoint.x, y - lastPoint.y);
    if (dist < 1) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (activeTool === 'pencil') {
      // Dullness effect: sharp is thin, dull is broad & soft
      const sharpnessFactor = Math.max(0.1, pencilSharpness / 100);
      const width = sharpnessFactor > 0.5 ? 1.5 : (3.5 - sharpnessFactor * 2.5);
      const alpha = 0.45 + sharpnessFactor * 0.35;

      ctx.lineWidth = width;
      ctx.strokeStyle = `rgba(40, 35, 30, ${alpha})`;
      ctx.stroke();

      // Granular graphite fleck
      if (Math.random() > 0.6) {
        ctx.fillStyle = 'rgba(30, 25, 20, 0.4)';
        ctx.fillRect(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2, 1, 1);
      }

      // Consume pencil sharpness
      onPencilUse(dist * 0.04);
      soundManager.playPencilScratch(dist / 5);

    } else if (activeTool === 'ballpoint') {
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = getInkHex(inkColor);
      ctx.stroke();
      if (dist > 8) {
        soundManager.playBallpointScratch();
      }

    } else if (activeTool === 'fountain') {
      // Calligraphic broad nib
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = getInkHex(inkColor);
      ctx.stroke();

    } else if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 26;
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';

      soundManager.playEraserRub();

      // Drop eraser crumbs (فتات الأستيكة)
      if (Math.random() > 0.7 && crumbs.length < 35) {
        setCrumbs(prev => [
          ...prev,
          {
            id: `crumb-${Date.now()}-${Math.random()}`,
            x: x + (Math.random() - 0.5) * 16,
            y: y + (Math.random() - 0.5) * 16,
            size: 2 + Math.random() * 2.5
          }
        ]);
      }
    }

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastPoint(null);
      saveCurrentCanvas();
    }
  };

  const blowCrumbsAway = () => {
    soundManager.playPageFlip();
    setCrumbs([]);
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-auto">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`w-full h-full block ${
          activeTool === 'pencil' ? 'cursor-crosshair' :
          activeTool === 'ballpoint' || activeTool === 'fountain' ? 'cursor-text' :
          activeTool === 'eraser' ? 'cursor-cell' :
          activeTool === 'stamp' ? 'cursor-pointer' : 'cursor-grab'
        }`}
      />

      {/* Eraser Crumbs Overlay (فتات الأستيكة المتساقط على الجريدة) */}
      {crumbs.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {crumbs.map(crumb => (
            <div
              key={crumb.id}
              className="absolute eraser-crumb"
              style={{
                left: `${crumb.x}px`,
                top: `${crumb.y}px`,
                width: `${crumb.size}px`,
                height: `${crumb.size}px`,
              }}
            />
          ))}

          {/* Blow away crumbs button floating quietly */}
          <div className="absolute bottom-4 left-4 pointer-events-auto">
            <button
              onClick={blowCrumbsAway}
              className="px-2.5 py-1 text-xs bg-stone-900/80 text-amber-100 rounded-full border border-stone-700 hover:bg-stone-800 shadow-md flex items-center gap-1 transition-transform active:scale-95"
            >
              <span>💨 نفخ فتات الأستيكة</span>
            </button>
          </div>
        </div>
      )}

      {/* Creases / Wrinkles Visual Marks (آثار الضغط المتكرر وتآكل الورق) */}
      {creases.map(crease => (
        <div
          key={crease.id}
          className="paper-crease-mark absolute"
          style={{
            left: `${crease.x - crease.radius}px`,
            top: `${crease.y - crease.radius}px`,
            width: `${crease.radius * 2}px`,
            height: `${crease.radius * 2}px`,
            opacity: crease.intensity,
          }}
        />
      ))}
    </div>
  );
};
