export type WindowId =
  | 'terminal'
  | 'files'
  | 'about'
  | 'resume'
  | 'contact'
  | 'browser'
  | 'monitor'
  | 'projects'
  | 'skills'
  | 'timeline';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  iconName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  timestamp?: number;
  type: 'info' | 'success' | 'alert';
}

export interface WallpaperPreset {
  id: string;
  name: string;
  gradient: string;
  previewBg: string;
}
