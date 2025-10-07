interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class DataCache {
  /**
   * Get cached data if it exists and is not expired (< 24 hours old)
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      const now = Date.now();
      const age = now - cacheItem.timestamp;

      // Return cached data if less than 24 hours old
      if (age < CACHE_DURATION) {
        return cacheItem.data;
      }

      // Cache expired, remove it
      localStorage.removeItem(key);
      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  /**
   * Save data to cache with current timestamp
   */
  static set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  }

  /**
   * Get cached data regardless of age (for fallback when fetch fails)
   */
  static getAnyAge<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      return cacheItem.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  /**
   * Clear specific cache entry
   */
  static clear(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  /**
   * Clear all cache entries
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}
