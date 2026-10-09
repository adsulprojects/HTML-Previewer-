'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPanel } from '@/components/PreviewPanel';
import { TemplatesModal } from '@/components/TemplatesModal';
import { ShortcutsModal } from '@/components/ShortcutsModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ProjectsModal } from '@/components/ProjectsModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { ToastContainer } from '@/components/Toast';
import { EmptyState } from '@/components/EmptyState';

import {
  Language,
  Project,
  ConsoleMessage,
  EditorSettings,
  Template,
  ToastMessage,
} from '@/lib/types';
import {
  DEFAULT_SETTINGS,
  INITIAL_PROJECT,
  loadCurrentProject,
  saveCurrentProject,
  loadProjectList,
  saveProjectList,
  loadSettings,
  saveSettings,
} from '@/lib/storage';
import {
  bundleCode,
  extractCode,
  formatHTML,
  formatCSS,
  formatJS,
  downloadFile,
} from '@/lib/formatters';
import { TEMPLATES } from '@/lib/templates';
import { Code, Eye, GripVertical } from 'lucide-react';

export default function HTMLPreviewer() {
  // Active Project & Code
  const [project, setProject] = useState<Project>(() => {
    if (typeof window !== 'undefined') {
      return loadCurrentProject();
    }
    return INITIAL_PROJECT;
  });
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      return loadProjectList();
    }
    return [INITIAL_PROJECT];
  });
  const [activeTab, setActiveTab] = useState<Language>('html');

  // View state: 'split' | 'editor' | 'preview'
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  // Mobile active tab: 'code' | 'preview'
  const [mobileTab, setMobileTab] = useState<'code' | 'preview'>('code');

  // Screen size detection for responsive layout (Desktop/Tablet >= 768px vs Mobile < 768px)
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Resizable split divider percentage (left panel width %)
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingDivider = useRef<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Console messages
  const [logs, setLogs] = useState<ConsoleMessage[]>([]);

  // Settings & Theme
  const [settings, setSettings] = useState<EditorSettings>(() => {
    if (typeof window !== 'undefined') {
      return loadSettings();
    }
    return DEFAULT_SETTINGS;
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const s = loadSettings();
      return s.theme || 'dark';
    }
    return 'dark';
  });

  // Modals state
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState<boolean>(false);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // File input ref for import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show Toast helper
  const showToast = useCallback(
    (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
      const id = Date.now().toString() + Math.random().toString().slice(2, 6);
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme class to document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  // Persist current project (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCurrentProject(project);
    }, 400);
    return () => clearTimeout(timer);
  }, [project]);

  // Handle settings update
  const handleUpdateSettings = (newSettings: Partial<EditorSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
    if (newSettings.theme) {
      setTheme(newSettings.theme);
    }
    showToast('Settings saved', 'info');
  };

  // Toggle Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    handleUpdateSettings({ theme: nextTheme });
  };

  // Code modification handlers
  const handleHtmlChange = (val: string) => {
    setProject((prev) => ({ ...prev, html: val, updatedAt: Date.now() }));
  };

  const handleCssChange = (val: string) => {
    setProject((prev) => ({ ...prev, css: val, updatedAt: Date.now() }));
  };

  const handleJsChange = (val: string) => {
    setProject((prev) => ({ ...prev, js: val, updatedAt: Date.now() }));
  };

  // Console handlers
  const handleAddLog = useCallback((log: Omit<ConsoleMessage, 'id'>) => {
    setLogs((prev) => [
      ...prev.slice(-100), // Keep up to 100 recent logs
      { ...log, id: Math.random().toString(36).substring(2, 9) },
    ]);
  }, []);

  const handleClearLogs = () => {
    setLogs([]);
    showToast('Console cleared', 'info');
  };

  // Code formatting
  const handleFormat = () => {
    try {
      if (activeTab === 'html') {
        const formatted = formatHTML(project.html);
        handleHtmlChange(formatted);
      } else if (activeTab === 'css') {
        const formatted = formatCSS(project.css);
        handleCssChange(formatted);
      } else {
        const formatted = formatJS(project.js);
        handleJsChange(formatted);
      }
      showToast(`Formatted ${activeTab.toUpperCase()}`, 'success');
    } catch (err) {
      showToast('Error formatting code', 'error');
    }
  };

  // Copy All
  const handleCopyAll = () => {
    const bundled = bundleCode(project.html, project.css, project.js, project.name);
    navigator.clipboard.writeText(bundled);
    showToast('Copied complete standalone bundle to clipboard', 'success');
  };

  // Download project as standalone HTML file
  const handleDownload = (projToDownload: Project = project) => {
    const bundled = bundleCode(
      projToDownload.html,
      projToDownload.css,
      projToDownload.js,
      projToDownload.name
    );
    const filename = `${projToDownload.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'preview'}.html`;
    downloadFile(bundled, filename, 'text/html');
    showToast(`Downloaded ${filename}`, 'success');
  };

  // File Import handler
  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) return;

      const hasContent = project.html.trim() || project.css.trim() || project.js.trim();

      const proceedImport = () => {
        const extracted = extractCode(content);
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        const updatedProject: Project = {
          ...project,
          name: nameWithoutExt || project.name,
          html: extracted.html,
          css: extracted.css,
          js: extracted.js,
          updatedAt: Date.now(),
        };

        setProject(updatedProject);
        saveCurrentProject(updatedProject);
        showToast(`Imported ${file.name} successfully`, 'success');
      };

      if (hasContent) {
        setConfirmDialog({
          isOpen: true,
          title: 'Replace Current Code?',
          message: `Importing "${file.name}" will replace your current workspace code. Continue?`,
          onConfirm: () => {
            setConfirmDialog((c) => ({ ...c, isOpen: false }));
            proceedImport();
          },
        });
      } else {
        proceedImport();
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Template selection
  const handleSelectTemplate = (template: Template) => {
    const hasContent =
      (project.html.trim() && project.html !== TEMPLATES[0].html) ||
      (project.css.trim() && project.css !== TEMPLATES[0].css) ||
      (project.js.trim() && project.js !== TEMPLATES[0].js);

    const applyTemplate = () => {
      const updated: Project = {
        ...project,
        name: template.name,
        html: template.html,
        css: template.css,
        js: template.js,
        updatedAt: Date.now(),
      };
      setProject(updated);
      saveCurrentProject(updated);
      setIsTemplatesOpen(false);
      showToast(`Loaded ${template.name} template`, 'success');
    };

    if (hasContent) {
      setConfirmDialog({
        isOpen: true,
        title: 'Load Template?',
        message: `Loading "${template.name}" will replace current code in the workspace. Any unsaved changes will be lost.`,
        onConfirm: () => {
          setConfirmDialog((c) => ({ ...c, isOpen: false }));
          applyTemplate();
        },
      });
    } else {
      applyTemplate();
    }
  };

  // Projects management
  const handleSaveCurrentProject = () => {
    const updatedList = projectsList.map((p) => (p.id === project.id ? project : p));
    if (!updatedList.some((p) => p.id === project.id)) {
      updatedList.unshift(project);
    }
    setProjectsList(updatedList);
    saveProjectList(updatedList);
    saveCurrentProject(project);
    showToast(`Project "${project.name}" saved`, 'success');
  };

  const handleNewProject = () => {
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      name: `Project ${projectsList.length + 1}`,
      html: TEMPLATES[0].html,
      css: TEMPLATES[0].css,
      js: TEMPLATES[0].js,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [newProj, ...projectsList];
    setProjectsList(updated);
    saveProjectList(updated);
    setProject(newProj);
    saveCurrentProject(newProj);
    setIsProjectsOpen(false);
    showToast(`Created ${newProj.name}`, 'success');
  };

  const handleSelectProject = (selected: Project) => {
    setProject(selected);
    saveCurrentProject(selected);
    setIsProjectsOpen(false);
    showToast(`Opened "${selected.name}"`, 'info');
  };

  const handleRenameProject = (id: string, newName: string) => {
    const updatedList = projectsList.map((p) => (p.id === id ? { ...p, name: newName } : p));
    setProjectsList(updatedList);
    saveProjectList(updatedList);
    if (project.id === id) {
      setProject((prev) => ({ ...prev, name: newName }));
    }
    showToast('Project renamed', 'success');
  };

  const handleDuplicateProject = (orig: Project) => {
    const duplicated: Project = {
      ...orig,
      id: 'proj-' + Date.now(),
      name: `${orig.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [duplicated, ...projectsList];
    setProjectsList(updated);
    saveProjectList(updated);
    showToast(`Duplicated "${orig.name}"`, 'success');
  };

  const handleDeleteProject = (id: string) => {
    if (projectsList.length <= 1) {
      showToast('Cannot delete the only project', 'warning');
      return;
    }
    const filtered = projectsList.filter((p) => p.id !== id);
    setProjectsList(filtered);
    saveProjectList(filtered);

    if (project.id === id) {
      const next = filtered[0];
      setProject(next);
      saveCurrentProject(next);
    }
    showToast('Project deleted', 'info');
  };

  // Draggable Split Divider handlers
  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingDivider.current = true;
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingDivider.current || !workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      const clientX = moveEvent.clientX;
      const newPercent = ((clientX - rect.left) / rect.width) * 100;
      if (newPercent >= 20 && newPercent <= 80) {
        setSplitPercent(newPercent);
      }
    };

    const handleMouseUp = () => {
      isDraggingDivider.current = false;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + S: Save
      if (isCtrlOrCmd && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveCurrentProject();
      }

      // Ctrl/Cmd + Shift + F: Format
      if (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        handleFormat();
      }

      // Escape: Close open modals
      if (e.key === 'Escape') {
        setIsTemplatesOpen(false);
        setIsShortcutsOpen(false);
        setIsSettingsOpen(false);
        setIsProjectsOpen(false);
        setConfirmDialog((c) => ({ ...c, isOpen: false }));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, activeTab, projectsList]);

  const isEmpty = !project.html.trim() && !project.css.trim() && !project.js.trim();
  const isLight = theme === 'light';

  return (
    <div className={`flex flex-col h-screen h-[100dvh] w-full overflow-hidden transition-colors ${
      isLight ? 'theme-light bg-[#F8FAFC] text-[#0F172A]' : 'bg-[#0B0F14] text-[#F5F7FA]'
    }`}>
      {/* Hidden File Input for HTML Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.htm"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImportFile(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <Header
        projectName={project.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProjects={() => setIsProjectsOpen(true)}
        onSaveProject={handleSaveCurrentProject}
        onDownloadHtml={() => handleDownload(project)}
        onImportHtml={triggerFileInput}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Mobile CODE / PREVIEW Tab Bar (Visible on mobile < 768px) */}
      <div className={`md:hidden flex items-center border-b px-3 py-1.5 shrink-0 transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#11161D] border-[#252C36]'
      }`}>
        <div className={`flex w-full p-0.5 rounded-lg border transition-colors ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151B23] border-[#252C36]'
        }`}>
          <button
            onClick={() => setMobileTab('code')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-bold transition-all ${
              mobileTab === 'code'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>CODE</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PREVIEW</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      {isEmpty ? (
        <EmptyState
          theme={theme}
          onStartCoding={() => {
            const starter = TEMPLATES[0];
            setProject((prev) => ({
              ...prev,
              html: starter.html,
              css: starter.css,
              js: starter.js,
            }));
          }}
          onBrowseTemplates={() => setIsTemplatesOpen(true)}
        />
      ) : (
        <div ref={workspaceRef} className="flex-1 min-h-0 flex overflow-hidden relative w-full h-full">
          {/* MOBILE VIEW (< 768px) */}
          {!isDesktop ? (
            mobileTab === 'code' ? (
              <div className="w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden">
                <CodeEditor
                  theme={theme}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  html={project.html}
                  css={project.css}
                  js={project.js}
                  onChangeHtml={handleHtmlChange}
                  onChangeCss={handleCssChange}
                  onChangeJs={handleJsChange}
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                  onFormat={handleFormat}
                  onCopyAll={handleCopyAll}
                  onShowToast={showToast}
                  onImportHtmlFile={handleImportFile}
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden">
                <PreviewPanel
                  theme={theme}
                  html={project.html}
                  css={project.css}
                  js={project.js}
                  autoRun={settings.autoRun}
                  autoRunDelay={settings.autoRunDelay}
                  onToggleAutoRun={() =>
                    handleUpdateSettings({ autoRun: !settings.autoRun })
                  }
                  logs={logs}
                  onAddLog={handleAddLog}
                  onClearLogs={handleClearLogs}
                  viewMode="preview"
                  onToggleExpand={() => setMobileTab('code')}
                />
              </div>
            )
          ) : (
            /* DESKTOP / TABLET VIEW (>= 768px) */
            <>
              {/* Desktop Code Editor Panel */}
              {(viewMode === 'split' || viewMode === 'editor') && (
                <div
                  style={viewMode === 'split' ? { width: `${splitPercent}%`, flexShrink: 0 } : { width: '100%' }}
                  className="h-full flex flex-col min-h-0 overflow-hidden"
                >
                  <CodeEditor
                    theme={theme}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    html={project.html}
                    css={project.css}
                    js={project.js}
                    onChangeHtml={handleHtmlChange}
                    onChangeCss={handleCssChange}
                    onChangeJs={handleJsChange}
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
                    onFormat={handleFormat}
                    onCopyAll={handleCopyAll}
                    onShowToast={showToast}
                    onImportHtmlFile={handleImportFile}
                  />
                </div>
              )}

              {/* Draggable Divider (Split view only) */}
              {viewMode === 'split' && (
                <div
                  onMouseDown={handleDividerMouseDown}
                  className={`w-2.5 border-x cursor-col-resize flex items-center justify-center transition-colors select-none z-10 shrink-0 group ${
                    isLight
                      ? 'bg-slate-100 hover:bg-[#7C3AED]/20 active:bg-[#7C3AED] border-slate-200'
                      : 'bg-[#11161D] hover:bg-[#7C3AED]/50 active:bg-[#7C3AED] border-[#252C36]'
                  }`}
                  title="Drag to resize panels"
                >
                  <GripVertical className={`w-3 h-3 ${isLight ? 'text-slate-400 group-hover:text-[#7C3AED]' : 'text-[#4B5563] group-hover:text-white'}`} />
                </div>
              )}

              {/* Desktop Live Preview Panel */}
              {(viewMode === 'split' || viewMode === 'preview') && (
                <div
                  style={viewMode === 'split' ? { flex: 1, minWidth: 0 } : { width: '100%' }}
                  className="h-full flex flex-col min-h-0 overflow-hidden"
                >
                  <PreviewPanel
                    theme={theme}
                    html={project.html}
                    css={project.css}
                    js={project.js}
                    autoRun={settings.autoRun}
                    autoRunDelay={settings.autoRunDelay}
                    onToggleAutoRun={() =>
                      handleUpdateSettings({ autoRun: !settings.autoRun })
                    }
                    logs={logs}
                    onAddLog={handleAddLog}
                    onClearLogs={handleClearLogs}
                    viewMode={viewMode}
                    onToggleExpand={() =>
                      setViewMode(viewMode === 'preview' ? 'split' : 'preview')
                    }
                  />
                </div>
              )}
            </>
          )}

          {/* Transparent Overlay during Divider Drag to capture all mouse events smoothly */}
          {isDragging && (
            <div className="fixed inset-0 z-50 cursor-col-resize select-none pointer-events-auto" />
          )}
        </div>
      )}

      {/* Modals & Dialogs */}
      <TemplatesModal
        theme={theme}
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <ShortcutsModal
        theme={theme}
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <ProjectsModal
        theme={theme}
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        projects={projectsList}
        currentProjectId={project.id}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
        onSaveCurrent={handleSaveCurrentProject}
        onRenameProject={handleRenameProject}
        onDuplicateProject={handleDuplicateProject}
        onDeleteProject={handleDeleteProject}
        onDownloadProject={handleDownload}
        onImportHtml={triggerFileInput}
      />

      <ConfirmModal
        theme={theme}
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((c) => ({ ...c, isOpen: false }))}
      />

      {/* Toast Notification Container */}
      <ToastContainer theme={theme} toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
