'use client';

import React, { useState } from 'react';
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
  Menu,
  X,
  FolderKanban,
  Columns,
  Square,
  Sparkles,
  BookOpen
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
    <header className={`${isLight ? 'bg-white border-b border-slate-200 text-slate-900' : 'bg-[#11161D] border-b border-[#252C36] text-[#F5F7FA]'} select-none sticky top-0 z-40 w-full transition-colors`}>
      <div className="w-full px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white shadow-sm shadow-[#7C3AED]/20">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <span className={`font-extrabold text-sm sm:text-base tracking-tight ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>
                HTML Previewer
              </span>
              <span className={`hidden xl:inline-block ml-2 text-[11px] font-normal ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
                Write code. Preview instantly.
              </span>
            </div>
          </div>

          {/* Project Title Badge */}
          <button
            onClick={onOpenProjects}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ml-1 ${
              isLight
                ? 'bg-slate-100 border-slate-200 hover:border-[#7C3AED]/50 text-slate-700'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#7C3AED]/50 text-[#CBD5E1]'
            }`}
            title="Switch or rename project"
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="max-w-[130px] truncate font-medium">{projectName}</span>
          </button>
        </div>

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* View Mode Switcher */}
          <div className={`flex items-center p-0.5 rounded-lg border mr-2 ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'}`}>
            <button
              onClick={() => onChangeViewMode('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'split'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Split View (Editor & Preview)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
            <button
              onClick={() => onChangeViewMode('editor')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'editor'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white'
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'preview'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Preview Only (Full Width)"
            >
              <span>Preview</span>
            </button>
          </div>

          <button
            onClick={onOpenTemplates}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#CBD5E1] hover:text-white hover:bg-[#151B23]'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Templates</span>
          </button>

          <button
            onClick={onOpenShortcuts}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#CBD5E1] hover:text-white hover:bg-[#151B23]'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Shortcuts</span>
          </button>

          <a
            href="#guide"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#CBD5E1] hover:text-white hover:bg-[#151B23]'
            }`}
            title="HTML Previewer Guide & FAQ"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guide</span>
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          {/* Quick File Action Buttons */}
          <button
            onClick={onSaveProject}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-200 hover:border-[#22C55E]/60 text-slate-800'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#22C55E]/40 text-[#F5F7FA]'
            }`}
            title="Save Project (Ctrl/Cmd + S)"
          >
            <Save className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="hidden xl:inline">Save</span>
          </button>

          <button
            onClick={onImportHtml}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-200 hover:border-[#38BDF8]/60 text-slate-800'
                : 'bg-[#151B23] border-[#252C36] hover:border-[#38BDF8]/40 text-[#F5F7FA]'
            }`}
            title="Import HTML file"
          >
            <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden xl:inline">Import</span>
          </button>

          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-semibold text-white shadow-sm transition-colors"
            title="Download Standalone HTML"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <div className={`h-4 w-px mx-1 hidden sm:block ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23]'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-[#7C3AED]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23]'
            }`}
            title="Editor Settings"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleBrowserFullscreen}
            className={`hidden sm:flex p-2 rounded-lg transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23]'
            }`}
            title={isBrowserFullscreen ? 'Exit Fullscreen' : 'Fullscreen Window'}
            aria-label="Toggle fullscreen"
          >
            {isBrowserFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ml-1 ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23]'
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#11161D] border-[#252C36]'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-200' : 'border-[#252C36]'}`}>
            <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Current Project:</span>
            <button
              onClick={() => {
                onOpenProjects();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#7C3AED] underline"
            >
              {projectName}
            </button>
          </div>

          {/* Mobile View Mode Selection */}
          <div className={`flex items-center p-1 rounded-lg border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'}`}>
            <button
              onClick={() => {
                onChangeViewMode('split');
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold text-center transition-colors ${
                viewMode === 'split'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white'
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
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold text-center transition-colors ${
                viewMode === 'editor'
                  ? isLight
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'bg-[#252C36] text-white'
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
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold text-center transition-colors ${
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
              className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
              }`}
            >
              <LayoutTemplate className="w-4 h-4 text-[#A78BFA]" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => {
                onOpenProjects();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-[#7C3AED]" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => {
                onOpenShortcuts();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
              }`}
            >
              <Keyboard className="w-4 h-4 text-[#38BDF8]" />
              <span>Shortcuts</span>
            </button>

            <button
              onClick={() => {
                onOpenSettings();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-2.5 rounded-lg font-medium border ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-emerald-500" />
              <span>Settings</span>
            </button>

            <a
              href="#guide"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-lg font-medium border col-span-2 ${
                isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Guide &amp; Documentation</span>
            </a>
          </div>

          {/* Theme Quick Toggle in Mobile Drawer */}
          <button
            onClick={() => {
              onToggleTheme();
            }}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg font-medium border text-xs ${
              isLight ? 'bg-slate-50 text-slate-800 border-slate-200' : 'bg-[#151B23] text-white border-[#252C36]'
            }`}
          >
            <div className="flex items-center gap-2">
              {isLight ? <Moon className="w-4 h-4 text-[#7C3AED]" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>Theme</span>
            </div>
            <span className="font-semibold text-[11px] px-2 py-0.5 rounded bg-[#7C3AED]/15 text-[#7C3AED]">
              {isLight ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onSaveProject();
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#151B23] border-[#252C36] text-white'
              }`}
            >
              <Save className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Save</span>
            </button>

            <button
              onClick={() => {
                onImportHtml();
                setIsMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#151B23] border-[#252C36] text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Import</span>
            </button>

            <button
              onClick={() => {
                onDownloadHtml();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#7C3AED] text-xs font-semibold text-white"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
