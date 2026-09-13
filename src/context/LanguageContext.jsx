'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import fr from '@/data/dictionaries/fr.json';
import ht from '@/data/dictionaries/ht.json';
import en from '@/data/dictionaries/en.json';

const staticDictionaries = { fr, ht, en };

const LanguageContext = createContext({
  language: 'fr',
  setLanguage: () => {},
  t: (path, defaultValue = '') => defaultValue,
  dict: fr,
  isLoading: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('fr');
  const [dict, setDict] = useState(fr);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem('ama_lang');
    if (saved && ['fr', 'ht', 'en'].includes(saved)) {
      setLanguageState(saved);
      setDict(staticDictionaries[saved] || fr);
    }
  }, []);

  const changeLanguage = async (newLang) => {
    if (!['fr', 'ht', 'en'].includes(newLang)) return;
    setLanguageState(newLang);
    localStorage.setItem('ama_lang', newLang);

    // Instant local dictionary update for zero latency
    if (staticDictionaries[newLang]) {
      setDict(staticDictionaries[newLang]);
    }

    // Call translation API for dynamic sync / server consistency
    try {
      setIsLoading(true);
      const res = await fetch(`/api/translations?lang=${newLang}`);
      if (res.ok) {
        const data = await res.json();
        if (data.translations) {
          setDict(data.translations);
        }
      }
    } catch (e) {
      console.warn('Using local dictionary cache:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to resolve nested keys like "hero.title"
  const t = (path, defaultValue = '') => {
    if (!path) return defaultValue;
    const keys = path.split('.');
    let current = dict;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue || path;
      }
    }
    return current !== undefined ? current : defaultValue;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        dict,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
