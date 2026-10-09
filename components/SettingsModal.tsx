'use client';

import React from 'react';
import { EditorSettings } from '@/lib/types';
import { Settings as SettingsIcon, X, Sun, Moon } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onUpdateSettings: (settings: Partial<EditorSettings>) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const isLight = settings.theme === 'light';

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
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>Workspace Settings</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Customize editor behavior, preview, and appearance</p>
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

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          {/* Editor Preferences */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#7C3AED]">
              Editor
            </h4>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Font Size</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Size of code typography in pixels</p>
              </div>
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0D1117] border-[#252C36]'
              }`}>
                {[12, 14, 16, 18].map((size) => (
                  <button
                    key={size}
                    onClick={() => onUpdateSettings({ fontSize: size })}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      settings.fontSize === size
                        ? 'bg-[#7C3AED] text-white font-bold'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Size */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Indentation Size</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Number of spaces inserted per Tab</p>
              </div>
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0D1117] border-[#252C36]'
              }`}>
                {[2, 4].map((spaces) => (
                  <button
                    key={spaces}
                    onClick={() => onUpdateSettings({ tabSize: spaces })}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      settings.tabSize === spaces
                        ? 'bg-[#7C3AED] text-white font-bold'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {spaces} spaces
                  </button>
                ))}
              </div>
            </div>

            {/* Word Wrap */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Word Wrap</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Wrap long lines instead of scrolling horizontally</p>
              </div>
              <button
                onClick={() => onUpdateSettings({ wordWrap: !settings.wordWrap })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.wordWrap ? 'bg-[#7C3AED]' : isLight ? 'bg-slate-300' : 'bg-[#252C36]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.wordWrap ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Line Numbers */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Line Numbers</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Show gutter line numbering in code editor</p>
              </div>
              <button
                onClick={() => onUpdateSettings({ lineNumbers: !settings.lineNumbers })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.lineNumbers ? 'bg-[#7C3AED]' : isLight ? 'bg-slate-300' : 'bg-[#252C36]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.lineNumbers ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          {/* Preview Preferences */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#7C3AED]">
              Preview & Execution
            </h4>

            {/* Auto Run Preview */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Auto Run Sandbox</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Debounce compile live preview as you type</p>
              </div>
              <button
                onClick={() => onUpdateSettings({ autoRun: !settings.autoRun })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.autoRun ? 'bg-[#22C55E]' : isLight ? 'bg-slate-300' : 'bg-[#252C36]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.autoRun ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto-Run Delay */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Update Debounce</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Delay before compiling preview</p>
              </div>
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0D1117] border-[#252C36]'
              }`}>
                {[200, 400, 800].map((ms) => (
                  <button
                    key={ms}
                    onClick={() => onUpdateSettings({ autoRunDelay: ms })}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      settings.autoRunDelay === ms
                        ? 'bg-[#7C3AED] text-white font-bold'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {ms}ms
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          {/* Interface & Theme Preferences */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#7C3AED]">
              Theme & Appearance
            </h4>

            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Interface Theme</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Select workspace color scheme (Dark or Light)</p>
              </div>
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0D1117] border-[#252C36]'
              }`}>
                <button
                  onClick={() => onUpdateSettings({ theme: 'dark' })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => onUpdateSettings({ theme: 'light' })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    settings.theme === 'light'
                      ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Compact Mode</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Tighter padding in headers and panels</p>
              </div>
              <button
                onClick={() => onUpdateSettings({ compactMode: !settings.compactMode })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.compactMode ? 'bg-[#7C3AED]' : isLight ? 'bg-slate-300' : 'bg-[#252C36]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.compactMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={`px-6 py-3 border-t flex justify-end transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11161D] border-[#252C36]'
        }`}>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
