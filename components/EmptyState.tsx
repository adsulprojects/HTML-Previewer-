'use client';

import React from 'react';
import Image from 'next/image';
import { Code2, LayoutTemplate, Play } from 'lucide-react';

interface EmptyStateProps {
  theme?: 'dark' | 'light';
  onStartCoding: () => void;
  onBrowseTemplates: () => void;
}

export function EmptyState({ theme = 'dark', onStartCoding, onBrowseTemplates }: EmptyStateProps) {
  const isLight = theme === 'light';

  return (
    <div className={`flex-1 flex items-center justify-center p-6 transition-colors ${
      isLight ? 'bg-slate-50' : 'bg-[#0B0F14]'
    }`}>
      <div className={`max-w-md w-full rounded-2xl p-8 text-center shadow-2xl border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#11161D] border-[#252C36] text-[#F5F7FA]'
      }`}>
        <Image
          src="/logo.png"
          alt="HTML Previewer Logo"
          width={64}
          height={64}
          className="w-16 h-16 rounded-2xl mx-auto mb-6 object-contain shadow-lg border border-[#252C36] bg-[#0B0F14]"
          referrerPolicy="no-referrer"
        />

        <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${
          isLight ? 'text-slate-900' : 'text-[#F5F7FA]'
        }`}>
          <span>HTML</span> <span className="text-[#A78BFA]">Previewer</span>
        </h2>
        <p className={`text-sm mb-8 ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
          Write code. Preview instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onStartCoding}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Coding</span>
          </button>

          <button
            onClick={onBrowseTemplates}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                : 'bg-[#151B23] hover:bg-[#1E2530] text-[#CBD5E1] hover:text-white border-[#252C36]'
            }`}
          >
            <LayoutTemplate className="w-4 h-4 text-[#A78BFA]" />
            <span>Browse Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
}
