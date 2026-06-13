'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw, Home, Plus, Shield, Settings, Menu } from 'lucide-react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [input, setInput] = useState('google.com');
  const [tabs] = useState(['Google']);

  const navigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = input;
    if (!target.startsWith('http')) {
      target = `https://www.google.com/search?q=${encodeURIComponent(target)}&igu=1`;
    }
    setUrl(target);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#dee1e6]">
        {tabs.map((tab, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-t-lg text-xs font-medium min-w-[120px] shadow-sm">
            <span className="flex-1 truncate">{tab}</span>
            <Plus size={12} className="rotate-45 cursor-pointer opacity-60 hover:opacity-100" />
          </div>
        ))}
        <button className="p-1 hover:bg-black/10 rounded-full transition-colors">
          <Plus size={14} />
        </button>
      </div>

      {/* Address Bar Row */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-300 shadow-sm">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><ChevronLeft size={16} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><ChevronRight size={16} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600" onClick={() => setUrl(url)}><RotateCcw size={16} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><Home size={16} /></button>
        </div>

        <form onSubmit={navigate} className="flex-1 flex items-center bg-[#f1f3f4] rounded-full px-4 py-1.5 group focus-within:bg-white focus-within:shadow-md border border-transparent focus-within:border-blue-400 transition-all">
          <Shield size={14} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            className="flex-1 bg-transparent outline-none text-sm text-gray-700" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="hidden"><Search size={14} /></button>
        </form>

        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><Settings size={16} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><Menu size={16} /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Browser Content"
        />
      </div>
    </div>
  );
};

export default Browser;
