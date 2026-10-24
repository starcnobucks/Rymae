import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRewearIndex,
  calculateBudgetCheck,
  filterItemsByCategory,
  searchCollections,
  matchCapsuleAffinity,
  calculateMostWornCategories,
  calculateColorDistribution,
  calculateDaysUntil,
  formatRelativeDays,
  generateDefaultReminders,
  generateWeatherStylingNote
} from './wardrobeLogic.ts';

test('calculateRewearIndex computes percentage of frequently worn items', () => {
  const sampleItems = [
    { wornCount: 14 },
    { wornCount: 8 },
    { wornCount: 11 },
    { wornCount: 22 },
    { wornCount: 5 },
    { wornCount: 3 },
    { wornCount: 1 },
  ];
  // 6 out of 7 items have wornCount >= 3 -> 85.7% -> 86%
  const index = calculateRewearIndex(sampleItems);
  assert.equal(index, 86);
});

test('calculateBudgetCheck returns true when under limit', () => {
  const check = calculateBudgetCheck(140, 150);
  assert.equal(check.isWithinBudget, true);
  assert.equal(check.diff, 10);
  assert.equal(check.percentageUsed, 93);
});

test('calculateBudgetCheck returns false when over limit', () => {
  const check = calculateBudgetCheck(165, 150);
  assert.equal(check.isWithinBudget, false);
  assert.equal(check.diff, -15);
});

test('filterItemsByCategory filters by category label', () => {
  const items = [
    { name: 'Coat', category: 'Outerwear' },
    { name: 'Skirt', category: 'Bottoms' },
    { name: 'Blazer', category: 'Outerwear' },
  ];
  const filtered = filterItemsByCategory(items, 'Outerwear');
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0].name, 'Coat');

  const all = filterItemsByCategory(items, 'All (3)');
  assert.equal(all.length, 3);
});

test('searchCollections finds matching collection names and subtitles', () => {
  const collections = [
    { id: '1', name: 'Capsule Wardrobe', itemCount: 14, subtitle: 'Daily Edit', coverImage: '' },
    { id: '2', name: 'Date Night', itemCount: 9, subtitle: 'Silk & Tailoring', coverImage: '' },
  ];
  const res = searchCollections(collections, 'capsule');
  assert.equal(res.length, 1);
  assert.equal(res[0].id, '1');

  const res2 = searchCollections(collections, 'tailoring');
  assert.equal(res2.length, 1);
  assert.equal(res2[0].id, '2');
});

test('matchCapsuleAffinity calculates affinity percentage accurately', () => {
  const score = matchCapsuleAffinity(['Warm Neutrals', 'Architectural'], ['Minimal Warm Neutrals', 'Architectural Silhouettes']);
  assert.ok(score >= 80);
});

test('calculateMostWornCategories aggregates wears and computes averages', () => {
  const sampleItems = [
    { category: 'Outerwear', wornCount: 14 },
    { category: 'Outerwear', wornCount: 6 },
    { category: 'Tops', wornCount: 16 },
    { category: 'Bottoms', wornCount: 8 },
  ];
  const stats = calculateMostWornCategories(sampleItems);
  assert.equal(stats[0].category, 'Outerwear');
  assert.equal(stats[0].totalWears, 20);
  assert.equal(stats[0].itemCount, 2);
  assert.equal(stats[0].averageWears, 10);
});

test('calculateColorDistribution maps percentages and counts accurately', () => {
  const colors = [
    { name: 'Alabaster Cream', percentage: 38, color: '#F5F2EC' },
    { name: 'Warm Camel', percentage: 24, color: '#C59B6C' },
  ];
  const dist = calculateColorDistribution(colors);
  assert.equal(dist.length, 2);
  assert.equal(dist[0].percentage, 38);
});

test('calculateDaysUntil computes days difference correctly', () => {
  const ref = new Date(2026, 9, 24); // Oct 24 2026
  assert.equal(calculateDaysUntil('2026-10-24', ref), 0);
  assert.equal(calculateDaysUntil('2026-10-25', ref), 1);
  assert.equal(calculateDaysUntil('2026-10-28', ref), 4);
  assert.equal(calculateDaysUntil('2026-10-20', ref), -4);
});

test('formatRelativeDays handles today, tomorrow, and future days', () => {
  assert.equal(formatRelativeDays(0), 'Today');
  assert.equal(formatRelativeDays(1), 'Tomorrow');
  assert.equal(formatRelativeDays(3), 'in 3 days');
  assert.equal(formatRelativeDays(14), 'in 2 weeks');
});

test('generateDefaultReminders produces tailored timeline for formal vs casual events', () => {
  const formalReminders = generateDefaultReminders('Wedding', 'Black Tie Optional');
  assert.ok(formalReminders.length >= 3);
  assert.ok(formalReminders.some(r => r.label.includes('dry cleaning')));

  const casualReminders = generateDefaultReminders('Date', 'Smart Casual');
  assert.ok(casualReminders.length >= 2);
  assert.ok(casualReminders.some(r => r.label.includes('footwear')));
});

test('generateWeatherStylingNote produces appropriate recommendations for rain, cold, and mild conditions', () => {
  const rainNote = generateWeatherStylingNote({ temperatureC: 15, condition: 'Light Rain', rainProbability: 60 });
  assert.equal(rainNote.headline, 'Precipitation Defense');
  assert.ok(rainNote.recommendation.includes('Totême trench'));

  const coldNote = generateWeatherStylingNote({ temperatureC: 8, condition: 'Overcast' });
  assert.equal(coldNote.headline, 'Thermal Architecture');
  assert.ok(coldNote.recommendation.includes('cashmere'));

  const mildNote = generateWeatherStylingNote({ temperatureC: 18, condition: 'Partly Cloudy' });
  assert.equal(mildNote.headline, 'Subtle Transitional Layers');
});

