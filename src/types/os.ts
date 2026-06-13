export type AppID = 
  | 'notepad' 
  | 'paint' 
  | 'browser' 
  | 'copilot' 
  | 'calculator' 
  | 'explorer' 
  | 'music' 
  | 'store'
  | 'terminal'
  | 'settings';

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  focused: boolean;
}

export interface AppMetadata {
  id: AppID;
  name: string;
  icon: string; // Lucide icon name or path
  component: React.ComponentType;
}
