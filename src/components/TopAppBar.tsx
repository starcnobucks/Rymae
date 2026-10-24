import React from 'react';

interface TopAppBarProps {
  activeTab: 'today' | 'discover' | 'wardrobe' | 'saved' | 'profile';
  onOpenStylist: () => void;
  onOpenAdd?: () => void;
  onOpenSearch?: () => void;
  onOpenMenu?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeTab,
  onOpenStylist,
  onOpenAdd,
  onOpenSearch,
  onOpenMenu
}) => {
  const getSubHeader = () => {
    switch (activeTab) {
      case 'today':
        return null;
      case 'discover':
        return null;
      case 'wardrobe':
        return null;
      case 'saved':
        return 'Paris · London';
      case 'profile':
        return "L'Atelier Profil";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E3DC] transition-all duration-150">
      <div className="flex justify-between items-center w-full px-5 py-3 max-w-[430px] mx-auto">
        {/* Leading Action: Menu or Brand Monogram */}
        <button
          aria-label="Atelier Menu"
          onClick={onOpenMenu}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A1521] hover:bg-[#F4ECE8] transition-colors active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* Brand Wordmark Centered */}
        <div className="text-center flex flex-col items-center">
          <span
            className="text-[19px] tracking-[0.24em] font-brand uppercase text-[#3B121B] font-medium leading-tight select-none"
            style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
          >
            RYMAE
          </span>
          {getSubHeader() && (
            <span className="font-sans text-[9px] tracking-[0.16em] text-[#8A7D80] uppercase -mt-0.5 block">
              {getSubHeader()}
            </span>
          )}
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center gap-1">
          {activeTab === 'saved' ? (
            <>
              <button
                aria-label="Search Saved"
                onClick={onOpenSearch}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#1D1819] hover:text-[#4A1521] hover:bg-[#F4ECE8] transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
              <button
                aria-label="Create New Collection"
                onClick={onOpenAdd}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F4ECE8] text-[#4A1521] hover:bg-[#4A1521] hover:text-white transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </>
          ) : (
            <button
              aria-label="AI Styling Assistant"
              onClick={onOpenStylist}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A1521] hover:bg-[#F4ECE8] transition-all active:scale-95"
              type="button"
              title="Open AI Styling Assistant"
            >
              <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
