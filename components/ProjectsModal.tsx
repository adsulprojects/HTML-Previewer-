'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import {
  FolderKanban,
  Plus,
  Trash2,
  Copy,
  Edit2,
  Check,
  X,
  Clock,
  Download,
  Upload,
  FileCode
} from 'lucide-react';

interface ProjectsModalProps {
  theme?: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentProjectId: string;
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  onSaveCurrent: () => void;
  onRenameProject: (id: string, newName: string) => void;
  onDuplicateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onDownloadProject: (project: Project) => void;
  onImportHtml: () => void;
}

export function ProjectsModal({
  theme = 'dark',
  isOpen,
  onClose,
  projects,
  currentProjectId,
  onSelectProject,
  onNewProject,
  onSaveCurrent,
  onRenameProject,
  onDuplicateProject,
  onDeleteProject,
  onDownloadProject,
  onImportHtml,
}: ProjectsModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const startRename = (project: Project) => {
    setEditingId(project.id);
    setEditingName(project.name);
  };

  const submitRename = (id: string) => {
    if (editingName.trim()) {
      onRenameProject(id, editingName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#151B23] border-[#252C36] text-[#F5F7FA]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#11161D] border-[#252C36]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>Your Projects</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Saved locally in your browser storage</p>
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

        {/* Action Bar */}
        <div className={`flex items-center justify-between px-6 py-3 border-b text-xs transition-colors ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0E131A] border-[#252C36]'
        }`}>
          <div className="flex items-center gap-2">
            <button
              onClick={onNewProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>

            <button
              onClick={onSaveCurrent}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isLight ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800' : 'bg-[#1E2530] border-transparent hover:bg-[#252C36] text-white'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Save Current Draft</span>
            </button>
          </div>

          <button
            onClick={onImportHtml}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              isLight ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800' : 'bg-[#1E2530] border-transparent hover:bg-[#252C36] text-[#CBD5E1]'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Import HTML</span>
          </button>
        </div>

        {/* Project List */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-3 transition-colors ${
          isLight ? 'bg-slate-50' : 'bg-[#0B0F14]'
        }`}>
          {projects.length === 0 ? (
            <div className={`text-center py-12 text-sm ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
              No saved projects yet. Click &quot;New Project&quot; to create one.
            </div>
          ) : (
            projects.map((project) => {
              const isCurrent = project.id === currentProjectId;
              const dateStr = new Date(project.updatedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={project.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? isLight
                        ? 'bg-purple-50/60 border-[#7C3AED] shadow-xs'
                        : 'bg-[#151B23] border-[#7C3AED]/70 shadow-sm'
                      : isLight
                      ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      : 'bg-[#11161D] border-[#252C36] hover:border-[#384353]'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0 mr-3">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      isLight ? 'bg-purple-100 text-[#7C3AED]' : 'bg-[#1E2530] text-[#7C3AED]'
                    }`}>
                      <FileCode className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {editingId === project.id ? (
                        <div className="flex items-center gap-1.5 mb-1">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') submitRename(project.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            autoFocus
                            className={`border rounded px-2 py-0.5 text-xs outline-none ${
                              isLight ? 'bg-white border-[#7C3AED] text-slate-900' : 'bg-[#0D1117] border-[#7C3AED] text-white'
                            }`}
                          />
                          <button
                            onClick={() => submitRename(project.id)}
                            className="p-1 text-[#22C55E] hover:bg-slate-200/50 rounded"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 text-[#EF4444] hover:bg-slate-200/50 rounded"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{project.name}</h4>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30">
                              Active
                            </span>
                          )}
                        </div>
                      )}

                      <div className={`flex items-center gap-3 text-[11px] ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {dateStr}
                        </span>
                        <span>·</span>
                        <span>
                          {project.html ? project.html.split('\n').length : 0} lines
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`flex items-center gap-1 shrink-0 ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>
                    {!isCurrent && (
                      <button
                        onClick={() => onSelectProject(project)}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors mr-1 ${
                          isLight
                            ? 'bg-slate-100 hover:bg-[#7C3AED] text-slate-800 hover:text-white'
                            : 'bg-[#1E2530] hover:bg-[#7C3AED] text-white'
                        }`}
                      >
                        Open
                      </button>
                    )}

                    <button
                      onClick={() => onDownloadProject(project)}
                      className={`p-1.5 rounded transition-colors ${
                        isLight ? 'hover:text-slate-900 hover:bg-slate-100' : 'hover:text-white hover:bg-[#1E2530]'
                      }`}
                      title="Download HTML"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => startRename(project)}
                      className={`p-1.5 rounded transition-colors ${
                        isLight ? 'hover:text-slate-900 hover:bg-slate-100' : 'hover:text-white hover:bg-[#1E2530]'
                      }`}
                      title="Rename"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDuplicateProject(project)}
                      className={`p-1.5 rounded transition-colors ${
                        isLight ? 'hover:text-slate-900 hover:bg-slate-100' : 'hover:text-white hover:bg-[#1E2530]'
                      }`}
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {projects.length > 1 && (
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className={`p-1.5 rounded hover:text-[#EF4444] transition-colors ${
                          isLight ? 'hover:bg-slate-100' : 'hover:bg-[#1E2530]'
                        }`}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
