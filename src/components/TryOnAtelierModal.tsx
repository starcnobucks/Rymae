import React, { useState } from 'react';

interface TryOnAtelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSave: () => void;
  onShowToast: (msg: string) => void;
}

export const TryOnAtelierModal: React.FC<TryOnAtelierModalProps> = ({
  isOpen,
  onClose,
  onOpenSave,
  onShowToast
}) => {
  const [currentView, setCurrentView] = useState<'full' | 'macro' | 'flow'>('full');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [previousLookIndex, setPreviousLookIndex] = useState<number | null>(null);
  const [hasRestacked, setHasRestacked] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showRefine, setShowRefine] = useState(false);
  const [changePieceCategory, setChangePieceCategory] = useState<string | null>(null);

  // Refine panel state
  const [refineDirection, setRefineDirection] = useState('Minimalist');
  const [refinePalette, setRefinePalette] = useState('Bordeaux & Alabaster');
  const [refineSilhouette, setRefineSilhouette] = useState('Fluid Column');
  const [refineOccasion, setRefineOccasion] = useState('Gallery Opening');
  const [refinePreference, setRefinePreference] = useState('Understated');

  // Curated prototype styling combinations
  const [curatedLooks, setCuratedLooks] = useState([
    {
      id: 1,
      title: 'Look 1 of 6: Autumn Minimalist Column',
      styleDirection: 'Minimalist',
      occasion: 'Gallery Opening',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBra3pKr76I1-b64li4ror-47JfO2Lq2AB1w1Ns1fO86_xO0uNuqnqS-nZb2yw2KqDiutesRvivvXCp1T0a_rTvbF-XUyf1B9gY_OjmLfqOhbTfOOihe6wMUWk6TbKIS4V1S4H5_cYsdp_ZdPlvw7WakScCvULogWt1-_nK09bFa9Zr3WT_GSQaDgBEthJjPcxk3FnN2nbFjHj9zJIX7ldpBX7b2XP3q3boDBpT3TBB18Iy6_9mhL3nEw',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi26KQpH631FI81MydZdsbyGu7AxcnwjoIQPVkj3Zut0XSwFLkC_3Lkpk0TjKnkpViu3BzY8khabyfKNEFJPD8jgAEyEFkxA2WGbkZrZ62cC1UiQsDbaE5_u_VY4-jkNG9ZYhcR6NJYYQoEcNQPXJ9-dL7txi8YPpsXn_kYGdDsoqiIp1NKAQPybalp63GeGiV1cOau_H1G0koRBvHRx_OnnJBcJ5yXkG6cgzKKePsgX_YRfhlv8ghXQ',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBra3pKr76I1-b64li4ror-47JfO2Lq2AB1w1Ns1fO86_xO0uNuqnqS-nZb2yw2KqDiutesRvivvXCp1T0a_rTvbF-XUyf1B9gY_OjmLfqOhbTfOOihe6wMUWk6TbKIS4V1S4H5_cYsdp_ZdPlvw7WakScCvULogWt1-_nK09bFa9Zr3WT_GSQaDgBEthJjPcxk3FnN2nbFjHj9zJIX7ldpBX7b2XP3q3boDBpT3TBB18Iy6_9mhL3nEw',
      quote: '“Pairing the tailored density of your Totême trench against this featherlight ribbed knit column maintains the crisp, monastic proportion preferred in your Autumn curation.”',
      observations: [
        'The longline coat creates an elongated vertical silhouette that frames the body with effortless authority.',
        'The ivory knit base harmonizes and balances the deeper oxblood exterior layer.',
        'Structured outerwear provides crisp architectural contrast to the soft fluid column.'
      ],
      paletteRatio: '62% Alabaster · 30% Oxblood · 8% Travertine',
      layers: [
        {
          id: 'l1',
          name: 'Silk-Blend Ribbed Knit Column Dress',
          category: 'Base Silhouette',
          details: 'Natural Alabaster · 70% Mulberry Silk, 30% Fine Wool',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi26KQpH631FI81MydZdsbyGu7AxcnwjoIQPVkj3Zut0XSwFLkC_3Lkpk0TjKnkpViu3BzY8khabyfKNEFJPD8jgAEyEFkxA2WGbkZrZ62cC1UiQsDbaE5_u_VY4-jkNG9ZYhcR6NJYYQoEcNQPXJ9-dL7txi8YPpsXn_kYGdDsoqiIp1NKAQPybalp63GeGiV1cOau_H1G0koRBvHRx_OnnJBcJ5yXkG6cgzKKePsgX_YRfhlv8ghXQ'
        },
        {
          id: 'l2',
          name: 'Totême Double-Breasted Trench',
          category: 'Outerwear Layer',
          details: 'Oxblood Leather · Size 36 (FR) · Floor drape',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR2R2yFUbAshSkTN-DHglNLIry5YJ2EzBJ36_eQIH0dO2Q77HQ_QSes_WQ9dYNiyAyZztmYgOFKx8pNJeSc8LUKN8PI8WX-hTNygLpFFszA5EbHOGbtpugZjtugE-cCzcYlfJlSRy4P-kEr37ls6N5IGnVCXwWzll8BPxS5bjTkwB7yr79y18gcOrA2aTAC-pXuPp3WTVtbhCKhy-5kXSbLtMc6T8EGV0hubcH3iQvDB_EZNrn-khk9w'
        },
        {
          id: 'l3',
          name: 'Saint Laurent Slingback 55',
          category: 'Footwear Companion',
          details: 'Patent Wine Noir · EU 38 · 55mm kitten heel',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkUA3IbDrWgntGa-uuEQtfB_3LGkuvFFaHsJ7irvyzUN24sWdm8SnSFOcINaWbfNDrtJBl0gVOZlHJz4HYKnC2wpNIFZfSWroXWiKxXrltTpzJ5W96ur6_MVXuUwFwuZsOJlw51FnfcDdH6c5OQKiLryvLeZh3DOzl1X2DPrkzj38W3hgOWD63skhV_ThUIFIf4pBxFwPTrjfDXSzlmmtnOlLZPLxcM9wFPWcwTUK4RpAWL4NMJUyQRw'
        }
      ]
    },
    {
      id: 2,
      title: 'Look 2 of 6: Fluid Silk Bias & Cashmere Knit',
      styleDirection: 'Quiet Luxury',
      occasion: 'Dates',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOEuKHUnrbCfJht9AUUphBpw6aT__XYmphTZmLS8Uxq8lBnDIydjEWDqOSozKC5N317supPMAItCpJFthYLYFIthOGQZ2C2WGDYNRh478STOS8U86JQYqQdZ9R5vigifBRZ2Xh7OASzhJhweptmZ-rrNEh9w4FxcXptboPdwbghsTSVzMOX2l__asoIOMTrq8eUV0jyrs0zy1nZlkKY56r1HiqPXWbAmqXIUChIvjnLZpWZoKI23juWQ',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g',
      quote: '“The heavy diagonal drape of the champagne silk skirt offsets the weight of the chunky espresso rib, achieving relaxed poise.”',
      observations: [
        'Bias-cut hemline catches ambient motion, generating fluid kinetic elegance.',
        'Cashmere density anchors the waistline while leaving the neckline open.',
        'Warm monochrome hues flatter Camille’s undertone.'
      ],
      paletteRatio: '50% Espresso · 35% Champagne Silk · 15% Oxblood',
      layers: [
        {
          id: 'l4',
          name: 'Champagne Silk Bias Midi Skirt',
          category: 'Lower Body',
          details: '100% 22mm Sandwashed Silk · Fluid bias drape',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g'
        },
        {
          id: 'l5',
          name: 'Cashmere Ribbed Knit in Espresso',
          category: 'Upper Body',
          details: 'Pure Cashmere · Heavy Gauge Texture',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOEuKHUnrbCfJht9AUUphBpw6aT__XYmphTZmLS8Uxq8lBnDIydjEWDqOSozKC5N317supPMAItCpJFthYLYFIthOGQZ2C2WGDYNRh478STOS8U86JQYqQdZ9R5vigifBRZ2Xh7OASzhJhweptmZ-rrNEh9w4FxcXptboPdwbghsTSVzMOX2l__asoIOMTrq8eUV0jyrs0zy1nZlkKY56r1HiqPXWbAmqXIUChIvjnLZpWZoKI23juWQ'
        },
        {
          id: 'l6',
          name: 'Bottega Veneta Cassette Bag',
          category: 'Accessory Companion',
          details: 'Intrecciato Nappa Leather in Espresso',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzLX1JMD3F_pwlHQr7SWty0N6Aaiu3VlOORKAVDrXMCbnWjSAx0L67UxMWRIIjiNogtEFvfYeXoxYebp0PLkNld2LRBIU7DnB6zBeQiINcw_qOxKXtGfPQjZj43UteWGagoNsZ0chNS3OSh4s0oPXWX21puGol5GJpe4F5JmRry5rLQJGvVdLHI-_JyGvYJFQ2A73eszGYbkcrGDid1Yl9L-chLM61qRcmeHUch1_rQBDoiWnAOZ5-Q'
        }
      ]
    },
    {
      id: 3,
      title: 'Look 3 of 6: Architectural Wool Tailoring & Pleats',
      styleDirection: 'Architectural',
      occasion: 'College and office events',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtwlvjDV8qKnqHHnrI-eJQBujcb-2FvoCWJ_XLdm9DVNpRzvEbvZ8q8c2aAE682816d4I6c06-t0srXx65Jatzug0EsKfe9Qy66pZBtiPVOngvUbAf4zGLlCpPe3Y8GwEmMHXPTfqa8RtOL_tL0-cukB0X1F5pKeNMLdshFxGteo4eagvNJ6cIeZEcBUsd7-7It4LypF37t2VaXIzYxJdlIGZZEQSVfaepTyl3aSeUHpNkNmLlfNo8w',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg',
      quote: '“Sharp razor pleats on the wide-leg trousers elongate the lower third, while the structured camel wool blazer imparts easy Parisian authority.”',
      observations: [
        'Padded drop shoulder gives clean architectural presence.',
        'Deep front pleats cascade fluidly over walkable heels.',
        'Double-faced virgin wool maintains shape without stiffness.'
      ],
      paletteRatio: '55% Sandstone · 35% Camel · 10% Charcoal',
      layers: [
        {
          id: 'l7',
          name: 'Relaxed Wool Blazer in Camel',
          category: 'Tailored Outerwear',
          details: '100% Virgin Wool · Oversized Silhouette',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtwlvjDV8qKnqHHnrI-eJQBujcb-2FvoCWJ_XLdm9DVNpRzvEbvZ8q8c2aAE682816d4I6c06-t0srXx65Jatzug0EsKfe9Qy66pZBtiPVOngvUbAf4zGLlCpPe3Y8GwEmMHXPTfqa8RtOL_tL0-cukB0X1F5pKeNMLdshFxGteo4eagvNJ6cIeZEcBUsd7-7It4LypF37t2VaXIzYxJdlIGZZEQSVfaepTyl3aSeUHpNkNmLlfNo8w'
        },
        {
          id: 'l8',
          name: 'Wide-Leg Pleated Wool Trousers in Sand',
          category: 'Tailored Bottom',
          details: 'High-rise · Extended waistband with French closure',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg'
        },
        {
          id: 'l9',
          name: 'Fine-Knit Merino Mockneck',
          category: 'Foundation Layer',
          details: '16-Gauge Extra Fine Merino in Ecru',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLwgbr1KgANRNn-_DtjE-EbmmffS6RTfoDt14gqnEOS2ifXvk7EtVpUZ3D9P9EvAhGPhsj7vQunJPwMwlevwyCghdWvawV78vZTzlZnnehb4lXC_GxPxJRdtayym1FC0RuBusTubZRLqjMsdfcxyNvNmxsMvkoMcjDphKwP4HC2uyLpHz0W6n8roFFstDSPDg9OQZv1FWhiDTYtvqnPcVxjHtxowy39Q3vlx21Uk0Hf1guWrAHjEwysQ'
        }
      ]
    },
    {
      id: 4,
      title: 'Look 4 of 6: Parisian Evening Gala Velvet',
      styleDirection: 'Evening Black Tie',
      occasion: 'Parties',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtXIUUyUbx-W4gXoQkid07ZyrNvF2eNll1e0nwN2fcfhheLjnpVOk8qPN091-Vy_-5qs7FxXibmOIqFLr3fBJ7i6pZsoYkMt7qarENymuIY5u4Gk_q-ZUX9gcAZKdmBbsnl1DdGtVDPFMtmq4v9-_aG53Y9uqZ8k-Zik1bAu-hhFHnwr3qLYmF9vwuoKaGzJ9c-31paD_orqux_IY_B56SZLKOTX2E0yan7FPrl8MnHJjCnFr6BPoRCA',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaBi4AZLrEhtaZ5c1lrnX2BpDQG4NFSWUqWuCQmfi9RsXyIJgxkrLkGcH26XghZOVFPB6HXXbubrQ5kzNeSDmdZAsAoGGladRKr0sUOyDrtUZxpqRJ74CvYNfJIrLFfjie7cNG59h7ts-fRlV00ZXd3yA2UsBYFh1a7BXvUXSMIvdo8tgMrD3tBwJM_bXZPVhjb7p--lUswLsqyEBcLQTZWGwqL_ej2FeBdk7RaRZ7LPIIH1BgiCAkCQ',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtXIUUyUbx-W4gXoQkid07ZyrNvF2eNll1e0nwN2fcfhheLjnpVOk8qPN091-Vy_-5qs7FxXibmOIqFLr3fBJ7i6pZsoYkMt7qarENymuIY5u4Gk_q-ZUX9gcAZKdmBbsnl1DdGtVDPFMtmq4v9-_aG53Y9uqZ8k-Zik1bAu-hhFHnwr3qLYmF9vwuoKaGzJ9c-31paD_orqux_IY_B56SZLKOTX2E0yan7FPrl8MnHJjCnFr6BPoRCA',
      quote: '“Deep midnight velvet paired with fluid silk crepe delivers gala drama without excessive weight.”',
      observations: [
        'Sculptural square neckline balances the full-length fluid lower drape.',
        'Patent wine slingback creates a grounded, gleaming point of visual interest.',
        'Velvet absorbs ambient light, rendering the deepest black-wine silhouette.'
      ],
      paletteRatio: '65% Deep Burgundy · 25% Noir · 10% Champagne',
      layers: [
        {
          id: 'l10',
          name: 'Architectural Velvet Bodice',
          category: 'Evening Top',
          details: 'Silk Velvet in Deep Wine · Boned Architecture',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtXIUUyUbx-W4gXoQkid07ZyrNvF2eNll1e0nwN2fcfhheLjnpVOk8qPN091-Vy_-5qs7FxXibmOIqFLr3fBJ7i6pZsoYkMt7qarENymuIY5u4Gk_q-ZUX9gcAZKdmBbsnl1DdGtVDPFMtmq4v9-_aG53Y9uqZ8k-Zik1bAu-hhFHnwr3qLYmF9vwuoKaGzJ9c-31paD_orqux_IY_B56SZLKOTX2E0yan7FPrl8MnHJjCnFr6BPoRCA'
        },
        {
          id: 'l11',
          name: 'Champagne Silk Bias Midi Skirt',
          category: 'Lower Body',
          details: '100% Mulberry Silk · 22mm Sandwashed',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g'
        },
        {
          id: 'l12',
          name: 'Burgundy Pointed Slingback Pumps',
          category: 'Footwear Companion',
          details: 'Patent Leather · Saint Laurent · EU 38',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaBi4AZLrEhtaZ5c1lrnX2BpDQG4NFSWUqWuCQmfi9RsXyIJgxkrLkGcH26XghZOVFPB6HXXbubrQ5kzNeSDmdZAsAoGGladRKr0sUOyDrtUZxpqRJ74CvYNfJIrLFfjie7cNG59h7ts-fRlV00ZXd3yA2UsBYFh1a7BXvUXSMIvdo8tgMrD3tBwJM_bXZPVhjb7p--lUswLsqyEBcLQTZWGwqL_ej2FeBdk7RaRZ7LPIIH1BgiCAkCQ'
        }
      ]
    },
    {
      id: 5,
      title: 'Look 5 of 6: Modern Studio Architect Poplin & Wool',
      styleDirection: 'Minimalist',
      occasion: 'College and office events',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0BHRUgXcwog-vbSoi4jb6onYf-WJH3mCXxGbHx_GivBmBaZSwDjgeIrregTmdbdifIIUbYN2UWMbp3Ck5xA0_Ktzi6iS9kvu0DsQflPxUuYvREPp-9_kH2JQ9z1oZDZOFKRPrurzos_d35yUy4PTsSIMnO3LWkrprP1GdYsrO_MpNKmBh3VHS7Rxm-1BNHZ0mbV0w4jkU1W0_E-fYidKCKvDNd0R_9wTVBODoe2ppvUCrZNWvsBePaw',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPWOwCRa38DOYnKwDQUqR3FM86VdTV6AOwTTvkFqyZB3_HETqvEBabgfyeXgyu6kYmx2GZiIyBuVRtV5T0AOFOaXgGGDgP3y9g85yBlZlpH8-KhD4Hn8o6qGMT5dDakdcYd7q8ktiMarskv9xGYEz2kslK1O89l_bz_BYv3743mWBxLCrFt42THFTyQk84WUk4yVqrrMJ5rBauiwoIjr1VQEtCwLbxvAtSo38Nt65_LF3Ed55AcSaCWg',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0BHRUgXcwog-vbSoi4jb6onYf-WJH3mCXxGbHx_GivBmBaZSwDjgeIrregTmdbdifIIUbYN2UWMbp3Ck5xA0_Ktzi6iS9kvu0DsQflPxUuYvREPp-9_kH2JQ9z1oZDZOFKRPrurzos_d35yUy4PTsSIMnO3LWkrprP1GdYsrO_MpNKmBh3VHS7Rxm-1BNHZ0mbV0w4jkU1W0_E-fYidKCKvDNd0R_9wTVBODoe2ppvUCrZNWvsBePaw',
      quote: '“High-density organic poplin paired with relaxed knife-pleated virgin wool trousers provides studio composure.”',
      observations: [
        'Crisp collar structure contrasts gently against soft pleated wool.',
        'Wide-leg cuffs hover precisely 1cm off the floor when paired with low heels.',
        'Monochromatic travertine harmony conveys understated European poise.'
      ],
      paletteRatio: '50% Crisp White · 40% Sandstone · 10% Nappa Leather',
      layers: [
        {
          id: 'l13',
          name: 'Structured Crisp Poplin Overshirt',
          category: 'Foundation Layer',
          details: '100% Egyptian Giza Cotton · Dropped Shoulder',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPWOwCRa38DOYnKwDQUqR3FM86VdTV6AOwTTvkFqyZB3_HETqvEBabgfyeXgyu6kYmx2GZiIyBuVRtV5T0AOFOaXgGGDgP3y9g85yBlZlpH8-KhD4Hn8o6qGMT5dDakdcYd7q8ktiMarskv9xGYEz2kslK1O89l_bz_BYv3743mWBxLCrFt42THFTyQk84WUk4yVqrrMJ5rBauiwoIjr1VQEtCwLbxvAtSo38Nt65_LF3Ed55AcSaCWg'
        },
        {
          id: 'l14',
          name: 'Wide-Leg Pleated Wool Trousers in Sand',
          category: 'Tailored Bottom',
          details: 'The Row · High-rise · Virgin Wool',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg'
        },
        {
          id: 'l15',
          name: 'Bottega Veneta Cassette Bag',
          category: 'Accessory Companion',
          details: 'Intrecciato Nappa Leather',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzLX1JMD3F_pwlHQr7SWty0N6Aaiu3VlOORKAVDrXMCbnWjSAx0L67UxMWRIIjiNogtEFvfYeXoxYebp0PLkNld2LRBIU7DnB6zBeQiINcw_qOxKXtGfPQjZj43UteWGagoNsZ0chNS3OSh4s0oPXWX21puGol5GJpe4F5JmRry5rLQJGvVdLHI-_JyGvYJFQ2A73eszGYbkcrGDid1Yl9L-chLM61qRcmeHUch1_rQBDoiWnAOZ5-Q'
        }
      ]
    },
    {
      id: 6,
      title: 'Look 6 of 6: Double-Breasted Trench & Cashmere Layer',
      styleDirection: 'Classic',
      occasion: 'Everyday',
      fullImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg',
      macroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4o-pFpak2qbjWBb7WjoH5HTiYDBKhUejdYxKun7_IyQgxA25Pi6x63_8WYnVN1-rPLgFKYErILr2W457Y9LSztdMKyxgiH6CB8XN13mI2hn29Pa3GNh6dkydhmxrMm_CCOXSor1xr0K8dpokg1DbwMPl-dUBGUDOC1cKIKm_OELc4FEwM7XGFXQI3AxbZE7kNRI0tN9J8lf8Ew1kW8MfLZ6Ae_Cx0y6nKeO9FEVo28_5pAGAMkt7lg',
      flowImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg',
      quote: '“The classic weather shield trench paired with Loro Piana oatmeal cashmere provides tactile luxury for brisk European mornings.”',
      observations: [
        'Double-breasted trench shields against unexpected gust and drizzle.',
        'Cashmere rib knit provides high warmth-to-weight ratio.',
        'Sleek calfskin loafers deliver reliable city-walking traction.'
      ],
      paletteRatio: '45% Camel Wool · 40% Oatmeal Cream · 15% Noir',
      layers: [
        {
          id: 'l16',
          name: 'Toteme Oversized Wool Trench',
          category: 'Outerwear Layer',
          details: 'Heavy Double-faced Wool in Camel',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg'
        },
        {
          id: 'l17',
          name: 'Oatmeal Cashmere Oversized Knit',
          category: 'Foundation Layer',
          details: '100% Cashmere · Loro Piana',
          status: 'IN YOUR WARDROBE',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4o-pFpak2qbjWBb7WjoH5HTiYDBKhUejdYxKun7_IyQgxA25Pi6x63_8WYnVN1-rPLgFKYErILr2W457Y9LSztdMKyxgiH6CB8XN13mI2hn29Pa3GNh6dkydhmxrMm_CCOXSor1xr0K8dpokg1DbwMPl-dUBGUDOC1cKIKm_OELc4FEwM7XGFXQI3AxbZE7kNRI0tN9J8lf8Ew1kW8MfLZ6Ae_Cx0y6nKeO9FEVo28_5pAGAMkt7lg'
        },
        {
          id: 'l18',
          name: 'Kitten-Heel Pointed Loafers',
          category: 'Footwear Companion',
          details: 'Black Patent Calfskin · 40mm heel',
          status: 'STYLE INSPIRATION',
          img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiE2Qfkfs9ECWGNFoFiEuYk9e2LfSlrbV_h8pyml6ew3cq4YhF6CeWK834VfDg7t_nq58wvdInxLuJ8fFsRAbRc_iJ6VqiXJpYxSaumH0aMW7cZtxDoUGEdCX3zwZrkifPoU7tX-pYxBaz6jH4_S9k43GkapfMQvxugXlVzDckhlPYdlDci-QN_jgdkOCWUmpB8UGk859bQ4c6Z_iFU2hD6rv-hFHbmvnNv00UOPTdy5a5YRQeYQLfA'
        }
      ]
    }
  ]);

  const currentLook = curatedLooks[activeLookIndex];

  if (!isOpen) return null;

  // RE-STACK handler: generates alternative styling combination
  const handleRestack = () => {
    setPreviousLookIndex(activeLookIndex);
    const nextIndex = (activeLookIndex + 1) % curatedLooks.length;
    setActiveLookIndex(nextIndex);
    setHasRestacked(true);
    onShowToast(`Re-stacked: ${curatedLooks[nextIndex].title.split(':')[1]}`);
  };

  // Undo Re-stack
  const handleUndoRestack = () => {
    if (previousLookIndex !== null) {
      setActiveLookIndex(previousLookIndex);
      setHasRestacked(false);
      onShowToast('Reverted to previous outfit combination');
    }
  };

  // Replace piece handler
  const handleSelectReplacement = (newItem: { name: string; details: string; img: string }) => {
    setCuratedLooks(prev => {
      const updated = [...prev];
      const look = { ...updated[activeLookIndex] };
      look.layers = look.layers.map(l => {
        if (l.category === changePieceCategory || l.id === changePieceCategory) {
          return {
            ...l,
            name: newItem.name,
            details: newItem.details,
            img: newItem.img,
            status: 'IN YOUR WARDROBE'
          };
        }
        return l;
      });
      updated[activeLookIndex] = look;
      return updated;
    });

    setChangePieceCategory(null);
    onShowToast(`Piece updated: ${newItem.name}`);
  };

  const [previousRefinedLook, setPreviousRefinedLook] = useState<any | null>(null);

  // Apply changes from Refine Panel
  const handleApplyRefine = () => {
    setPreviousRefinedLook({ ...curatedLooks[activeLookIndex] });
    setCuratedLooks(prev => {
      const updated = [...prev];
      const look = { ...updated[activeLookIndex] };
      look.styleDirection = refineDirection;
      look.occasion = refineOccasion;
      look.title = `Look ${activeLookIndex + 1} of ${curatedLooks.length}: ${refineDirection} ${refineSilhouette}`;
      look.observations = [
        `Re-calibrated to ${refineDirection} aesthetic with ${refinePreference.toLowerCase()} temperament for ${refineOccasion}.`,
        `Color harmony balanced around ${refinePalette} palette with fluid architectural ease.`,
        `Layering structured for Camille's signature proportion and comfort.`
      ];
      look.quote = `“Tailored specifically for ${refineOccasion}: highlighting ${refineSilhouette} lines in an ${refinePreference.toLowerCase()} tone.”`;
      updated[activeLookIndex] = look;
      return updated;
    });
    setShowRefine(false);
    onShowToast(`Applied: ${refineDirection} for ${refineOccasion} (${refinePalette})`);
  };

  const handleUndoRefine = () => {
    if (previousRefinedLook) {
      setCuratedLooks(prev => {
        const updated = [...prev];
        updated[activeLookIndex] = previousRefinedLook;
        return updated;
      });
      setPreviousRefinedLook(null);
      onShowToast('Reverted outfit refinement');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] overflow-y-auto custom-scroll flex flex-col selection:bg-[#4A1521] selection:text-white">
      {/* 1. Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E3DC]">
        <div className="flex justify-between items-center w-full px-5 py-3 max-w-[430px] mx-auto">
          <button
            aria-label="Back to wardrobe"
            onClick={onClose}
            className="p-1.5 -ml-1.5 text-[#2f020d] active:scale-95 transition-transform rounded-full hover:bg-[#F5F2EC]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
          </button>
          <div className="text-center">
            <span
              className="text-[17px] tracking-[0.24em] uppercase text-[#2f020d] font-medium block"
              style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
            >
              RYMAE ATELIER
            </span>
            <span className="font-sans text-[9px] tracking-[0.16em] uppercase text-[#706963] block -mt-0.5 font-semibold">
              AI Styling Studio · Chambre 04
            </span>
          </div>
          <button
            aria-label="Styling preferences"
            onClick={() => setShowRefine(true)}
            className="p-1.5 -mr-1.5 text-[#2f020d] active:scale-95 transition-transform rounded-full hover:bg-[#F5F2EC]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[430px] mx-auto px-4 pt-3 pb-32 space-y-5 flex-1">
        {/* Sub-header Context Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="font-sans text-[#706963] tracking-wider text-[11px] uppercase font-semibold">
              Live Studio Synthesis
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F3EDE4]/80 px-2.5 py-0.5 rounded-full border border-[#C5A880]/30">
            <span className="material-symbols-outlined text-[#4A1521] text-[14px]">auto_awesome</span>
            <span className="font-sans text-[#4A1521] text-[10px] tracking-wider uppercase font-semibold">
              AI Styling Harmony: High
            </span>
          </div>
        </div>

        {/* Look Browsing Selector (Core Requirement 6) */}
        <div className="bg-white rounded-xl p-2.5 border border-[#E8E3DC] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveLookIndex(prev => (prev - 1 + curatedLooks.length) % curatedLooks.length)}
              className="w-8 h-8 rounded-full border border-[#E8E3DC] flex items-center justify-center text-[#4A1521] hover:bg-[#F5F2EC] active:scale-95 transition-all"
              type="button"
              aria-label="Previous look"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="text-center">
              <span className="font-serif text-[15px] text-[#2f020d] font-medium block">
                Look {activeLookIndex + 1} of {curatedLooks.length}
              </span>
              <span className="font-sans text-[10px] text-[#706963] uppercase tracking-wider font-semibold">
                {currentLook.styleDirection} · {currentLook.occasion}
              </span>
            </div>
            <button
              onClick={() => setActiveLookIndex(prev => (prev + 1) % curatedLooks.length)}
              className="w-8 h-8 rounded-full border border-[#E8E3DC] flex items-center justify-center text-[#4A1521] hover:bg-[#F5F2EC] active:scale-95 transition-all"
              type="button"
              aria-label="Next look"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Miniature thumbnail / dot selector strip */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            {curatedLooks.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeLookIndex === idx ? 'w-6 bg-[#4A1521]' : 'w-2 bg-[#E8E3DC] hover:bg-[#C5A880]'
                }`}
                type="button"
                title={look.title}
              />
            ))}
          </div>
        </div>

        {/* Undo Refine Banner if refined */}
        {previousRefinedLook && (
          <div className="px-3 py-2 rounded-lg bg-[#F4ECE8] border border-[rgba(104,32,48,0.15)] flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#4A1521] font-medium">
              Outfit refined to {currentLook.styleDirection}
            </span>
            <button
              onClick={handleUndoRefine}
              className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#3B121B] underline hover:text-[#501624]"
              type="button"
            >
              Undo Refine
            </button>
          </div>
        )}

        {/* 2. Hero Interactive Garment Preview (Centerpiece) */}
        <section
          className={`relative rounded-xl overflow-hidden bg-white border border-[#E8E3DC] shadow-[0_16px_40px_-8px_rgba(59,18,27,0.08)] ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen m-0' : ''
          }`}
        >
          <div className="relative w-full aspect-[3/4] bg-[#F5F2EC] flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
              src={
                currentView === 'full'
                  ? currentLook.fullImage
                  : currentView === 'macro'
                  ? currentLook.macroImage
                  : currentLook.flowImage
              }
              alt={currentLook.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B121B]/70 via-transparent to-transparent pointer-events-none" />

            {/* Top Styling Badges (360 Simulation Removed!) */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start pointer-events-none">
              <div className="flex flex-col gap-1.5 pointer-events-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E8E3DC] text-[#141212] font-sans text-[10px] uppercase tracking-wider font-semibold shadow-sm">
                  <span className="material-symbols-outlined text-[13px] text-[#4A1521]">person_celebrate</span>
                  Client Silhouette · Camille
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-[#E8E3DC]/60 text-[#706963] font-sans text-[9px] uppercase tracking-widest font-medium">
                  Proportion: 172cm · Fluid Column
                </span>
              </div>

              {/* Functional Fullscreen Toggle with Clear Exit */}
              <button
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E3DC] flex items-center justify-center text-[#141212] hover:text-[#4A1521] active:scale-95 shadow-sm pointer-events-auto"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>

            {/* Tactical Markers for Fit & Ease */}
            <div className="absolute top-[32%] left-[34%] pointer-events-auto group cursor-pointer">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#4A1521] border-2 border-white" />
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#141212]/95 text-white font-sans text-[9px] rounded whitespace-nowrap pointer-events-none shadow-md">
                Shoulder ease: Relaxed drop shoulder
              </div>
            </div>

            <div className="absolute top-[52%] left-[48%] pointer-events-auto group cursor-pointer">
              <span className="relative flex h-3.5 w-3.5">
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C5A880] border-2 border-white" />
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#141212]/95 text-white font-sans text-[9px] rounded whitespace-nowrap pointer-events-none shadow-md">
                Waistline balance: +2.5cm intentional ease
              </div>
            </div>

            {/* Bottom 3-Tab Viewport Switcher */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-lg p-1.5 border border-[#E8E3DC] shadow-md">
              <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar">
                {[
                  { id: 'full', label: 'Full Silhouette' },
                  { id: 'macro', label: 'Fabric Macro' },
                  { id: 'flow', label: 'Movement Flow' }
                ].map((v) => {
                  const isActive = currentView === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setCurrentView(v.id as any);
                        onShowToast(`Displaying ${v.label}`);
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-full font-sans text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all text-center ${
                        isActive
                          ? 'bg-[#4A1521] text-white shadow-sm'
                          : 'bg-transparent hover:bg-[#F5F2EC] text-[#706963]'
                      }`}
                      type="button"
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fit Diagnostic Under Viewport */}
          <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#E8E3DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4A1521] text-[18px]">straighten</span>
              <p className="font-sans text-[12px] text-[#141212]">
                <strong className="font-semibold text-[#4A1521]">Proportion Matrix:</strong> Longline drape creates uninterrupted vertical line.
              </p>
            </div>
            <button
              onClick={() => setShowAnalysis(true)}
              className="font-sans text-[11px] text-[#4A1521] uppercase tracking-wider font-semibold underline underline-offset-4 flex-shrink-0"
              type="button"
            >
              Details
            </button>
          </div>
        </section>

        {/* 3. "Your Curated Look" with RE-STACK Core Interaction */}
        <section className="space-y-3.5">
          <div className="flex items-end justify-between px-1">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-[19px] text-[#2f020d] tracking-tight font-medium">
                  Your Curated Look
                </h2>
                {hasRestacked && (
                  <span className="text-[9px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F3EDE4] text-[#4A1521] font-semibold border border-[#C5A880]/40">
                    Re-stacked
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-[#706963] mt-0.5">
                {currentLook.title}
              </p>
            </div>

            {/* Core RE-STACK & Undo Controls */}
            <div className="flex items-center gap-1.5">
              {hasRestacked && (
                <button
                  onClick={handleUndoRestack}
                  className="px-2.5 py-1 rounded-full border border-[#E8E3DC] bg-white text-[#706963] font-sans text-[10px] uppercase tracking-wider hover:text-[#4A1521] transition-colors flex items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">undo</span>
                  <span>Undo</span>
                </button>
              )}
              <button
                onClick={handleRestack}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#4A1521]/40 text-[#4A1521] font-sans uppercase tracking-wider text-[11px] font-semibold hover:bg-[#F5F2EC] active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">shuffle</span>
                <span>RE-STACK</span>
              </button>
            </div>
          </div>

          {/* Garment Rows (No prices or purchase buttons!) */}
          <div className="space-y-2.5">
            {currentLook.layers.map((layer) => (
              <div
                key={layer.id}
                className="p-3.5 rounded-xl border border-[#E8E3DC] bg-white shadow-xs hover:border-[#4A1521]/30 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-20 rounded bg-[#F5F2EC] border border-[#E8E3DC] flex-shrink-0 overflow-hidden relative">
                    <img src={layer.img} alt={layer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`font-sans text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded border font-semibold ${
                          layer.status === 'IN YOUR WARDROBE'
                            ? 'text-[#546255] bg-[#E5EBE5] border-[#546255]/20'
                            : 'text-[#4A1521] bg-[#F5E9EC] border-[#4A1521]/20'
                        }`}
                      >
                        {layer.status}
                      </span>
                      <span className="text-[#E8E3DC] text-[10px]">·</span>
                      <span className="font-sans text-[9px] text-[#706963] uppercase tracking-wider">
                        {layer.category}
                      </span>
                    </div>
                    <h3 className="font-sans text-[13px] text-[#141212] truncate font-semibold mt-1">
                      {layer.name}
                    </h3>
                    <p className="font-sans text-[11px] text-[#706963] mt-0.5 leading-snug">
                      {layer.details}
                    </p>
                  </div>
                </div>

                {/* Change Piece Action Row */}
                <div className="mt-2.5 pt-2 border-t border-[#E8E3DC] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#725b38] font-medium">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                    <span>Atelier calibrated drape</span>
                  </div>
                  <button
                    onClick={() => setChangePieceCategory(layer.category)}
                    className="px-2.5 py-1 rounded-full border border-[#E8E3DC] text-[#141212] bg-[#FAF8F5] font-sans text-[10px] uppercase tracking-wider font-semibold hover:border-[#4A1521] hover:text-[#4A1521] transition-colors flex items-center gap-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                    <span>CHANGE PIECE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Stylist's Fit & Proportion Notes */}
        <section className="bg-[#F5F2EC] rounded-xl p-4 border border-[#E8E3DC] space-y-3.5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C5A880]" />
          <div className="flex items-center justify-between pl-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4A1521] text-[18px]">design_services</span>
              <h3 className="font-serif text-[15px] text-[#141212] font-semibold">
                Stylist's Fit & Proportion Notes
              </h3>
            </div>
            <span className="font-sans text-[9px] text-[#C5A880] uppercase tracking-widest font-bold">
              Atelier AI
            </span>
          </div>

          {/* Observations */}
          <ul className="space-y-2 pl-1 text-[12px] font-sans text-[#141212]">
            {currentLook.observations.map((obs, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#C5A880] text-[15px] mt-0.5 flex-shrink-0">
                  check
                </span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>

          {/* Tonal Harmony Scale */}
          <div className="pt-1 pl-1">
            <div className="flex justify-between items-center text-[10px] font-sans text-[#706963] mb-1 font-semibold">
              <span className="uppercase tracking-widest">Tonal Palette Harmony</span>
              <span>{currentLook.paletteRatio}</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden flex bg-[#E8E3DC]">
              <div className="h-full bg-[#FAF8F5] border-r border-[#E8E3DC]" style={{ width: '62%' }} />
              <div className="h-full bg-[#4A1521]" style={{ width: '30%' }} />
              <div className="h-full bg-[#C5A880]" style={{ width: '8%' }} />
            </div>
          </div>

          <p className="font-sans text-[12px] text-[#706963] pl-1 italic border-t border-[#E8E3DC]/60 pt-2.5 leading-relaxed">
            {currentLook.quote}
          </p>

          {/* Contextual Feedback & Full Analysis Link */}
          <div className="pt-2 pl-1 border-t border-[#E8E3DC]/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-[9px] uppercase tracking-wider text-[#706963] font-semibold">
                Feedback:
              </span>
              <button
                onClick={() => onShowToast('Preference noted: Camille likes this silhouette combination')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#E8E3DC] text-[#141212] bg-white font-sans text-[10px] font-semibold hover:border-[#4A1521] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px] text-[#725b38]">thumb_up</span>
                <span>More like this</span>
              </button>
              <button
                onClick={handleRestack}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#E8E3DC] text-[#706963] bg-white font-sans text-[10px] font-semibold hover:border-[#4A1521] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">refresh</span>
                <span>Not my style</span>
              </button>
            </div>
            <button
              onClick={() => setShowAnalysis(true)}
              className="font-sans text-[10px] text-[#4A1521] uppercase tracking-wider font-semibold underline underline-offset-4"
              type="button"
            >
              Full Analysis
            </button>
          </div>
        </section>

        {/* 5. Render On Your Silhouette Prompt */}
        <section className="bg-white p-4 rounded-xl border border-[#E8E3DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F3EDE4] flex items-center justify-center text-[#4A1521]">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <div>
              <h4 className="font-sans text-[13px] text-[#141212] font-semibold">
                Render On Your Silhouette
              </h4>
              <p className="font-sans text-[11px] text-[#706963]">
                Upload portrait for 1:1 tailored garment drape
              </p>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Opening portrait scan camera...')}
            className="px-3.5 py-1.5 rounded-full border border-[#E8E3DC] text-[#2f020d] hover:border-[#4A1521] bg-[#FAF8F5] font-sans text-[10px] uppercase tracking-wider font-semibold"
            type="button"
          >
            Scan / Upload
          </button>
        </section>
      </main>

      {/* 6. BOTTOM STYLING DOCK: Save to Collection + Prominent "REFINE THIS LOOK" (No buy button!) */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#E8E3DC] px-4 py-3 shadow-[0_-8px_24px_rgba(59,18,27,0.06)]">
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          {/* Bookmark Icon for saving look to collection */}
          <button
            aria-label="Save to Collection"
            onClick={onOpenSave}
            className="h-12 w-12 rounded-full border border-[#E8E3DC] bg-white flex items-center justify-center text-[#4A1521] active:scale-95 transition-all shadow-xs hover:border-[#4A1521] flex-shrink-0"
            type="button"
            title="Save complete look to collection"
          >
            <span className="material-symbols-outlined text-[22px]">bookmark_border</span>
          </button>

          {/* Primary Styling CTA: REFINE THIS LOOK */}
          <button
            onClick={() => setShowRefine(true)}
            className="flex-1 h-12 rounded-full bg-[#3B121B] hover:bg-[#501624] text-white font-sans uppercase tracking-[0.14em] text-[12px] font-semibold flex items-center justify-between px-6 active:scale-98 transition-all shadow-md group"
            type="button"
          >
            <span>REFINE THIS LOOK</span>
            <span className="material-symbols-outlined text-[18px] text-[#C5A880] group-hover:rotate-12 transition-transform">
              auto_fix_high
            </span>
          </button>
        </div>
      </div>

      {/* MODAL: COMPACT STYLING PANEL ("REFINE THIS LOOK") */}
      {showRefine && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 border-t border-[#E8E3DC] shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto custom-scroll animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-1 bg-[#E8E3DC] rounded-full" />
              <div className="flex items-center justify-between w-full pt-1">
                <div>
                  <h3 className="font-serif text-[18px] text-[#2f020d] font-medium">Refine Studio Look</h3>
                  <p className="font-sans text-[11px] text-[#706963]">
                    Adjust aesthetic vectors, occasion & silhouette parameters
                  </p>
                </div>
                <button onClick={() => setShowRefine(false)} className="text-[#706963] p-1" type="button">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* 1. Style Direction */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block mb-2">
                1. Style Direction
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Minimalist',
                  'Classic',
                  'Romantic',
                  'Streetwear',
                  'Architectural',
                  'Casual Chic',
                  'Quiet Luxury'
                ].map((dir) => {
                  const isSel = refineDirection === dir;
                  return (
                    <button
                      key={dir}
                      onClick={() => setRefineDirection(dir)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-sans transition-all ${
                        isSel
                          ? 'bg-[#4A1521] text-white font-semibold shadow-xs'
                          : 'bg-[#F5F2EC] text-[#141212] border border-[#E8E3DC]'
                      }`}
                      type="button"
                    >
                      {dir}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Occasion & Intended Use */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block mb-2">
                2. Occasion & Intended Use
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Gallery Opening',
                  'Weddings',
                  'Birthdays',
                  'Dates',
                  'College and office events',
                  'Parties and celebrations',
                  'Vacations',
                  'Everyday wear'
                ].map((occ) => {
                  const isSel = refineOccasion === occ;
                  return (
                    <button
                      key={occ}
                      onClick={() => setRefineOccasion(occ)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-sans transition-all ${
                        isSel
                          ? 'bg-[#4A1521] text-white font-semibold shadow-xs'
                          : 'bg-[#F5F2EC] text-[#141212] border border-[#E8E3DC]'
                      }`}
                      type="button"
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Color Palette / Tonal Harmony */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block mb-2">
                3. Tonal Harmony
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Bordeaux & Alabaster',
                  'Warm Neutrals',
                  'Monochromatic Cream',
                  'Deep Espresso'
                ].map((pal) => {
                  const isSel = refinePalette === pal;
                  return (
                    <button
                      key={pal}
                      onClick={() => setRefinePalette(pal)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-sans transition-all ${
                        isSel
                          ? 'bg-[#4A1521] text-white font-semibold shadow-xs'
                          : 'bg-[#F5F2EC] text-[#141212] border border-[#E8E3DC]'
                      }`}
                      type="button"
                    >
                      {pal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Silhouette & Layering */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block mb-2">
                4. Silhouette & Layering
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Fluid Column',
                  'Structured Tailoring',
                  'Relaxed Drape',
                  'Monastic Draping'
                ].map((silh) => {
                  const isSel = refineSilhouette === silh;
                  return (
                    <button
                      key={silh}
                      onClick={() => setRefineSilhouette(silh)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-sans transition-all ${
                        isSel
                          ? 'bg-[#4A1521] text-white font-semibold shadow-xs'
                          : 'bg-[#F5F2EC] text-[#141212] border border-[#E8E3DC]'
                      }`}
                      type="button"
                    >
                      {silh}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Styling Preferences (Understated, Bold, Casual, Formal) */}
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3DC] space-y-2">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#706963] font-semibold block">
                5. Styling Temperament
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {['Understated', 'Bold', 'Casual', 'Formal'].map((pref) => {
                  const isSel = refinePreference === pref;
                  return (
                    <button
                      key={pref}
                      onClick={() => setRefinePreference(pref)}
                      className={`py-2 rounded-lg text-[11px] font-sans font-semibold text-center transition-all ${
                        isSel
                          ? 'bg-[#3B121B] text-white shadow-xs'
                          : 'bg-white text-[#706963] border border-[#E8E3DC]'
                      }`}
                      type="button"
                    >
                      {pref}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Row: Apply Changes & Cancel */}
            <div className="pt-2 border-t border-[#E8E3DC] flex items-center gap-3">
              <button
                onClick={() => setShowRefine(false)}
                className="px-5 py-3 rounded-full border border-[#E8E3DC] text-[#706963] font-sans text-[11px] uppercase tracking-wider font-semibold hover:text-[#141212]"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRefine}
                className="flex-1 py-3 rounded-full bg-[#3B121B] hover:bg-[#501624] text-white font-sans text-[11px] uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Apply Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PIECE DRAWER */}
      {changePieceCategory && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 border-t border-[#E8E3DC] shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto custom-scroll animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E3DC]">
              <div>
                <h3 className="font-serif text-[16px] text-[#141212] font-semibold">Change Garment Piece</h3>
                <p className="font-sans text-[11px] text-[#706963]">
                  Select from Camille's wardrobe for {changePieceCategory}
                </p>
              </div>
              <button onClick={() => setChangePieceCategory(null)} className="text-[#706963] p-1" type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              {[
                {
                  name: 'Khaite Cashmere Car Coat',
                  details: 'Double-faced Oatmeal Cashmere · Size S',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4o-pFpak2qbjWBb7WjoH5HTiYDBKhUejdYxKun7_IyQgxA25Pi6x63_8WYnVN1-rPLgFKYErILr2W457Y9LSztdMKyxgiH6CB8XN13mI2hn29Pa3GNh6dkydhmxrMm_CCOXSor1xr0K8dpokg1DbwMPl-dUBGUDOC1cKIKm_OELc4FEwM7XGFXQI3AxbZE7kNRI0tN9J8lf8Ew1kW8MfLZ6Ae_Cx0y6nKeO9FEVo28_5pAGAMkt7lg'
                },
                {
                  name: 'The Row Bindle Blazer',
                  details: 'Tailored Midnight Navy Wool · Size 38',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtwlvjDV8qKnqHHnrI-eJQBujcb-2FvoCWJ_XLdm9DVNpRzvEbvZ8q8c2aAE682816d4I6c06-t0srXx65Jatzug0EsKfe9Qy66pZBtiPVOngvUbAf4zGLlCpPe3Y8GwEmMHXPTfqa8RtOL_tL0-cukB0X1F5pKeNMLdshFxGteo4eagvNJ6cIeZEcBUsd7-7It4LypF37t2VaXIzYxJdlIGZZEQSVfaepTyl3aSeUHpNkNmLlfNo8w'
                },
                {
                  name: 'L’Atelier Silk Slip Skirt',
                  details: 'Champagne Sandwashed Silk · 22mm',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g'
                }
              ].map((alt, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectReplacement(alt)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#E8E3DC] hover:border-[#4A1521] hover:bg-[#FAF8F5] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded bg-[#FAF8F5] border border-[#E8E3DC] overflow-hidden flex-shrink-0">
                      <img src={alt.img} alt={alt.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-sans text-[13px] text-[#141212] font-semibold">{alt.name}</p>
                      <p className="font-sans text-[11px] text-[#706963]">{alt.details}</p>
                      <span className="font-sans text-[8px] uppercase tracking-wider text-[#546255] bg-[#E5EBE5] px-1.5 py-0.5 rounded inline-block mt-0.5 font-semibold">
                        In Your Wardrobe
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#4A1521] text-[18px]">add_circle_outline</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setChangePieceCategory(null)}
              className="w-full py-2.5 rounded-full border border-[#E8E3DC] text-[#706963] font-sans text-[11px] uppercase tracking-wider font-semibold"
              type="button"
            >
              Cancel Selection
            </button>
          </div>
        </div>
      )}

      {/* MODAL: FULL ANALYSIS */}
      {showAnalysis && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-[#E8E3DC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E3DC]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A1521] text-[20px]">architecture</span>
                <h3 className="font-serif text-[16px] text-[#141212] font-semibold">
                  Stylist Drape Analysis
                </h3>
              </div>
              <button onClick={() => setShowAnalysis(false)} className="text-[#706963]" type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-[12px] font-sans text-[#706963]">
              <p>
                <strong>Drape Balance:</strong> The vertical line created by the longline outerwear frames the silhouette with effortless authority.
              </p>
              <p>
                <strong>Golden Ratio:</strong> Trench hem rests 7cm above ankle bone, framing the elongated footwear with a 2:3 vertical rhythm.
              </p>
              <p>
                <strong>Layer Friction:</strong> Silk knit interior glides smoothly beneath supple leather lining for natural mobility.
              </p>
              <p className="text-[11px] italic text-[#9C948D] border-t border-[#E8E3DC] pt-2">
                *Styling observations are architectural proportion guidance based on wardrobe composition, not biometric body scans.
              </p>
            </div>
            <button
              onClick={() => setShowAnalysis(false)}
              className="w-full py-2.5 rounded-full bg-[#4A1521] text-white font-sans text-[11px] font-semibold uppercase tracking-wider"
              type="button"
            >
              Close Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
