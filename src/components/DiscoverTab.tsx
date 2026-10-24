import React, { useState, useEffect } from 'react';
import { DISCOVER_RECOMMENDATIONS, RUNWAY_STORIES, RecommendationItem, RunwayStory } from '../data/mockData';

interface DiscoverTabProps {
  onOpenTryOn: () => void;
  onSelectItem: (item: RecommendationItem) => void;
  onShowToast: (msg: string) => void;
}

export interface FashionTrend {
  id: string;
  name: string;
  explanation: string;
  category: string;
  relevantColors: string[];
  silhouettes: string[];
  garmentTypes: string[];
  source: string;
  sourceUrl?: string;
  dateResearched: string;
  image: string;
  isSaved?: boolean;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  onOpenTryOn,
  onSelectItem,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('For You');
  const [recommendations, setRecommendations] = useState(DISCOVER_RECOMMENDATIONS);

  // Fashion Trend Radar State
  const [trendFilter, setTrendFilter] = useState('All');
  const [trends, setTrends] = useState<FashionTrend[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const [savedTrendIds, setSavedTrendIds] = useState<Set<string>>(new Set(['tr-1']));

  const categories = [
    'For You',
    'Trending Now',
    'Trend Radar',
    'Under $100',
    'Workwear',
    'Evening',
    'Wardrobe Complements'
  ];

  const trendFilters = ['All', 'Runway', 'Silhouettes', 'Colors', 'Street Style'];

  // Fetch trend radar data from server / api
  useEffect(() => {
    let isMounted = true;
    setIsLoadingTrends(true);
    fetch('/api/trends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: trendFilter })
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.trends) {
          setTrends(data.trends);
          setIsLoadingTrends(false);
        }
      })
      .catch(err => {
        console.warn('Failed fetching trends from api, using local couture dataset', err);
        if (isMounted) setIsLoadingTrends(false);
      });

    return () => {
      isMounted = false;
    };
  }, [trendFilter]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecommendations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.isBookmarked;
          onShowToast(nextState ? `Saved ${item.title}` : `Removed ${item.title}`);
          return { ...item, isBookmarked: nextState };
        }
        return item;
      })
    );
  };

  const handleToggleSaveTrend = (trend: FashionTrend) => {
    const isSaved = savedTrendIds.has(trend.id);
    const nextSet = new Set(savedTrendIds);
    if (isSaved) {
      nextSet.delete(trend.id);
      onShowToast(`Removed "${trend.name}" from archive`);
    } else {
      nextSet.add(trend.id);
      onShowToast(`Saved "${trend.name}" to Style Archive`);
    }
    setSavedTrendIds(nextSet);
  };

  const filteredItems = recommendations.filter(item => {
    const matchesSearch = searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyRecommended.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'Under $100') {
      return item.price < 100;
    }
    if (activeCategory === 'Workwear') {
      return item.whyRecommended.toLowerCase().includes('workwear') || item.title.includes('Blazer');
    }
    if (activeCategory === 'Evening') {
      return item.whyRecommended.toLowerCase().includes('evening') || item.title.includes('Bag');
    }
    return true;
  });

  const filteredTrends = trends.filter(t => {
    if (trendFilter === 'All') return true;
    return t.category.toLowerCase() === trendFilter.toLowerCase();
  });

  return (
    <div className="max-w-[430px] mx-auto px-5 pt-4 pb-28 space-y-6">
      {/* 1. Search & Filter Control */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#8A7D80] text-[19px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search linen shirts, overshirts, vintage finds..."
              className="w-full bg-[#F4ECE8]/80 text-[#1D1819] placeholder-[#8A7D80] font-sans text-[13px] pl-10 pr-3 py-2.5 rounded-full border border-[rgba(104,32,48,0.15)] focus:outline-none focus:border-[#4A1521] transition-all text-ellipsis"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#8A7D80] hover:text-[#1D1819]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <button
            aria-label="Filter Options"
            onClick={() => onShowToast('Filter options calibrated to Camille’s palette')}
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#F4ECE8] border border-[rgba(104,32,48,0.15)] text-[#4A1521] hover:bg-[#F5E9EC] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Curated Editorial Taxonomy Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap h-8 px-3.5 rounded-full font-sans text-[11px] font-semibold tracking-wider uppercase transition-all active:scale-95 flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#3B121B] text-white border border-[#C5A880]/50 shadow-sm'
                    : 'bg-[#F4ECE8] text-[#574C4E] border border-[rgba(104,32,48,0.12)] hover:text-[#4A1521]'
                }`}
                type="button"
              >
                {cat === 'Trend Radar' && (
                  <span className="material-symbols-outlined text-[13px]">radar</span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. FASHION TREND RADAR (Core Requirement 5) */}
      <section className="bg-white rounded-xl p-4 border border-[rgba(104,32,48,0.12)] shadow-sm space-y-3.5">
        <div className="flex items-baseline justify-between border-b border-[rgba(104,32,48,0.08)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4A1521] text-[18px]">radar</span>
            <div>
              <h3
                className="text-[#3B121B] font-bold uppercase text-[12px] tracking-[0.2em]"
                style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
              >
                FASHION TREND RADAR
              </h3>
              <p className="font-sans text-[10px] text-[#8A7D80] font-semibold uppercase tracking-wider">
                AUTUMN / WINTER 2026 INTELLIGENCE
              </p>
            </div>
          </div>

          <span className="font-sans text-[10px] text-[#8A7D80] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#546255] inline-block" />
            <span>Search Grounded</span>
          </span>
        </div>

        {/* Trend Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {trendFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setTrendFilter(filter)}
              className={`px-3 py-1 rounded-full font-sans text-[10px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                trendFilter === filter
                  ? 'bg-[#3B121B] text-white shadow-xs'
                  : 'bg-[#F4ECE8] text-[#574C4E] hover:text-[#4A1521]'
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Trend Cards Carousel / Feed */}
        <div className="space-y-3">
          {isLoadingTrends ? (
            <div className="py-8 text-center text-[#8A7D80] font-sans text-[12px]">
              Analyzing global runway & street style trends...
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="py-6 text-center text-[#8A7D80] font-sans text-[12px]">
              No trends matched the selected filter.
            </div>
          ) : (
            filteredTrends.map(trend => {
              const isSaved = savedTrendIds.has(trend.id);
              return (
                <div
                  key={trend.id}
                  className="rounded-xl border border-[rgba(104,32,48,0.12)] bg-[#FAF8F5] overflow-hidden p-3.5 space-y-3 hover:border-[#4A1521]/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={trend.image}
                      alt={trend.name}
                      className="w-20 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-[#F4ECE8] text-[#4A1521] font-sans text-[9px] font-bold uppercase tracking-wider">
                          {trend.category}
                        </span>
                        <button
                          onClick={() => handleToggleSaveTrend(trend)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                            isSaved ? 'text-[#4A1521] bg-[#F5E9EC]' : 'text-[#8A7D80] hover:text-[#4A1521]'
                          }`}
                          type="button"
                          aria-label="Save trend"
                        >
                          <span
                            className="material-symbols-outlined text-[17px]"
                            style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                          >
                            bookmark
                          </span>
                        </button>
                      </div>

                      <h4 className="font-serif text-[15px] text-[#1D1819] font-medium mt-1 leading-snug">
                        {trend.name}
                      </h4>
                      <p className="font-sans text-[11px] text-[#574C4E] mt-1 line-clamp-2 leading-relaxed">
                        {trend.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Silhouettes & Colors Tags */}
                  <div className="flex flex-wrap items-center gap-1">
                    {trend.relevantColors.map((color, i) => (
                      <span
                        key={`c-${i}`}
                        className="px-2 py-0.5 rounded-md bg-white text-[#574C4E] font-sans text-[10px] border border-[rgba(104,32,48,0.08)]"
                      >
                        {color}
                      </span>
                    ))}
                    {trend.silhouettes.map((sil, i) => (
                      <span
                        key={`s-${i}`}
                        className="px-2 py-0.5 rounded-md bg-white text-[#4A1521] font-sans text-[10px] border border-[rgba(104,32,48,0.08)] font-medium"
                      >
                        {sil}
                      </span>
                    ))}
                  </div>

                  {/* Connect Trends to Personal Style Box */}
                  <div className="p-2.5 rounded-lg bg-white border border-[rgba(104,32,48,0.1)] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4A1521] text-[16px] mt-0.5">auto_awesome</span>
                    <div>
                      <p className="font-sans text-[10px] text-[#4A1521] font-bold uppercase tracking-wider">
                        Camille's Wardrobe Pairing
                      </p>
                      <p className="font-sans text-[11px] text-[#1D1819] leading-snug mt-0.5">
                        {trend.id === 'tr-1'
                          ? 'This season’s structured oxblood trench trend pairs seamlessly with your Totême outerwear and Saint Laurent kitten heels.'
                          : trend.id === 'tr-2'
                          ? 'Pairs your owned Khaite espresso rib against your champagne silk bias skirt.'
                          : 'Complements your tailored sand wool trousers and pointed patent slingbacks.'}
                      </p>
                    </div>
                  </div>

                  {/* Citation / Source Footnote */}
                  <div className="flex items-center justify-between text-[10px] font-sans text-[#8A7D80] pt-1 border-t border-[rgba(104,32,48,0.06)]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">menu_book</span>
                      <span>{trend.source}</span>
                    </span>
                    <span>{trend.dateResearched}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. Runway Stories */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
            Runway Inspirations
          </h3>
          <button
            onClick={onOpenTryOn}
            className="font-sans text-[11px] text-[#4A1521] font-semibold uppercase tracking-wider hover:underline"
            type="button"
          >
            Explore Couture
          </button>
        </div>

        <div className="space-y-3">
          {RUNWAY_STORIES.map(story => (
            <div
              key={story.id}
              onClick={onOpenTryOn}
              className="bg-white rounded-xl overflow-hidden border border-[rgba(104,32,48,0.12)] shadow-sm hover:border-[#4A1521]/30 transition-all cursor-pointer group"
            >
              <div className="relative aspect-[16/9] bg-[#F4ECE8]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#3B121B]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full font-sans text-[10px] font-semibold uppercase tracking-wider">
                  {story.house} · {story.season}
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-serif text-[16px] text-[#1D1819] font-medium">{story.title}</h4>
                <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">{story.description}</p>
                <div className="pt-2 flex items-center justify-between text-[#4A1521] font-sans text-[11px] font-semibold uppercase tracking-wider">
                  <span>{story.actionLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Curated Recommendations Grid */}
      <section className="grid grid-cols-2 gap-3.5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-xl border border-[rgba(104,32,48,0.12)] flex flex-col justify-between overflow-hidden shadow-[0_4px_16px_rgba(80,22,36,0.03)] hover:border-[#4A1521]/30 transition-all cursor-pointer group"
          >
            <div className="relative w-full aspect-[3/4] bg-[#F4ECE8] overflow-hidden">
              <img
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                src={item.image}
                alt={item.title}
              />

              {/* Bookmark Action */}
              <button
                aria-label={`Bookmark ${item.title}`}
                onClick={(e) => handleToggleBookmark(item.id, e)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#1D1819] hover:text-[#4A1521] transition-colors active:scale-90 shadow-sm"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={item.isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  bookmark
                </span>
              </button>

              {/* Discount Badge */}
              {item.discountBadge && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#F5E9EC] text-[#4A1521] font-sans text-[10px] font-bold uppercase tracking-wider">
                    {item.discountBadge}
                  </span>
                </div>
              )}

              {/* Size Tag */}
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-md font-sans text-[11px] text-[#574C4E] font-medium">
                  {item.sizes}
                </span>
              </div>
            </div>

            <div className="p-3 flex flex-col flex-1 justify-between space-y-2">
              <div>
                <div className="flex items-center gap-1 text-[#8A7D80]">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">
                    {item.brand}
                  </span>
                  {item.brand === 'Massimo Dutti' && (
                    <span className="material-symbols-outlined text-[13px] text-[#546255]">verified</span>
                  )}
                </div>
                <h4 className="font-sans text-[13px] font-semibold text-[#1D1819] line-clamp-1 mt-0.5">
                  {item.title}
                </h4>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <p className="font-sans text-[14px] text-[#4A1521] font-bold">${item.price}</p>
                  {item.originalPrice && (
                    <span className="font-sans text-[11px] text-[#8A7D80] line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Why Recommended Micro-Badge */}
              <div className="pt-1.5 border-t border-[rgba(104,32,48,0.12)]">
                <div className="bg-[#F4ECE8]/70 rounded-md px-2 py-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[13px] text-[#4A1521] flex-shrink-0">
                    style
                  </span>
                  <span className="font-sans text-[11px] leading-tight text-[#574C4E] truncate">
                    {item.whyRecommended}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 5. Personal Styling Insight Callout */}
      <section className="bg-[#FAF8F5] border border-[rgba(104,32,48,0.12)] rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#4A1521] text-[22px] mt-0.5 flex-shrink-0">
          lightbulb
        </span>
        <div className="space-y-1">
          <h5 className="font-sans text-[12px] font-semibold text-[#1D1819] uppercase tracking-wider">
            Personal Styling Insight
          </h5>
          <p className="font-sans text-[13px] text-[#574C4E] leading-relaxed">
            Integrating rich oxblood tones with your current alabaster linen capsule creates an organic transition toward cooler autumn temperatures without replacing staples.
          </p>
        </div>
      </section>
    </div>
  );
};
