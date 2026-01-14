
/**
 * DNA Auto-Translate Engine
 */
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || !targetLang || targetLang === 'en') return text;
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data[0]) {
      return data[0].map((segment: any) => segment[0]).join('');
    }
    return text;
  } catch (err) {
    return text;
  }
};
