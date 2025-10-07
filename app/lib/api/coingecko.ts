import { DataCache } from '../cache';

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
  total_volume: number;
  market_cap: number;
  fully_diluted_valuation: number | null;
  circulating_supply: number;
  total_supply: number | null;
}

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CACHE_KEY = 'crypto_prices';

export async function fetchCryptoPrices(
  ids: string[] = ['bitcoin', 'ethereum', 'tether', 'binancecoin']
): Promise<CryptoPrice[]> {
  // Try to get fresh cached data (< 24 hours old)
  const cachedData = DataCache.get<CryptoPrice[]>(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
      { next: { revalidate: 30 } } // Cache for 30 seconds
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const data = await response.json();

    // Save to cache
    DataCache.set(CACHE_KEY, data);

    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);

    // Try to return cached data of any age as fallback
    const fallbackData = DataCache.getAnyAge<CryptoPrice[]>(CACHE_KEY);
    if (fallbackData) {
      console.log('Using cached crypto prices as fallback');
      return fallbackData;
    }

    return [];
  }
}

export async function fetchSingleCryptoPrice(id: string): Promise<CryptoPrice | null> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=24h`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch price for ${id}`);
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching price for ${id}:`, error);
    return null;
  }
}
