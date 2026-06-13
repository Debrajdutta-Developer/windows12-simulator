'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Search, Shield, Lock, Star, MoreHorizontal, Globe } from 'lucide-react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [inputValue, setInputValue] = useState('https://www.google.com');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputValue;
    if (!finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputValue(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#f3f3f3] pt-2 px-2 border-b border-gray-300">
        <div className="bg-white px-4 py-2 rounded-t-lg flex items-center gap-2 text-xs font-medium w-48 shadow-sm">
          <Globe size={14} className="text-blue-500" />
          <span className="truncate flex-1">New Tab</span>
          <button className="hover:bg-gray-100 rounded p-0.5">×</button>
        </div>
        <button className="mx-2 hover:bg-gray-200 rounded p-1">+</button>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center gap-3 p-2 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded text-slate-400"><ChevronLeft size={18} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded text-slate-400"><ChevronRight size={18} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded"><RotateCw size={18} /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded"><Home size={18} /></button>
        </div>

        <form onSubmit={handleGo} className="flex-1 relative flex items-center group">
          <div className="absolute left-3 text-green-600 flex items-center gap-1">
            <Lock size={12} />
          </div>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-[#f3f3f3] border-none rounded-full py-1.5 pl-8 pr-24 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <div className="absolute right-3 flex items-center gap-2 text-slate-400">
            <Star size={14} className="hover:text-yellow-500 cursor-pointer" />
            <Search size={14} />
          </div>
        </form>

        <div className="flex items-center gap-1">
           <button className="p-1.5 hover:bg-gray-100 rounded"><Shield size={18} className="text-blue-500" /></button>
           <button className="p-1.5 hover:bg-gray-100 rounded"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        {url.includes('google.com') ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" className="w-48 mb-8" />
            <div className="w-full max-w-xl relative">
              <input 
                type="text" 
                className="w-full py-3 px-12 rounded-full border border-gray-200 hover:shadow-md focus:shadow-md outline-none transition-shadow"
                placeholder="Search Google or type a URL"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="flex gap-4 mt-8">
              <button className="px-4 py-2 bg-[#f8f9fa] border border-transparent hover:border-gray-300 rounded text-sm">Google Search</button>
              <button className="px-4 py-2 bg-[#f8f9fa] border border-transparent hover:border-gray-300 rounded text-sm">I&apos;m Feeling Lucky</button>
            </div>
          </div>
        ) : (
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Browser Content"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
};

export default Browser;
