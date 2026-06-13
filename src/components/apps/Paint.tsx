'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Download, Trash2 } from 'lucide-react';

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight - 60; // Subtract toolbar height
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="flex items-center gap-4 p-2 bg-gray-100 border-b border-gray-200">
        <div className="flex bg-white rounded-lg border border-gray-300 p-1 shadow-sm">
          <button 
            onClick={() => setTool('pencil')}
            className={`p-2 rounded ${tool === 'pencil' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Pencil size={20} />
          </button>
          <button 
            onClick={() => setTool('eraser')}
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Eraser size={20} />
          </button>
        </div>

        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 p-1 rounded border border-gray-300 cursor-pointer"
        />

        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Brush Size</span>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="ml-auto flex gap-2">
          <button onClick={clearCanvas} className="p-2 hover:bg-red-50 text-red-500 rounded transition-colors" title="Clear All">
            <Trash2 size={20} />
          </button>
          <button onClick={downloadImage} className="p-2 hover:bg-blue-50 text-blue-500 rounded transition-colors" title="Download">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white relative cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="block w-full h-full"
        />
      </div>
    </div>
  );
};

export default Paint;
