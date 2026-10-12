export type Language = 'html' | 'css' | 'js';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface Project {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
  createdAt: number;
  updatedAt: number;
}

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  timestamp: string;
  count?: number;
}

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  autoRun: boolean;
  autoRunDelay: number; // ms
  theme: 'dark' | 'light';
  compactMode: boolean;
  admobTestId: string;
  showTestAds: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  html: string;
  css: string;
  js: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
