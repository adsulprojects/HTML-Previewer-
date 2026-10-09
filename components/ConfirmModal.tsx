'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  theme?: 'dark' | 'light';
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  theme = 'dark',
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-xl p-5 shadow-2xl space-y-4 border transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#151B23] border-[#252C36] text-[#F5F7FA]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isDestructive && (
              <div className="p-2 rounded-lg bg-[#EF4444]/15 text-[#EF4444]">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className={`p-1 rounded-md transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-700' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#9CA3AF]'}`}>{message}</p>

        <div className="flex justify-end gap-2.5 pt-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors border ${
              isLight
                ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                : 'text-[#CBD5E1] bg-[#1E2530] hover:bg-[#252C36] border-transparent'
            }`}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors shadow-xs ${
              isDestructive
                ? 'bg-[#EF4444] hover:bg-[#DC2626]'
                : 'bg-[#7C3AED] hover:bg-[#6D28D9]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
