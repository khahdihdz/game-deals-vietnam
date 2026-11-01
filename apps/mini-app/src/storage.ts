import {nativeStorage} from 'zmp-sdk/apis';

const KEY='game-deals-saved';
const ZALO_MINI_APP_HOST='h5.zdn.vn';

function isBrowserPreview(): boolean {
  return typeof window !== 'undefined' && window.location.hostname !== ZALO_MINI_APP_HOST;
}

function parseSavedGames(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function getSavedGames(): string[] {
  try {
    const saved = nativeStorage.getItem(KEY);
    if (typeof saved === 'string') return parseSavedGames(saved);
  } catch {
    // The native bridge is unavailable in a regular browser preview.
  }

  if (isBrowserPreview()) {
    try {
      return parseSavedGames(window.localStorage.getItem(KEY));
    } catch {
      // Browser storage may be disabled.
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
    // Fall back only outside the official Zalo Mini App origin.
  }

  if (isBrowserPreview()) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // Browser storage may be disabled.
    }
  }
}
