'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const HTMLPreviewer = dynamic(() => import('@/components/HTMLPreviewer'), {
  ssr: false,
  loading: () => (
    <div
      id="editor"
      className="flex flex-col h-[100dvh] w-full shrink-0 overflow-hidden bg-[#0B0F14] text-[#F5F7FA] select-none"
    >
      {/* Skeleton / Initial Header */}
      <div className="h-14 border-b border-[#252C36] px-4 flex items-center justify-between bg-[#11161D] shrink-0">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="HTML Previewer Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-contain shadow-sm bg-[#0B0F14] border border-[#252C36] shrink-0"
            referrerPolicy="no-referrer"
            priority
          />
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#F5F7FA]">
              <span>HTML</span> <span className="text-[#A78BFA]">Previewer</span>
            </span>
            <span className="hidden xl:inline-block ml-2 text-[11px] font-normal text-[#9CA3AF]">
              Write code. Preview instantly.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#9CA3AF]">Initializing sandbox...</span>
        </div>
      </div>

      {/* Skeleton Workspace matching split view */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left: Code Pane placeholder */}
        <div className="w-1/2 h-full border-r border-[#252C36] bg-[#0D1117] flex flex-col p-4">
          <div className="flex items-center gap-2 border-b border-[#252C36] pb-2 mb-3">
            <span className="px-3 py-1 rounded bg-[#7C3AED] text-white text-xs font-semibold">HTML</span>
            <span className="px-3 py-1 text-xs text-[#9CA3AF]">CSS</span>
            <span className="px-3 py-1 text-xs text-[#9CA3AF]">JS</span>
          </div>
          <div className="flex-1 font-mono text-xs text-[#9CA3AF] opacity-60 leading-relaxed overflow-hidden">
            <p>&lt;!-- Loading Live HTML Sandbox --&gt;</p>
            <p>&lt;div class=&quot;container&quot;&gt;</p>
            <p>&nbsp;&nbsp;&lt;h1&gt;Interactive HTML Previewer&lt;/h1&gt;</p>
            <p>&lt;/div&gt;</p>
          </div>
        </div>

        {/* Right: Live Preview Pane placeholder */}
        <div className="w-1/2 h-full bg-[#0B0F14] flex flex-col p-4 items-center justify-center text-center">
          <div className="max-w-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 text-[#A78BFA] mx-auto flex items-center justify-center">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <p className="text-xs font-semibold text-[#F5F7FA]">Preparing Sandbox Environment</p>
            <p className="text-[11px] text-[#9CA3AF]">
              Real-time sandboxed DOM preview with responsive device simulation
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function ClientPreviewerWrapper() {
  return <HTMLPreviewer />;
}
