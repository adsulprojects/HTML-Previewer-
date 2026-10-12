'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Code,
  LayoutTemplate,
  Keyboard,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Maximize,
  Minimize,
  Download,
  Upload,
  Save,
  FolderKanban,
  Columns,
  Square,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  projectName: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenTemplates: () => void;
  onOpenShortcuts: () => void;
  onOpenSettings: () => void;
  onOpenProjects: () => void;
  onSaveProject: () => void;
  onDownloadHtml: () => void;
  onImportHtml: () => void;
  viewMode: 'split' | 'editor' | 'preview';
  onChangeViewMode: (mode: 'split' | 'editor' | 'preview') => void;
}

export function Header({
  projectName,
  theme,
  onToggleTheme,
  onOpenTemplates,
  onOpenShortcuts,
  onOpenSettings,
  onOpenProjects,
  onSaveProject,
  onDownloadHtml,
  onImportHtml,
  viewMode,
  onChangeViewMode,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState<boolean>(false);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsBrowserFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsBrowserFullscreen(false);
      }
    }
  };

  const isLight = theme === 'light';

  return (
    <header className={`${isLight ? 'bg-white/95 border-b border-slate-200/90 text-slate-900' : 'bg-[#11161D]/95 border-b border-[#252C36] text-[#F5F7FA]'} backdrop-blur-md select-none sticky top-0 z-40 w-full transition-colors font-[var(--font-manrope)]`}>
      <div className="w-full px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="relative group">
              <Image
                src="/logo.png"
                alt="HTML Previewer Logo"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-sm bg-[#0B0F14] border border-[#252C36] shrink-0 transition-transform duration-200 group-hover:scale-105"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline">
                <span className={`font-extrabold text-[15px] sm:text-base md:text-lg tracking-tight font-[var(--font-manrope)] leading-none ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>
                  <span>HTML</span> <span className="text-[#A78BFA]">Previewer</span>
                </span>
                <span className={`hidden xl:inline-block ml-2 text-xs font-normal tracking-normal ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
                  Write code. Preview instantly.
                </span>
              </div>
            </div>
          </div>

          {/* Project Title Badge */}
          <button
            onClick={onOpenProjects}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-[13px] font-medium transition-all ml-1 ${
              isLight
                ? 'bg-slate-100/80 border-slate-200 hover:border-[#7C3AED]/50 text-slate-700 hover:bg-slate-100'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#7C3AED]/50 text-[#CBD5E1] hover:bg-[#1A222C]'
            }`}
            title="Switch or rename project"
            aria-label={`Current project: ${projectName}. Click to switch or rename`}
          >
            <FolderKanban className="w-4 h-4 text-[#7C3AED] shrink-0" />
            <span className="max-w-[140px] truncate">{projectName}</span>
          </button>
        </div>

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Editor view modes and tools">
          {/* View Mode Switcher */}
          <div className={`flex items-center p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'}`}>
            <button
              onClick={() => onChangeViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all ${
                viewMode === 'split'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Split View (Editor & Live Preview side by side)"
            >
              <Columns className="w-4 h-4" />
              <span>Split</span>
            </button>
            <button
              onClick={() => onChangeViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all ${
                viewMode === 'editor'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Editor Only"
            >
              <span>Editor</span>
            </button>
            <button
              onClick={() => onChangeViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all ${
                viewMode === 'preview'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Preview Only (Full Width Canvas)"
            >
              <span>Preview</span>
            </button>
          </div>

          <button
            onClick={onOpenTemplates}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#CBD5E1] hover:text-white hover:bg-[#151B23]'
            }`}
            title="Browse starter templates"
          >
            <LayoutTemplate className="w-4 h-4 text-[#A78BFA]" />
            <span>Templates</span>
          </button>

          <button
            onClick={onOpenShortcuts}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#CBD5E1] hover:text-white hover:bg-[#151B23]'
            }`}
            title="Keyboard shortcuts (Ctrl/Cmd + /)"
          >
            <Keyboard className="w-4 h-4 text-[#38BDF8]" />
            <span>Shortcuts</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick File Action Buttons */}
          <button
            onClick={onSaveProject}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border text-xs sm:text-[13px] font-semibold transition-all ${
              isLight
                ? 'bg-slate-100 border-slate-200 hover:border-[#22C55E]/60 text-slate-800 hover:bg-slate-200/60'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#22C55E]/50 text-[#F5F7FA] hover:bg-[#1A222C]'
            }`}
            title="Save Project (Ctrl/Cmd + S)"
            aria-label="Save Project"
          >
            <Save className="w-4 h-4 text-[#22C55E]" />
            <span className="hidden xl:inline">Save</span>
          </button>

          <button
            onClick={onImportHtml}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border text-xs sm:text-[13px] font-semibold transition-all ${
              isLight
                ? 'bg-slate-100 border-slate-200 hover:border-[#38BDF8]/60 text-slate-800 hover:bg-slate-200/60'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#38BDF8]/50 text-[#F5F7FA] hover:bg-[#1A222C]'
            }`}
            title="Import HTML file"
            aria-label="Import HTML file"
          >
            <Upload className="w-4 h-4 text-[#38BDF8]" />
            <span className="hidden xl:inline">Import</span>
          </button>

          {/* Download button has been removed from header per user instructions */}

          <div className={`h-5 w-px mx-0.5 hidden sm:block ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          {/* Theme Toggle Button (sm+) */}
          <button
            onClick={onToggleTheme}
            className={`hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all items-center justify-center border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-[#151B23] border-[#252C36] text-[#CBD5E1] hover:text-white hover:bg-[#1C232E] hover:border-[#333B47]'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <Moon className="w-[18px] h-[18px] text-[#7C3AED]" />
            ) : (
              <Sun className="w-[18px] h-[18px] text-amber-400" />
            )}
          </button>

          {/* Settings (sm+) */}
          <button
            onClick={onOpenSettings}
            className={`hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all items-center justify-center border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-[#151B23] border-[#252C36] text-[#CBD5E1] hover:text-white hover:bg-[#1C232E] hover:border-[#333B47]'
            }`}
            title="Editor Settings"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-[18px] h-[18px]" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleBrowserFullscreen}
            className={`hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all items-center justify-center border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-[#151B23] border-[#252C36] text-[#CBD5E1] hover:text-white hover:bg-[#1C232E] hover:border-[#333B47]'
            }`}
            title={isBrowserFullscreen ? 'Exit Fullscreen' : 'Fullscreen Window'}
            aria-label="Toggle fullscreen"
          >
            {isBrowserFullscreen ? <Minimize className="w-[18px] h-[18px]" /> : <Maximize className="w-[18px] h-[18px]" />}
          </button>

          {/* Redesigned Premium Animated Menu Control (44px mobile touch target) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
              isLight
                ? isMobileMenuOpen
                  ? 'bg-slate-100 border-[#7C3AED]/40 text-slate-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 hover:border-slate-300'
                : isMobileMenuOpen
                ? 'bg-[#18202A] border-[#7C3AED]/50 text-white shadow-xs'
                : 'bg-[#151B23] border-[#252C36] hover:bg-[#1C232E] hover:border-[#333B47] text-[#CBD5E1]'
            }`}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <div className="w-5 h-3.5 relative flex flex-col justify-between pointer-events-none">
              <span
                className={`h-[2px] rounded-full transition-all duration-250 ease-in-out origin-center ${
                  isMobileMenuOpen
                    ? 'w-5 translate-y-[6px] rotate-45 bg-[#A78BFA]'
                    : 'w-5 bg-current'
                }`}
              />
              <span
                className={`h-[2px] rounded-full transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen
                    ? 'w-0 opacity-0 -translate-x-1'
                    : 'w-3.5 ml-auto bg-[#A78BFA]'
                }`}
              />
              <span
                className={`h-[2px] rounded-full transition-all duration-250 ease-in-out origin-center ${
                  isMobileMenuOpen
                    ? 'w-5 -translate-y-[6px] -rotate-45 bg-[#A78BFA]'
                    : 'w-[18px] bg-current'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className={`md:hidden border-b px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#11161D] border-[#252C36]'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-200' : 'border-[#252C36]'}`}>
            <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Current Project:</span>
            <button
              onClick={() => {
                onOpenProjects();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#7C3AED] hover:underline"
            >
              {projectName}
            </button>
          </div>

          {/* Mobile View Mode Selection */}
          <div className={`flex items-center p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'}`}>
            <button
              onClick={() => {
                onChangeViewMode('split');
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                viewMode === 'split'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600'
                  : 'text-[#9CA3AF]'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => {
                onChangeViewMode('editor');
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                viewMode === 'editor'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600'
                  : 'text-[#9CA3AF]'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => {
                onChangeViewMode('preview');
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                viewMode === 'preview'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600'
                  : 'text-[#9CA3AF]'
              }`}
            >
              Full Preview
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onOpenTemplates();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 p-3 rounded-xl font-medium border min-h-[44px] transition-colors ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100' : 'bg-[#151B23] text-white border-[#252C36] hover:bg-[#1E2530]'
              }`}
            >
              <LayoutTemplate className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => {
                onOpenProjects();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 p-3 rounded-xl font-medium border min-h-[44px] transition-colors ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100' : 'bg-[#151B23] text-white border-[#252C36] hover:bg-[#1E2530]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => {
                onOpenShortcuts();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 p-3 rounded-xl font-medium border min-h-[44px] transition-colors ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100' : 'bg-[#151B23] text-white border-[#252C36] hover:bg-[#1E2530]'
              }`}
            >
              <Keyboard className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>Shortcuts</span>
            </button>

            <button
              onClick={() => {
                onOpenSettings();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 p-3 rounded-xl font-medium border min-h-[44px] transition-colors ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100' : 'bg-[#151B23] text-white border-[#252C36] hover:bg-[#1E2530]'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Settings</span>
            </button>
          </div>

          {/* Theme Quick Toggle in Mobile Drawer */}
          <button
            onClick={() => {
              onToggleTheme();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-medium border text-xs min-h-[44px] transition-colors ${
              isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isLight ? <Moon className="w-4 h-4 text-[#7C3AED]" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>Interface Theme</span>
            </div>
            <span className="font-semibold text-[11px] px-2.5 py-1 rounded-md bg-[#7C3AED]/15 text-[#7C3AED]">
              {isLight ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onSaveProject();
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold min-h-[44px] transition-all ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200' : 'bg-[#151B23] border-[#252C36] text-white hover:bg-[#1E2530]'
              }`}
            >
              <Save className="w-4 h-4 text-[#22C55E]" />
              <span>Save</span>
            </button>

            <button
              onClick={() => {
                onImportHtml();
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold min-h-[44px] transition-all ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200' : 'bg-[#151B23] border-[#252C36] text-white hover:bg-[#1E2530]'
              }`}
            >
              <Upload className="w-4 h-4 text-[#38BDF8]" />
              <span>Import</span>
            </button>

            <button
              onClick={() => {
                onDownloadHtml();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-semibold text-white min-h-[44px] shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
