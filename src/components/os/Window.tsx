'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { AppID } from '@/types/os';
import { cn } from '@/lib/utils';

interface WindowProps {
  id: AppID;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, title, children, icon }) => {
  const { windows, closeApp, minimizeApp, maximizeApp, focusApp } = useOSStore();
  const windowState = windows.find(w => w.id === id);
  
  if (!windowState || windowState.isMinimized) return null;

  const isMaximized = windowState.isMaximized;
  const isFocused = windowState.focused;

  const handlePointerDown = (e: React.PointerEvent) => {
    focusApp(id);
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
      // Ignore capture errors on unsupported environments
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore release errors
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        boxShadow: isFocused 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
          : "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
      }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      drag={!isMaximized}
      dragMomentum={false}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onDragStart={() => focusApp(id)}
      style={{ 
        zIndex: windowState.zIndex,
        position: 'absolute',
        touchAction: 'none'
      }}
      className={cn(
        "flex flex-col overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-xl border border-white/30 transition-shadow duration-200",
        isMaximized ? "inset-0 rounded-none" : "w-[850px] h-[550px] left-[15%] top-[10%]",
        !isFocused && "brightness-90 opacity-95 shadow-lg"
      )}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-white/20 border-b border-black/5 select-none"
        onDoubleClick={() => maximizeApp(id)}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-black/70">
          {icon}
          <span>{title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="p-1.5 hover:bg-black/5 rounded-md transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
            className="p-1.5 hover:bg-black/5 rounded-md transition-colors"
          >
            {isMaximized ? <Copy size={14} /> : <Square size={14} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="p-1.5 hover:bg-red-500 hover:text-white rounded-md transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Overlay to prevent iframe theft of pointer */}
      <div className="flex-1 overflow-auto relative">
         {/* Invisible overlay while dragging to ensure smooth movement over iframes */}
         <div className="absolute inset-0 z-0">{children}</div>
      </div>
    </motion.div>
  );
};
