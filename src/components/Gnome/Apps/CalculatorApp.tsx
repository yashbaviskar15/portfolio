import React, { useState } from 'react';
import { Delete, Equal } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const CalculatorApp: React.FC = () => {
  const { themeMode } = useGnomeStore();
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleDigit = (digit: string) => {
    if (display === '0' || resetNext) {
      setDisplay(digit);
      setResetNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (op) {
      const result = calculate(prevVal, current, op);
      setPrevVal(result);
      setDisplay(String(result));
    }
    setOp(nextOp);
    setResetNext(true);
  };

  const calculate = (a: number, b: number, operation: string): number => {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevVal === null || !op) return;
    const current = parseFloat(display);
    const result = calculate(prevVal, current, op);
    setDisplay(String(result));
    setPrevVal(null);
    setOp(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOp(null);
    setResetNext(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', ''],
  ];

  return (
    <div
      className={`h-full flex flex-col p-4 font-mono select-none ${
        themeMode === 'dark' ? 'bg-[#1a1a1e] text-white' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      {/* Display Screen */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 bg-black/40 rounded-2xl border border-white/10 mb-4 overflow-hidden">
        <span className="text-[11px] text-neutral-400">
          {prevVal !== null ? `${prevVal} ${op || ''}` : ''}
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight truncate max-w-full">
          {display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 text-sm font-bold">
        {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => {
          const isOp = ['÷', '×', '-', '+', '='].includes(btn);
          const isSpecial = ['C', '±', '%'].includes(btn);
          const isZero = btn === '0';

          return (
            <button
              key={btn}
              type="button"
              onClick={() => {
                if (btn === 'C') handleClear();
                else if (btn === '=') handleEquals();
                else if (['÷', '×', '-', '+'].includes(btn)) handleOp(btn);
                else handleDigit(btn);
              }}
              className={`py-3.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isZero ? 'col-span-2' : ''
              } ${
                isOp
                  ? 'bg-orange-600 hover:bg-orange-500 text-white'
                  : isSpecial
                  ? 'bg-white/10 hover:bg-white/20 text-neutral-200'
                  : themeMode === 'dark'
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-white'
                  : 'bg-white hover:bg-neutral-200 text-neutral-900 shadow-sm'
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
