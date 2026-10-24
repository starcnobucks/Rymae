import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { WardrobeItem, calculateMostWornCategories, calculateColorDistribution } from '../utils/wardrobeLogic';

interface WardrobeAnalyticsProps {
  wardrobeItems: WardrobeItem[];
}

export const WardrobeAnalytics: React.FC<WardrobeAnalyticsProps> = ({ wardrobeItems }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'categories'>('colors');

  // Color distribution dataset
  const colorData = calculateColorDistribution([
    { name: 'Alabaster Cream', percentage: 38, color: '#F5F2EC', count: 24 },
    { name: 'Warm Camel', percentage: 24, color: '#C59B6C', count: 15 },
    { name: 'Champagne Silk', percentage: 18, color: '#E8DEC8', count: 12 },
    { name: 'Oxblood Bordeaux', percentage: 12, color: '#4A1521', count: 8 },
    { name: 'Espresso Noir', percentage: 8, color: '#2A201F', count: 5 },
  ]);

  // Category wear stats
  const categoryStats = calculateMostWornCategories(wardrobeItems);

  // Custom luxury tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#3B121B] text-white p-2.5 rounded-lg shadow-xl border border-[#C5A880]/40 text-xs">
          <p className="font-serif font-semibold text-[#F3EDE4]">{data.name || data.category}</p>
          {data.percentage !== undefined && (
            <p className="font-sans text-[11px] text-[#C5A880]">
              {data.percentage}% of wardrobe ({data.count} pieces)
            </p>
          )}
          {data.totalWears !== undefined && (
            <p className="font-sans text-[11px] text-[#C5A880]">
              {data.totalWears} wears across {data.itemCount} items ({data.averageWears}x avg)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] space-y-4">
      {/* Header with Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
            Wardrobe Data Intelligence
          </h3>
          <p className="font-sans text-[12px] text-[#574C4E]">
            Styling analytics & wear distribution
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#F4ECE8] p-0.5 rounded-full border border-[rgba(104,32,48,0.12)]">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1 rounded-full font-sans text-[10px] uppercase font-semibold tracking-wider transition-all ${
              activeTab === 'colors'
                ? 'bg-[#4B091B] text-white shadow-xs'
                : 'text-[#574C4E] hover:text-[#1D1819]'
            }`}
            type="button"
          >
            Palette
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1 rounded-full font-sans text-[10px] uppercase font-semibold tracking-wider transition-all ${
              activeTab === 'categories'
                ? 'bg-[#4B091B] text-white shadow-xs'
                : 'text-[#574C4E] hover:text-[#1D1819]'
            }`}
            type="button"
          >
            Categories
          </button>
        </div>
      </div>

      {/* 1. Color Palette Distribution View */}
      {activeTab === 'colors' ? (
        <div className="space-y-3">
          {/* Donut Chart */}
          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={colorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="percentage"
                  stroke="#E8E3DC"
                  strokeWidth={1}
                >
                  {colorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif text-[18px] font-bold text-[#4B091B]">38%</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                Alabaster
              </span>
            </div>
          </div>

          {/* Color Breakdown List */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {colorData.map((c) => (
              <div
                key={c.name}
                className="p-2 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.08)] flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-[rgba(104,32,48,0.2)] flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="font-sans text-[11px] text-[#1D1819] font-medium truncate">
                    {c.name}
                  </span>
                </div>
                <span className="font-sans text-[11px] font-semibold text-[#4B091B]">
                  {c.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 2. Most-Worn Categories View */
        <div className="space-y-3">
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryStats}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
              >
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#8A7D80', fontFamily: 'Plus Jakarta Sans' }}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  width={65}
                  tick={{ fontSize: 11, fill: '#1D1819', fontWeight: 500, fontFamily: 'Plus Jakarta Sans' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="totalWears"
                  fill="#4B091B"
                  radius={[0, 4, 4, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Metric Footnote */}
          <div className="p-2.5 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4B091B] text-[16px]">repeat</span>
              <span className="font-sans text-[11px] text-[#574C4E]">Top rotated category:</span>
            </div>
            <span className="font-sans text-[11px] font-bold text-[#4B091B]">
              {categoryStats[0]?.category || 'Outerwear'} ({categoryStats[0]?.totalWears || 0} wears)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
