'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Language, EditorSettings } from '@/lib/types';
import {
  Code2,
  FileCode,
  FileType,
  Undo2,
  Redo2,
  Copy,
  Trash2,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  WrapText,
  AlignLeft,
  Sparkles,
  Upload
} from 'lucide-react';

interface CodeEditorProps {
  theme?: 'dark' | 'light';
  activeTab: Language;
  onTabChange: (tab: Language) => void;
  html: string;
  css: string;
  js: string;
  onChangeHtml: (val: string) => void;
  onChangeCss: (val: string) => void;
  onChangeJs: (val: string) => void;
  settings: EditorSettings;
  onUpdateSettings: (settings: Partial<EditorSettings>) => void;
  onFormat: () => void;
  onCopyAll: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onImportHtmlFile: (file: File) => void;
}

interface HistoryState {
  html: string;
  css: string;
  js: string;
}

export function CodeEditor({
  theme,
  activeTab,
  onTabChange,
  html,
  css,
  js,
  onChangeHtml,
  onChangeCss,
  onChangeJs,
  settings,
  onUpdateSettings,
  onFormat,
  onCopyAll,
  onShowToast,
  onImportHtmlFile,
}: CodeEditorProps) {
  const currentTheme = theme || settings.theme || 'dark';
  const isLight = currentTheme === 'light';
  // Undo/Redo history stack
  const historyRef = useRef<HistoryState[]>([{ html, css, js }]);
  const historyIndexRef = useRef<number>(0);
  const isUndoRedoAction = useRef<boolean>(false);

  // Search & Replace states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [replaceQuery, setReplaceQuery] = useState<string>('');
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);

  // Drag and drop state
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Line numbers scroll synchronization
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Current code value for active tab
  const currentCode = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
  const setCode = useCallback(
    (newVal: string) => {
      if (activeTab === 'html') onChangeHtml(newVal);
      else if (activeTab === 'css') onChangeCss(newVal);
      else onChangeJs(newVal);
    },
    [activeTab, onChangeHtml, onChangeCss, onChangeJs]
  );

  // Record undo history (debounced)
  useEffect(() => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const currentSnapshot = { html, css, js };
      const lastSnapshot = historyRef.current[historyIndexRef.current];

      if (
        !lastSnapshot ||
        lastSnapshot.html !== html ||
        lastSnapshot.css !== css ||
        lastSnapshot.js !== js
      ) {
        // Truncate any redo branch
        const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
        newHistory.push(currentSnapshot);
        if (newHistory.length > 50) newHistory.shift(); // Max 50 states
        historyRef.current = newHistory;
        historyIndexRef.current = newHistory.length - 1;
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [html, css, js]);

  // Undo Handler
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      const prevState = historyRef.current[historyIndexRef.current];
      isUndoRedoAction.current = true;
      onChangeHtml(prevState.html);
      onChangeCss(prevState.css);
      onChangeJs(prevState.js);
      onShowToast('Undo', 'info');
    }
  };

  // Redo Handler
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      const nextState = historyRef.current[historyIndexRef.current];
      isUndoRedoAction.current = true;
      onChangeHtml(nextState.html);
      onChangeCss(nextState.css);
      onChangeJs(nextState.js);
      onShowToast('Redo', 'info');
    }
  };

  // Copy Active Code
  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(currentCode);
    onShowToast(`Copied ${activeTab.toUpperCase()} to clipboard`, 'success');
  };

  // Clear Active Code
  const handleClearCurrent = () => {
    if (confirm(`Clear all ${activeTab.toUpperCase()} code?`)) {
      setCode('');
      onShowToast(`Cleared ${activeTab.toUpperCase()} code`, 'info');
    }
  };

  // Select All
  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  };

  // Scroll sync for line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Tab & Auto-Indentation & Bracket Matching Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabStr = ' '.repeat(settings.tabSize || 2);

      if (!e.shiftKey) {
        // If selection spans multiple lines, indent them
        if (selectionStart !== selectionEnd && value.slice(selectionStart, selectionEnd).includes('\n')) {
          const startLine = value.lastIndexOf('\n', selectionStart - 1) + 1;
          const endLine = value.indexOf('\n', selectionEnd);
          const rangeEnd = endLine === -1 ? value.length : endLine;
          const selectedText = value.slice(startLine, rangeEnd);
          const lines = selectedText.split('\n');
          const indented = lines.map(line => tabStr + line).join('\n');

          const newCode = value.slice(0, startLine) + indented + value.slice(rangeEnd);
          setCode(newCode);

          setTimeout(() => {
            textarea.selectionStart = selectionStart + tabStr.length;
            textarea.selectionEnd = selectionEnd + (tabStr.length * lines.length);
          }, 0);
        } else {
          // Simple insert spaces at cursor
          const newCode = value.substring(0, selectionStart) + tabStr + value.substring(selectionEnd);
          setCode(newCode);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + tabStr.length;
          }, 0);
        }
      } else {
        // Shift+Tab: Dedent
        const startLine = value.lastIndexOf('\n', selectionStart - 1) + 1;
        const endLine = value.indexOf('\n', selectionEnd);
        const rangeEnd = endLine === -1 ? value.length : endLine;
        const selectedText = value.slice(startLine, rangeEnd);
        const lines = selectedText.split('\n');
        const dedented = lines.map(line => {
          if (line.startsWith(tabStr)) return line.slice(tabStr.length);
          if (line.startsWith(' ')) return line.slice(1);
          return line;
        }).join('\n');

        const diff = selectedText.length - dedented.length;
        const newCode = value.slice(0, startLine) + dedented + value.slice(rangeEnd);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = Math.max(startLine, selectionStart - (tabStr.length));
          textarea.selectionEnd = Math.max(startLine, selectionEnd - diff);
        }, 0);
      }
      return;
    }

    // Auto indentation on Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.substring(lineStart, selectionStart);
      const matchIndent = currentLine.match(/^\s*/);
      let indent = matchIndent ? matchIndent[0] : '';

      // Extra indentation if opening bracket/tag
      const lastChar = currentLine.trim().slice(-1);
      const isBlockOpen = lastChar === '{' || lastChar === '(' || lastChar === '[' || lastChar === '>';
      const tabStr = ' '.repeat(settings.tabSize || 2);

      if (isBlockOpen) {
        indent += tabStr;
      }

      const insertion = '\n' + indent;
      const newCode = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + insertion.length;
      }, 0);
      return;
    }

    // Auto-close brackets & quotes
    const pairs: Record<string, string> = {
      '{': '}',
      '(': ')',
      '[': ']',
      '"': '"',
      "'": "'",
      '`': '`',
    };

    if (pairs[e.key]) {
      const closing = pairs[e.key];
      // Only wrap if text selected or insert pair
      if (selectionStart !== selectionEnd) {
        e.preventDefault();
        const selected = value.substring(selectionStart, selectionEnd);
        const replacement = e.key + selected + closing;
        const newCode = value.substring(0, selectionStart) + replacement + value.substring(selectionEnd);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionEnd + 1;
        }, 0);
        return;
      }
    }
  };

  // Search logic derived via useMemo
  const { matchCount, currentMatchIndex } = useMemo(() => {
    if (!searchQuery) {
      return { matchCount: 0, currentMatchIndex: 0 };
    }
    try {
      const flags = isCaseSensitive ? 'g' : 'gi';
      const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const matches = currentCode.match(new RegExp(escaped, flags));
      return {
        matchCount: matches ? matches.length : 0,
        currentMatchIndex: matches && matches.length > 0 ? 1 : 0,
      };
    } catch (e) {
      return { matchCount: 0, currentMatchIndex: 0 };
    }
  }, [searchQuery, currentCode, isCaseSensitive]);

  // Find next match
  const handleFindNext = (direction: 'next' | 'prev' = 'next') => {
    if (!searchQuery || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const value = textarea.value;
    const searchTarget = isCaseSensitive ? value : value.toLowerCase();
    const query = isCaseSensitive ? searchQuery : searchQuery.toLowerCase();

    let index = -1;
    if (direction === 'next') {
      index = searchTarget.indexOf(query, textarea.selectionEnd);
      if (index === -1) index = searchTarget.indexOf(query, 0); // wrap around
    } else {
      index = searchTarget.lastIndexOf(query, Math.max(0, textarea.selectionStart - 1));
      if (index === -1) index = searchTarget.lastIndexOf(query); // wrap around
    }

    if (index !== -1) {
      textarea.focus();
      textarea.setSelectionRange(index, index + query.length);
    }
  };

  // Replace one match
  const handleReplaceOne = () => {
    if (!searchQuery || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.substring(selectionStart, selectionEnd);

    const matchMatches = isCaseSensitive
      ? selected === searchQuery
      : selected.toLowerCase() === searchQuery.toLowerCase();

    if (matchMatches) {
      const newCode = value.substring(0, selectionStart) + replaceQuery + value.substring(selectionEnd);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + replaceQuery.length;
        handleFindNext('next');
      }, 0);
    } else {
      handleFindNext('next');
    }
  };

  // Replace All
  const handleReplaceAll = () => {
    if (!searchQuery) return;
    try {
      const flags = isCaseSensitive ? 'g' : 'gi';
      const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const newCode = currentCode.replace(new RegExp(escaped, flags), replaceQuery);
      setCode(newCode);
      onShowToast(`Replaced ${matchCount} occurrence(s)`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  // Drag and drop HTML file
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.html') || file.type.includes('html')) {
        onImportHtmlFile(file);
      } else {
        onShowToast('Please drop a valid .html file', 'warning');
      }
    }
  };

  // Compute line numbers
  const linesCount = currentCode.split('\n').length;
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col h-full overflow-hidden relative select-none transition-colors ${
        isLight ? 'bg-white text-slate-900' : 'bg-[#0D1117] text-[#F5F7FA]'
      } ${
        isDraggingOver ? 'ring-2 ring-[#7C3AED] ring-inset' : ''
      }`}
    >
      {/* Drag & Drop Overlay */}
      {isDraggingOver && (
        <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none ${
          isLight ? 'bg-white/95 text-slate-900' : 'bg-[#0D1117]/90 text-white'
        }`}>
          <Upload className="w-12 h-12 text-[#7C3AED] animate-bounce mb-2" />
          <p className="text-base font-bold">Drop HTML file to import</p>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Will parse HTML, CSS, and JS automatically</p>
        </div>
      )}

      {/* Editor Tabs & Toolbar Header */}
      <div className={`flex flex-wrap items-center justify-between gap-1 px-3 py-1.5 border-b text-xs transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11161D] border-[#252C36]'
      }`}>
        {/* Language Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
              activeTab === 'html'
                ? isLight
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                  : 'bg-[#151B23] text-[#F5F7FA] border border-[#252C36] shadow-sm'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B23]/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#F97316]" />
            <span>HTML</span>
            <span className={`text-[10px] font-mono ml-0.5 ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>
              ({html.split('\n').length})
            </span>
          </button>

          <button
            onClick={() => onTabChange('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
              activeTab === 'css'
                ? isLight
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                  : 'bg-[#151B23] text-[#F5F7FA] border border-[#252C36] shadow-sm'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B23]/50'
            }`}
          >
            <FileType className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>CSS</span>
            <span className={`text-[10px] font-mono ml-0.5 ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>
              ({css.split('\n').length})
            </span>
          </button>

          <button
            onClick={() => onTabChange('js')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors ${
              activeTab === 'js'
                ? isLight
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                  : 'bg-[#151B23] text-[#F5F7FA] border border-[#252C36] shadow-sm'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B23]/50'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>JS</span>
            <span className={`text-[10px] font-mono ml-0.5 ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>
              ({js.split('\n').length})
            </span>
          </button>
        </div>

        {/* Action Controls Toolbar */}
        <div className={`flex items-center gap-0.5 ${isLight ? 'text-slate-600' : 'text-[#9CA3AF]'}`}>
          <button
            onClick={handleUndo}
            className={`p-1.5 rounded transition-colors ${isLight ? 'hover:text-slate-900 hover:bg-slate-200/60' : 'hover:text-white hover:bg-[#151B23]'}`}
            title="Undo (Ctrl/Cmd + Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRedo}
            className={`p-1.5 rounded transition-colors ${isLight ? 'hover:text-slate-900 hover:bg-slate-200/60' : 'hover:text-white hover:bg-[#151B23]'}`}
            title="Redo (Ctrl/Cmd + Shift + Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <div className={`h-4 w-px mx-1 ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          <button
            onClick={onFormat}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${isLight ? 'hover:text-slate-900 hover:bg-slate-200/60' : 'hover:text-white hover:bg-[#151B23]'}`}
            title="Format Code (Ctrl/Cmd + Shift + F)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span className="hidden sm:inline">Format</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded transition-colors ${
              isSearchOpen
                ? 'text-[#7C3AED] bg-[#7C3AED]/15'
                : isLight
                ? 'hover:text-slate-900 hover:bg-slate-200/60'
                : 'hover:text-white hover:bg-[#151B23]'
            }`}
            title="Search & Replace (Ctrl/Cmd + F)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onUpdateSettings({ wordWrap: !settings.wordWrap })}
            className={`p-1.5 rounded transition-colors ${
              settings.wordWrap
                ? isLight
                  ? 'text-slate-900 bg-slate-200'
                  : 'text-white bg-[#151B23]'
                : isLight
                ? 'hover:text-slate-900 hover:bg-slate-200/60'
                : 'hover:text-white hover:bg-[#151B23]'
            }`}
            title={`Word Wrap: ${settings.wordWrap ? 'On' : 'Off'}`}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {/* Font Size Selector */}
          <div className={`flex items-center rounded border px-1 py-0.5 text-[11px] ml-1 ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#151B23] border-[#252C36]'
          }`}>
            <button
              onClick={() => onUpdateSettings({ fontSize: Math.max(11, settings.fontSize - 1) })}
              className={`px-1 ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Decrease Font Size"
            >
              -
            </button>
            <span className={`px-1 font-mono ${isLight ? 'text-slate-800 font-semibold' : 'text-[#D1D5DB]'}`}>{settings.fontSize}px</span>
            <button
              onClick={() => onUpdateSettings({ fontSize: Math.min(22, settings.fontSize + 1) })}
              className={`px-1 ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-[#9CA3AF] hover:text-white'}`}
              title="Increase Font Size"
            >
              +
            </button>
          </div>

          <div className={`h-4 w-px mx-1 ${isLight ? 'bg-slate-200' : 'bg-[#252C36]'}`} />

          <button
            onClick={handleCopyCurrent}
            className={`p-1.5 rounded transition-colors ${isLight ? 'hover:text-slate-900 hover:bg-slate-200/60' : 'hover:text-white hover:bg-[#151B23]'}`}
            title={`Copy ${activeTab.toUpperCase()}`}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClearCurrent}
            className={`p-1.5 rounded hover:text-[#EF4444] transition-colors ${isLight ? 'hover:bg-slate-200/60' : 'hover:bg-[#151B23]'}`}
            title={`Clear ${activeTab.toUpperCase()}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Search & Replace Bar */}
      {isSearchOpen && (
        <div className={`flex flex-wrap items-center gap-2 p-2 border-b text-xs z-10 animate-in fade-in slide-in-from-top-1 duration-150 ${
          isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-[#151B23] border-[#252C36] text-white'
        }`}>
          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Find..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFindNext(e.shiftKey ? 'prev' : 'next');
                if (e.key === 'Escape') setIsSearchOpen(false);
              }}
              autoFocus
              className={`flex-1 border rounded px-2 py-1 text-xs outline-none focus:border-[#7C3AED] ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0D1117] border-[#252C36] text-white'
              }`}
            />
            <span className={`text-[11px] font-mono px-1 ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
              {matchCount > 0 ? `${currentMatchIndex} of ${matchCount}` : 'No results'}
            </span>
            <button
              onClick={() => handleFindNext('prev')}
              className={`p-1 rounded ${isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-[#9CA3AF] hover:text-white hover:bg-[#252C36]'}`}
              title="Previous Match"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleFindNext('next')}
              className={`p-1 rounded ${isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-[#9CA3AF] hover:text-white hover:bg-[#252C36]'}`}
              title="Next Match"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCaseSensitive(!isCaseSensitive)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                isCaseSensitive
                  ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                  : isLight
                  ? 'border-slate-300 text-slate-600 hover:text-slate-900'
                  : 'border-[#252C36] text-[#9CA3AF] hover:text-white'
              }`}
              title="Match Case"
            >
              Aa
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleReplaceOne();
                if (e.key === 'Escape') setIsSearchOpen(false);
              }}
              className={`flex-1 border rounded px-2 py-1 text-xs outline-none focus:border-[#7C3AED] ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0D1117] border-[#252C36] text-white'
              }`}
            />
            <button
              onClick={handleReplaceOne}
              className={`px-2 py-1 rounded text-[11px] font-medium ${
                isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-[#252C36] hover:bg-[#323B49] text-white'
              }`}
            >
              Replace
            </button>
            <button
              onClick={handleReplaceAll}
              className={`px-2 py-1 rounded text-[11px] font-medium ${
                isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-[#252C36] hover:bg-[#323B49] text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setIsSearchOpen(false)}
              className={`p-1 rounded ${isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-[#9CA3AF] hover:text-white hover:bg-[#252C36]'}`}
              title="Close Search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body with Synchronized Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative font-mono-code">
        {/* Line Numbers Column */}
        {settings.lineNumbers && (
          <div
            ref={lineNumbersRef}
            style={{ fontSize: `${settings.fontSize}px`, lineHeight: 1.6 }}
            className={`w-12 border-r text-right py-3 pr-3 pl-1 select-none overflow-hidden shrink-0 transition-colors ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-[#0A0D12] border-r border-[#1E2530] text-[#4B5563]'
            }`}
          >
            {lineNumbers.map((num) => (
              <div key={num} className="leading-relaxed">
                {num}
              </div>
            ))}
          </div>
        )}

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={currentCode}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: 1.6,
            whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
            tabSize: settings.tabSize || 2,
          }}
          className={`flex-1 w-full h-full p-3 resize-none outline-none border-none font-mono-code overflow-auto select-text transition-colors ${
            isLight
              ? 'bg-white text-slate-900 selection:bg-purple-100 placeholder:text-slate-400'
              : 'bg-[#0D1117] text-[#E6EDF3] selection:bg-[#7C3AED]/40 placeholder:text-slate-600'
          }`}
          placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
        />
      </div>

      {/* Footer Status Bar */}
      <div className={`flex items-center justify-between px-3 py-1 border-t text-[11px] select-none transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#11161D] border-[#252C36] text-[#6B7280]'
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-semibold">{activeTab.toUpperCase()}</span>
          <span>{linesCount} lines</span>
          <span>{currentCode.length} chars</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>Spaces: {settings.tabSize || 2}</span>
        </div>
      </div>
    </div>
  );
}
