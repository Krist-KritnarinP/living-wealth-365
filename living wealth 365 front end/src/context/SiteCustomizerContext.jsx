import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  DEFAULT_SITE_CONTENT,
  deepMerge,
  getByPath,
  setByPath,
} from '../constants/siteCustomizerDefaults.js';

export { DEFAULT_SITE_CONTENT, deepMerge, getByPath, setByPath };

const STORAGE_KEY = 'lw365_site_customizer_v1';

const SiteCustomizerContext = createContext(null);

export function SiteCustomizerProvider({ children }) {
  // Load custom content from localStorage with fallback to default
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return deepMerge(DEFAULT_SITE_CONTENT, parsed);
      }
    } catch (e) {
      console.warn('Failed to parse saved site customizer data', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  // Visual in-page edit mode state
  const [isVisualEditMode, setIsVisualEditMode] = useState(() => {
    return localStorage.getItem('lw365_visual_edit_mode') === 'true';
  });

  // Active modal edit field state
  const [activeEditField, setActiveEditField] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save site customizer data to localStorage', e);
    }
  }, [content]);

  useEffect(() => {
    localStorage.setItem('lw365_visual_edit_mode', isVisualEditMode ? 'true' : 'false');
  }, [isVisualEditMode]);

  // Update a field by dot-path
  const updateField = useCallback((path, value) => {
    setContent((prev) => setByPath(prev, path, value));
  }, []);

  // Bulk update multiple fields
  const updateContent = useCallback((updater) => {
    if (typeof updater === 'function') {
      setContent((prev) => updater(prev));
    } else if (typeof updater === 'object') {
      setContent((prev) => deepMerge(prev, updater));
    }
  }, []);

  // Reset all to factory defaults
  const resetDefaults = useCallback(() => {
    setContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Toggle visual edit mode
  const toggleVisualEditMode = useCallback(() => {
    setIsVisualEditMode((prev) => !prev);
  }, []);

  // Modal open/close helpers
  const openEditModal = useCallback((fieldConfig) => {
    setActiveEditField(fieldConfig);
  }, []);

  const closeEditModal = useCallback(() => {
    setActiveEditField(null);
  }, []);

  // Save from quick modal
  const saveActiveField = useCallback((key, newValue) => {
    updateField(key, newValue);
    setActiveEditField(null);
  }, [updateField]);

  // Export JSON string
  const exportConfig = useCallback(() => {
    return JSON.stringify(content, null, 2);
  }, [content]);

  // Import JSON string
  const importConfig = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('รูปแบบไฟล์ JSON ไม่ถูกต้อง');
      }
      const merged = deepMerge(DEFAULT_SITE_CONTENT, parsed);
      setContent(merged);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const value = useMemo(
    () => ({
      content,
      updateField,
      updateContent,
      resetDefaults,
      isVisualEditMode,
      setIsVisualEditMode,
      toggleVisualEditMode,
      activeEditField,
      openEditModal,
      closeEditModal,
      saveActiveField,
      exportConfig,
      importConfig,
      getByPath: (path, fallback) => getByPath(content, path, fallback),
    }),
    [
      content,
      updateField,
      updateContent,
      resetDefaults,
      isVisualEditMode,
      activeEditField,
      openEditModal,
      closeEditModal,
      saveActiveField,
      exportConfig,
      importConfig,
    ]
  );

  return (
    <SiteCustomizerContext.Provider value={value}>
      {children}
    </SiteCustomizerContext.Provider>
  );
}

export function useSiteCustomizer() {
  const context = useContext(SiteCustomizerContext);
  if (!context) {
    throw new Error('useSiteCustomizer must be used within a SiteCustomizerProvider');
  }
  return context;
}
