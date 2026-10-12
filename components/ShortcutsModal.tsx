'use client';

import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  theme?: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ theme = 'dark', isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  const shortcuts = [
    { key: 'Ctrl / ⌘ + Enter', action: 'Run / Refresh Sandbox Preview' },
    { key: 'Ctrl / ⌘ + S', action: 'Save Current Project' },
    { key: 'Ctrl / ⌘ + F', action: 'Toggle Search & Replace' },
    { key: 'Ctrl / ⌘ + Shift + F', action: 'Format HTML Code' },
    { key: 'Ctrl / ⌘ + Z', action: 'Undo last code change' },
    { key: 'Ctrl / ⌘ + Shift + Z', action: 'Redo code change' },
    { key: 'Tab', action: 'Indent lines by spaces' },
    { key: 'Shift + Tab', action: 'Dedent lines' },
    { key: 'Escape', action: 'Close dialogs, search, or drawers' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#151B23] border-[#252C36] text-[#F5F7FA]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11161D] border-[#252C36]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>Keyboard Shortcuts</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Speed up your workflow with hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1E2530]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`p-6 divide-y max-h-[60vh] overflow-y-auto ${
          isLight ? 'divide-slate-100 bg-white' : 'divide-[#1E2530] bg-[#151B23]'
        }`}>
          {shortcuts.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
              <span className={`font-medium ${isLight ? 'text-slate-700' : 'text-[#CBD5E1]'}`}>{item.action}</span>
              <kbd className={`px-2.5 py-1 rounded font-mono text-[11px] shadow-xs ${
                isLight
                  ? 'bg-slate-100 border border-slate-200 text-[#7C3AED] font-semibold'
                  : 'bg-[#0D1117] border border-[#252C36] text-[#A78BFA]'
              }`}>
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className={`px-6 py-3 border-t flex justify-end transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11161D] border-[#252C36]'
        }`}>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
