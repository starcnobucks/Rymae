import React, { useState } from 'react';
import { WardrobeItem } from '../utils/wardrobeLogic';
import { WardrobeAnalytics } from './WardrobeAnalytics';

interface ProfileTabProps {
  wardrobeItems: WardrobeItem[];
  onOpenAuth: () => void;
  onOpenStylist: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  wardrobeItems,
  onOpenAuth,
  onOpenStylist,
  onShowToast
}) => {
  const [rationaleOpen, setRationaleOpen] = useState(true);
  const [continuousLearning, setContinuousLearning] = useState(true);
  const [activeMemoryModal, setActiveMemoryModal] = useState(false);

  const memories = [
    "Prefers midi to maxi hems (never above knee for daywear)",
    "Favors structured drop-shoulder tailoring over raglan cuts",
    "Avoids polyester synthetics and cold blue-toned pastels",
    "Allocates monthly budget cap strictly to transitional outerwear",
    "Shoe size calibrated to EU 38 with 45mm-55mm walkable arch",
    "Signature neutral base: Alabaster silk & raw double-faced camel wool"
  ];

  return (
    <div className="max-w-[430px] mx-auto px-5 pt-3 pb-28 space-y-6">
      {/* 1. Member Atelier Profile Card */}
      <section className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] shadow-[0_8px_24px_-4px_rgba(80,22,36,0.04)] relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#F5E9EC]/50 blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3.5">
            {/* Avatar Silhouette Portrait */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 border border-[#4B091B]/20 bg-[#F4ECE8] flex-shrink-0">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFhel1-8rKHorTrnlVSsfCXIfR0O5UZSO3_OZMJFFtUtgdySB8r07-LdGzvSBdiwHJwATZRXhBYyIk4sMUm9Ng_tgo5c7C-V78MzvLia3149nTfhjWBFSftfCG24Gmas04tjn4sFi0ML6hl4BVz5qEhacxf-h5ZVignYoWSeSEHIdrNQMk6uzLhR9oUrnVJhUDa1GNv8VpHGakyzrgdLIy6HNCazLwO5EiMOrcljrcRsBo5CXL6EgZMg"
                  alt="Camille d'Orsay"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#4B091B] border-2 border-white flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </span>
            </div>

            {/* Identity Details */}
            <div>
              <h2 className="font-serif text-[22px] text-[#1D1819] font-medium tracking-tight">
                Camille d'Orsay
              </h2>
              <p className="font-sans text-[12px] text-[#574C4E] mt-0.5">
                172cm · Size S · London/Mayfair
              </p>
              <div className="inline-flex items-center space-x-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#F4ECE8] border border-[rgba(104,32,48,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B091B]" />
                <span className="font-sans text-[10px] text-[#4B091B] font-semibold tracking-wide">
                  L'Atelier Noir • Private Client since 2024
                </span>
              </div>
            </div>
          </div>

          <button
            aria-label="Edit Profile"
            onClick={() => onShowToast('Profile preferences synchronized with London atelier')}
            className="text-[#8A7D80] hover:text-[#4B091B] transition-colors p-1 -mr-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[rgba(104,32,48,0.12)]">
          <div className="text-center p-2 rounded-lg bg-[#FAF8F5]">
            <span className="block font-sans text-[18px] font-bold text-[#1D1819]">64</span>
            <span className="block font-sans text-[9px] text-[#574C4E] mt-0.5 uppercase tracking-wider font-semibold">
              Pieces Catalogued
            </span>
          </div>
          <div className="text-center p-2 rounded-lg bg-[#FAF8F5]">
            <span className="block font-sans text-[18px] font-bold text-[#4B091B]">84%</span>
            <span className="block font-sans text-[9px] text-[#574C4E] mt-0.5 uppercase tracking-wider font-semibold">
              Rewear Index
            </span>
          </div>
          <div className="text-center p-2 rounded-lg bg-[#FAF8F5]">
            <span className="block font-sans text-[18px] font-bold text-[#1D1819]">98%</span>
            <span className="block font-sans text-[9px] text-[#574C4E] mt-0.5 uppercase tracking-wider font-semibold">
              Fit Fidelity
            </span>
          </div>
        </div>
      </section>

      {/* 2. Style Identity & Aesthetic Pillars */}
      <section className="space-y-3">
        <div className="flex justify-between items-baseline px-0.5">
          <div>
            <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Style Identity Pillars
            </h3>
            <p className="font-sans text-[12px] text-[#574C4E]">Adaptive archetype inference</p>
          </div>
          <button
            onClick={() => onShowToast('Style pillars calibrated to Autumn AW26')}
            className="font-sans text-[11px] text-[#4B091B] hover:text-[#3B121B] font-semibold uppercase tracking-wider underline underline-offset-4"
            type="button"
          >
            Adjust
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Pillar 1 */}
          <div className="bg-white rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                Primary Archetype
              </span>
              <span className="font-sans text-[11px] text-[#4B091B] font-bold bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                94%
              </span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] font-semibold mt-2">
              Minimal Warm Neutrals
            </p>
            <div className="w-full bg-[#F4ECE8] h-1 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#4B091B] h-full rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                Silhouette Bias
              </span>
              <span className="font-sans text-[11px] text-[#4B091B] font-bold bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                88%
              </span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] font-semibold mt-2">
              Architectural Silhouettes
            </p>
            <div className="w-full bg-[#F4ECE8] h-1 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#4B091B] h-full rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                Tailoring Mood
              </span>
              <span className="font-sans text-[11px] text-[#4B091B] font-bold bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                91%
              </span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] font-semibold mt-2">
              Quiet Luxury Tailoring
            </p>
            <div className="w-full bg-[#F4ECE8] h-1 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#4B091B] h-full rounded-full" style={{ width: '91%' }} />
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                Textile Method
              </span>
              <span className="font-sans text-[11px] text-[#4B091B] font-bold bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                85%
              </span>
            </div>
            <p className="font-sans text-[13px] text-[#1D1819] font-semibold mt-2">
              Monochromatic Layering
            </p>
            <div className="w-full bg-[#F4ECE8] h-1 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#4B091B] h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        {/* "Why Rymae inferred this" Rationale Drawer */}
        <div className="bg-[#F4ECE8] rounded-xl p-3.5 border border-[rgba(104,32,48,0.12)]">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setRationaleOpen(!rationaleOpen)}
          >
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#4B091B] text-[18px]">psychology</span>
              <span className="font-sans text-[12px] text-[#1D1819] font-semibold">
                Why Rymae inferred this archetype
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#574C4E] text-[18px] transition-transform ${
                rationaleOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>

          {rationaleOpen && (
            <div className="mt-2.5 pt-2.5 border-t border-[rgba(104,32,48,0.12)]">
              <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">
                Synthesized from 12 recent curated ensembles, high wear-frequencies for structured wool blazers (89%), double-faced cashmere outerwear, and 0% retention of floral synthetic prints.
              </p>
              <div className="mt-3 flex items-center justify-end space-x-2">
                <button
                  onClick={() => onShowToast('Pillars reset to initial diagnostic baseline')}
                  className="px-2.5 py-1 rounded-full text-[#574C4E] bg-white font-sans text-[11px] font-semibold hover:text-[#4B091B]"
                  type="button"
                >
                  Reset Pillar
                </button>
                <button
                  onClick={() => onShowToast('Tuning confirmed: Minimal Warm Neutrals locked')}
                  className="px-3 py-1 rounded-full bg-[#4B091B] text-white font-sans text-[11px] font-semibold"
                  type="button"
                >
                  Confirm Tuning
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Silhouette & Calibrated Fit */}
      <section className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Silhouette & Calibrated Fit
            </h3>
            <p className="font-sans text-[12px] text-[#574C4E]">
              Precise bespoke anatomical coordinates
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E5EBE5] text-[#546255] font-sans text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#546255]" />
            <span>Synchronized</span>
          </span>
        </div>

        {/* 3D Avatar Sync Indicator Card */}
        <div className="flex items-center p-3 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.12)] gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F4ECE8] flex items-center justify-center text-[#4B091B] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">accessibility_new</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-sans text-[12px] text-[#1D1819] font-semibold">
                Digital Silhouette Synchronized
              </span>
              <span className="font-sans text-[11px] text-[#8A7D80]">Oct 2026</span>
            </div>
            <p className="font-sans text-[12px] text-[#574C4E]">
              Volumetric scan precision ±0.3cm for atelier draft
            </p>
          </div>
        </div>

        {/* Proportions Row */}
        <div className="grid grid-cols-5 gap-1.5 text-center">
          <div className="p-2 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)]">
            <span className="block font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">Height</span>
            <span className="block font-sans text-[13px] text-[#1D1819] font-bold mt-0.5">
              172 <span className="text-[10px] font-normal text-[#8A7D80]">cm</span>
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)]">
            <span className="block font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">Bust</span>
            <span className="block font-sans text-[13px] text-[#1D1819] font-bold mt-0.5">
              84 <span className="text-[10px] font-normal text-[#8A7D80]">cm</span>
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)]">
            <span className="block font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">Waist</span>
            <span className="block font-sans text-[13px] text-[#1D1819] font-bold mt-0.5">
              66 <span className="text-[10px] font-normal text-[#8A7D80]">cm</span>
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)]">
            <span className="block font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">Hips</span>
            <span className="block font-sans text-[13px] text-[#1D1819] font-bold mt-0.5">
              92 <span className="text-[10px] font-normal text-[#8A7D80]">cm</span>
            </span>
          </div>
          <div className="p-2 rounded-lg bg-[#F4ECE8]/60 border border-[rgba(104,32,48,0.12)]">
            <span className="block font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">Shoe</span>
            <span className="block font-sans text-[13px] text-[#1D1819] font-bold mt-0.5">
              EU 38
            </span>
          </div>
        </div>

        {/* Fit Preference Narrative */}
        <div className="pt-2 border-t border-[rgba(104,32,48,0.12)] flex items-start gap-2">
          <span className="material-symbols-outlined text-[#4B091B] text-[18px] mt-0.5 flex-shrink-0">
            straighten
          </span>
          <div>
            <span className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider font-semibold">
              Fit Preference Signature
            </span>
            <p className="font-sans text-[12px] text-[#1D1819] mt-0.5 leading-snug">
              Relaxed fluid drape, structured shoulders, mid-rise waistlines.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Wardrobe Data Intelligence Visualization (recharts) */}
      <WardrobeAnalytics wardrobeItems={wardrobeItems} />

      {/* 5. Color Affinity & Harmonies */}
      <section className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] space-y-4">
        <div>
          <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
            Color Affinity & Harmonies
          </h3>
          <p className="font-sans text-[12px] text-[#574C4E]">Curated seasonal tonal matrix</p>
        </div>

        {/* Harmonic Distribution Gauge */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-sans font-semibold text-[#8A7D80] uppercase">
            <span>Harmonic Distribution</span>
            <span>Atelier Balance</span>
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden flex border border-[rgba(104,32,48,0.12)]">
            <div className="h-full bg-[#F5F2EC]" style={{ width: '38%' }} title="Alabaster Cream (38%)" />
            <div className="h-full bg-[#C59B6C]" style={{ width: '24%' }} title="Warm Camel (24%)" />
            <div className="h-full bg-[#E8DEC8]" style={{ width: '18%' }} title="Champagne Silk (18%)" />
            <div className="h-full bg-[#4A1521]" style={{ width: '12%' }} title="Oxblood Bordeaux (12%)" />
            <div className="h-full bg-[#2A201F]" style={{ width: '8%' }} title="Espresso Noir (8%)" />
          </div>
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {[
            { name: 'Alabaster', hex: '#F5F2EC', selected: true },
            { name: 'Bordeaux', hex: '#4A1521' },
            { name: 'Espresso', hex: '#2A201F' },
            { name: 'Camel', hex: '#C59B6C' },
            { name: 'Champagne', hex: '#E8DEC8' },
          ].map((c) => (
            <div
              key={c.name}
              onClick={() => onShowToast(`Selected tone: ${c.name}`)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-11 h-11 rounded-full border border-[rgba(104,32,48,0.12)] flex items-center justify-center transition-transform group-hover:scale-105 ${
                  c.selected ? 'ring-2 ring-[#4B091B] ring-offset-2' : ''
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {c.selected && <span className="w-1.5 h-1.5 rounded-full bg-[#4B091B]" />}
              </div>
              <span className="font-sans text-[10px] text-[#1D1819] font-medium mt-1.5 text-center leading-tight">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Avoided Colors Disclaimer */}
        <div className="p-2.5 rounded-lg bg-[#FAF8F5] flex items-center justify-between border border-[rgba(104,32,48,0.12)]">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#8A7D80] text-[18px]">block</span>
            <span className="font-sans text-[12px] text-[#574C4E]">Excluded shades:</span>
          </div>
          <span className="font-sans text-[11px] font-semibold text-[#1D1819]">
            Neon brights, synthetic cool pastels
          </span>
        </div>
      </section>

      {/* 5. Shopping Intent & Discipline */}
      <section className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] space-y-4">
        <div>
          <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
            Shopping Intent & Discipline
          </h3>
          <p className="font-sans text-[12px] text-[#574C4E]">
            Algorithmic friction against impulse buying
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[#F4ECE8]/70 border border-[rgba(104,32,48,0.12)]">
            <span className="font-sans text-[10px] text-[#4B091B] font-semibold uppercase tracking-wider block">
              Acquisition Philosophy
            </span>
            <p className="font-sans text-[13px] text-[#1D1819] font-medium mt-0.5">
              Wardrobe-first styling with intentional acquisition
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.12)]">
            <div>
              <span className="font-sans text-[10px] text-[#8A7D80] uppercase font-semibold">
                Monthly Curation Cap
              </span>
              <p className="font-sans text-[18px] text-[#1D1819] font-bold mt-0.5">
                $300 <span className="text-xs font-normal text-[#574C4E]">/ month</span>
              </p>
            </div>
            <span className="font-sans text-[11px] px-2.5 py-1 rounded-full bg-[#F5E9EC] text-[#4B091B] font-semibold">
              Strict constraint
            </span>
          </div>

          <div>
            <span className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider font-semibold block mb-2">
              Preferred Houses & Boutiques
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Totême', 'The Row', 'Massimo Dutti Studio', 'Loro Piana', 'Saint Laurent'].map((house) => (
                <span
                  key={house}
                  className="font-sans text-[12px] px-3 py-1 rounded-full bg-white border border-[#E2D7D1] text-[#1D1819] font-medium"
                >
                  {house}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI Memory & Audit */}
      <section className="bg-white rounded-xl p-5 border border-[rgba(104,32,48,0.12)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
              AI Memory & Audit
            </h3>
            <p className="font-sans text-[12px] text-[#574C4E]">
              Decoupled data & transparent learning
            </p>
          </div>
          <span className="material-symbols-outlined text-[#4B091B] text-[22px]">fingerprint</span>
        </div>

        {/* Continuous Learning Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.12)]">
          <div className="flex items-center space-x-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${continuousLearning ? 'bg-[#546255] animate-pulse' : 'bg-[#8A7D80]'}`} />
            <div>
              <span className="font-sans text-[12px] text-[#1D1819] font-semibold block">
                Continuous Preference Learning
              </span>
              <span className="font-sans text-[10px] text-[#546255]">
                {continuousLearning ? 'Active & calibrating' : 'Paused by client'}
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              const next = !continuousLearning;
              setContinuousLearning(next);
              onShowToast(next ? 'Continuous AI learning activated' : 'Continuous AI learning paused');
            }}
            className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors ${
              continuousLearning ? 'bg-[#4B091B]' : 'bg-[#E2D7D1]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                continuousLearning ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Inspect Learned Preferences */}
        <div className="p-3 rounded-lg bg-[#F4ECE8]/50 border border-[rgba(104,32,48,0.12)] flex items-center justify-between">
          <div>
            <span className="font-sans text-[12px] text-[#1D1819] font-semibold block">
              Inspect Learned Preferences
            </span>
            <span className="font-sans text-[11px] text-[#574C4E]">
              18 discreet stylistic memories stored
            </span>
          </div>
          <button
            onClick={() => setActiveMemoryModal(true)}
            className="font-sans text-[11px] text-[#4B091B] hover:text-[#3B121B] font-semibold underline underline-offset-2"
            type="button"
          >
            Audit / Forget
          </button>
        </div>

        {/* Privacy & Local Encryption Badge */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] text-[#574C4E]">
          <span className="material-symbols-outlined text-[#546255] text-[18px] mt-0.5 flex-shrink-0">
            lock
          </span>
          <p className="font-sans text-[11px] leading-relaxed">
            Local encrypted biometric measurements. Runway and styling mirror photo data deleted automatically post-render.
          </p>
        </div>
      </section>

      {/* 7. Account & Concierge Settings */}
      <section className="bg-white rounded-xl overflow-hidden border border-[rgba(104,32,48,0.12)] divide-y divide-[rgba(104,32,48,0.12)]">
        <div
          onClick={() => onShowToast('Destination: Mayfair Atelier Suite confirmed')}
          className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-[#8A7D80] text-[20px]">pin_drop</span>
            <div>
              <span className="font-sans text-[13px] font-semibold text-[#1D1819] block">
                Delivery Destination
              </span>
              <span className="font-sans text-[11px] text-[#574C4E]">Mayfair, London, W1K</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#8A7D80] text-[18px]">chevron_right</span>
        </div>

        <div
          onClick={() => onShowToast('Opening authenticated order certificates')}
          className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-[#8A7D80] text-[20px]">receipt_long</span>
            <div>
              <span className="font-sans text-[13px] font-semibold text-[#1D1819] block">
                Order & Acquisition History
              </span>
              <span className="font-sans text-[11px] text-[#574C4E]">
                14 items archived & authenticated
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#8A7D80] text-[18px]">chevron_right</span>
        </div>

        <div
          onClick={onOpenStylist}
          className="flex items-center justify-between p-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-[#4B091B] text-[20px]">diamond</span>
            <div>
              <span className="font-sans text-[13px] font-semibold text-[#1D1819] block">
                Atelier VIP Stylist Access
              </span>
              <span className="font-sans text-[11px] text-[#574C4E]">
                Direct channel to Hélène (Senior Curator)
              </span>
            </div>
          </div>
          <span className="font-sans text-[10px] text-[#4B091B] font-bold px-2 py-0.5 rounded bg-[#F5E9EC] uppercase">
            Priority
          </span>
        </div>
      </section>

      {/* Subtle Sign Out Action */}
      <div className="pt-2 text-center">
        <button
          onClick={onOpenAuth}
          className="font-sans text-[12px] text-[#8A7D80] hover:text-[#BA1A1A] transition-colors uppercase tracking-wider font-semibold"
          type="button"
        >
          Sign out of Private Atelier
        </button>
      </div>

      {/* Memory Audit Modal */}
      {activeMemoryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-[rgba(104,32,48,0.12)] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[rgba(104,32,48,0.12)] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B091B]">fingerprint</span>
                <h4 className="font-serif text-[16px] text-[#1D1819] font-semibold">
                  Auditable Stylist Memories
                </h4>
              </div>
              <button
                onClick={() => setActiveMemoryModal(false)}
                className="text-[#8A7D80] hover:text-[#1D1819]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto custom-scroll pr-1">
              {memories.map((mem, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.12)] flex items-start justify-between gap-2"
                >
                  <p className="font-sans text-[11px] text-[#574C4E] leading-relaxed">{mem}</p>
                  <button
                    onClick={() => onShowToast(`Forgotten memory: ${mem.slice(0, 24)}...`)}
                    className="text-[#8A7D80] hover:text-[#BA1A1A] p-0.5"
                    title="Forget memory"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveMemoryModal(false);
                onShowToast('Memory audit session closed');
              }}
              className="w-full py-2.5 rounded-full bg-[#4B091B] text-white font-sans text-[11px] font-semibold uppercase tracking-wider"
              type="button"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
