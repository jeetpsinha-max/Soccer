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
  Rewind,
  ExternalLink,
  Volume2,
  VolumeX,
  StepForward
} from 'lucide-react';

interface MatchTelestrationProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  clipTitle?: string;
  sourceLabel?: string;
  matchUrl?: string;
}

export const MatchTelestration: React.FC<MatchTelestrationProps> = ({
  videoUrl,
  thumbnailUrl,
  clipTitle = 'Match Film Telestration',
  sourceLabel = 'VEO AI OFFICIAL 1080P BROADCAST',
  matchUrl = 'https://app.veo.co/matches/20260901-vs-peddie-v4d69c3b/'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<'pen' | 'arrow' | 'box'>('pen');
  const [activeColor, setActiveColor] = useState<string>('#ffb81c'); // Default Gold
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const fallbackVideoSrc = 'https://c.veocdn.com/3c6d8c4d-e123-49b3-9aec-61805299b2ba/highlight-v2/df91eca4-bd9b-4171-893d-6da93b295af0_1788317479.555815/video.mp4?v=7v9q8pPK';
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    if (videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('blob:'))) {
      return videoUrl;
    }
    return fallbackVideoSrc;
  });

  useEffect(() => {
    if (videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('blob:'))) {
      setCurrentSrc(videoUrl);
    } else {
      setCurrentSrc(fallbackVideoSrc);
    }
  }, [videoUrl]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!currentSrc) {
      // Draw simulated video pitch frame if no video URL is supplied
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

      ctx.fillStyle = '#002147';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.72, canvas.height * 0.42, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffb81c';
      ctx.fillText('#10', canvas.width * 0.72, canvas.height * 0.42 + 4);

      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.68, canvas.height * 0.45, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.fillText('B4', canvas.width * 0.68, canvas.height * 0.45 + 4);
    } else {
      // Clear canvas to transparent so video underneath is visible
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [currentSrc]);

  // Handle video source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    clearCanvas();
  }, [currentSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const stepFrame = (delta: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

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
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

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
    const endX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const endY = ((e.clientY - rect.top) / rect.height) * canvas.height;
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
      ctx.lineTo(endX - 14 * Math.cos(angle - Math.PI / 6), endY - 14 * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 14 * Math.cos(angle + Math.PI / 6), endY - 14 * Math.sin(angle + Math.PI / 6));
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

    if (!videoUrl) {
      ctx.fillStyle = '#061a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="glass-panel p-4 flex flex-col gap-3">
      {/* Telestration Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          
          <button
            onClick={() => stepFrame(-0.1)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Step Back 1 Frame"
          >
            <Rewind className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => stepFrame(0.1)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Step Forward 1 Frame"
          >
            <StepForward className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
            {[0.25, 0.5, 1.0, 1.5].map(s => (
              <button
                key={s}
                onClick={() => changeSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                  playbackSpeed === s ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {videoUrl && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          )}
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTool('pen')}
              className={`p-1.5 rounded transition ${activeTool === 'pen' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              title="Freehand Pen"
            >
              <PenTool className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('arrow')}
              className={`p-1.5 rounded transition ${activeTool === 'arrow' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              title="Passing Vector Arrow"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('box')}
              className={`p-1.5 rounded transition ${activeTool === 'box' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
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
                className={`w-4 h-4 rounded-full border-2 transition ${activeColor === c ? 'scale-125 border-white shadow' : 'border-transparent opacity-80 hover:opacity-100'}`}
              />
            ))}
          </div>

          <button
            onClick={clearCanvas}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition"
            title="Clear Telestration Overlay"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video & Drawing Canvas Viewport */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black group">
        {/* HTML5 Video Layer */}
        {currentSrc ? (
          <video
            ref={videoRef}
            src={currentSrc}
            poster={thumbnailUrl}
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              if (currentSrc !== fallbackVideoSrc) {
                setCurrentSrc(fallbackVideoSrc);
              }
            }}
            className="w-full h-full object-contain bg-black"
          />
        ) : null}

        {/* Interactive Telestration Drawing Canvas (Layered Directly Over Video) */}
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-amber-400/60 text-[10px] text-amber-300 font-mono font-bold tracking-wide shadow-lg">
              {sourceLabel}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-[10px] text-cyan-300 font-mono font-bold">
              1080P AI TRACK
            </span>
          </div>

          {matchUrl && (
            <a
              href={matchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-amber-400 text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md transition shadow-lg"
            >
              <span>Watch on Veo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Clip Title Banner (Lower Overlay) */}
        <div className="absolute bottom-10 left-3 pointer-events-none z-20">
          <div className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-slate-700 text-xs font-bold text-white shadow">
            {clipTitle}
          </div>
        </div>

        {/* Bottom Video Progress Scrub Bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 flex items-center gap-3 z-20">
            <span className="font-mono text-[10px] text-cyan-400 min-w-[32px]">
              {formatSeconds(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="font-mono text-[10px] text-slate-400 min-w-[32px]">
              {formatSeconds(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
