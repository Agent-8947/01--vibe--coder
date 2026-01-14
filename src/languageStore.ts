
import { create } from 'zustand';
import { dictionary } from './dictionary';
export const useLanguageStore = create((set, get) => ({
  currentLang: 'en',
  setLanguage: (lang) => set({ currentLang: lang }),
  t: (key) => (dictionary[get().currentLang]?.[key] || dictionary['en']?.[key] || key),
}));
