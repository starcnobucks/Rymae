import React, { useState } from 'react';
import { WardrobeItem } from '../utils/wardrobeLogic';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: WardrobeItem) => void;
  onShowToast: (msg: string) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
  onShowToast
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Totême');
  const [category, setCategory] = useState<'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Bags'>('Outerwear');
  const [material, setMaterial] = useState('100% Cashmere');
  const [price, setPrice] = useState(450);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: WardrobeItem = {
      id: 'w-' + Date.now(),
      name: name.trim() || 'New Atelier Acquisition',
      brand: brand.trim() || 'Couture Studio',
      category,
      material: material.trim() || 'Bespoke Blend',
      wornCount: 1,
      isBookmarked: false,
      price: Number(price) || 300,
      image: category === 'Outerwear'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg'
        : category === 'Shoes'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaBi4AZLrEhtaZ5c1lrnX2BpDQG4NFSWUqWuCQmfi9RsXyIJgxkrLkGcH26XghZOVFPB6HXXbubrQ5kzNeSDmdZAsAoGGladRKr0sUOyDrtUZxpqRJ74CvYNfJIrLFfjie7cNG59h7ts-fRlV00ZXd3yA2UsBYFh1a7BXvUXSMIvdo8tgMrD3tBwJM_bXZPVhjb7p--lUswLsqyEBcLQTZWGwqL_ej2FeBdk7RaRZ7LPIIH1BgiCAkCQ'
        : category === 'Bags'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzLX1JMD3F_pwlHQr7SWty0N6Aaiu3VlOORKAVDrXMCbnWjSAx0L67UxMWRIIjiNogtEFvfYeXoxYebp0PLkNld2LRBIU7DnB6zBeQiINcw_qOxKXtGfPQjZj43UteWGagoNsZ0chNS3OSh4s0oPXWX21puGol5GJpe4F5JmRry5rLQJGvVdLHI-_JyGvYJFQ2A73eszGYbkcrGDid1Yl9L-chLM61qRcmeHUch1_rQBDoiWnAOZ5-Q'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g'
    };

    onAddItem(newItem);
    onShowToast(`Catalogued "${newItem.name}" into archive`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-[#E8E3DC] shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E3DC]">
          <div>
            <h3 className="font-serif text-[18px] text-[#141212] font-semibold">
              Catalogue New Garment
            </h3>
            <p className="font-sans text-[11px] text-[#706963]">
              Add pieces to Camille's digital wardrobe archive
            </p>
          </div>
          <button onClick={onClose} className="text-[#9C948D] hover:text-[#141212]" type="button">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#706963] font-semibold mb-1">
              Garment Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Double-Faced Cashmere Wrap"
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-lg text-[#141212] focus:border-[#4A1521]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#706963] font-semibold mb-1">
                Fashion House
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-lg text-[#141212] focus:border-[#4A1521]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#706963] font-semibold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-lg text-[#141212] focus:border-[#4A1521]"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Dresses">Dresses</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#706963] font-semibold mb-1">
                Textile / Fabric
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-lg text-[#141212] focus:border-[#4A1521]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#706963] font-semibold mb-1">
                Estimated Value ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-lg text-[#141212] focus:border-[#4A1521]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#4A1521] text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#3B121B] shadow-sm transition-all"
            >
              Add to Wardrobe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
