export interface ExchangeRate {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export async function fetchExchangeRates(base: string = 'USD'): Promise<ExchangeRate | null> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    return {
      base: data.base,
      rates: data.rates,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

export function formatExchangeRate(rate: number): string {
  return rate.toFixed(4);
}
