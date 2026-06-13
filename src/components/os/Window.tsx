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

  // Use Pointer Events for better dragging stability and to avoid releasePointerCapture errors
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only focus if not already focused to minimize re-renders during interaction
    if (!isFocused) {
      focusApp(id);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      drag={!isMaximized}
      dragMomentum={false}
      onDragStart={() => !isFocused && focusApp(id)}
      onPointerDown={handlePointerDown}
      style={{ 
        zIndex: windowState.zIndex,
        position: 'absolute',
        touchAction: 'none' // Crucial for preventing browser interference with dragging
      }}
      className={cn(
        "flex flex-col overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-xl shadow-2xl border border-white/40",
        isMaximized ? "inset-0 rounded-none" : "w-[800px] h-[500px] left-[10%] top-[10%]",
        !isFocused && "brightness-95 shadow-lg"
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
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </motion.div>
  );
};
