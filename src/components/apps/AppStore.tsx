'use client';

import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import { AppID } from '@/types/os';
import { Download, Trash2, CheckCircle, Star, ShieldCheck, Zap } from 'lucide-react';

interface AppInfo {
  id: AppID;
  name: string;
  description: string;
  category: string;
  rating: number;
  icon: string;
  color: string;
}

const AppStore: React.FC = () => {
  const { installedApps, installApp, uninstallApp } = useOSStore();

  const apps: AppInfo[] = [
    { id: 'notepad', name: 'Notepad', description: 'Simple text editor for your notes.', category: 'Productivity', rating: 4.5, icon: 'FileText', color: 'bg-blue-500' },
    { id: 'paint', name: 'Paint', description: 'Unleash your creativity with digital art.', category: 'Creativity', rating: 4.8, icon: 'Palette', color: 'bg-pink-500' },
    { id: 'calculator', name: 'Calculator', description: 'Standard math operations at your fingertips.', category: 'Utilities', rating: 4.2, icon: 'Calculator', color: 'bg-green-500' },
    { id: 'copilot', name: 'Copilot', description: 'Your AI assistant for everything.', category: 'AI', rating: 4.9, icon: 'Sparkles', color: 'bg-indigo-600' },
    { id: 'explorer', name: 'File Explorer', description: 'Manage your files and folders.', category: 'System', rating: 4.0, icon: 'Folder', color: 'bg-yellow-500' },
    { id: 'music', name: 'Music', description: 'Listen to your favorite tracks.', category: 'Entertainment', rating: 4.7, icon: 'Music', color: 'bg-red-500' },
    { id: 'browser', name: 'Edge Browser', description: 'Fast and secure web browsing.', category: 'Internet', rating: 4.4, icon: 'Globe', color: 'bg-blue-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Microsoft Store</h1>
          <p className="text-blue-100 max-w-md">Discover the best apps, games, and more for your Windows 12 experience.</p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-10">
          <Download size={200} />
        </div>
      </div>

      {/* Featured Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Top Free Apps</h2>
          <button className="text-blue-600 text-sm font-medium hover:underline">See all</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map(app => {
            const isInstalled = installedApps.includes(app.id);
            return (
              <div key={app.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-inner`}>
                   {/* Simplified icon representation */}
                   <Zap size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{app.name}</h3>
                  <p className="text-xs text-slate-500 mb-2 truncate">{app.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{app.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{app.category}</span>
                  </div>
                  
                  {isInstalled ? (
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold border border-green-100 flex-1 justify-center">
                        <CheckCircle size={14} /> Installed
                      </div>
                      <button 
                        onClick={() => uninstallApp(app.id)}
                        className="p-1.5 bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                        title="Uninstall"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => installApp(app.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> Get
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
               <ShieldCheck size={24} />
             </div>
             <div>
               <h3 className="font-bold text-slate-800">Verified & Secure</h3>
               <p className="text-sm text-slate-500">Every app in our store is scanned for security and reliability.</p>
             </div>
           </div>
           <button className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default AppStore;
