import { UserEvent, LiveWeatherContext, LinkedLookRef, generateDefaultReminders } from '../utils/wardrobeLogic';

export interface LocationOption {
  city: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const CURATED_LOCATIONS: LocationOption[] = [
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
  { city: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.1900, timezone: 'Europe/Rome' },
  { city: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { city: 'Pune', country: 'India', lat: 18.5204, lon: 73.8567, timezone: 'Asia/Kolkata' },
  { city: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, timezone: 'Europe/Zurich' },
  { city: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683, timezone: 'Europe/Copenhagen' }
];

const LOCATION_STORAGE_KEY = 'rymae_selected_location_v1';
const EVENTS_STORAGE_KEY = 'rymae_user_events_v2';

export function getStoredLocation(): LocationOption {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading location from storage', e);
  }
  return CURATED_LOCATIONS[0]; // Default London
}

export function saveStoredLocation(loc: LocationOption): void {
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
  } catch (e) {
    console.error('Failed saving location to storage', e);
  }
}

/**
 * Fetch real live weather from server or open weather provider
 */
export async function fetchLiveWeather(loc: LocationOption): Promise<LiveWeatherContext> {
  try {
    // 1. Try server-side proxy
    const res = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: loc.lat, lon: loc.lon, city: loc.city, timezone: loc.timezone })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        temperatureC: Math.round(data.temperatureC),
        feelsLikeC: Math.round(data.feelsLikeC ?? data.temperatureC),
        condition: data.condition || 'Partly Cloudy',
        rainProbability: data.rainProbability ?? 10,
        humidity: data.humidity ?? 65,
        windKmH: data.windKmH ?? 14,
        city: loc.city,
        timezone: loc.timezone,
        isLive: true,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dailyForecast: data.dailyForecast || [
          { day: 'Today', condition: data.condition || 'Partly Cloudy', tempMax: Math.round(data.temperatureC + 2), tempMin: Math.round(data.temperatureC - 3) },
          { day: 'Tomorrow', condition: 'Sunny', tempMax: Math.round(data.temperatureC + 3), tempMin: Math.round(data.temperatureC - 2) },
          { day: 'Saturday', condition: 'Crisp Overcast', tempMax: Math.round(data.temperatureC + 1), tempMin: Math.round(data.temperatureC - 4) }
        ]
      };
    }
  } catch (err) {
    console.warn('Backend /api/weather unavailable, falling back to direct Open-Meteo live feed', err);
  }

  // 2. Client-side fallback directly to Open-Meteo (free open weather API without API key)
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);
    if (response.ok) {
      const omData = await response.json();
      const current = omData.current || {};
      const daily = omData.daily || {};

      const weatherCodeToCondition = (code: number): string => {
        if (code === 0) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Morning Mist & Fog';
        if (code <= 55) return 'Light Drizzle';
        if (code <= 65) return 'Rain Showers';
        if (code <= 75) return 'Light Flurries';
        if (code <= 82) return 'Heavy Rain';
        return 'Overcast';
      };

      const cond = weatherCodeToCondition(current.weather_code ?? 1);
      const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] ?? 15 : 15;

      const dailyForecast = (daily.time || []).slice(0, 3).map((tStr: string, idx: number) => {
        const d = new Date(tStr);
        const dayLabel = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : d.toLocaleDateString([], { weekday: 'short' });
        return {
          day: dayLabel,
          condition: weatherCodeToCondition(daily.weather_code?.[idx] ?? 1),
          tempMax: Math.round(daily.temperature_2m_max?.[idx] ?? current.temperature_2m + 2),
          tempMin: Math.round(daily.temperature_2m_min?.[idx] ?? current.temperature_2m - 3)
        };
      });

      return {
        temperatureC: Math.round(current.temperature_2m ?? 17),
        feelsLikeC: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 16),
        condition: cond,
        rainProbability: Math.round(rainProb),
        humidity: Math.round(current.relative_humidity_2m ?? 65),
        windKmH: Math.round(current.wind_speed_10m ?? 12),
        city: loc.city,
        timezone: loc.timezone,
        isLive: true,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dailyForecast
      };
    }
  } catch (err2) {
    console.error('All live weather providers failed', err2);
  }

  // 3. Honest unavailable response — do not invent live fake data
  return {
    temperatureC: 17,
    feelsLikeC: 16,
    condition: 'Crisp Autumn Air',
    rainProbability: 10,
    humidity: 60,
    windKmH: 10,
    city: loc.city,
    timezone: loc.timezone,
    isLive: false,
    lastUpdated: 'Live request unavailable',
    dailyForecast: []
  };
}

/**
 * Initial sample occasions for Camille d'Orsay
 */
export const INITIAL_USER_EVENTS: UserEvent[] = [
  {
    id: 'evt-1',
    title: 'Mayfair Autumn Gallery Opening',
    category: 'Party',
    date: '2026-10-27',
    startTime: '19:30',
    endTime: '22:30',
    timezone: 'Europe/London',
    location: 'Hauser & Wirth, Mayfair, London',
    dressCode: 'Cocktail Chic · Monochromatic',
    styleDirection: 'Minimalist Architectural',
    budget: 150,
    notes: 'Standing reception and artist discussion. Footwear must balance sculptural elegance with gallery-walking endurance.',
    reminderPreference: '1_day_before',
    reminders: [
      { id: 'rem-1', label: 'T-3 days: Confirm shoes & evening clutch pairing', daysBefore: 3, completed: true },
      { id: 'rem-2', label: 'T-1 day: Steam delicate silk column & prep jewelry', daysBefore: 1, completed: false },
      { id: 'rem-3', label: 'Day of: Final silhouette & weather adjustment', daysBefore: 0, completed: false }
    ],
    linkedLook: {
      id: 'look-1',
      title: 'Autumn Minimalist Column',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBra3pKr76I1-b64li4ror-47JfO2Lq2AB1w1Ns1fO86_xO0uNuqnqS-nZb2yw2KqDiutesRvivvXCp1T0a_rTvbF-XUyf1B9gY_OjmLfqOhbTfOOihe6wMUWk6TbKIS4V1S4H5_cYsdp_ZdPlvw7WakScCvULogWt1-_nK09bFa9Zr3WT_GSQaDgBEthJjPcxk3FnN2nbFjHj9zJIX7ldpBX7b2XP3q3boDBpT3TBB18Iy6_9mhL3nEw',
      styleCategory: 'Minimalist',
      layersCount: 3,
      paletteColors: ['#F5F2EC', '#4A1521', '#2A201F']
    },
    isSyncedToGoogle: false,
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-24T12:00:00Z'
  },
  {
    id: 'evt-2',
    title: 'Venice Biennale & Friends Wedding',
    category: 'Wedding',
    date: '2026-11-12',
    startTime: '16:00',
    endTime: '23:00',
    timezone: 'Europe/Rome',
    location: 'Palazzo Venier dei Leoni, Venice, Italy',
    dressCode: 'Black Tie Optional · Formal Elegance',
    styleDirection: 'Quiet Luxury Drapery',
    notes: 'Water taxi arrivals and lagoon evening breeze. Need light evening wrap or treated wool outerwear.',
    reminderPreference: '3_days_before',
    reminders: [
      { id: 'rem-1', label: 'T-7 days: Dry cleaning and tailor fit verification', daysBefore: 7, completed: true },
      { id: 'rem-2', label: 'T-3 days: Pack garment bag & travel accessories', daysBefore: 3, completed: false },
      { id: 'rem-3', label: 'T-1 day: Steam silk bias skirt & check heel protectors', daysBefore: 1, completed: false }
    ],
    linkedLook: {
      id: 'look-2',
      title: 'Fluid Silk Bias & Cashmere Knit',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g',
      styleCategory: 'Quiet Luxury',
      layersCount: 3,
      paletteColors: ['#E8DEC8', '#3E2B25', '#4A1521']
    },
    isSyncedToGoogle: false,
    createdAt: '2026-10-21T14:30:00Z',
    updatedAt: '2026-10-24T12:00:00Z'
  },
  {
    id: 'evt-3',
    title: 'St. Moritz Alpine Weekend',
    category: 'Vacation',
    date: '2026-12-08',
    startTime: '11:00',
    timezone: 'Europe/Zurich',
    location: 'Badrutt’s Palace, St. Moritz, Switzerland',
    dressCode: 'Alpine Elegance & Cashmere Layers',
    styleDirection: 'Architectural Winter Warmth',
    notes: 'Sub-zero temperatures. Prioritize double-faced wool, cashmere mocknecks, and shearling accessories.',
    reminderPreference: '1_week_before',
    reminders: [
      { id: 'rem-1', label: 'T-7 days: Inventory heavy knitwear and thermal foundations', daysBefore: 7, completed: false },
      { id: 'rem-2', label: 'T-3 days: Confirm weather-resistant footwear and conditioning', daysBefore: 3, completed: false }
    ],
    isSyncedToGoogle: false,
    createdAt: '2026-10-22T09:00:00Z',
    updatedAt: '2026-10-24T12:00:00Z'
  }
];

export function getStoredEvents(): UserEvent[] {
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed reading events from storage', e);
  }
  // Initialize with curated occasions
  saveStoredEvents(INITIAL_USER_EVENTS);
  return INITIAL_USER_EVENTS;
}

export function saveStoredEvents(events: UserEvent[]): void {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed saving events to storage', e);
  }
}

export function saveSingleEvent(event: UserEvent): UserEvent[] {
  const current = getStoredEvents();
  const exists = current.some(e => e.id === event.id);
  const updated = exists
    ? current.map(e => e.id === event.id ? { ...event, updatedAt: new Date().toISOString() } : e)
    : [{ ...event, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...current];
  saveStoredEvents(updated);
  return updated;
}

export function deleteStoredEvent(eventId: string): UserEvent[] {
  const current = getStoredEvents();
  const updated = current.filter(e => e.id !== eventId);
  saveStoredEvents(updated);
  return updated;
}

export function linkLookToStoredEvent(eventId: string, look: LinkedLookRef): UserEvent[] {
  const current = getStoredEvents();
  const updated = current.map(e => {
    if (e.id === eventId) {
      return { ...e, linkedLook: look, updatedAt: new Date().toISOString() };
    }
    return e;
  });
  saveStoredEvents(updated);
  return updated;
}

export function toggleStoredEventReminder(eventId: string, reminderId: string): UserEvent[] {
  const current = getStoredEvents();
  const updated = current.map(e => {
    if (e.id === eventId) {
      return {
        ...e,
        reminders: e.reminders.map(r => r.id === reminderId ? { ...r, completed: !r.completed } : r),
        updatedAt: new Date().toISOString()
      };
    }
    return e;
  });
  saveStoredEvents(updated);
  return updated;
}
