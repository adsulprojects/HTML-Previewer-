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
  css: string;
  js: string;
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
  css,
  js,
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
      <div className="fixed inset-0 z-50 bg-[#0B0F14] flex flex-col w-full h-full m-0 p-0 overflow-hidden">
        {/* Floating Exit Fullscreen Toolbar */}
        <div className="absolute top-3 right-3 z-50 flex items-center gap-2 bg-[#11161D]/90 backdrop-blur-md border border-[#252C36] px-3 py-1.5 rounded-lg shadow-2xl text-xs">
          <button
            onClick={compilePreview}
            className="p-1 rounded text-[#9CA3AF] hover:text-white transition-colors"
            title="Refresh Preview"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <div className="h-3 w-px bg-[#252C36]" />
          <button
            onClick={() => setIsFullscreen(false)}
            className="flex items-center gap-1.5 text-xs text-[#CBD5E1] hover:text-white font-semibold transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </div>

        {/* Fullscreen sandboxed iframe */}
        <iframe
          ref={iframeRef}
          srcDoc={iframeSrcDoc}
          sandbox="allow-scripts"
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
      <div className={`flex items-center justify-between gap-1.5 px-2.5 sm:px-3 h-10 border-b select-none text-xs shrink-0 overflow-x-auto transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#11161D] border-[#252C36]'
      }`}>
        {/* Left Actions: Run, Refresh, Auto */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={compilePreview}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-all shadow-xs active:scale-95 ${
              isRefreshing ? 'opacity-80 ring-2 ring-[#7C3AED]/40' : ''
            }`}
            title="Run Preview (Ctrl/Cmd + Enter)"
          >
            <Play className={`w-3 h-3 ${isRefreshing ? 'animate-pulse' : 'fill-white'}`} />
            <span className="text-xs">Run</span>
          </button>

          <button
            onClick={compilePreview}
            className={`p-1.5 rounded-md transition-colors border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23] border-transparent hover:border-[#252C36]'
            }`}
            title="Refresh Preview"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onToggleAutoRun}
            className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs transition-colors ${
              autoRun
                ? isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-[#151B23] border-[#22C55E]/40 text-[#22C55E]'
                : isLight
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                : 'bg-[#151B23] border-[#252C36] text-[#9CA3AF] hover:text-white'
            }`}
            title={autoRun ? 'Auto-run enabled' : 'Auto-run disabled'}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoRun ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            <span className="text-[11px]">Auto</span>
          </button>
        </div>

        {/* Center: Device Switcher (Desktop, Tablet, Mobile) & Orientation */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`flex items-center p-0.5 rounded-md border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
          }`}>
            <button
              onClick={() => {
                setDevice('desktop');
                setIsLandscape(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                device === 'desktop'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Desktop (100% Full Width Viewport)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                device === 'tablet'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Tablet (768px Viewport)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                device === 'mobile'
                  ? isLight
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'bg-[#252C36] text-white font-medium'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
              title="Mobile (375px Viewport)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {device !== 'desktop' && (
            <button
              onClick={() => setIsLandscape(!isLandscape)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] transition-colors ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  : 'bg-[#151B23] border-[#252C36] text-[#9CA3AF] hover:text-white'
              }`}
              title={isLandscape ? 'Switch to Portrait' : 'Switch to Landscape'}
            >
              <span>{isLandscape ? 'Landscape' : 'Portrait'}</span>
            </button>
          )}
        </div>

        {/* Right Actions: Zoom, Console, New Tab, Full Page Workspace Toggle, Fullscreen */}
        <div className="flex items-center gap-1 shrink-0">
          <div className={`hidden sm:flex items-center rounded-md border px-1 py-0.5 text-[11px] ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
          }`}>
            <button
              onClick={handleZoomOut}
              className={`p-0.5 transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className={`px-1.5 font-mono transition-colors text-[10px] ${
                isLight ? 'text-slate-800 font-medium' : 'text-[#D1D5DB] hover:text-white'
              }`}
              title="Reset Zoom (100%)"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className={`p-0.5 transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Console Drawer Toggle */}
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors border ${
              isConsoleOpen
                ? isLight
                  ? 'bg-slate-200 text-slate-900 border-slate-300'
                  : 'bg-[#252C36] text-white border-[#3B4452]'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200'
                : 'text-[#9CA3AF] hover:text-white bg-[#151B23] border-[#252C36]'
            }`}
            title="Toggle Console Output"
          >
            <Terminal className="w-3 h-3 text-[#7C3AED]" />
            <span className="hidden md:inline text-[11px]">Console</span>
            {errorCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-1 text-[9px] font-bold">
                {errorCount}
              </span>
            )}
          </button>

          <button
            onClick={handleOpenNewTab}
            className={`p-1.5 rounded-md transition-colors border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23] border-transparent hover:border-[#252C36]'
            }`}
            title="Open in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Full Page Workspace View Toggle */}
          {onToggleExpand && (
            <button
              onClick={() => {
                if (device !== 'desktop') {
                  setDevice('desktop');
                }
                onToggleExpand();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
                viewMode === 'preview'
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900 hover:border-[#7C3AED]/50'
                  : 'bg-[#151B23] text-[#CBD5E1] border-[#252C36] hover:text-white hover:border-[#7C3AED]/50'
              }`}
              title={viewMode === 'preview' ? 'Restore Split View' : 'Cover Full Page (100% Width)'}
            >
              {viewMode === 'preview' ? (
                <>
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Split View</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Full Page</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(true)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#151B23] border-transparent hover:border-[#252C36]'
            }`}
            title="Fullscreen Preview (100vw × 100vh)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* 
        PreviewViewport
        The visible area. Must fill all available height (flex: 1, min-height: 0, overflow: auto).
      */}
      <div
        ref={viewportRef}
        className={`preview-viewport flex-1 min-h-0 w-full h-full overflow-auto relative flex flex-col transition-colors ${
          isLight ? 'bg-slate-200/50' : 'bg-[#090B0F]'
        }`}
        style={{ width: '100%', height: '100%', minHeight: 0 }}
      >
        {device === 'desktop' ? (
          /*
            DESKTOP MODE
            iframe uses the COMPLETE available width of PreviewViewport (100%).
            Starts at x = 0 with no margins, no artificial device frames, no borders, no cropped space.
          */
          <div
            className="preview-frame w-full h-full min-h-0 flex-1 relative m-0 p-0"
            style={{
              width: '100%',
              height: '100%',
              transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
              transformOrigin: 'top left',
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={iframeSrcDoc}
              sandbox="allow-scripts"
              title="Desktop Live Preview"
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
            MOBILE & TABLET MODES
            Mobile: 375px (or landscape 667px)
            Tablet: 768px (or landscape 1024px)
            Centered inside PreviewViewport.
            Real Fit scaling applied only to ScaledFrameWrapper when preview panel is narrower than target device.
          */
          <div className="w-full h-full flex-1 min-h-0 flex items-start justify-center overflow-auto p-0">
            <div
              className="scaled-frame-wrapper h-full flex items-start justify-center shrink-0"
              style={{
                height: '100%',
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
                  sandbox="allow-scripts"
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
