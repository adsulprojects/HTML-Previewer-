'use client';

import React, { useState } from 'react';
import { ConsoleMessage } from '@/lib/types';
import { Terminal, Trash2, ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';

interface ConsolePanelProps {
  theme?: 'dark' | 'light';
  logs: ConsoleMessage[];
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export function ConsolePanel({ theme = 'dark', logs, isOpen, onToggle, onClear }: ConsolePanelProps) {
  const isLight = theme === 'light';
  const [filter, setFilter] = useState<'all' | 'error' | 'warn' | 'log'>('all');

  const errorCount = logs.filter(l => l.type === 'error').length;
  const warnCount = logs.filter(l => l.type === 'warn').length;

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  return (
    <div className={`border-t transition-colors flex flex-col shrink-0 ${
      isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-[#252C36] bg-[#0D1117] text-[#F5F7FA]'
    }`}>
      {/* Console Bar Header */}
      <div className={`flex items-center justify-between px-3 py-1.5 text-xs font-medium select-none transition-colors ${
        isLight ? 'bg-slate-50 border-b border-slate-200' : 'bg-[#11161D]'
      }`}>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 transition-colors focus:outline-none ${
            isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-[#F5F7FA]'
          }`}
          aria-label={isOpen ? "Collapse console" : "Expand console"}
        >
          <Terminal className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>Console</span>
          
          <div className="flex items-center gap-1.5 ml-1">
            {errorCount > 0 && (
              <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                isLight ? 'bg-red-100 text-red-700' : 'bg-[#EF4444]/20 text-[#EF4444]'
              }`}>
                <AlertCircle className="w-2.5 h-2.5" />
                {errorCount}
              </span>
            )}
            {warnCount > 0 && (
              <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                isLight ? 'bg-amber-100 text-amber-700' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
              }`}>
                <AlertTriangle className="w-2.5 h-2.5" />
                {warnCount}
              </span>
            )}
            <span className={`text-[11px] ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>({logs.length})</span>
          </div>

          {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-1" /> : <ChevronUp className="w-3.5 h-3.5 ml-1" />}
        </button>

        {isOpen && (
          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className={`flex items-center gap-1 p-0.5 rounded border ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
            }`}>
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  filter === 'all'
                    ? isLight
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'bg-[#252C36] text-white'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('error')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  filter === 'error'
                    ? isLight
                      ? 'bg-red-100 text-red-700'
                      : 'bg-[#EF4444]/20 text-[#EF4444]'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Errors ({errorCount})
              </button>
              <button
                onClick={() => setFilter('warn')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  filter === 'warn'
                    ? isLight
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Warns ({warnCount})
              </button>
              <button
                onClick={() => setFilter('log')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  filter === 'log'
                    ? isLight
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#252C36] text-[#22C55E]'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Logs
              </button>
            </div>

            <button
              onClick={onClear}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors text-[11px] ${
                isLight ? 'text-slate-500 hover:text-red-600' : 'text-[#9CA3AF] hover:text-[#EF4444]'
              }`}
              title="Clear Console"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Console Content */}
      {isOpen && (
        <div className={`h-44 overflow-y-auto p-2 font-mono-code text-xs space-y-1 select-text transition-colors ${
          isLight ? 'bg-white text-slate-800' : 'bg-[#0D1117] text-[#D1D5DB]'
        }`}>
          {filteredLogs.length === 0 ? (
            <div className={`h-full flex items-center justify-center italic text-xs select-none ${
              isLight ? 'text-slate-400' : 'text-[#6B7280]'
            }`}>
              Console is empty. Use console.log() in your JS to inspect output.
            </div>
          ) : (
            filteredLogs.map((log) => {
              let icon = <Info className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />;
              let textClass = isLight ? 'text-slate-800' : 'text-[#D1D5DB]';
              let bgClass = isLight ? 'hover:bg-slate-50' : 'hover:bg-[#151B23]';

              if (log.type === 'error') {
                icon = <AlertCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />;
                textClass = isLight ? 'text-red-700' : 'text-[#FCA5A5]';
                bgClass = isLight
                  ? 'bg-red-50 hover:bg-red-100/70 border-l-2 border-red-500'
                  : 'bg-[#EF4444]/10 hover:bg-[#EF4444]/15 border-l-2 border-[#EF4444]';
              } else if (log.type === 'warn') {
                icon = <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />;
                textClass = isLight ? 'text-amber-800' : 'text-[#FDE68A]';
                bgClass = isLight
                  ? 'bg-amber-50 hover:bg-amber-100/70 border-l-2 border-amber-500'
                  : 'bg-[#F59E0B]/10 hover:bg-[#F59E0B]/15 border-l-2 border-[#F59E0B]';
              } else if (log.type === 'log') {
                icon = <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />;
                textClass = isLight ? 'text-slate-800' : 'text-[#E5E7EB]';
              }

              return (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 px-2 py-1 rounded text-[11px] leading-relaxed transition-colors ${bgClass}`}
                >
                  {icon}
                  <span className={`text-[10px] shrink-0 font-sans mt-0.5 ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>{log.timestamp}</span>
                  <pre className={`whitespace-pre-wrap font-mono-code break-words flex-1 ${textClass}`}>
                    {log.message}
                  </pre>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
