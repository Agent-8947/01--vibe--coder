
import { useStore } from '@/store';
import { translateText } from './autoTranslate';

export const translateData = (data: any, lang: string) => {
  if (!data) return {};
  if (!lang || lang === 'en') return data;

  const state = useStore.getState();
  const translationCache = state.translationCache || {};
  const setTranslation = state.setTranslation || (() => {});

  const translated: any = Array.isArray(data) ? [] : {};

  Object.keys(data).forEach(key => {
    const value = data[key];

    // PROTECTED KEYS: copy directly without any processing (includes 'images' array)
    const protectedKeys = ['url', 'image', 'src', 'imageUrl', 'bgImage', 'avatar', 'images', 'logo', 'icon', 'photo', 'media'];
    if (protectedKeys.includes(key)) {
      translated[key] = value;
      return;
    }

    // PROTECTED VALUES: URLs and DataURLs
    if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:') || value.includes('://'))) {
      translated[key] = value;
      return;
    }

    // For objects/arrays that are NOT protected, recurse
    if (value !== null && typeof value === 'object') {
      translated[key] = translateData(value, lang);
      return;
    }

    // For non-strings, copy as-is
    if (typeof value !== 'string') {
      translated[key] = value;
      return;
    }

    // For regular strings, try translation
    const langKey = `${key}_${lang}`;
    const cacheKey = `${lang}:${value}`;
    
    if (data[langKey] !== undefined) {
      translated[key] = data[langKey];
    } else if (translationCache[cacheKey]) {
      translated[key] = translationCache[cacheKey];
    } else {
      translated[key] = value; 
      translateText(value, lang).then(result => {
        if (result && result !== value) setTranslation(cacheKey, result);
      });
    }
  });

  return translated;
};
