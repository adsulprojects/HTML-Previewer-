'use client';

import React, { useState } from 'react';
import { Template } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates';
import { Layout, X, Check, Sparkles, Code, ArrowRight } from 'lucide-react';

interface TemplatesModalProps {
  theme?: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export function TemplatesModal({ theme = 'dark', isOpen, onClose, onSelectTemplate }: TemplatesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const categories = ['All', 'Starter', 'Marketing', 'Personal', 'E-Commerce', 'Auth', 'Forms', 'Commercial', 'Admin', 'Content'];

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    if (selectedCategory === 'All') return true;
    return tpl.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-4xl max-h-[88vh] rounded-xl flex flex-col shadow-2xl overflow-hidden border transition-colors ${
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
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-[#F5F7FA]'}`}>Starter Templates</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#9CA3AF]'}`}>Choose a boilerplate with complete HTML, CSS, and JavaScript</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1E2530]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className={`flex items-center gap-1.5 px-6 py-3 border-b overflow-x-auto text-xs transition-colors ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0E131A] border-[#252C36]'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1E2530]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className={`flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors ${
          isLight ? 'bg-slate-50' : 'bg-[#0B0F14]'
        }`}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`group flex flex-col justify-between p-5 rounded-xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#7C3AED]/60 hover:bg-purple-50/30 shadow-xs'
                  : 'bg-[#11161D] border-[#252C36] hover:border-[#7C3AED]/60 hover:bg-[#131922]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded border border-[#7C3AED]/20">
                    {template.category}
                  </span>
                  <span className={`text-[11px] font-mono ${isLight ? 'text-slate-400' : 'text-[#6B7280]'}`}>
                    {template.html.split('\n').length + template.css.split('\n').length + template.js.split('\n').length} lines
                  </span>
                </div>
                <h3 className={`text-base font-bold transition-colors mb-1 ${
                  isLight ? 'text-slate-900 group-hover:text-[#7C3AED]' : 'text-white group-hover:text-[#A78BFA]'
                }`}>
                  {template.name}
                </h3>
                <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                  isLight ? 'text-slate-500' : 'text-[#9CA3AF]'
                }`}>
                  {template.description}
                </p>
              </div>

              <div className={`flex items-center justify-between pt-3 border-t ${
                isLight ? 'border-slate-100' : 'border-[#1E2530]'
              }`}>
                <div className={`flex items-center gap-2 text-[11px] ${
                  isLight ? 'text-slate-400' : 'text-[#6B7280]'
                }`}>
                  <span>HTML</span> · <span>CSS</span> · <span>JS</span>
                </div>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                    isLight
                      ? 'bg-slate-100 text-slate-800 group-hover:bg-[#7C3AED] group-hover:text-white'
                      : 'bg-[#1E2530] text-white group-hover:bg-[#7C3AED]'
                  }`}
                >
                  <span>Load</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
