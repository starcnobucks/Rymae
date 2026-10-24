import React from 'react';
import { WardrobeItem } from '../utils/wardrobeLogic';

interface ItemDetailModalProps {
  item: WardrobeItem | null;
  onClose: () => void;
  onTryOn: () => void;
  onSaveToCollection: () => void;
  onShowToast: (msg: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onTryOn,
  onSaveToCollection,
  onShowToast
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-[#E8E3DC] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fadeIn">
        {/* Image viewport */}
        <div className="relative w-full aspect-[4/5] bg-[#F5F2EC] flex items-center justify-center overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#141212] hover:bg-white shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          {item.tag && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#3B121B]/90 text-white font-sans text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
              {item.tag}
            </span>
          )}
        </div>

        {/* Details Content */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scroll flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                {item.brand}
              </span>
              <h3 className="font-serif text-[20px] text-[#141212] font-medium leading-snug mt-0.5">
                {item.name}
              </h3>
            </div>
            {item.price && (
              <span className="font-sans text-[18px] text-[#4A1521] font-bold">
                ${item.price}
              </span>
            )}
          </div>

          {/* Garment Provenance & Fabric Notes */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E3DC] space-y-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C5A880]" />
            <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block">
              Atelier Provenance & Fabric Specifications
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#141212]">
              <div>
                <span className="text-[#9C948D] block text-[10px]">Composition:</span>
                <span className="font-medium">{item.material}</span>
              </div>
              <div>
                <span className="text-[#9C948D] block text-[10px]">Wear Frequency:</span>
                <span className="font-medium">{item.wornCount ? `${item.wornCount} times archived` : 'Newly catalogued'}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onSaveToCollection();
              }}
              className="py-3 px-4 rounded-full border border-[#E8E3DC] text-[#141212] font-sans text-xs uppercase tracking-wider font-semibold hover:border-[#4A1521] flex items-center justify-center gap-1.5 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">bookmark_border</span>
              <span>Save to Collection</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onTryOn();
              }}
              className="py-3 px-4 rounded-full bg-[#4A1521] text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#3B121B] flex items-center justify-center gap-1.5 shadow-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#C5A880]">auto_fix_high</span>
              <span>Try-On in Atelier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
