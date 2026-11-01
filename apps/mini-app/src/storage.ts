import {nativeStorage} from 'zmp-sdk/apis';

const KEY='gdv-saved';

function isBrowserPreview(): boolean {
  return typeof window !== 'undefined' && !('__ZALO__' in window);
}

export function getSavedGames(): string[] {
  try {
    const raw = nativeStorage.getItem(KEY);
    if (raw) {
      const value: unknown = JSON.parse(raw);
      if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
    }
  } catch {
    // The SDK bridge is unavailable in a regular browser preview.
  }

  if (isBrowserPreview()) {
    try {
      const value: unknown = JSON.parse(window.localStorage.getItem(KEY) || '[]');
      if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
    } catch {
      return [];
    }
  }
  return [];
}

export function setSavedGames(ids: string[]): void {
  const value = JSON.stringify(ids);
  try {
    nativeStorage.setItem(KEY, value);
    return;
  } catch {
    // Fall back only for the standalone web preview.
  }
  if (isBrowserPreview()) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // Storage can be unavailable in private browsing or restricted webviews.
    }
  }
}
