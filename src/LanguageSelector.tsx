
import React from 'react';
import { useLanguageStore } from './languageStore';
import { useStore } from './store';
import { Sun, Moon, Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { currentLang, setLanguage } = useLanguageStore();
  const { setCurrentLanguage, toggleSiteTheme, globalSettings } = useStore();
  const isDark = globalSettings['GL10']?.params?.[6]?.value === 'Dark';

  return (
    <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2">
      <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-white/10">
        <Globe size={14} className="opacity-50" />
        <select 
          value={currentLang} 
          onChange={(e) => { setLanguage(e.target.value); setCurrentLanguage(e.target.value); }} 
          className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer"
        >
          {['en', 'ru', 'uk', 'de', 'fr', 'es', 'it', 'zh', 'pl'].map(l => <option key={l} value={l} className="text-black">{l}</option>)}
        </select>
      </div>
      <button onClick={toggleSiteTheme} className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
};
