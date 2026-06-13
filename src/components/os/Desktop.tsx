'use client';

import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
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
      <div className="absolute inset-0 p-8 flex flex-col flex-wrap gap-6 content-start items-center">
        <DesktopIcon id="explorer" name="This PC" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><Folder className="text-yellow-400 fill-yellow-400/40" size={32} /></div>} onDoubleClick={() => openApp('explorer', 'File Explorer')} />
        <DesktopIcon id="browser" name="Edge" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><Globe className="text-blue-400" size={32} /></div>} onDoubleClick={() => openApp('browser', 'Edge')} />
        <DesktopIcon id="terminal" name="Terminal" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-700/20 to-black/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><TermIcon className="text-gray-200" size={32} /></div>} onDoubleClick={() => openApp('terminal', 'Terminal')} />
        <DesktopIcon id="settings" name="Settings" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-400/20 to-gray-600/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><SettingsIcon className="text-gray-300" size={32} /></div>} onDoubleClick={() => openApp('settings', 'Settings')} />
        <DesktopIcon id="notepad" name="Notepad" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-300/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><FileText className="text-blue-300" size={32} /></div>} onDoubleClick={() => openApp('notepad', 'Notepad')} />
        <DesktopIcon id="store" name="Store" icon={<div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-400/20 to-teal-500/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"><ShoppingBag className="text-green-400" size={32} /></div>} onDoubleClick={() => openApp('store', 'Microsoft Store')} />
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

const DesktopIcon = ({ id, name, icon, onDoubleClick }: { id: string, name: string, icon: React.ReactNode, onDoubleClick: () => void }) => {
  const lastClickTime = React.useRef(0);

  const handleClick = (e: React.MouseEvent | React.PointerEvent) => {
    // Prevent double execution on touch devices
    const now = Date.now();
    if (now - lastClickTime.current < 400 || ('ontouchstart' in window)) {
      onDoubleClick();
      lastClickTime.current = 0; // Reset
    } else {
      lastClickTime.current = now;
    }
  };

  return (
    <button 
      onPointerDown={handleClick}
      className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-all w-24 group outline-none"
    >
      <div className="group-active:scale-95 transition-transform duration-75">
        {icon}
      </div>
      <span className="text-xs text-white text-shadow font-medium truncate w-full text-center">
        {name}
      </span>
    </button>
  );
};
