import { create } from 'zustand';
import { AppID, WindowState } from '@/types/os';

interface OSState {
  windows: WindowState[];
  activeWindowId: AppID | null;
  installedApps: AppID[];
  
  openApp: (id: AppID, title: string) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  maximizeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  installApp: (id: AppID) => void;
  uninstallApp: (id: AppID) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  installedApps: ['notepad', 'paint', 'browser', 'copilot', 'calculator', 'explorer', 'music', 'store', 'terminal', 'settings'], // Initially all for now

  openApp: (id, title) => {
    const { windows } = get();
    const existingWindow = windows.find(w => w.id === id);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map(w => w.id === id ? { ...w, isMinimized: false, focused: true } : { ...w, focused: false }),
          activeWindowId: id
        });
      } else {
        get().focusApp(id);
      }
      return;
    }

    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
    
    const newWindow: WindowState = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZ + 1,
      focused: true
    };

    set({
      windows: [...windows.map(w => ({ ...w, focused: false })), newWindow],
      activeWindowId: id
    });
  },

  closeApp: (id) => {
    set({
      windows: get().windows.filter(w => w.id !== id),
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId
    });
  },

  minimizeApp: (id) => {
    set({
      windows: get().windows.map(w => w.id === id ? { ...w, isMinimized: true, focused: false } : w),
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId
    });
  },

  maximizeApp: (id) => {
    set({
      windows: get().windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    });
  },

  focusApp: (id) => {
    const { windows } = get();
    const maxZ = Math.max(...windows.map(w => w.zIndex), 0);
    
    set({
      windows: windows.map(w => w.id === id 
        ? { ...w, zIndex: maxZ + 1, focused: true, isMinimized: false } 
        : { ...w, focused: false }
      ),
      activeWindowId: id
    });
  },

  installApp: (id) => {
    if (!get().installedApps.includes(id)) {
      set({ installedApps: [...get().installedApps, id] });
    }
  },

  uninstallApp: (id) => {
    set({
      installedApps: get().installedApps.filter(appId => appId !== id),
      windows: get().windows.filter(w => w.id !== id),
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId
    });
  }
}));
