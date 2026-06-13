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
  Calculator as CalcIcon, 
  Folder, 
  Music as MusicIcon, 
  ShoppingBag,
  Terminal as TermIcon,
  Settings as SettingsIcon
} from 'lucide-react';

import Notepad from '../apps/Notepad';
import Paint from '../apps/Paint';
import Browser from '../apps/Browser';
import Copilot from '../apps/Copilot';
import Calculator from '../apps/Calculator';
import Explorer from '../apps/Explorer';
import Music from '../apps/Music';
import AppStore from '../apps/AppStore';
import Terminal from '../apps/Terminal';
import Settings from '../apps/Settings';

import { Taskbar } from './Taskbar';
import { Window } from './Window';

const APP_COMPONENTS: Record<string, React.ReactNode> = {
  notepad: <Notepad />,
  paint: <Paint />,
  browser: <Browser />,
  copilot: <Copilot />,
  calculator: <Calculator />,
  explorer: <Explorer />,
  music: <Music />,
  store: <AppStore />,
  terminal: <Terminal />,
  settings: <Settings />
};

const APP_ICONS: Record<string, React.ReactNode> = {
  notepad: <FileText size={16} className="text-blue-500" />,
  paint: <Palette size={16} className="text-pink-500" />,
  browser: <Globe size={16} className="text-blue-400" />,
  copilot: <MessageSquare size={16} className="text-purple-500" />,
  calculator: <CalcIcon size={16} className="text-gray-600" />,
  explorer: <Folder size={16} className="text-yellow-500" />,
  music: <MusicIcon size={16} className="text-red-500" />,
  store: <ShoppingBag size={16} className="text-green-500" />,
  terminal: <TermIcon size={16} className="text-gray-800" />,
  settings: <SettingsIcon size={16} className="text-gray-600" />
};

export const Desktop = () => {
  const { windows, openApp } = useOSStore();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#003c71] via-[#005a9e] to-[#0078d4] select-none">
      {/* Windows 11 style abstract background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay" />
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-6 flex flex-col flex-wrap gap-4 content-start items-center">
        <DesktopIcon id="explorer" name="This PC" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><Folder className="text-yellow-400 fill-yellow-400/40" size={32} /></div>} onDoubleClick={() => openApp('explorer', 'File Explorer')} />
        <DesktopIcon id="browser" name="Microsoft Edge" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><Globe className="text-blue-400" size={32} /></div>} onDoubleClick={() => openApp('browser', 'Edge')} />
        <DesktopIcon id="terminal" name="Terminal" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><TermIcon className="text-gray-200" size={32} /></div>} onDoubleClick={() => openApp('terminal', 'Terminal')} />
        <DesktopIcon id="settings" name="Settings" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><SettingsIcon className="text-gray-300" size={32} /></div>} onDoubleClick={() => openApp('settings', 'Settings')} />
        <DesktopIcon id="notepad" name="Notepad" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><FileText className="text-blue-300" size={32} /></div>} onDoubleClick={() => openApp('notepad', 'Notepad')} />
        <DesktopIcon id="store" name="Microsoft Store" icon={<div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-sm border border-white/20"><ShoppingBag className="text-green-400" size={32} /></div>} onDoubleClick={() => openApp('store', 'Microsoft Store')} />
      </div>

      {/* Windows Layer */}
      {windows.map(window => (
        <Window 
          key={window.id} 
          id={window.id} 
          title={window.title}
          icon={APP_ICONS[window.id]}
        >
          {APP_COMPONENTS[window.id]}
        </Window>
      ))}

      <Taskbar />
    </div>
  );
};

const DesktopIcon = ({ name, icon, onDoubleClick }: { id: string, name: string, icon: React.ReactNode, onDoubleClick: () => void }) => {
  const lastClickTime = React.useRef(0);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // For touch devices or fast successive clicks (mobile/desktop hybrid)
    const now = Date.now();
    const isTouch = e.type.startsWith('touch') || (typeof window !== 'undefined' && 'ontouchstart' in window);
    
    if (isTouch || now - lastClickTime.current < 300) {
      onDoubleClick();
      lastClickTime.current = 0; // Reset
    } else {
      lastClickTime.current = now;
    }
  };

  return (
    <button 
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-all w-24 group outline-none"
    >
      <div className="group-active:scale-95 transition-transform duration-75 pointer-events-none">
        {icon}
      </div>
      <span className="text-xs text-white text-shadow font-medium truncate w-full text-center pointer-events-none">
        {name}
      </span>
    </button>
  );
};
