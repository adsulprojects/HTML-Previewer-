'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DeviceMode, ConsoleMessage } from '@/lib/types';
import { createSandboxDocument } from '@/lib/formatters';
import { ConsolePanel } from './ConsolePanel';
import {
  Play,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Minimize2,
  Columns,
  Maximize,
  Terminal,
} from 'lucide-react';

interface PreviewPanelProps {
  theme?: 'dark' | 'light';
  html: string;
  css?: string;
  js?: string;
  autoRun: boolean;
  autoRunDelay: number;
  onToggleAutoRun: () => void;
  logs: ConsoleMessage[];
  onAddLog: (log: Omit<ConsoleMessage, 'id'>) => void;
  onClearLogs: () => void;
  viewMode?: 'split' | 'editor' | 'preview';
  onToggleExpand?: () => void;
}

export function PreviewPanel({
  theme = 'dark',
  html,
  css = '',
  js = '',
  autoRun,
  autoRunDelay,
  onToggleAutoRun,
  logs,
  onAddLog,
  onClearLogs,
  viewMode,
  onToggleExpand,
}: PreviewPanelProps) {
  const isLight = theme === 'light';
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [iframeSrcDoc, setIframeSrcDoc] = useState<string>(() => createSandboxDocument(html, css, js));

  const viewportRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Measure visible preview viewport dimensions
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateSize = () => {
      if (el) {
        setViewportSize({
          width: el.clientWidth,
          height: el.clientHeight,
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const isMobileScreen = viewportSize.width > 0 && viewportSize.width < 768;
  const isFluidMode = device === 'desktop' || isMobileScreen;

  // Compile sandbox document
  const compilePreview = () => {
    setIsRefreshing(true);
    const doc = createSandboxDocument(html, css, js);
    setIframeSrcDoc(doc);
    setTimeout(() => setIsRefreshing(false), 200);
  };

  // Debounced auto-run
  useEffect(() => {
    if (!autoRun) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      compilePreview();
    }, autoRunDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js, autoRun, autoRunDelay]);

  // Listen to postMessage from sandboxed iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'html-previewer-console') {
        onAddLog({
          type: event.data.type || 'log',
          message: event.data.message || '',
          timestamp: event.data.timestamp || new Date().toLocaleTimeString(),
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onAddLog]);

  // Keyboard shortcut: Escape to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Open in new tab
  const handleOpenNewTab = () => {
    const fullHtml = createSandboxDocument(html, css, js);
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(150, prev + 10));
  const handleZoomOut = () => setZoom((prev) => Math.max(50, prev - 10));
  const handleResetZoom = () => setZoom(100);

  // Selected viewport width in simulated modes
  const selectedViewportWidth =
    device === 'mobile'
      ? isLandscape
        ? 667
        : 375
      : device === 'tablet'
      ? isLandscape
        ? 1024
        : 768
      : 0;

  // Real Fit-to-Preview calculation for mobile/tablet devices
  let fitScale = 1;
  if (device !== 'desktop' && selectedViewportWidth > 0 && viewportSize.width > 0) {
    if (viewportSize.width < selectedViewportWidth) {
      fitScale = Math.min(1, viewportSize.width / selectedViewportWidth);
    }
  }

  const effectiveScale = (zoom / 100) * fitScale;

  // Count errors in logs for badge
  const errorCount = logs.filter((l) => l.type === 'error').length;

  // Fullscreen Preview Overlay (100vw x 100vh)
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0B0F14] flex flex-col w-full h-full m-0 p-0 overflow-hidden animate-in fade-in duration-150">
        {/* Floating Exit Fullscreen Toolbar */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-2 bg-[#11161D]/95 backdrop-blur-md border border-[#252C36] px-3 py-1.5 sm:py-2 rounded-xl shadow-2xl text-xs">
          <button
            onClick={compilePreview}
            className="p-2 sm:p-1.5 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-[#1E2530] transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
            title="Refresh Preview"
            aria-label="Refresh Preview"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <div className="h-4 w-px bg-[#252C36]" />
          <button
            onClick={() => setIsFullscreen(false)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white bg-[#7C3AED] hover:bg-[#6D28D9] font-bold transition-colors touch-manipulation min-h-[36px] cursor-pointer"
            aria-label="Exit Fullscreen Preview"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Exit Fullscreen</span>
          </button>
        </div>

        {/* Fullscreen sandboxed iframe */}
        <iframe
          ref={iframeRef}
          srcDoc={iframeSrcDoc}
          sandbox="allow-scripts allow-modals allow-forms"
          onLoad={() => setIsRefreshing(false)}
          title="HTML Fullscreen Sandboxed Preview"
          className="w-full h-full border-0 block bg-white m-0 p-0 flex-1"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block', margin: 0, padding: 0 }}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden relative transition-colors ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0B0F14] text-[#F5F7FA]'
    }`}>
      {/* 
        PreviewToolbar
        Controls for compilation, device switching, zoom, console, and full-page layout
      */}
      <div className={`flex items-center justify-between gap-1 sm:gap-1.5 px-2.5 sm:px-3 h-10 border-b select-none text-xs shrink-0 transition-colors overflow-x-auto no-scrollbar ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#11161D] border-[#252C36]'
      }`}>
        {/* Left Actions: Run, Refresh, Auto */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={compilePreview}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-all shadow-xs active:scale-95 touch-manipulation cursor-pointer ${
              isRefreshing ? 'opacity-80 ring-2 ring-[#7C3AED]/40' : ''
            }`}
            title="Run Preview (Ctrl/Cmd + Enter)"
            aria-label="Run live preview"
          >
            <Play className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-pulse' : 'fill-white'}`} />
            <span className="text-xs">Run</span>
          </button>

          <button
            onClick={compilePreview}
            className={`p-1.5 rounded-lg transition-colors border touch-manipulation cursor-pointer ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23] border-[#252C36]'
            }`}
            title="Refresh Preview"
            aria-label="Refresh preview iframe"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onToggleAutoRun}
            className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
              autoRun
                ? isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-[#151B23] border-[#22C55E]/40 text-[#22C55E]'
                : isLight
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                : 'bg-[#151B23] border-[#252C36] text-[#9CA3AF] hover:text-white'
            }`}
            title={autoRun ? 'Auto-run enabled' : 'Auto-run disabled'}
            aria-label="Toggle auto-run preview"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoRun ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            <span className="text-[11px] font-medium">Auto</span>
          </button>
        </div>

        {/* Center: Device Switcher (Desktop, Tablet, Mobile) - Shown on desktop screens */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <div className={`flex items-center p-0.5 rounded-lg border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
          }`}>
            <button
              onClick={() => {
                setDevice('desktop');
                setIsLandscape(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                device === 'desktop'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Desktop (100% Full Width Viewport)"
              aria-label="Desktop view mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                device === 'tablet'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Tablet (768px Viewport)"
              aria-label="Tablet 768px simulation mode"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                device === 'mobile'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Mobile (375px Viewport)"
              aria-label="Mobile 375px simulation mode"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {device !== 'desktop' && (
            <button
              onClick={() => setIsLandscape(!isLandscape)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] transition-colors cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  : 'bg-[#151B23] border-[#252C36] text-[#9CA3AF] hover:text-white'
              }`}
              title={isLandscape ? 'Switch to Portrait' : 'Switch to Landscape'}
              aria-label="Toggle device orientation"
            >
              <span>{isLandscape ? 'Landscape' : 'Portrait'}</span>
            </button>
          )}
        </div>

        {/* Right Actions: Zoom (desktop only), Console, New Tab, Full Page (desktop only), Fullscreen */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Zoom controls on desktop */}
          <div className={`hidden lg:flex items-center rounded-md border px-1 py-0.5 text-[11px] ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
          }`}>
            <button
              onClick={handleZoomOut}
              className={`p-0.5 transition-colors cursor-pointer ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className={`px-1.5 font-mono transition-colors text-[10px] cursor-pointer ${
                isLight ? 'text-slate-800 font-medium' : 'text-[#D1D5DB] hover:text-white'
              }`}
              title="Reset Zoom (100%)"
              aria-label="Reset zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className={`p-0.5 transition-colors cursor-pointer ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Console Drawer Toggle */}
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors border touch-manipulation cursor-pointer ${
              isConsoleOpen
                ? isLight
                  ? 'bg-slate-200 text-slate-900 border-slate-300'
                  : 'bg-[#252C36] text-white border-[#3B4452]'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200'
                : 'text-[#9CA3AF] hover:text-white bg-[#151B23] border-[#252C36]'
            }`}
            title="Toggle Console Output"
            aria-label="Toggle developer console"
          >
            <Terminal className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="hidden sm:inline text-[11px] font-medium">Console</span>
            {errorCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-1.5 py-0.2 text-[9px] font-bold">
                {errorCount}
              </span>
            )}
          </button>

          {/* Open in New Tab */}
          <button
            onClick={handleOpenNewTab}
            className={`p-1.5 rounded-lg transition-colors border touch-manipulation cursor-pointer ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23] border-[#252C36]'
            }`}
            title="Open in New Tab"
            aria-label="Open preview in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Full Page Workspace View Toggle on desktop */}
          {onToggleExpand && (
            <button
              onClick={() => {
                if (device !== 'desktop') {
                  setDevice('desktop');
                }
                onToggleExpand();
              }}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900 hover:border-[#7C3AED]/50'
                  : 'bg-[#151B23] text-[#CBD5E1] border-[#252C36] hover:text-white hover:border-[#7C3AED]/50'
              }`}
              title={viewMode === 'preview' ? 'Restore Split View' : 'Cover Full Page (100% Width)'}
              aria-label={viewMode === 'preview' ? 'Restore split view' : 'Full page view'}
            >
              {viewMode === 'preview' ? (
                <>
                  <Columns className="w-3.5 h-3.5" />
                  <span>Split View</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Full Page</span>
                </>
              )}
            </button>
          )}

          {/* Clear, Prominent Fullscreen Button (Works on mobile & desktop!) */}
          <button
            onClick={() => setIsFullscreen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border touch-manipulation cursor-pointer ${
              isLight
                ? 'bg-purple-50 text-[#7C3AED] border-[#7C3AED]/30 hover:bg-purple-100/70 hover:border-[#7C3AED]/60 shadow-xs'
                : 'bg-[#7C3AED]/15 text-[#A78BFA] border-[#7C3AED]/40 hover:bg-[#7C3AED]/25 hover:border-[#7C3AED]/70 hover:text-white shadow-xs'
            }`}
            title="Fullscreen Preview (100vw × 100vh)"
            aria-label="Enter fullscreen preview mode"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="font-bold">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Non-intrusive preview runtime error notice */}
      {errorCount > 0 && !isConsoleOpen && (
        <div className={`flex items-center justify-between px-3 py-1.5 border-b text-xs shrink-0 select-none transition-colors ${
          isLight ? 'bg-red-50 text-red-700 border-red-200' : 'bg-red-950/40 text-red-400 border-red-900/50'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
            <span className="font-semibold truncate">
              {errorCount} script/runtime error{errorCount > 1 ? 's' : ''} detected in preview
            </span>
          </div>
          <button
            onClick={() => setIsConsoleOpen(true)}
            className="underline font-bold shrink-0 ml-2 hover:opacity-80 cursor-pointer"
          >
            Inspect Console
          </button>
        </div>
      )}

      {/* 
        PreviewViewport
        The visible area. Must fill all available height (flex: 1, min-height: 0, overflow: auto).
      */}
      <div
        ref={viewportRef}
        className={`preview-viewport flex-1 min-h-0 w-full h-full overflow-hidden relative flex flex-col transition-colors ${
          isLight ? 'bg-slate-200/50' : 'bg-[#090B0F]'
        }`}
        style={{ width: '100%', height: '100%', minHeight: 0 }}
      >
        {isFluidMode ? (
          /*
            DESKTOP / FLUID RESPONSIVE MODE
            iframe uses the complete available width and height of PreviewViewport (100%).
            Starts at x = 0 with no margins, no artificial device frames, no borders, no cropped space.
          */
          <div
            className="preview-frame w-full h-full min-h-0 flex-1 relative m-0 p-0"
            style={{
              width: '100%',
              height: '100%',
              transform: zoom !== 100 && !isMobileScreen ? `scale(${zoom / 100})` : undefined,
              transformOrigin: 'top left',
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={iframeSrcDoc}
              sandbox="allow-scripts allow-modals allow-forms"
              onLoad={() => setIsRefreshing(false)}
              title="Live HTML Preview"
              className="w-full h-full flex-1 min-h-0 border-0 block bg-white m-0 p-0"
              style={{
                width: '100%',
                height: '100%',
                minHeight: 0,
                border: 'none',
                display: 'block',
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        ) : (
          /*
            SIMULATED DEVICE MODES (Tablet & Mobile on desktop screens)
          */
          <div className="w-full h-full flex-1 min-h-0 flex items-start justify-center overflow-auto p-0">
            <div
              className="scaled-frame-wrapper flex items-start justify-center shrink-0"
              style={{
                height: effectiveScale < 1 ? `${100 / effectiveScale}%` : '100%',
                transform: effectiveScale !== 1 ? `scale(${effectiveScale})` : undefined,
                transformOrigin: 'top center',
              }}
            >
              <div
                className={`preview-frame bg-white flex flex-col h-full shrink-0 ${
                  isLight ? 'shadow-xl border-x border-slate-300' : 'shadow-2xl border-x border-[#252C36]'
                }`}
                style={{
                  width: `${selectedViewportWidth}px`,
                  height: '100%',
                  minHeight: '100%',
                }}
              >
                <iframe
                  ref={iframeRef}
                  srcDoc={iframeSrcDoc}
                  sandbox="allow-scripts allow-modals allow-forms"
                  onLoad={() => setIsRefreshing(false)}
                  title={`${device} Viewport`}
                  className="w-full h-full flex-1 min-h-0 border-0 block bg-white m-0 p-0"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    border: 'none',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Console Panel */}
      <ConsolePanel
        theme={theme}
        logs={logs}
        isOpen={isConsoleOpen}
        onToggle={() => setIsConsoleOpen(!isConsoleOpen)}
        onClear={onClearLogs}
      />
    </div>
  );
}
