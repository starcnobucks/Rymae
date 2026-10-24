export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Bags';
  material: string;
  wornCount: number;
  image: string;
  isBookmarked: boolean;
  tag?: string;
  colorHex?: string;
  price?: number;
  originalPrice?: number;
}

export interface CollectionItem {
  id: string;
  name: string;
  itemCount: number;
  subtitle: string;
  coverImage: string;
  isPrivate?: boolean;
  tag?: string;
}

export interface EventReminder {
  id: string;
  label: string;
  daysBefore: number;
  completed: boolean;
  scheduledDate?: string;
}

export interface LinkedLookRef {
  id: string;
  title: string;
  thumbnail: string;
  styleCategory?: string;
  layersCount?: number;
  paletteColors?: string[];
}

export type EventCategory =
  | 'Wedding'
  | 'Birthday'
  | 'Party'
  | 'Date'
  | 'College event'
  | 'Office event'
  | 'Interview'
  | 'Vacation'
  | 'Fashion show'
  | 'Custom event';

export interface UserEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime?: string;
  timezone: string;
  location: string;
  dressCode: string;
  styleDirection?: string;
  budget?: number;
  notes?: string;
  reminderPreference: 'morning_of' | '1_day_before' | '3_days_before' | '1_week_before' | 'none';
  reminders: EventReminder[];
  linkedLook?: LinkedLookRef;
  candidateLooks?: LinkedLookRef[];
  isSyncedToGoogle?: boolean;
  googleEventId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LiveWeatherContext {
  temperatureC: number;
  feelsLikeC: number;
  condition: string;
  rainProbability: number;
  humidity: number;
  windKmH: number;
  city: string;
  timezone: string;
  isLive: boolean;
  lastUpdated: string;
  dailyForecast?: {
    day: string;
    condition: string;
    tempMax: number;
    tempMin: number;
  }[];
}

export function calculateRewearIndex(items: { wornCount: number }[]): number {
  if (items.length === 0) return 0;
  const wornMultipleTimes = items.filter(item => item.wornCount >= 3).length;
  return Math.round((wornMultipleTimes / items.length) * 100);
}

export function calculateBudgetCheck(cost: number, budget: number): {
  isWithinBudget: boolean;
  diff: number;
  percentageUsed: number;
  message: string;
} {
  const diff = budget - cost;
  const isWithinBudget = diff >= 0;
  const percentageUsed = budget > 0 ? Math.round((cost / budget) * 100) : 100;
  return {
    isWithinBudget,
    diff,
    percentageUsed,
    message: isWithinBudget
      ? `Within $${budget} budget ($${diff} remaining)`
      : `Exceeds $${budget} budget by $${Math.abs(diff)}`
  };
}

export function filterItemsByCategory<T extends { category: string }>(
  items: T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory === 'All' || selectedCategory.startsWith('All (')) {
    return items;
  }
  return items.filter(item => 
    item.category.toLowerCase() === selectedCategory.toLowerCase().replace(/\s*\(\d+\)/, '')
  );
}

export function searchCollections(
  collections: CollectionItem[],
  query: string
): CollectionItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return collections;
  return collections.filter(c => 
    c.name.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
  );
}

export function matchCapsuleAffinity(
  itemArchetypes: string[],
  userArchetypes: string[]
): number {
  if (!itemArchetypes.length || !userArchetypes.length) return 80;
  const matched = itemArchetypes.filter(tag => 
    userArchetypes.some(ua => ua.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(ua.toLowerCase()))
  ).length;
  const score = Math.round((matched / Math.max(itemArchetypes.length, 1)) * 40) + 60;
  return Math.min(score, 98);
}

export interface CategoryWearStat {
  category: string;
  totalWears: number;
  itemCount: number;
  averageWears: number;
}

export function calculateMostWornCategories(
  items: { category: string; wornCount: number }[]
): CategoryWearStat[] {
  const map: Record<string, { totalWears: number; itemCount: number }> = {};
  items.forEach(item => {
    if (!map[item.category]) {
      map[item.category] = { totalWears: 0, itemCount: 0 };
    }
    map[item.category].totalWears += item.wornCount || 0;
    map[item.category].itemCount += 1;
  });

  return Object.entries(map)
    .map(([category, data]) => ({
      category,
      totalWears: data.totalWears,
      itemCount: data.itemCount,
      averageWears: data.itemCount > 0 ? Math.round((data.totalWears / data.itemCount) * 10) / 10 : 0
    }))
    .sort((a, b) => b.totalWears - a.totalWears);
}

export interface ColorDistributionStat {
  name: string;
  percentage: number;
  color: string;
  count: number;
}

export function calculateColorDistribution(
  colors: { name: string; percentage: number; color: string; count?: number }[]
): ColorDistributionStat[] {
  return colors.map(c => ({
    name: c.name,
    percentage: c.percentage,
    color: c.color,
    count: c.count || Math.round(c.percentage * 0.64)
  }));
}

/**
 * Calculates days remaining between reference date and target event date
 */
export function calculateDaysUntil(targetDate: string, refDate: Date = new Date()): number {
  const [tYear, tMonth, tDay] = targetDate.split('-').map(Number);
  const target = new Date(tYear, tMonth - 1, tDay);
  const ref = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
  const diffTime = target.getTime() - ref.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Human readable relative day format (e.g., "Today", "Tomorrow", "in 3 days")
 */
export function formatRelativeDays(days: number): string {
  if (days < 0) return `${Math.abs(days)}d ago`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `in ${days} days`;
  if (days < 14) return 'in 1 week';
  const weeks = Math.round(days / 7);
  return `in ${weeks} weeks`;
}

/**
 * Generates tailored couture preparation reminders based on event dress code and category
 */
export function generateDefaultReminders(category: EventCategory, dressCode: string): EventReminder[] {
  const isFormal = dressCode.toLowerCase().includes('black tie') ||
    dressCode.toLowerCase().includes('formal') ||
    category === 'Wedding' ||
    category === 'Fashion show';

  if (isFormal) {
    return [
      { id: 'rem-1', label: 'T-7 days: Garment dry cleaning & tailor verification', daysBefore: 7, completed: true },
      { id: 'rem-2', label: 'T-3 days: Confirm shoes, evening wrap & clutch pairing', daysBefore: 3, completed: false },
      { id: 'rem-3', label: 'T-1 day: Steam delicate silk/crepe & prep jewelry', daysBefore: 1, completed: false },
      { id: 'rem-4', label: 'Day of: Final silhouette & weather adjustment', daysBefore: 0, completed: false },
    ];
  }

  return [
    { id: 'rem-1', label: 'T-3 days: Curate core layers and check pressing', daysBefore: 3, completed: false },
    { id: 'rem-2', label: 'T-1 day: Prep chosen footwear and leather accessories', daysBefore: 1, completed: false },
    { id: 'rem-3', label: 'Morning of: Verify weather conditions and outer layer', daysBefore: 0, completed: false },
  ];
}

/**
 * Filters and sorts upcoming events chronologically
 */
export function filterUpcomingEvents(events: UserEvent[], refDate: Date = new Date()): UserEvent[] {
  return [...events]
    .map(event => ({
      event,
      days: calculateDaysUntil(event.date, refDate)
    }))
    .filter(item => item.days >= 0)
    .sort((a, b) => a.days - b.days)
    .map(item => item.event);
}

/**
 * Weather-aware outfit recommendation engine
 */
export function generateWeatherStylingNote(weather: {
  temperatureC: number;
  condition: string;
  rainProbability?: number;
  windKmH?: number;
  city?: string;
}): {
  headline: string;
  recommendation: string;
  recommendedCategory: 'Outerwear' | 'Tops' | 'Bottoms' | 'Shoes';
} {
  const conditionLower = (weather.condition || '').toLowerCase();
  const rainChance = weather.rainProbability ?? 0;
  const isRain = conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower') || rainChance > 40;
  const temp = weather.temperatureC;

  if (isRain) {
    return {
      headline: 'Precipitation Defense',
      recommendation: 'Light showers expected today. Your Totême trench and treated calfskin slingbacks are a practical combination.',
      recommendedCategory: 'Outerwear'
    };
  }

  if (temp < 12) {
    return {
      headline: 'Thermal Architecture',
      recommendation: 'Crisp cold air today. Heavy cashmere rib and double-faced wool coat provide structural thermal poise.',
      recommendedCategory: 'Outerwear'
    };
  }

  if (temp <= 20) {
    return {
      headline: 'Subtle Transitional Layers',
      recommendation: 'Light layers today. Your trench and tailored trousers are a practical, fluid combination for the forecast.',
      recommendedCategory: 'Tops'
    };
  }

  return {
    headline: 'Fluid Breathable Silhouettes',
    recommendation: 'Warm skies today. Prioritizing breathable mulberry silk bias cuts and light slingbacks for effortless movement.',
    recommendedCategory: 'Bottoms'
  };
}

