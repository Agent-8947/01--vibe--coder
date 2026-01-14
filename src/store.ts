
import { create } from 'zustand';
import { dnaData } from './dnaData';

const initialState = dnaData || {};

export const useStore = create((set, get) => ({
  contentBlocks: initialState.pages?.home || initialState.contentBlocks || [],
  globalSettings: initialState.globalSettings || {},
  currentLanguage: initialState.currentLanguage || 'en',
  uiTheme: initialState.uiTheme || {},
  translationCache: JSON.parse(localStorage.getItem('dna_trans_cache') || '{}'),
  
  // Production actions
  setTranslation: (key, value) => {
    const cache = get().translationCache;
    const newCache = { ...cache, [key]: value };
    localStorage.setItem('dna_trans_cache', JSON.stringify(newCache));
    set({ translationCache: newCache });
  },
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
  
  toggleSiteTheme: () => {
    const newSettings = JSON.parse(JSON.stringify(get().globalSettings));
    const currentMode = newSettings['GL10']?.params?.[6]?.value || 'Dark';
    const newMode = currentMode === 'Light' ? 'Dark' : 'Light';
    newSettings['GL10'].params[6].value = newMode;
    // Simple color switch for production stability
    if (newSettings['GL02']?.params) {
        const isDark = newMode === 'Dark';
        newSettings['GL02'].params[0].value = isDark ? '#09090B' : '#FFFFFF';
        newSettings['GL02'].params[3].value = isDark ? '#FFFFFF' : '#18181B';
    }
    set({ globalSettings: newSettings });
  },

  // ⚠️ STABILITY STUBS: Prevent crashes if component calls editor methods
  updateBlockLocal: () => console.warn('updateBlockLocal is disabled in production'),
  refreshCanvas: () => {},
  setSelectedBlock: () => {},
  selectedBlockId: null,
  isPreviewMode: false,
  viewportMode: 'desktop',
  gridMode: 'off'
}));
