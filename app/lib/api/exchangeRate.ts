import { DataCache } from '../cache';

export interface ExchangeRate {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

const CACHE_KEY = 'exchange_rates';

export async function fetchExchangeRates(base: string = 'USD'): Promise<ExchangeRate | null> {
  // Try to get fresh cached data (< 24 hours old)
  const cachedData = DataCache.get<ExchangeRate>(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    const exchangeRate = {
      base: data.base,
      rates: data.rates,
      timestamp: Date.now()
    };

    // Save to cache
    DataCache.set(CACHE_KEY, exchangeRate);

    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);

    // Try to return cached data of any age as fallback
    const fallbackData = DataCache.getAnyAge<ExchangeRate>(CACHE_KEY);
    if (fallbackData) {
      console.log('Using cached exchange rates as fallback');
      return fallbackData;
    }

    return null;
  }
}

export function formatExchangeRate(rate: number): string {
  return rate.toFixed(4);
}
