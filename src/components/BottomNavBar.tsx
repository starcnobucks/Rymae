import React from 'react';

export type TabType = 'today' | 'discover' | 'wardrobe' | 'saved' | 'profile';

interface BottomNavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'today', label: 'Today', icon: 'calendar_today' },
    { id: 'discover', label: 'Discover', icon: 'explore' },
    { id: 'wardrobe', label: 'Wardrobe', icon: 'checkroom' },
    { id: 'saved', label: 'Saved', icon: 'bookmark_border' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8E3DC] shadow-[0_-4px_20px_rgba(80,22,36,0.04)]"
    >
      <div className="max-w-[430px] mx-auto flex justify-around items-center px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#3B121B] font-semibold'
                  : 'text-[#8A7D80] hover:text-[#4A1521]'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider mt-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#3B121B] mt-0.5 block" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
