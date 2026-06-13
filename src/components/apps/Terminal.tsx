'use client';

import React, { useState, useRef, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Microsoft Windows [Version 10.0.22621.1992]', '(c) Microsoft Corporation. All rights reserved.', '']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `C:\\Users\\Admin> ${input}`];

    if (cmd === 'cls' || cmd === 'clear') {
      setHistory(['Microsoft Windows [Version 10.0.22621.1992]', '(c) Microsoft Corporation. All rights reserved.', '']);
    } else if (cmd === 'help') {
      newHistory.push('Available commands:', '  help    - Show this help message', '  cls     - Clear the screen', '  ver     - Show version', '  whoami  - Show current user', '  date    - Show current date', '');
    } else if (cmd === 'ver') {
      newHistory.push('Microsoft Windows [Version 10.0.22621.1992]', '');
    } else if (cmd === 'whoami') {
      newHistory.push('admin-pc\\admin', '');
    } else if (cmd === 'date') {
      newHistory.push(new Date().toDateString(), '');
    } else if (cmd !== '') {
      newHistory.push(`'${input}' is not recognized as an internal or external command,`, 'operable program or batch file.', '');
    } else {
      newHistory.push('');
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div 
      className="h-full bg-black text-[#cccccc] font-mono text-sm p-4 overflow-y-auto selection:bg-white selection:text-black"
      ref={scrollRef}
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      <div className="flex flex-col gap-0.5 whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className="min-h-[1.2em]">{line}</div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="flex mt-1">
        <span className="text-[#cccccc] mr-2">C:\Users\Admin&gt;</span>
        <input 
          id="term-input"
          type="text" 
          autoFocus
          className="flex-1 bg-transparent outline-none border-none text-[#cccccc] font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Terminal;
