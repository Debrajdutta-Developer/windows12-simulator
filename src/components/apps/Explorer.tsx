'use client';

import React, { useState, useEffect } from 'react';
import { Folder, FileText, ChevronRight, ChevronLeft, Search, HardDrive, Clock, Star, Download } from 'lucide-react';

const Explorer: React.FC = () => {
  const [path] = useState(['C:', 'Users', 'Admin', 'Documents']);
  const [files, setFiles] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('win12_fs');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Sync with localStorage if files change (though Notepad does the saving mostly)
    const handleStorage = () => {
      const saved = localStorage.getItem('win12_fs');
      if (saved) setFiles(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const currentPathStr = path.join(' / ');

  const sidebarItems = [
    { icon: <Clock size={18} />, label: 'Recent' },
    { icon: <Star size={18} />, label: 'Favorites' },
    { icon: <Download size={18} />, label: 'Downloads' },
    { icon: <FileText size={18} />, label: 'Documents', active: true },
    { icon: <Folder size={18} />, label: 'Pictures' },
  ];

  const folders = ['Projects', 'Work', 'School', 'Personal'];

  return (
    <div className="flex h-full bg-white/90 backdrop-blur-md text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 border-r border-slate-200 p-4 space-y-6 bg-slate-50/50">
        <div className="space-y-1">
          {sidebarItems.map(item => (
            <div 
              key={item.label} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-slate-200/50 text-slate-600'}`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-200/50 rounded-lg cursor-pointer">
            <HardDrive size={18} />
            <span className="text-sm">This PC</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-3 border-b border-slate-200 bg-white">
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 cursor-not-allowed"><ChevronLeft size={20} /></button>
            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 cursor-not-allowed"><ChevronRight size={20} /></button>
          </div>
          <div className="flex-1 bg-slate-100 px-3 py-1.5 rounded-md text-sm text-slate-600 border border-slate-200 flex items-center gap-2">
            <Folder size={14} className="text-blue-500" />
            {currentPathStr}
          </div>
          <div className="relative w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Documents" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 pl-9 pr-3 py-1.5 rounded-md text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {folders.filter(f => f.toLowerCase().includes(search.toLowerCase())).map(folder => (
              <div key={folder} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-xl group-hover:bg-blue-100 transition-colors shadow-sm">
                  <Folder size={36} className="text-blue-500 fill-blue-500/20" />
                </div>
                <span className="text-xs font-medium text-center truncate w-full">{folder}</span>
              </div>
            ))}

            {Object.keys(files).filter(f => f.toLowerCase().includes(search.toLowerCase())).map(filename => (
              <div key={filename} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-xl group-hover:bg-slate-100 transition-colors shadow-sm">
                  <FileText size={36} className="text-slate-400" />
                </div>
                <span className="text-xs font-medium text-center truncate w-full">{filename}</span>
              </div>
            ))}

            {folders.length === 0 && Object.keys(files).length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                <Folder size={48} className="mb-4 opacity-20" />
                <p>This folder is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
