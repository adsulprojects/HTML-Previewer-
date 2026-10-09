'use client';

import React from 'react';
import { ToastMessage } from '@/lib/types';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  theme?: 'dark' | 'light';
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ theme = 'dark', toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  const isLight = theme === 'light';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-blue-500 shrink-0" />;
        let borderClass = isLight ? 'border-slate-200' : 'border-[#252C36]';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
          borderClass = isLight ? 'border-emerald-300' : 'border-[#22C55E]/40';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />;
          borderClass = isLight ? 'border-red-300' : 'border-[#EF4444]/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
          borderClass = isLight ? 'border-amber-300' : 'border-[#F59E0B]/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg border shadow-xl text-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              isLight ? 'bg-white text-slate-900' : 'bg-[#151B23] text-[#F5F7FA]'
            } ${borderClass}`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span className="font-medium text-xs sm:text-sm">{toast.text}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className={`p-0.5 rounded transition-colors ${
                isLight ? 'text-slate-400 hover:text-slate-700' : 'text-[#9CA3AF] hover:text-[#F5F7FA]'
              }`}
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
