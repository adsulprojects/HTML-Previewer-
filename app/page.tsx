'use client';

import dynamic from 'next/dynamic';

const HTMLPreviewer = dynamic(() => import('@/components/HTMLPreviewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0B0F14] text-[#F5F7FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20 animate-pulse">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-xs font-semibold text-[#9CA3AF]">Loading HTML Previewer...</span>
      </div>
    </div>
  ),
});

export default function Page() {
  return <HTMLPreviewer />;
}
