import React, { useState } from 'react';

interface SaveToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

interface CollectionRowData {
  id: string;
  name: string;
  count: number;
  subtitle: string;
  isSaved: boolean;
  image: string;
}

export const SaveToCollectionModal: React.FC<SaveToCollectionModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [autoSaveCurrent, setAutoSaveCurrent] = useState(true);

  const [suggestedCollections, setSuggestedCollections] = useState<CollectionRowData[]>([
    {
      id: 's1',
      name: 'Everyday Essentials',
      count: 24,
      subtitle: 'Autumn Edit',
      isSaved: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jRqXcsouO2EAHvtEC9PstWWJEt8-D0YVULjRbfggdpGpfOmk1ykTTaOIsC23ZweLmC56g10l5qAfz2M-DIVL5juivYt152yYd__UdQHfP2pH0PD6EdZdoWOC_6kQtUtGNK9gqcUSczmw0eMTWdULXX9Zc1JKfpduG7DVt4sicFUm3gFEnOKkrgHuBwGSbP8XqcptdX9Gd4TYr0-8MT0OiEVntrfXoKCtWq8SMu6ivl_ksdCSYp0Mmw'
    },
    {
      id: 's2',
      name: 'Date Night',
      count: 9,
      subtitle: 'Silk & Tailoring',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN0KnXF4LHP-pMMGAPHcZboPvpE2mnxvBVmPU47V0QE01ilutqX9u-Ca46SnkvLQ2e7RkT1zIEiDzdv1Xf4Z_d-bArho4TaPZS7HCXJP0YoA5Vb1WBYUYH3Rn3hWg_f_C39F7VZJcEFM3_ZZ2mNxE9qfg0CFN5d4Z-Pw3apwH-3AAw97bN5L4XJwQ9CDdTxIt4I3RPHfJ6KGIQ3cWVnLoR2RW--rx506JHAC8EZSSv5QIx99li89rnWw'
    },
    {
      id: 's3',
      name: 'Wedding Guest Looks',
      count: 14,
      subtitle: 'Venice Occasion',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCezvNrE5KnLNPECz-OpiHy9seIgGp9nPsbMuV03o9wKL5pKgpEuQZ71b1VK7oPmglHHU9gWtpkNZ-yfvRhxQyphWeoA9sdf-L4GWUgn0U4kVqhZOc0EVOocfpsnhu8MWddSrx_5KmpMMzk2vvU9zRi5BwiIBJb0O4mTI45kSTHntraX3E154Q2Rw_JjDP_NArB460LigjXppAXIuuVoVirbLGj8zNeDVOVx3_bzFM_zT20iDTldohkTA'
    }
  ]);

  const [allCollections, setAllCollections] = useState<CollectionRowData[]>([
    {
      id: 'a1',
      name: 'Capsule Wardrobe',
      count: 18,
      subtitle: 'Neutral Atelier',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jRqXcsouO2EAHvtEC9PstWWJEt8-D0YVULjRbfggdpGpfOmk1ykTTaOIsC23ZweLmC56g10l5qAfz2M-DIVL5juivYt152yYd__UdQHfP2pH0PD6EdZdoWOC_6kQtUtGNK9gqcUSczmw0eMTWdULXX9Zc1JKfpduG7DVt4sicFUm3gFEnOKkrgHuBwGSbP8XqcptdX9Gd4TYr0-8MT0OiEVntrfXoKCtWq8SMu6ivl_ksdCSYp0Mmw'
    },
    {
      id: 'a2',
      name: 'Runway Inspiration',
      count: 31,
      subtitle: 'Paris & Milan AW26',
      isSaved: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqUvvMM_GDTCo-aLD_vBxp8VwDMc9qe1q5NmOkSEO1gXzG3t6gw41kcOmX3oVlnr32HGiCvNwfJCmdf7fwfGSrCYHxwNBBxzkK1A0T08RAYIU7OHHzwmitcf1LCJ5wOF_iqdLPYz8U_4UTN9qcoLaW2pTEI-xykgW6szkX5diifmnjQdGhsI2Fyy-xXr7ghSmoh-FwqCZtNqzik5ckL6ogCkMldfBVscUtkQ-L5GV8POIvzHcbgY5vCw'
    },
    {
      id: 'a3',
      name: 'Street Style',
      count: 12,
      subtitle: 'Oversized & Loafers',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoXLBm0uD_fo97eUZS7Q0WJCgnt_G2ERbVzOADEKx9WtTO29fJUX1H3LDURwyAAEK72fQNf4ETbefvimoa9e75zoi1eEWNLYmf-Wg_ZpnbDArkhFU4Q_ZWBrAdXvEE5JN4WwG72kzaXOSVXKfY5LW5bc4JDiLNP8n0APZZ0Bbxn1KChllGor7rAGzibsqgSiLedlLt3ETgWT2_D3XXilpm-MEnscN-usSkCJ1kj2O6-Ehb4_ejJHbNQ'
    },
    {
      id: 'a4',
      name: 'Wishlist',
      count: 7,
      subtitle: 'Under $300 cap',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoNXtnpjbbsrUx13DGJom-E3Q1oEFWwR4zELm9g7kyNIXZSWV4K5rCL-R-6R7TOcnTtNQssV8z08toBKCY1TD7oGz5QLxRNPI-02kouf15uUJOArxVr0GE0MTIumQEWwHnY6dCRpxUurKk9Zpby7rG08cyB3w4_ab4Vn8cayHY9BZDS12SKuXtP9VuS7n8g0wJSLcFqOcbad_MMSZEsVpcHW5u515eN_uBc6bwt29EZXMp_lqRVjfcWA'
    },
    {
      id: 'a5',
      name: 'Office Outfits',
      count: 15,
      subtitle: 'Power Tailoring',
      isSaved: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtwlvjDV8qKnqHHnrI-eJQBujcb-2FvoCWJ_XLdm9DVNpRzvEbvZ8q8c2aAE682816d4I6c06-t0srXx65Jatzug0EsKfe9Qy66pZBtiPVOngvUbAf4zGLlCpPe3Y8GwEmMHXPTfqa8RtOL_tL0-cukB0X1F5pKeNMLdshFxGteo4eagvNJ6cIeZEcBUsd7-7It4LypF37t2VaXIzYxJdlIGZZEQSVfaepTyl3aSeUHpNkNmLlfNo8w'
    }
  ]);

  if (!isOpen) return null;

  const toggleItemSave = (collectionId: string, name: string) => {
    // Check in suggested
    let toggledState = false;
    setSuggestedCollections(prev =>
      prev.map(item => {
        if (item.id === collectionId) {
          toggledState = !item.isSaved;
          return { ...item, isSaved: toggledState, count: toggledState ? item.count + 1 : Math.max(0, item.count - 1) };
        }
        return item;
      })
    );
    // Check in all
    setAllCollections(prev =>
      prev.map(item => {
        if (item.id === collectionId) {
          toggledState = !item.isSaved;
          return { ...item, isSaved: toggledState, count: toggledState ? item.count + 1 : Math.max(0, item.count - 1) };
        }
        return item;
      })
    );

    onShowToast(toggledState ? `Saved to ${name}` : `Removed from ${name}`);
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim() || 'Custom Capsule';
    const desc = newDesc.trim() || 'New aesthetic edit';

    const newCollection: CollectionRowData = {
      id: 'custom-' + Date.now(),
      name,
      count: autoSaveCurrent ? 1 : 0,
      subtitle: desc,
      isSaved: autoSaveCurrent,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jRqXcsouO2EAHvtEC9PstWWJEt8-D0YVULjRbfggdpGpfOmk1ykTTaOIsC23ZweLmC56g10l5qAfz2M-DIVL5juivYt152yYd__UdQHfP2pH0PD6EdZdoWOC_6kQtUtGNK9gqcUSczmw0eMTWdULXX9Zc1JKfpduG7DVt4sicFUm3gFEnOKkrgHuBwGSbP8XqcptdX9Gd4TYr0-8MT0OiEVntrfXoKCtWq8SMu6ivl_ksdCSYp0Mmw'
    };

    setAllCollections(prev => [newCollection, ...prev]);
    setIsCreating(false);
    setNewName('');
    setNewDesc('');
    onShowToast(autoSaveCurrent ? `Created & saved to "${name}"` : `Created collection "${name}"`);
  };

  const matchesSearch = (item: CollectionRowData) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return item.name.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  };

  const filteredSuggested = suggestedCollections.filter(matchesSearch);
  const filteredAll = allCollections.filter(matchesSearch);
  const totalMatches = filteredSuggested.length + filteredAll.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#161413]/65 backdrop-blur-[6px] flex items-center justify-center p-4">
      {/* Popover container (max 364px wide, ~510px high) */}
      <div className="relative w-full max-w-[364px] bg-[#FAF8F5] rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden flex flex-col max-h-[520px] h-[504px] animate-fadeIn">
        {/* 1. Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#EAE5DC]/80 bg-[#FAF8F5]/95 shrink-0">
          <div className="w-7" />
          <div className="text-center">
            <h2 className="font-serif text-[17px] text-[#1A1817] tracking-wide font-normal">
              Save to Collection
            </h2>
            <p className="font-sans text-[11px] text-[#9A948D] tracking-tight -mt-0.5">
              Curate your personal Rymae archive
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-[#9A948D] hover:text-[#1A1817] hover:bg-[#F7F4EE] transition-colors"
            title="Close"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </header>

        {/* 2. Search Input */}
        <div className="px-4 pt-3 pb-2 shrink-0 bg-[#FAF8F5]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#9A948D] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your collections..."
              className="w-full pl-9 pr-8 py-2 text-xs text-[#1A1817] bg-white border border-[#EAE5DC] rounded-xl placeholder:text-[#9A948D]/80 focus:outline-none focus:border-[#4A1521] focus:ring-1 focus:ring-[#4A1521]/20 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[#9A948D] hover:text-[#1A1817]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3.5 py-1.5 custom-scroll divide-y divide-[#EAE5DC]/50">
          {totalMatches === 0 && searchQuery ? (
            <div className="py-8 px-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F5EBEF] text-[#4A1521] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
              </div>
              <p className="text-xs font-semibold text-[#1A1817]">No collections found</p>
              <p className="text-[11px] text-[#9A948D] mt-0.5 mb-3">
                Create one with this name below to save instantly.
              </p>
              <button
                onClick={() => {
                  setNewName(searchQuery);
                  setIsCreating(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAE5DC] text-xs text-[#4A1521] font-semibold hover:bg-[#F5EBEF] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Create "{searchQuery}"</span>
              </button>
            </div>
          ) : (
            <>
              {/* Suggested */}
              {filteredSuggested.length > 0 && (
                <section className="pb-3 pt-1">
                  <div className="flex items-center justify-between px-2 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A948D] font-sans">
                      Suggested Collections
                    </span>
                    <span className="text-[10px] text-[#C5A880] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[11px]">auto_awesome</span> Smart match
                    </span>
                  </div>
                  <div className="space-y-1">
                    {filteredSuggested.map((row) => (
                      <div
                        key={row.id}
                        onClick={() => toggleItemSave(row.id, row.name)}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#EAE5DC]/70 transition-all cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#EAE5DC] bg-[#F7F4EE]">
                            <img
                              src={row.image}
                              alt={row.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#1A1817] truncate">{row.name}</p>
                            <p className="text-[10px] text-[#9A948D]">{row.count} pieces · {row.subtitle}</p>
                          </div>
                        </div>

                        <button
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 ${
                            row.isSaved
                              ? 'bg-[#4A1521] text-white shadow-xs'
                              : 'bg-white border border-[#EAE5DC] text-[#635F5B] group-hover:border-[#4A1521] group-hover:text-[#4A1521]'
                          }`}
                          type="button"
                        >
                          {row.isSaved && (
                            <span className="material-symbols-outlined text-[13px]">check</span>
                          )}
                          <span>{row.isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* All Collections */}
              {filteredAll.length > 0 && (
                <section className="pt-3 pb-2">
                  <div className="flex items-center justify-between px-2 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A948D] font-sans">
                      All Collections
                    </span>
                    <span className="text-[10px] text-[#9A948D]">{allCollections.length} total</span>
                  </div>
                  <div className="space-y-1">
                    {filteredAll.map((row) => (
                      <div
                        key={row.id}
                        onClick={() => toggleItemSave(row.id, row.name)}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#EAE5DC]/70 transition-all cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#EAE5DC] bg-[#F7F4EE]">
                            <img
                              src={row.image}
                              alt={row.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#1A1817] truncate">{row.name}</p>
                            <p className="text-[10px] text-[#9A948D]">{row.count} pieces · {row.subtitle}</p>
                          </div>
                        </div>

                        <button
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 ${
                            row.isSaved
                              ? 'bg-[#4A1521] text-white shadow-xs'
                              : 'bg-white border border-[#EAE5DC] text-[#635F5B] group-hover:border-[#4A1521] group-hover:text-[#4A1521]'
                          }`}
                          type="button"
                        >
                          {row.isSaved && (
                            <span className="material-symbols-outlined text-[13px]">check</span>
                          )}
                          <span>{row.isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* 4. Footer & Create Collection Panel */}
        <footer className="border-t border-[#EAE5DC] bg-white/95 shrink-0">
          {!isCreating ? (
            <div className="p-3">
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#1A1817] hover:bg-[#F7F4EE] border border-dashed border-[#EAE5DC] hover:border-[#4A1521]/40 transition-all group"
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#F5EBEF] text-[#4A1521] flex items-center justify-center group-hover:bg-[#4A1521] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </div>
                  <span className="text-xs font-medium tracking-wide">Create new collection</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#4A1521] opacity-80 group-hover:opacity-100">
                  New
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateCollection} className="p-3.5 bg-[#FAF8F5] space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-serif text-[#1A1817] font-semibold tracking-wide">
                  New Capsule Collection
                </h4>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-[#9A948D] hover:text-[#1A1817] p-0.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-[#9A948D] font-semibold mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Milan Fall Lookbook"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#EAE5DC] rounded-lg text-[#1A1817] focus:outline-none focus:border-[#4A1521]"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-[#9A948D] font-semibold mb-1">
                  Theme / Note <span className="lowercase text-[#9A948D]/70 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. Tailored wool & leather pairings"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#EAE5DC] rounded-lg text-[#1A1817] focus:outline-none focus:border-[#4A1521]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-[11px] text-[#635F5B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSaveCurrent}
                    onChange={(e) => setAutoSaveCurrent(e.target.checked)}
                    className="rounded border-[#EAE5DC] text-[#4A1521] focus:ring-[#4A1521] w-3.5 h-3.5"
                  />
                  <span>Save item to this collection</span>
                </label>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#4A1521] hover:bg-[#380F18] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  Create & Save
                </button>
              </div>
            </form>
          )}
        </footer>
      </div>
    </div>
  );
};
