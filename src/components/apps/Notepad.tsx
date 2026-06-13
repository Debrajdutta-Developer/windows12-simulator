'use client';

import React, { useState } from 'react';
import { Save, FolderOpen, FileText } from 'lucide-react';

const Notepad: React.FC = () => {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('untitled.txt');
  const [files, setFiles] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('win12_fs');
    if (saved) setFiles(JSON.parse(saved));
  }, []);

  if (!mounted) return null;

  const saveFile = () => {
    const newFiles = { ...files, [filename]: content };
    setFiles(newFiles);
    localStorage.setItem('win12_fs', JSON.stringify(newFiles));
    alert(`File ${filename} saved!`);
  };

  const openFile = (name: string) => {
    setContent(files[name]);
    setFilename(name);
  };

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-md text-black">
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-100/50">
        <button 
          onClick={saveFile}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 rounded text-sm transition-colors"
        >
          <Save size={16} /> Save
        </button>
        <div className="h-4 w-[1px] bg-gray-300 mx-1" />
        <div className="relative group">
          <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 rounded text-sm transition-colors">
            <FolderOpen size={16} /> Open
          </button>
          <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md min-w-[150px] z-10">
            {Object.keys(files).length === 0 ? (
              <div className="p-2 text-xs text-gray-500">No files found</div>
            ) : (
              Object.keys(files).map(name => (
                <button
                  key={name}
                  onClick={() => openFile(name)}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm flex items-center gap-2"
                >
                  <FileText size={14} /> {name}
                </button>
              ))
            )}
          </div>
        </div>
        <input 
          type="text" 
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="ml-auto bg-transparent border-none outline-none text-sm text-right px-2 focus:ring-1 focus:ring-blue-400 rounded"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-4 bg-transparent outline-none resize-none font-mono text-sm"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default Notepad;
