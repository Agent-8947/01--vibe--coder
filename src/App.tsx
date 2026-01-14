
import React, { useEffect } from 'react';
import { Viewer } from './components/Viewer';
import { LanguageSelector } from './LanguageSelector';
import { useStore } from './store';

export default function App() {
  const { globalSettings } = useStore();
  useEffect(() => {
    const isDark = globalSettings['GL10']?.params?.[6]?.value === 'Dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.backgroundColor = isDark ? '#09090B' : '#FFFFFF';
  }, [globalSettings]);

  return (
    <>
      <Viewer />
      <LanguageSelector />
    </>
  );
}
