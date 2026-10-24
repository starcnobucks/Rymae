/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { TodayTab } from './components/TodayTab';
import { DiscoverTab } from './components/DiscoverTab';
import { WardrobeTab } from './components/WardrobeTab';
import { SavedTab } from './components/SavedTab';
import { ProfileTab } from './components/ProfileTab';
import { TryOnAtelierModal } from './components/TryOnAtelierModal';
import { StylistChatDrawer } from './components/StylistChatDrawer';
import { SaveToCollectionModal } from './components/SaveToCollectionModal';
import { AuthScreen } from './components/AuthScreen';
import { AddItemModal } from './components/AddItemModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { EventPlannerModal } from './components/EventPlannerModal';
import { INITIAL_WARDROBE_ITEMS, INITIAL_COLLECTIONS } from './data/mockData';
import { WardrobeItem, CollectionItem, UserEvent } from './utils/wardrobeLogic';
import { getStoredEvents } from './services/contextService';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(INITIAL_WARDROBE_ITEMS);
  const [events, setEvents] = useState<UserEvent[]>(() => getStoredEvents());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<WardrobeItem | null>(null);

  // Check URL query parameters (e.g. ?auth=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === '1') {
      setIsAuthOpen(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleBookmark = (id: string) => {
    setWardrobeItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const next = !item.isBookmarked;
          showToast(next ? `Bookmarked ${item.name}` : `Removed bookmark for ${item.name}`);
          return { ...item, isBookmarked: next };
        }
        return item;
      })
    );
  };

  const handleAddItem = (newItem: WardrobeItem) => {
    setWardrobeItems(prev => [newItem, ...prev]);
  };

  const handleOpenCollection = (col: CollectionItem) => {
    showToast(`Viewing collection: ${col.name} (${col.itemCount} pieces)`);
  };

  return (
    <div className="min-h-screen bg-[#2D2A29] flex justify-center selection:bg-[#4A1521] selection:text-white">
      {/* Toast Notification Banner */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="bg-[#3B121B] text-[#FAF8F5] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-[#C5A880]/40 max-w-sm">
          <span className="material-symbols-outlined text-[17px] text-[#C5A880]">check_circle</span>
          <span className="font-sans text-[11px] font-semibold tracking-wide truncate">
            {toastMessage}
          </span>
        </div>
      </div>

      {/* Main Luxury Mobile Viewport (430px centered frame) */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAF8F5] relative shadow-[0_0_60px_rgba(0,0,0,0.4)] flex flex-col">
        {/* Top App Bar */}
        <TopAppBar
          activeTab={activeTab}
          onOpenStylist={() => setIsStylistOpen(true)}
          onOpenAdd={() => setIsSaveModalOpen(true)}
          onOpenSearch={() => {
            if (activeTab !== 'discover') setActiveTab('discover');
            showToast('Search active in Discover catalogue');
          }}
          onOpenMenu={() => setIsAuthOpen(true)}
        />

        {/* Tab View Canvas */}
        <main className="flex-1">
          {activeTab === 'today' && (
            <TodayTab
              onOpenStylist={() => setIsStylistOpen(true)}
              onOpenTryOn={() => setIsTryOnOpen(true)}
              onSaveLook={() => setIsSaveModalOpen(true)}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              events={events}
              onEventsChange={setEvents}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverTab
              onOpenTryOn={() => setIsTryOnOpen(true)}
              onSelectItem={(rec) => {
                const item: WardrobeItem = {
                  id: rec.id,
                  name: rec.title,
                  brand: rec.brand,
                  category: 'Dresses',
                  material: rec.whyRecommended,
                  wornCount: 0,
                  image: rec.image,
                  isBookmarked: rec.isBookmarked,
                  price: rec.price,
                  originalPrice: rec.originalPrice
                };
                setSelectedItemDetail(item);
              }}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'wardrobe' && (
            <WardrobeTab
              items={wardrobeItems}
              onOpenAddItem={() => setIsAddItemOpen(true)}
              onOpenTryOn={() => setIsTryOnOpen(true)}
              onSelectItem={(item) => setSelectedItemDetail(item)}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'saved' && (
            <SavedTab
              onOpenCollection={handleOpenCollection}
              onOpenTryOn={() => setIsTryOnOpen(true)}
              onOpenStylist={() => setIsStylistOpen(true)}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              wardrobeItems={wardrobeItems}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenStylist={() => setIsStylistOpen(true)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Modals & Drawers */}
        <TryOnAtelierModal
          isOpen={isTryOnOpen}
          onClose={() => setIsTryOnOpen(false)}
          onOpenSave={() => setIsSaveModalOpen(true)}
          onShowToast={showToast}
        />

        <StylistChatDrawer
          isOpen={isStylistOpen}
          onClose={() => setIsStylistOpen(false)}
          onShowToast={showToast}
        />

        <EventPlannerModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          events={events}
          onEventsChange={setEvents}
          onOpenAtelierWithLook={() => {
            setIsCalendarOpen(false);
            setIsTryOnOpen(true);
          }}
          onShowToast={showToast}
        />

        <SaveToCollectionModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onShowToast={showToast}
        />

        <AuthScreen
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(email) => {
            setIsAuthOpen(false);
            showToast(`Authenticated as ${email}`);
          }}
          onShowToast={showToast}
        />

        <AddItemModal
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          onAddItem={handleAddItem}
          onShowToast={showToast}
        />

        <ItemDetailModal
          item={selectedItemDetail}
          onClose={() => setSelectedItemDetail(null)}
          onTryOn={() => {
            setSelectedItemDetail(null);
            setIsTryOnOpen(true);
          }}
          onSaveToCollection={() => {
            setSelectedItemDetail(null);
            setIsSaveModalOpen(true);
          }}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
