import { useState } from 'react';

export function useSaved() {
  const [savedIds, setSavedIds] = useState(new Set());

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isSaved = (id) => {
    return savedIds.has(id);
  };

  return { savedIds, toggleSave, isSaved };
}