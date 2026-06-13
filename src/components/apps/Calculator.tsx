'use client';

import React, { useState } from 'react';
import { X, Divide, Minus, Plus, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setFormula(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullFormula = formula + display;
      const parts = fullFormula.replace('×', '*').replace('÷', '/').split(' ');
      if (parts.length === 3) {
        const a = parseFloat(parts[0]);
        const op = parts[1];
        const b = parseFloat(parts[2]);
        let res = 0;
        if (op === '+') res = a + b;
        else if (op === '-') res = a - b;
        else if (op === '*') res = a * b;
        else if (op === '/') res = a / b;
        setDisplay(String(res));
      } else {
        // Fallback or more complex logic
        // For simplicity in a mock OS, we handle one operation at a time
        setDisplay(display);
      }
      setFormula('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFormula('');
  };

  const btnClass = "h-14 flex items-center justify-center text-lg font-medium rounded-lg transition-all active:scale-95";
  const numClass = `${btnClass} bg-white/50 hover:bg-white/80 text-gray-800`;
  const opClass = `${btnClass} bg-blue-500/10 hover:bg-blue-500/20 text-blue-600`;
  const actionClass = `${btnClass} bg-orange-500 hover:bg-orange-600 text-white`;

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3]/80 backdrop-blur-xl p-4 select-none">
      <div className="flex flex-col items-end justify-end h-32 mb-4 px-4 bg-white/40 rounded-2xl border border-white/20 shadow-inner">
        <div className="text-sm text-gray-500 h-6 overflow-hidden">{formula}</div>
        <div className="text-4xl font-light text-gray-900 truncate w-full text-right">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className={`${opClass} col-span-2 text-red-500`}>AC</button>
        <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className={opClass}>DEL</button>
        <button onClick={() => handleOperator('÷')} className={opClass}><Divide size={20} /></button>
        
        {[7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className={numClass}>{n}</button>
        ))}
        <button onClick={() => handleOperator('×')} className={opClass}><X size={20} /></button>

        {[4, 5, 6].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className={numClass}>{n}</button>
        ))}
        <button onClick={() => handleOperator('-')} className={opClass}><Minus size={20} /></button>

        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className={numClass}>{n}</button>
        ))}
        <button onClick={() => handleOperator('+')} className={opClass}><Plus size={20} /></button>

        <button onClick={() => handleNumber('0')} className={`${numClass} col-span-2`}>0</button>
        <button onClick={() => handleNumber('.')} className={numClass}>.</button>
        <button onClick={calculate} className={actionClass}><Equal size={20} /></button>
      </div>
    </div>
  );
};

export default Calculator;
