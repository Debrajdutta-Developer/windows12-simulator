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
    // Only focus if not already focused to avoid redundant store updates during interaction
    if (!isFocused) {
      focusApp(id);
    }
    
    // Attempt to set pointer capture to handle drags more robustly
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if pointer capture fails (unsupported in some environments)
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={!isMaximized}
      dragMomentum={false}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ 
        zIndex: windowState.zIndex,
        position: 'absolute',
        touchAction: 'none' // Important for mobile and pointer capture
      }}
      className={cn(
        "flex flex-col overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40",
        isMaximized ? "inset-0 rounded-none" : "w-[800px] h-[550px] left-[15%] top-[10%]",
        !isFocused && "brightness-95 shadow-lg opacity-90"
      )}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-white/40 border-b border-black/5 select-none"
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

      {/* Content */}
      <div className={cn("flex-1 overflow-auto relative", !isFocused && "pointer-events-none")}>
        {children}
      </div>
    </motion.div>
  );
};
