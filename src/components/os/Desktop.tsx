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
  ShoppingBag 
} from 'lucide-react';

import Notepad from '../apps/Notepad';
import Paint from '../apps/Paint';
import Browser from '../apps/Browser';
import Copilot from '../apps/Copilot';
import Calculator from '../apps/Calculator';
import Explorer from '../apps/Explorer';
import Music from '../apps/Music';
import AppStore from '../apps/AppStore';

const APP_COMPONENTS: Record<string, React.ReactNode> = {
  notepad: <Notepad />,
  paint: <Paint />,
  browser: <Browser />,
  copilot: <Copilot />,
  calculator: <Calculator />,
  explorer: <Explorer />,
  music: <Music />,
  store: <AppStore />
};

const APP_ICONS: Record<string, React.ReactNode> = {
  notepad: <FileText size={16} className="text-blue-500" />,
  paint: <Palette size={16} className="text-pink-500" />,
  browser: <Globe size={16} className="text-blue-400" />,
  copilot: <MessageSquare size={16} className="text-purple-500" />,
  calculator: <CalcIcon size={16} className="text-gray-600" />,
  explorer: <Folder size={16} className="text-yellow-500" />,
  music: <MusicIcon size={16} className="text-red-500" />,
  store: <ShoppingBag size={16} className="text-green-500" />
};

export const Desktop = () => {
  const { windows, openApp } = useOSStore();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-6 flex flex-col flex-wrap gap-4 content-start items-center">
        <DesktopIcon id="explorer" name="This PC" icon={<Folder className="text-yellow-400 fill-yellow-400/20" size={40} />} onDoubleClick={() => openApp('explorer', 'File Explorer')} />
        <DesktopIcon id="browser" name="Edge" icon={<Globe className="text-blue-500" size={40} />} onDoubleClick={() => openApp('browser', 'Browser')} />
        <DesktopIcon id="notepad" name="Notepad" icon={<FileText className="text-blue-400" size={40} />} onDoubleClick={() => openApp('notepad', 'Notepad')} />
        <DesktopIcon id="paint" name="Paint" icon={<Palette className="text-pink-400" size={40} />} onDoubleClick={() => openApp('paint', 'Paint')} />
        <DesktopIcon id="calculator" name="Calculator" icon={<CalcIcon className="text-gray-700" size={40} />} onDoubleClick={() => openApp('calculator', 'Calculator')} />
        <DesktopIcon id="store" name="Store" icon={<ShoppingBag className="text-green-500" size={40} />} onDoubleClick={() => openApp('store', 'App Store')} />
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

const DesktopIcon = ({ name, icon, onDoubleClick }: { id: string, name: string, icon: React.ReactNode, onDoubleClick: () => void }) => (
  <button 
    onDoubleClick={onDoubleClick}
    className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-all w-24 group"
  >
    <div className="group-active:scale-95 transition-transform duration-75">
      {icon}
    </div>
    <span className="text-xs text-white text-shadow font-medium truncate w-full text-center">
      {name}
    </span>
  </button>
);
