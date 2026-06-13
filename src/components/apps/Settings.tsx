'use client';

import React, { useState } from 'react';
import { 
  Monitor, 
  User, 
  Shield, 
  Wifi, 
  Clock, 
  Search,
  Palette,
  HardDrive
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('System');

  const menuItems = [
    { id: 'System', icon: <Monitor size={18} />, label: 'System' },
    { id: 'Personalization', icon: <Palette size={18} />, label: 'Personalization' },
    { id: 'Network', icon: <Wifi size={18} />, label: 'Network & internet' },
    { id: 'Accounts', icon: <User size={18} />, label: 'Accounts' },
    { id: 'Security', icon: <Shield size={18} />, label: 'Privacy & security' },
    { id: 'WindowsUpdate', icon: <Clock size={18} />, label: 'Windows Update' },
  ];

  return (
    <div className="flex h-full bg-[#f3f3f3] overflow-hidden text-[#202020]">
      {/* Sidebar */}
      <div className="w-72 flex flex-col py-4 px-2 overflow-y-auto">
        <div className="flex items-center gap-3 px-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold">A</div>
          <div>
            <div className="text-sm font-semibold leading-tight">Admin User</div>
            <div className="text-xs text-gray-500 leading-tight">Local Account</div>
          </div>
        </div>

        <div className="relative mb-4 px-2">
          <Search size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Find a setting" 
            className="w-full pl-9 pr-4 py-1.5 bg-white border-b-2 border-transparent focus:border-blue-600 outline-none text-sm rounded-md transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm ${
                activeTab === item.id 
                  ? "bg-white shadow-sm font-medium text-blue-600" 
                  : "hover:bg-black/5"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/50 backdrop-blur-md overflow-y-auto p-8">
        <h1 className="text-3xl font-semibold mb-8">{activeTab}</h1>

        {activeTab === 'System' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-white/80 rounded-lg shadow-sm border border-black/5">
              <Monitor className="text-blue-500" />
              <div className="flex-1">
                <div className="font-medium text-sm">Display</div>
                <div className="text-xs text-gray-500">Brightness, night light, display resolution</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/80 rounded-lg shadow-sm border border-black/5">
              <HardDrive className="text-purple-500" />
              <div className="flex-1">
                <div className="font-medium text-sm">Storage</div>
                <div className="text-xs text-gray-500">Storage space, drives, usage rules</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Personalization' && (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 shadow-sm border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Apply Wallpaper</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
