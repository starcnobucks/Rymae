import React, { useState } from 'react';
import {
  INITIAL_COLLECTIONS,
  OCCASIONS_DATA,
  RECENTLY_SAVED_PRODUCTS,
  RUNWAY_STORIES
} from '../data/mockData';
import { CollectionItem } from '../utils/wardrobeLogic';

interface SavedTabProps {
  onOpenCollection: (collection: CollectionItem) => void;
  onOpenTryOn: () => void;
  onOpenStylist: () => void;
  onOpenCalendar?: () => void;
  onShowToast: (msg: string) => void;
}

export const SavedTab: React.FC<SavedTabProps> = ({
  onOpenCollection,
  onOpenTryOn,
  onOpenStylist,
  onOpenCalendar,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState(RECENTLY_SAVED_PRODUCTS);

  const filterTabs = [
    { label: 'All', count: 38 },
    { label: 'Items', count: 18 },
    { label: 'Outfits', count: 7 },
    { label: 'Occasions', count: 3 },
    { label: 'Shows & Runway', count: 6 },
    { label: 'Brands', count: 4 },
  ];

  const handleToggleBookmark = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextState = !p.isBookmarked;
          onShowToast(nextState ? `Saved ${p.name}` : `Removed ${p.name} from saved items`);
          return { ...p, isBookmarked: nextState };
        }
        return p;
      })
    );
  };

  return (
    <div className="max-w-[430px] mx-auto px-5 pt-3 pb-28 space-y-6">
      {/* 1. Masthead Editorial Title Section */}
      <section className="pt-1 pb-1">
        <div className="flex items-baseline justify-between">
          <h1 className="font-serif text-[26px] text-[#1D1819] italic font-normal">
            Saved
          </h1>
          <span className="font-sans text-[11px] font-semibold text-[#8A7D80] uppercase tracking-wider">
            38 Archived
          </span>
        </div>
        <p className="font-sans text-[13px] text-[#574C4E] mt-0.5">
          Your bespoke style archive, thoughtfully curated.
        </p>
      </section>

      {/* 2. Category Filter Bar (Horizontally scrollable luxury pills) */}
      <section className="-mx-5 px-5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveFilter(tab.label)}
                className={`flex-shrink-0 h-9 px-3.5 rounded-full font-sans text-[12px] font-medium flex items-center gap-1.5 active:scale-95 transition-all ${
                  isActive
                    ? 'bg-[#4B091B] text-white shadow-sm'
                    : 'bg-[#F4ECE8] text-[#574C4E] hover:text-[#1D1819] border border-transparent hover:border-[rgba(104,32,48,0.12)]'
                }`}
                type="button"
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] flex items-center justify-center font-medium ${
                    isActive
                      ? 'w-4 h-4 rounded-full bg-[#3B121B] text-white'
                      : 'text-[#8A7D80]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Smart Activity & Editorial Alerts */}
      <section className="space-y-2.5">
        {/* Alert 1: Price Drop */}
        <div className="bg-white rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex items-start gap-3 shadow-[0_4px_16px_rgba(80,22,36,0.03)] relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C06C78] mt-2 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-wider uppercase text-[#C06C78] font-semibold">
                Atelier Price Alert
              </span>
              <span className="text-[10px] text-[#8A7D80] font-sans">2h ago</span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] mt-0.5">
              <strong className="font-semibold">Totême Wool Wrap Coat</strong> is now 15% off in your size.
            </p>
            <button
              onClick={onOpenTryOn}
              className="inline-flex items-center gap-1 text-[#4B091B] font-sans text-[11px] font-semibold mt-1.5 hover:text-[#3B121B] transition-colors"
              type="button"
            >
              <span>View Item</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Alert 2: Occasion Approaching */}
        <div className="bg-[#F4ECE8]/70 rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex items-start gap-3 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4B091B] mt-2 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-wider uppercase text-[#4B091B] font-semibold">
                Occasion Approaching
              </span>
              <span className="text-[10px] text-[#8A7D80] font-sans">in 3 days</span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] mt-0.5">
              <strong className="font-semibold">Mayfair Gallery Opening</strong> · 1 piece unstyled from your planned look.
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <button
                onClick={onOpenStylist}
                className="text-[#4B091B] font-sans text-[11px] font-semibold hover:underline"
                type="button"
              >
                Complete Ensemble
              </button>
              <span className="text-[#8A7D80] text-xs">·</span>
              <span className="font-sans text-[11px] text-[#574C4E]">Stylist Advice Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Coming Up / Next Occasions */}
      <section className="space-y-3.5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Upcoming Occasions
            </h2>
            <p className="font-sans text-[12px] text-[#8A7D80]">
              Editorial wardrobe planning for scheduled events
            </p>
          </div>
          <button
            onClick={() => onShowToast('Calendar synched with Mayfair & Venice events')}
            className="font-sans text-[11px] text-[#4B091B] font-semibold hover:text-[#3B121B] uppercase tracking-wider"
            type="button"
          >
            Calendar
          </button>
        </div>

        {/* Horizontal Occasions Carousel */}
        <div className="-mx-5 px-5 flex gap-3.5 overflow-x-auto no-scrollbar pb-1">
          {OCCASIONS_DATA.map((occ) => (
            <div
              key={occ.id}
              className="w-[280px] flex-shrink-0 bg-white rounded-xl border border-[rgba(104,32,48,0.12)] overflow-hidden flex flex-col shadow-[0_8px_20px_rgba(80,22,36,0.04)]"
            >
              <div className="relative h-36 w-full bg-[#EADFD9] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={occ.image}
                  alt={occ.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#F4ECE8] block font-semibold">
                    {occ.dateStr} · {occ.relativeTime}
                  </span>
                  <span className="font-serif text-[15px] font-medium leading-tight block mt-0.5">
                    {occ.title}
                  </span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#574C4E] font-sans font-medium">
                      {occ.isReady ? 'Status' : 'Curation Progress'}
                    </span>
                    <span
                      className={`font-sans font-semibold text-[11px] flex items-center gap-1 ${
                        occ.isReady ? 'text-[#546255]' : 'text-[#4B091B]'
                      }`}
                    >
                      {occ.isReady && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#546255]" />
                      )}
                      {occ.statusLabel}
                    </span>
                  </div>
                  {/* Progress bar gauge */}
                  <div className="w-full h-1 bg-[#F4ECE8] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occ.isReady ? 'bg-[#546255]' : 'bg-[#4B091B]'
                      }`}
                      style={{ width: `${occ.progressPercent}%` }}
                    />
                  </div>
                  <p className="font-sans text-[11px] text-[#8A7D80]">{occ.details}</p>
                </div>

                <button
                  onClick={onOpenCalendar || onOpenTryOn}
                  className={`w-full py-2 px-3 rounded-full font-sans text-[11px] font-semibold text-center transition-all active:scale-95 uppercase tracking-wider ${
                    occ.isReady
                      ? 'bg-[#3B121B] text-white hover:bg-[#501624]'
                      : 'bg-[#F4ECE8] text-[#4B091B] hover:bg-[#4B091B] hover:text-white'
                  }`}
                  type="button"
                >
                  {occ.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. My Collections (2-Column Editorial Grid) */}
      <section className="space-y-3.5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[18px] text-[#1D1819] font-medium">
              My Collections
            </h2>
            <p className="font-sans text-[12px] text-[#8A7D80]">Thematic capsule archives</p>
          </div>
          <button
            onClick={() => onShowToast('Displaying all 6 curated collections')}
            className="font-sans text-[11px] text-[#4B091B] hover:text-[#3B121B] font-semibold uppercase tracking-wider"
            type="button"
          >
            View All ({INITIAL_COLLECTIONS.length})
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {INITIAL_COLLECTIONS.slice(0, 4).map((col) => (
            <div
              key={col.id}
              onClick={() => onOpenCollection(col)}
              className="group bg-white rounded-xl border border-[rgba(104,32,48,0.12)] overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-[0_6px_20px_rgba(80,22,36,0.06)] hover:border-[#4B091B]/30"
            >
              <div className="aspect-[4/5] w-full bg-[#EADFD9] overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={col.coverImage}
                  alt={col.name}
                />
                {col.tag && (
                  <span className="absolute top-2.5 right-2.5 bg-[#FAF8F5]/90 backdrop-blur-sm text-[#4B091B] px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wide">
                    {col.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-serif text-[14px] text-[#1D1819] font-medium leading-snug group-hover:text-[#4B091B] transition-colors">
                  {col.name}
                </h3>
                <p className="font-sans text-[11px] text-[#8A7D80] mt-0.5">
                  {col.itemCount} pieces · {col.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Recently Saved (Shoppable Product Grid) */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Recently Saved
            </h2>
            <p className="font-sans text-[12px] text-[#8A7D80]">Individual catalog discoveries</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onShowToast('Sorted by recently added')}
              className="h-8 px-2.5 rounded-full bg-white border border-[rgba(104,32,48,0.12)] text-[#574C4E] text-[11px] font-sans font-medium flex items-center gap-1 hover:text-[#4B091B]"
              type="button"
            >
              <span>Recent</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <button
              aria-label="Filter products"
              onClick={() => onShowToast('Filter catalog by price & brand')}
              className="h-8 w-8 rounded-full bg-white border border-[rgba(104,32,48,0.12)] text-[#574C4E] flex items-center justify-center hover:text-[#4B091B]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-[rgba(104,32,48,0.12)] p-2.5 flex flex-col justify-between shadow-[0_2px_10px_rgba(80,22,36,0.02)]"
            >
              <div>
                <div className="aspect-[3/4] w-full bg-[#F6F3F0] rounded-lg overflow-hidden relative p-2 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={prod.image}
                    alt={prod.name}
                  />
                  <button
                    aria-label="Bookmark saved"
                    onClick={() => handleToggleBookmark(prod.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#FAF8F5]/85 backdrop-blur-md flex items-center justify-center text-[#4B091B] active:scale-90 transition-transform shadow-xs"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={prod.isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark
                    </span>
                  </button>
                  {prod.tag && (
                    <span
                      className={`absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-sans tracking-wide font-medium ${
                        prod.tag === 'Price Tracked'
                          ? 'bg-[#3B121B]/90 text-white'
                          : 'bg-[#E5EBE5] text-[#546255]'
                      }`}
                    >
                      {prod.tag}
                    </span>
                  )}
                </div>

                <div className="mt-2.5">
                  <span className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider font-semibold block">
                    {prod.brand}
                  </span>
                  <h4 className="font-sans text-[13px] text-[#1D1819] font-medium truncate mt-0.5">
                    {prod.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-sans text-[13px] text-[#4B091B] font-bold">
                      ${prod.price}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-[#8A7D80] line-through font-sans">
                        ${prod.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-[rgba(104,32,48,0.12)]/60 flex items-center justify-between">
                <button
                  onClick={onOpenTryOn}
                  className="text-[11px] font-sans font-semibold text-[#4B091B] hover:underline"
                  type="button"
                >
                  Try-On in Atelier
                </button>
                <span className="text-[#8A7D80] hover:text-[#1D1819]">
                  <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Fashion Shows & Inspiration */}
      <section className="space-y-3.5 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Runway & Inspiration
            </h2>
            <p className="font-sans text-[12px] text-[#8A7D80]">
              Saved show looks and aesthetic moodboards
            </p>
          </div>
          <button
            onClick={() => onShowToast('Opening autumn haute couture trends')}
            className="font-sans text-[11px] text-[#4B091B] font-semibold hover:text-[#3B121B] uppercase tracking-wider"
            type="button"
          >
            Explore Trends
          </button>
        </div>

        <div className="space-y-3">
          {RUNWAY_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl border border-[rgba(104,32,48,0.12)] overflow-hidden p-3 flex gap-3.5 items-center shadow-xs"
            >
              <div className="w-20 h-24 rounded-lg bg-[#EADFD9] overflow-hidden flex-shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  src={story.image}
                  alt={story.title}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-24 py-0.5">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#C06C78] font-semibold">
                    {story.house} · {story.season}
                  </span>
                  <h4 className="font-serif text-[14px] text-[#1D1819] font-medium mt-0.5 leading-snug">
                    {story.title}
                  </h4>
                  <p className="font-sans text-[11px] text-[#8A7D80] line-clamp-1 mt-0.5">
                    {story.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenTryOn}
                    className="px-2.5 py-1 rounded-full bg-[#F4ECE8] text-[#4B091B] text-[11px] font-sans font-semibold hover:bg-[#4B091B] hover:text-white transition-colors"
                    type="button"
                  >
                    {story.actionLabel}
                  </button>
                  {story.secondaryAction && (
                    <button
                      onClick={onOpenStylist}
                      className="text-[11px] font-sans text-[#574C4E] hover:underline"
                      type="button"
                    >
                      {story.secondaryAction}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
