'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { AppID } from '@/types/os';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Palette, 
  Globe, 
  MessageSquare, 
  Calculator, 
  Folder, 
  Music, 
  ShoppingBag,
  Terminal,
  Settings
} from 'lucide-react';

const APP_ICONS: Record<AppID, React.ReactNode> = {
  notepad: <FileText size={20} className="text-blue-500" />,
  paint: <Palette size={20} className="text-pink-500" />,
  browser: <Globe size={20} className="text-blue-400" />,
  copilot: <MessageSquare size={20} className="text-purple-500" />,
  calculator: <Calculator size={20} className="text-gray-600" />,
  explorer: <Folder size={20} className="text-yellow-500" />,
  music: <Music size={20} className="text-red-500" />,
  store: <ShoppingBag size={20} className="text-green-500" />,
  terminal: <Terminal size={20} className="text-gray-800" />,
  settings: <Settings size={20} className="text-gray-600" />
};

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-16 h-8 bg-black/5 animate-pulse rounded-md" />;

  return (
    <div className="flex flex-col items-end leading-tight select-none">
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <span>{time.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
    </div>
  );
};

export const Taskbar = () => {
  const { windows, activeWindowId, openApp, focusApp, minimizeApp } = useOSStore();

  const handleAppClick = (id: AppID, title: string) => {
    const window = windows.find(w => w.id === id);
    if (!window) {
      openApp(id, title);
    } else if (window.focused) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  };

  const pinnedApps: { id: AppID; title: string }[] = [
    { id: 'explorer', title: 'File Explorer' },
    { id: 'browser', title: 'Edge' },
    { id: 'copilot', title: 'Copilot' },
    { id: 'store', title: 'Microsoft Store' },
  ];

  return (
    <div className="h-12 w-full fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-between px-2 bg-white/70 backdrop-blur-2xl border-t border-white/20">
      <div className="flex-1 flex items-center">
        {/* Start Button */}
        <button className="p-2 hover:bg-white/40 rounded-md transition-all active:scale-95 group">
           <div className="grid grid-cols-2 gap-0.5 w-5 h-5 group-hover:rotate-12 transition-transform">
            <div className="bg-blue-400 rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-blue-600 rounded-sm"></div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1 bg-white/20 p-1 rounded-xl">
        {pinnedApps.map(app => {
          const isOpen = windows.some(w => w.id === app.id);
          const isActive = activeWindowId === app.id;
          
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id, app.title)}
              className={cn(
                "p-2 rounded-md transition-all relative group",
                isActive ? "bg-white/50 shadow-sm" : "hover:bg-white/40"
              )}
            >
              <div className="transition-transform group-hover:-translate-y-1">
                {APP_ICONS[app.id]}
              </div>
              {isOpen && (
                <div className={cn(
                  "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full bg-blue-500 transition-all",
                  isActive ? "w-4" : "w-1.5"
                )} />
              )}
            </button>
          );
        })}
        
        {windows.filter(w => !pinnedApps.some(p => p.id === w.id)).map(w => (
          <button
            key={w.id}
            onClick={() => handleAppClick(w.id, w.title)}
            className={cn(
              "p-2 rounded-md transition-all relative group",
              activeWindowId === w.id ? "bg-white/50 shadow-sm" : "hover:bg-white/40"
            )}
          >
            <div className="transition-transform group-hover:-translate-y-1">
              {APP_ICONS[w.id]}
            </div>
            <div className={cn(
              "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full bg-blue-500 transition-all",
              activeWindowId === w.id ? "w-4" : "w-1.5"
            )} />
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-end gap-2 px-2 text-[11px] font-medium text-black/70">
        <Clock />
      </div>
    </div>
  );
};
