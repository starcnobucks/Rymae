import React, { useState } from 'react';
import { WardrobeItem } from '../utils/wardrobeLogic';

interface WardrobeTabProps {
  items: WardrobeItem[];
  onOpenAddItem: () => void;
  onOpenTryOn: () => void;
  onSelectItem: (item: WardrobeItem) => void;
  onToggleBookmark: (id: string) => void;
}

export const WardrobeTab: React.FC<WardrobeTabProps> = ({
  items,
  onOpenAddItem,
  onOpenTryOn,
  onSelectItem,
  onToggleBookmark
}) => {
  const [activeCategory, setActiveCategory] = useState('All (64)');

  const categoryChips = [
    { label: 'All (64)', filter: 'All' },
    { label: 'Tops (18)', filter: 'Tops' },
    { label: 'Bottoms (14)', filter: 'Bottoms' },
    { label: 'Dresses (8)', filter: 'Dresses' },
    { label: 'Outerwear (9)', filter: 'Outerwear' },
    { label: 'Shoes (10)', filter: 'Shoes' },
    { label: 'Bags (5)', filter: 'Bags' }
  ];

  const filteredItems = items.filter(item => {
    if (activeCategory === 'All (64)' || activeCategory === 'All') return true;
    const cat = categoryChips.find(c => c.label === activeCategory)?.filter;
    return item.category === cat;
  });

  return (
    <div className="max-w-[430px] mx-auto px-5 pt-4 pb-32 space-y-5">
      {/* 1. Header & Wardrobe Counter */}
      <section className="pt-2">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="font-sans text-[11px] text-[#C5A880] uppercase tracking-[0.12em] block mb-1 font-semibold">
              Couture Archive
            </span>
            <h1 className="font-serif text-[26px] text-[#141212] font-normal tracking-tight">
              My Wardrobe
            </h1>
            <p className="font-sans text-[12px] text-[#8A7D80] mt-0.5">
              {items.length} Items Catalogued
            </p>
          </div>
          <button
            onClick={onOpenAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[#FAF8F5] active:scale-95 transition-all shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgb(74, 21, 33), rgb(59, 18, 27))',
              border: '1px solid rgba(197, 168, 128, 0.4)',
              boxShadow: '0 4px 14px rgba(59, 18, 27, 0.25)'
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="font-sans text-[12px] tracking-normal font-semibold">+ Add Item</span>
          </button>
        </div>
      </section>

      {/* 2. Scrollable Category Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar -mx-5 px-5 flex items-center gap-2 py-1">
        {categoryChips.map((chip) => {
          const isActive = activeCategory === chip.label;
          return (
            <button
              key={chip.label}
              onClick={() => setActiveCategory(chip.label)}
              className={`shrink-0 h-9 px-4 rounded-full font-sans text-[12px] font-medium tracking-wide transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#3B121B] text-[#FAF8F5] border border-[#C5A880]/50 shadow-sm'
                  : 'bg-[#F5F3F0] text-[#574C4E] border border-[#E8E3DC] hover:text-[#4A1521]'
              }`}
              type="button"
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* 3. Quick Action Banner: Outfit Builder */}
      <section>
        <div
          onClick={onOpenTryOn}
          className="relative overflow-hidden rounded-xl bg-white p-4 border border-[#E8E3DC] shadow-[0_4px_16px_rgba(80,22,36,0.03)] flex items-center justify-between gap-3 cursor-pointer group hover:border-[#4A1521]/30 transition-all"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#3B121B] shrink-0 mt-0.5 border border-[#C5A880]/30">
              <span className="material-symbols-outlined text-[20px]">style</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-serif text-[16px] text-[#1D1819] font-medium">Outfit Builder</h2>
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-sans bg-[#C5A880]/15 text-[#4A1521] font-bold tracking-wider border border-[#C5A880]/35">
                  AI ATELIER
                </span>
              </div>
              <p className="font-sans text-[12px] text-[#574C4E] mt-1 leading-snug">
                Mix & match your closet or pair with missing essentials.
              </p>
            </div>
          </div>
          <button
            aria-label="Open Outfit Builder"
            className="w-8 h-8 rounded-full bg-[#F4ECE8] flex items-center justify-center text-[#4A1521] shrink-0 active:scale-95 transition-transform group-hover:bg-[#4A1521] group-hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* 4. Wardrobe Grid Section (2-Column Editorial Spread) */}
      <section className="pt-1">
        <div className="grid grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group relative bg-white rounded-xl p-2.5 border border-[#E8E3DC] shadow-[0_2px_10px_rgba(80,22,36,0.03)] flex flex-col justify-between cursor-pointer hover:border-[#4A1521]/30 transition-all"
            >
              <div>
                {/* Image Frame */}
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#F4ECE8]/50 mb-2.5 flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-center pointer-events-auto">
                    {item.tag ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider backdrop-blur-xs"
                        style={{
                          background: item.tag.includes('Capsule')
                            ? 'rgba(74, 21, 33, 0.92)'
                            : 'rgb(243, 237, 228)',
                          color: item.tag.includes('Capsule')
                            ? 'rgb(243, 237, 228)'
                            : 'rgb(74, 21, 33)',
                          border: '1px solid rgba(197, 168, 128, 0.4)'
                        }}
                      >
                        {item.tag}
                      </span>
                    ) : <span />}

                    <button
                      aria-label="Favorite item"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item.id);
                      }}
                      className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs text-[#4A1521] flex items-center justify-center hover:bg-white active:scale-90 transition-transform shadow-xs"
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={item.isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#8A7D80]">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#C06C78] font-semibold">
                      {item.category}
                    </span>
                    <span className="font-sans text-[11px] text-[#574C4E]">
                      Worn {item.wornCount}x
                    </span>
                  </div>
                  <h3 className="font-serif text-[14px] leading-snug text-[#1D1819] font-medium line-clamp-2">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between mt-1 border-t border-[#E8E3DC]/60">
                <span className="font-sans text-[11px] text-[#8A7D80] italic">
                  {item.material}
                </span>
                <span className="text-[#8A7D80] hover:text-[#1D1819] p-0.5">
                  <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Floating Action Button: Quick 'Mix an Outfit' */}
      <div className="fixed bottom-20 left-0 right-0 z-30 flex justify-center pointer-events-none max-w-[430px] mx-auto px-4">
        <button
          onClick={onOpenTryOn}
          className="pointer-events-auto flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white active:scale-95 transition-all duration-150 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgb(74, 21, 33), rgb(59, 18, 27))',
            border: '1px solid rgb(197, 168, 128)',
            boxShadow: '0 12px 32px -4px rgba(59, 18, 27, 0.4), 0 4px 12px -2px rgba(20, 18, 18, 0.3)'
          }}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] text-[#C5A880]">auto_awesome</span>
          <span className="font-sans text-[13px] font-semibold tracking-wider uppercase text-white">
            Mix an Outfit
          </span>
        </button>
      </div>
    </div>
  );
};
