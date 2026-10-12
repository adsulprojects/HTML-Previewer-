import { EditorSettings, Project } from './types';
import { TEMPLATES } from './templates';

const STORAGE_KEYS = {
  CURRENT_PROJECT: 'html_previewer_v3_current_project',
  PROJECT_LIST: 'html_previewer_projects',
  SETTINGS: 'html_previewer_settings',
  THEME: 'html_previewer_theme',
};

export const DEFAULT_SETTINGS: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  lineNumbers: true,
  syntaxHighlighting: true,
  autoRun: true,
  autoRunDelay: 400,
  theme: 'dark',
  compactMode: false,
  admobTestId: 'ca-app-pub-3940256099942544/9257395921',
  showTestAds: true,
};

export const INITIAL_PROJECT: Project = {
  id: 'default-project',
  name: 'New Project',
  html: '',
  css: '',
  js: '',
  createdAt: 1728200000000,
  updatedAt: 1728200000000,
};

export function loadCurrentProject(): Project {
  if (typeof window === 'undefined') return INITIAL_PROJECT;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_PROJECT);
    if (raw) {
      const parsed = JSON.parse(raw);
      // If it's the old default starter or contains the pre-existing dummy code, reset to empty
      if (
        parsed.id === 'default-project' ||
        parsed.name === 'Interactive Starter' ||
        (typeof parsed.html === 'string' && parsed.html.includes('Modern Full-Page Responsive Website'))
      ) {
        return INITIAL_PROJECT;
      }
      return {
        ...parsed,
        css: '',
        js: '',
      };
    }
  } catch (err) {
    console.error('Failed to load current project from localStorage:', err);
  }
  return INITIAL_PROJECT;
}

export function saveCurrentProject(project: Project): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROJECT, JSON.stringify(project));
  } catch (err) {
    console.error('Failed to save current project:', err);
  }
}

export function loadProjectList(): Project[] {
  if (typeof window === 'undefined') return [INITIAL_PROJECT];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECT_LIST);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        // Strip pre-existing dummy projects
        const cleaned = list.map((p: Project) => {
          if (
            p.id === 'default-project' ||
            p.name === 'Interactive Starter' ||
            (typeof p.html === 'string' && p.html.includes('Modern Full-Page Responsive Website'))
          ) {
            return INITIAL_PROJECT;
          }
          return { ...p, css: '', js: '' };
        });
        return cleaned;
      }
    }
  } catch (err) {
    console.error('Failed to load project list:', err);
  }
  return [INITIAL_PROJECT];
}

export function saveProjectList(list: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECT_LIST, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save project list:', err);
  }
}

export function loadSettings(): EditorSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT_SETTINGS, ...parsed };
      if (!merged.admobTestId || merged.admobTestId === 'ca-app-pub-3940256099942544/6300978111') {
        merged.admobTestId = 'ca-app-pub-3940256099942544/9257395921';
      }
      return merged;
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: EditorSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}
