'use client';

import React from 'react';
import { EditorSettings } from '@/lib/types';
import { Settings as SettingsIcon, X, Sun, Moon, Megaphone, Check } from 'lucide-react';

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

          <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          {/* AdMob & Test Ads Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" />
                <span>AdMob Test Ads</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                SANDBOX
              </span>
            </div>

            {/* Toggle Show Test Ads */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Show Test Ads</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
                  Display bottom AdMob banner test ad unit
                </p>
              </div>
              <button
                onClick={() => onUpdateSettings({ showTestAds: !settings.showTestAds })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.showTestAds ? 'bg-amber-500' : isLight ? 'bg-slate-300' : 'bg-[#252C36]'
                }`}
                aria-label="Toggle show test ads"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.showTestAds ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* AdMob Test Unit ID */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admob-test-id-input"
                  className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  AdMob Test Unit ID
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      admobTestId: 'ca-app-pub-3940256099942544/9257395921',
                    })
                  }
                  className="text-[11px] text-[#7C3AED] hover:underline"
                >
                  Reset to Google Sample ID
                </button>
              </div>
              <input
                id="admob-test-id-input"
                type="text"
                value={settings.admobTestId || ''}
                onChange={(e) => onUpdateSettings({ admobTestId: e.target.value })}
                placeholder="ca-app-pub-3940256099942544/9257395921"
                className={`w-full px-3 py-2 rounded-lg border font-mono text-xs transition-colors outline-hidden ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#7C3AED]'
                    : 'bg-[#0D1117] border-[#252C36] text-[#F5F7FA] focus:border-[#7C3AED]'
                }`}
              />
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      admobTestId: 'ca-app-pub-3940256099942544/9257395921',
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                    settings.admobTestId === 'ca-app-pub-3940256099942544/9257395921'
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 font-bold'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-[#151B23] hover:bg-[#1E2530] text-[#9CA3AF] border-[#252C36]'
                  }`}
                >
                  ca-app-pub-3940256099942544/9257395921 (Active)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      admobTestId: 'ca-app-pub-3940256099942544/6300978111',
                    })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                    settings.admobTestId === 'ca-app-pub-3940256099942544/6300978111'
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 font-bold'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-[#151B23] hover:bg-[#1E2530] text-[#9CA3AF] border-[#252C36]'
                  }`}
                >
                  6300978111 (Banner 320x50)
                </button>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
                Configured test ID:{' '}
                <code className="text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded text-[10px]">
                  ca-app-pub-3940256099942544/9257395921
                </code>{' '}
                safely verifies test ad rendering, creative cycling, and simulated CTR without policy strikes.
              </p>
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
