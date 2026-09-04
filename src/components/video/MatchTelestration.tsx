'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  PenTool, 
  ArrowUpRight, 
  Square, 
  Trash2, 
  FastForward,
  Rewind
} from 'lucide-react';

export const MatchTelestration: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeTool, setActiveTool] = useState<'pen' | 'arrow' | 'box'>('pen');
  const [activeColor, setActiveColor] = useState<string>('#ffb81c'); // Default Gold
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw simulated video pitch frame
    ctx.fillStyle = '#061a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid field lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
    ctx.stroke();

    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Simulated players
    // Peddie Midfield Captain #8 (Massimo Sheinin)
    ctx.fillStyle = '#002147';
    ctx.strokeStyle = '#ffb81c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.45, canvas.height * 0.48, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffb81c';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('#8', canvas.width * 0.45, canvas.height * 0.48 + 4);

    // Peddie Attacking Captain #10 (Tommy Kim)
    ctx.fillStyle = '#002147';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.72, canvas.height * 0.42, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffb81c';
    ctx.fillText('#10', canvas.width * 0.72, canvas.height * 0.42 + 4);

    // Blair Defender #4
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.68, canvas.height * 0.45, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.fillText('B4', canvas.width * 0.68, canvas.height * 0.45 + 4);

  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    if (activeTool === 'pen') {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (activeTool === 'pen') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 3;

    if (activeTool === 'arrow') {
      // Draw arrow line
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(endY - startPos.y, endX - startPos.x);
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 12 * Math.cos(angle - Math.PI / 6), endY - 12 * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 12 * Math.cos(angle + Math.PI / 6), endY - 12 * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    } else if (activeTool === 'box') {
      ctx.fillStyle = `${activeColor}22`;
      ctx.fillRect(startPos.x, startPos.y, endX - startPos.x, endY - startPos.y);
      ctx.strokeRect(startPos.x, startPos.y, endX - startPos.x, endY - startPos.y);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-draw field frame
    ctx.fillStyle = '#061a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="glass-panel p-4 flex flex-col gap-3">
      {/* Telestration Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold hover:bg-amber-400 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
            {[0.25, 0.5, 1.0].map(s => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  playbackSpeed === s ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTool('pen')}
              className={`p-1.5 rounded ${activeTool === 'pen' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Freehand Pen"
            >
              <PenTool className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('arrow')}
              className={`p-1.5 rounded ${activeTool === 'arrow' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Passing Vector Arrow"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('box')}
              className={`p-1.5 rounded ${activeTool === 'box' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Pressure Zone Box"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
            {['#ffb81c', '#00ff88', '#00f0ff', '#ef4444'].map(c => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                style={{ backgroundColor: c }}
                className={`w-4 h-4 rounded-full border-2 transition ${activeColor === c ? 'scale-125 border-white' : 'border-transparent'}`}
              />
            ))}
          </div>

          <button
            onClick={clearCanvas}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition"
            title="Clear Drawing"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video / Drawing Canvas */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-black">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        
        {/* Live Broadcast Badge Watermark */}
        <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/80 border border-amber-400/60 text-[10px] text-amber-300 font-mono font-bold">
            PEDDIE HUDL CAMERA 01 (ALL-22 HIGH ANGLE)
          </span>
        </div>
      </div>
    </div>
  );
};
