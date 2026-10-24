import { WardrobeItem, CollectionItem } from '../utils/wardrobeLogic';

export interface OccasionItem {
  id: string;
  title: string;
  dateStr: string;
  relativeTime: string;
  progressPercent: number;
  statusLabel: string;
  details: string;
  buttonLabel: string;
  image: string;
  isReady?: boolean;
}

export interface RecommendationItem {
  id: string;
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  sizes: string;
  discountBadge?: string;
  whyRecommended: string;
  image: string;
  isBookmarked: boolean;
}

export interface RunwayStory {
  id: string;
  house: string;
  season: string;
  title: string;
  description: string;
  image: string;
  actionLabel: string;
  secondaryAction?: string;
}

export const INITIAL_WARDROBE_ITEMS: WardrobeItem[] = [
  {
    id: 'w1',
    name: 'Toteme Oversized Wool Trench',
    brand: 'Totême',
    category: 'Outerwear',
    material: 'Wool Blend',
    wornCount: 14,
    isBookmarked: true,
    tag: 'Capsule Staple',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg',
    price: 650
  },
  {
    id: 'w2',
    name: 'Champagne Silk Bias Midi Skirt',
    brand: 'L’Atelier Silk',
    category: 'Bottoms',
    material: '100% Silk',
    wornCount: 8,
    isBookmarked: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g',
    price: 240
  },
  {
    id: 'w3',
    name: 'Cashmere Ribbed Knit in Espresso',
    brand: 'Khaite',
    category: 'Tops',
    material: 'Pure Cashmere',
    wornCount: 11,
    isBookmarked: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOEuKHUnrbCfJht9AUUphBpw6aT__XYmphTZmLS8Uxq8lBnDIydjEWDqOSozKC5N317supPMAItCpJFthYLYFIthOGQZ2C2WGDYNRh478STOS8U86JQYqQdZ9R5vigifBRZ2Xh7OASzhJhweptmZ-rrNEh9w4FxcXptboPdwbghsTSVzMOX2l__asoIOMTrq8eUV0jyrs0zy1nZlkKY56r1HiqPXWbAmqXIUChIvjnLZpWZoKI23juWQ',
    price: 390
  },
  {
    id: 'w4',
    name: 'Bottega Veneta Cassette Bag',
    brand: 'Bottega Veneta',
    category: 'Bags',
    material: 'Nappa Leather',
    wornCount: 22,
    isBookmarked: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzLX1JMD3F_pwlHQr7SWty0N6Aaiu3VlOORKAVDrXMCbnWjSAx0L67UxMWRIIjiNogtEFvfYeXoxYebp0PLkNld2LRBIU7DnB6zBeQiINcw_qOxKXtGfPQjZj43UteWGagoNsZ0chNS3OSh4s0oPXWX21puGol5GJpe4F5JmRry5rLQJGvVdLHI-_JyGvYJFQ2A73eszGYbkcrGDid1Yl9L-chLM61qRcmeHUch1_rQBDoiWnAOZ5-Q',
    price: 2600
  },
  {
    id: 'w5',
    name: 'Wide-Leg Pleated Wool Trousers in Sand',
    brand: 'The Row',
    category: 'Bottoms',
    material: 'Virgin Wool',
    wornCount: 5,
    isBookmarked: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg',
    price: 480
  },
  {
    id: 'w6',
    name: 'Burgundy Pointed Slingback Pumps',
    brand: 'Saint Laurent',
    category: 'Shoes',
    material: 'Patent Leather',
    wornCount: 3,
    isBookmarked: true,
    tag: 'Trending Accent',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaBi4AZLrEhtaZ5c1lrnX2BpDQG4NFSWUqWuCQmfi9RsXyIJgxkrLkGcH26XghZOVFPB6HXXbubrQ5kzNeSDmdZAsAoGGladRKr0sUOyDrtUZxpqRJ74CvYNfJIrLFfjie7cNG59h7ts-fRlV00ZXd3yA2UsBYFh1a7BXvUXSMIvdo8tgMrD3tBwJM_bXZPVhjb7p--lUswLsqyEBcLQTZWGwqL_ej2FeBdk7RaRZ7LPIIH1BgiCAkCQ',
    price: 790
  },
  {
    id: 'w7',
    name: 'Oatmeal Cashmere Oversized Knit',
    brand: 'Loro Piana',
    category: 'Tops',
    material: '100% Cashmere',
    wornCount: 16,
    isBookmarked: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4o-pFpak2qbjWBb7WjoH5HTiYDBKhUejdYxKun7_IyQgxA25Pi6x63_8WYnVN1-rPLgFKYErILr2W457Y9LSztdMKyxgiH6CB8XN13mI2hn29Pa3GNh6dkydhmxrMm_CCOXSor1xr0K8dpokg1DbwMPl-dUBGUDOC1cKIKm_OELc4FEwM7XGFXQI3AxbZE7kNRI0tN9J8lf8Ew1kW8MfLZ6Ae_Cx0y6nKeO9FEVo28_5pAGAMkt7lg',
    price: 1100
  },
  {
    id: 'w8',
    name: 'Mulberry Silk Slip Skirt',
    brand: 'L’Atelier Studio',
    category: 'Bottoms',
    material: 'Mulberry Silk',
    wornCount: 9,
    isBookmarked: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsLSYneiI7BqxU9ode1Igj-mBvr9J4JX2_TsmVa64FEeUdLAl98k7mQIbkDkJbrz8WF-czF7gJXLw0JenjVP59qJylvkwvxcuD6puWCGovwgkvQoaT_yBf4jqmh-iVNHAMV07zoVPzTKfqtKELXKpOErTVQHs75tfCUc4uf8IeTN8YeIKcJNLxISqxNvNyDDkXflVrIXs3uATOjXas1LfvdyqPaystlktnF_RS2e40KB3U12M6-y14vA',
    price: 210
  }
];

export const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: 'c1',
    name: 'Capsule Wardrobe',
    itemCount: 14,
    subtitle: 'Daily Edit',
    isPrivate: true,
    tag: 'Private',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jRqXcsouO2EAHvtEC9PstWWJEt8-D0YVULjRbfggdpGpfOmk1ykTTaOIsC23ZweLmC56g10l5qAfz2M-DIVL5juivYt152yYd__UdQHfP2pH0PD6EdZdoWOC_6kQtUtGNK9gqcUSczmw0eMTWdULXX9Zc1JKfpduG7DVt4sicFUm3gFEnOKkrgHuBwGSbP8XqcptdX9Gd4TYr0-8MT0OiEVntrfXoKCtWq8SMu6ivl_ksdCSYp0Mmw'
  },
  {
    id: 'c2',
    name: 'Runway & Couture',
    itemCount: 9,
    subtitle: 'PFW Curations',
    tag: 'AW26',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqUvvMM_GDTCo-aLD_vBxp8VwDMc9qe1q5NmOkSEO1gXzG3t6gw41kcOmX3oVlnr32HGiCvNwfJCmdf7fwfGSrCYHxwNBBxzkK1A0T08RAYIU7OHHzwmitcf1LCJ5wOF_iqdLPYz8U_4UTN9qcoLaW2pTEI-xykgW6szkX5diifmnjQdGhsI2Fyy-xXr7ghSmoh-FwqCZtNqzik5ckL6ogCkMldfBVscUtkQ-L5GV8POIvzHcbgY5vCw'
  },
  {
    id: 'c3',
    name: 'Autumn Monochrome',
    itemCount: 6,
    subtitle: 'Totême & Loro',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoXLBm0uD_fo97eUZS7Q0WJCgnt_G2ERbVzOADEKx9WtTO29fJUX1H3LDURwyAAEK72fQNf4ETbefvimoa9e75zoi1eEWNLYmf-Wg_ZpnbDArkhFU4Q_ZWBrAdXvEE5JN4WwG72kzaXOSVXKfY5LW5bc4JDiLNP8n0APZZ0Bbxn1KChllGor7rAGzibsqgSiLedlLt3ETgWT2_D3XXilpm-MEnscN-usSkCJ1kj2O6-Ehb4_ejJHbNQ'
  },
  {
    id: 'c4',
    name: 'Evening & Black Tie',
    itemCount: 8,
    subtitle: 'Formal Gala',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN0KnXF4LHP-pMMGAPHcZboPvpE2mnxvBVmPU47V0QE01ilutqX9u-Ca46SnkvLQ2e7RkT1zIEiDzdv1Xf4Z_d-bArho4TaPZS7HCXJP0YoA5Vb1WBYUYH3Rn3hWg_f_C39F7VZJcEFM3_ZZ2mNxE9qfg0CFN5d4Z-Pw3apwH-3AAw97bN5L4XJwQ9CDdTxIt4I3RPHfJ6KGIQ3cWVnLoR2RW--rx506JHAC8EZSSv5QIx99li89rnWw'
  },
  {
    id: 'c5',
    name: 'Everyday Essentials',
    itemCount: 24,
    subtitle: 'Autumn Edit',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jRqXcsouO2EAHvtEC9PstWWJEt8-D0YVULjRbfggdpGpfOmk1ykTTaOIsC23ZweLmC56g10l5qAfz2M-DIVL5juivYt152yYd__UdQHfP2pH0PD6EdZdoWOC_6kQtUtGNK9gqcUSczmw0eMTWdULXX9Zc1JKfpduG7DVt4sicFUm3gFEnOKkrgHuBwGSbP8XqcptdX9Gd4TYr0-8MT0OiEVntrfXoKCtWq8SMu6ivl_ksdCSYp0Mmw'
  },
  {
    id: 'c6',
    name: 'Date Night',
    itemCount: 9,
    subtitle: 'Silk & Tailoring',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN0KnXF4LHP-pMMGAPHcZboPvpE2mnxvBVmPU47V0QE01ilutqX9u-Ca46SnkvLQ2e7RkT1zIEiDzdv1Xf4Z_d-bArho4TaPZS7HCXJP0YoA5Vb1WBYUYH3Rn3hWg_f_C39F7VZJcEFM3_ZZ2mNxE9qfg0CFN5d4Z-Pw3apwH-3AAw97bN5L4XJwQ9CDdTxIt4I3RPHfJ6KGIQ3cWVnLoR2RW--rx506JHAC8EZSSv5QIx99li89rnWw'
  }
];

export const OCCASIONS_DATA: OccasionItem[] = [
  {
    id: 'occ1',
    title: 'Venice Biennale & Friends Wedding',
    dateStr: '15 Nov',
    relativeTime: 'in 18 days',
    progressPercent: 75,
    statusLabel: '75% Complete',
    details: '4 looks saved · Missing clutch & evening wrap',
    buttonLabel: 'Plan Occasion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCezvNrE5KnLNPECz-OpiHy9seIgGp9nPsbMuV03o9wKL5pKgpEuQZ71b1VK7oPmglHHU9gWtpkNZ-yfvRhxQyphWeoA9sdf-L4GWUgn0U4kVqhZOc0EVOocfpsnhu8MWddSrx_5KmpMMzk2vvU9zRi5BwiIBJb0O4mTI45kSTHntraX3E154Q2Rw_JjDP_NArB460LigjXppAXIuuVoVirbLGj8zNeDVOVx3_bzFM_zT20iDTldohkTA'
  },
  {
    id: 'occ2',
    title: 'Mayfair Autumn Gallery Opening',
    dateStr: 'This Saturday',
    relativeTime: '8 PM',
    progressPercent: 100,
    statusLabel: 'Ready to Wear',
    details: '2 looks curated · Jewelry confirmed',
    buttonLabel: 'Review Fitting',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJQHuNMR2sIei1XlpwzIPaP3Z2UTDPdo5XJ4TAWVGDP830iH9hUsJHi2s1leXlH8F8uXSG4VP--iW8Xln8j9jEiqkEqgFyeXNgf09CZgMn-deDaPxScPCTM7MQu4ut_tcIUm31OEgawX-CRPvXW3HfPXce8ArKo2EoTWflAQL-8y_rK7pO-qMS94sWU2fzrtNziEY_LY6qe4B4occCXuLkx0_qTaAIe3w1OisGc2E4EQv9zTuQ0OqudQ',
    isReady: true
  },
  {
    id: 'occ3',
    title: 'St. Moritz Alpine Weekend',
    dateStr: '12 Dec',
    relativeTime: 'in 45 days',
    progressPercent: 30,
    statusLabel: 'Outerwear Search',
    details: '1 look saved · Need cold-weather coats',
    buttonLabel: 'Explore Outerwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmJqJEmDRfP3yOhaQH1il1_txH5BUGtD3Q3xmLYgd4N-RlTDScSa_JtLDLhtzSD9wgaVxBfRcAHUv26Ha2ei-qGV4nU6jb95iwv2TOqve10jFmUWWd_Q1Wd6bPY4Ns1mAt7UHFjuo5ytYJ9TnEb_9n7-oCfhZCjkFAiunGH3Vjpun2Wz6RQoi9NB5g_KrwFHZvGH1NSJO9D6eCbegO1geocSWqxFOnMb57DAetyfLuNSq1RjG8hlaKiw'
  }
];

export const RECENTLY_SAVED_PRODUCTS: WardrobeItem[] = [
  {
    id: 'rs1',
    name: 'Double-Breasted Coat',
    brand: 'TOTÊME',
    category: 'Outerwear',
    material: 'Camel Wool',
    wornCount: 0,
    isBookmarked: true,
    tag: 'Price Tracked',
    price: 650,
    originalPrice: 760,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoNXtnpjbbsrUx13DGJom-E3Q1oEFWwR4zELm9g7kyNIXZSWV4K5rCL-R-6R7TOcnTtNQssV8z08toBKCY1TD7oGz5QLxRNPI-02kouf15uUJOArxVr0GE0MTIumQEWwHnY6dCRpxUurKk9Zpby7rG08cyB3w4_ab4Vn8cayHY9BZDS12SKuXtP9VuS7n8g0wJSLcFqOcbad_MMSZEsVpcHW5u515eN_uBc6bwt29EZXMp_lqRVjfcWA'
  },
  {
    id: 'rs2',
    name: 'Sculptural Slingback 55',
    brand: 'SAINT LAURENT',
    category: 'Shoes',
    material: 'Patent Leather',
    wornCount: 0,
    isBookmarked: true,
    tag: 'Back in 38',
    price: 790,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU0PHk5ifV5Tmx_2fUgVng2rc481G1nr0QhCgkjguxdYLDOqgN74nHJMmnKR9zgYaK404T14pOoOQ-1Y-FWXZg52Sp2PHbuPIPYIjmoiOmENo5YAQQoI2LeA2gzF9nROyeHnhmM8kc_vXTPrGWBI4I-67kfpOXFosFxkbDCJODhhvT4D64CXYNyyRK2gjNO_Q122auoSOeYDSrMPki5Di0kj376JdWigUExzYn-deg83k8iO43QO088A'
  },
  {
    id: 'rs3',
    name: 'Small Andiamo Bag',
    brand: 'BOTTEGA VENETA',
    category: 'Bags',
    material: 'Intrecciato Lambskin',
    wornCount: 0,
    isBookmarked: true,
    price: 2600,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGn3wuIkvCStF-QAeqtvv3wZ3UcYw3hBGCJ0qJ5Sbq8cyhEMw0KQ9wuIwxOKraetO3VmrvuP7GclU2Ikilby-X2IRKNF9l-7Om2nn8hMBXK4g4Pq39liL_12L7fDXyFaanckoqfmsNOWLb9aC_-fj-BoYENMrggOyTJqzJcS9RDaUrkD0CklIkm2An4O1xAYUFNiSABXYPix5hCJjseW9vSajVS2c0_hqPGkvW0S7FWN8dQALob1t80Q'
  },
  {
    id: 'rs4',
    name: 'Ribbed Cashmere Knit',
    brand: 'KHAITE',
    category: 'Tops',
    material: '100% Cashmere',
    wornCount: 0,
    isBookmarked: true,
    price: 390,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnrM1EbmfloNJRQr8uXIrs99LtmWqONCX9PjsoQYUv6l3OS0sqfnUxvz38yB2n9DbgE798dSysXjm6OnlWwH9awZEAjdGRDfTz0hWEeWU-C_TpqqF91OcBfuQg2F-1-_xSr2Bd2wRz_Rm1XHYEQeDDPprKqwm_APP5M5UtoJH7d3CuYf4pEhm566QSMpa9Wta2aeKTERJs50tpQN_IctRl40OMREPIDUntmrTiretJm2LrGqulKtNkfg'
  }
];

export const RUNWAY_STORIES: RunwayStory[] = [
  {
    id: 'rw1',
    house: 'Saint Laurent',
    season: 'AW26',
    title: 'The Oxblood Leather Silhouette',
    description: 'Dramatic structural shoulders paired with fluid knitwear.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ybNQ2g7N52BBVgnmX0XHhXoSorxf7Dix-JpWoGumosXloCAzQnhgPdiy22MyjVp5Un2pMeczMLdROiFdSj37Fr5xO7nv4u6X2DCqeq1AKPtQiMOdfhgCd11VTc5rrdtAIGyhcRkpQg9wRs2XRsHWsR026KzUONEShBtCXHmy3NlM4pMAsLyT_5QsZ43nAvbZl5TysrNMpiZvYBfqKYe8TtUN-TWHn7UbgKtkrQ-Ey3LRcGiEMuEIUg',
    actionLabel: 'Turn into Outfit',
    secondaryAction: 'Recreate Look'
  },
  {
    id: 'rw2',
    house: 'The Row',
    season: 'Winter Lookbook',
    title: 'Monastic Draping & Raw Silk',
    description: 'Sculptural minimalism with tactile silk-wool drape.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0BHRUgXcwog-vbSoi4jb6onYf-WJH3mCXxGbHx_GivBmBaZSwDjgeIrregTmdbdifIIUbYN2UWMbp3Ck5xA0_Ktzi6iS9kvu0DsQflPxUuYvREPp-9_kH2JQ9z1oZDZOFKRPrurzos_d35yUy4PTsSIMnO3LWkrprP1GdYsrO_MpNKmBh3VHS7Rxm-1BNHZ0mbV0w4jkU1W0_E-fYidKCKvDNd0R_9wTVBODoe2ppvUCrZNWvsBePaw',
    actionLabel: 'Find Similar Pieces'
  }
];

export const DISCOVER_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec1',
    brand: 'Massimo Dutti',
    title: 'Silk-Blend Knit Dress',
    price: 98,
    sizes: 'XS · S · M',
    whyRecommended: 'Pairs with your Trench',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYnabqc6sQicQAwwrzB8GntNpUyUEcJm4bjnj6vNIFVZ46FLorAdFMuTdrNXOGx3w_LDT7K6jjRmGpeFZojGUsHBNvIGJreW2_qsPR5pUiWCD_QbX08D39s1y_zL-DqVtZpeLtouniq10fc0K7bmTlegW6fRtzomhJl9tyqR5j7-KkarJ5k75yedhZXRCBmSQvtlinj_Opp2pBYHnmUkBq5QrzBHeS66ZPGrdQVd763KLmGF0voEuzEw',
    isBookmarked: false
  },
  {
    id: 'rec2',
    brand: 'Mango Studio',
    title: 'Relaxed Wool Blazer',
    price: 110,
    originalPrice: 140,
    discountBadge: '-23%',
    sizes: 'In stock S/M',
    whyRecommended: 'Fills Capsule Workwear gap',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtwlvjDV8qKnqHHnrI-eJQBujcb-2FvoCWJ_XLdm9DVNpRzvEbvZ8q8c2aAE682816d4I6c06-t0srXx65Jatzug0EsKfe9Qy66pZBtiPVOngvUbAf4zGLlCpPe3Y8GwEmMHXPTfqa8RtOL_tL0-cukB0X1F5pKeNMLdshFxGteo4eagvNJ6cIeZEcBUsd7-7It4LypF37t2VaXIzYxJdlIGZZEQSVfaepTyl3aSeUHpNkNmLlfNo8w',
    isBookmarked: false
  },
  {
    id: 'rec3',
    brand: 'Atelier Minimal',
    title: 'Leather Shoulder Bag',
    price: 75,
    sizes: 'One Size',
    whyRecommended: 'Completes your Evening look',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQr7P4e0OVoTWfam1Bwyrk-VDLauqwHiqm78A8sTWAPKndK9usnI-BQ-60stj8cKA6LMP3vnpkf3UZQp2VX23KdtE-1lCD9tf0wgdBHM9ebi4NZMlwQxR4RkvFEKtltIgkbfqe1rfKJM0DhaoFIg1uoB7s1mDnzeBLLOx6Qp_B_wrrJ8IHZATyJ3EeGjbRR5zSOqzMtZsSKJHj718HH1MV3dl6OIAEVA6z6PMn9F6m4-rVckn1DaOqlQ',
    isBookmarked: false
  },
  {
    id: 'rec4',
    brand: 'Zara Woman',
    title: 'Kitten-Heel Pointed Loafers',
    price: 65,
    sizes: 'Available on Zara',
    whyRecommended: 'Matches Capsule 94%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiE2Qfkfs9ECWGNFoFiEuYk9e2LfSlrbV_h8pyml6ew3cq4YhF6CeWK834VfDg7t_nq58wvdInxLuJ8fFsRAbRc_iJ6VqiXJpYxSaumH0aMW7cZtxDoUGEdCX3zwZrkifPoU7tX-pYxBaz6jH4_S9k43GkapfMQvxugXlVzDckhlPYdlDci-QN_jgdkOCWUmpB8UGk859bQ4c6Z_iFU2hD6rv-hFHbmvnNv00UOPTdy5a5YRQeYQLfA',
    isBookmarked: false
  }
];

export const TODAY_LOOK_DATA = {
  lookNumber: '084',
  title: 'The Atelier Tailored Drape',
  rationale: 'Soft textures balance structured tailoring for your morning studio meetings, transitioning effortlessly to evening cocktails.',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4o-pFpak2qbjWBb7WjoH5HTiYDBKhUejdYxKun7_IyQgxA25Pi6x63_8WYnVN1-rPLgFKYErILr2W457Y9LSztdMKyxgiH6CB8XN13mI2hn29Pa3GNh6dkydhmxrMm_CCOXSor1xr0K8dpokg1DbwMPl-dUBGUDOC1cKIKm_OELc4FEwM7XGFXQI3AxbZE7kNRI0tN9J8lf8Ew1kW8MfLZ6Ae_Cx0y6nKeO9FEVo28_5pAGAMkt7lg',
  heroItemName: 'Oatmeal Cashmere',
  heroItemDesc: 'Oversized knit · Loro Piana',
  shoeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZXj660QattmeE9XJHv-NRJNL5w8h3X0arZipXmwl7-dTWJCYQt103sOKTXFIdUMBf3mKr_8TkFHlgfnUs7hIt7zQldFYF0ecaKETUzUSBQEZ39TMNy4Mz82bqKN2STH0bhGDGrbEe4YeD8CN5P6Ujuhabu1CjwK87iTo2TRa3j_IAgTFAS29gAkZ-8aB4DbZf2Yus4XvQ7eQ8GtZd6tviH6rLyI_hl3MU9g3MX2elcYOK8sAZS_f-2w',
  shoeTag: 'Slingbacks',
  bagImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuYgXTDluDrCDtxVk4uGhbULnQsoV_-lLlOkzLuQyhWpNN6qr9S31MfXxTsMExdZOQrOmMd31R_SbqHZe-o14CTi8TAmqkf1wX6Sim5qo1XG7xuM0XICEu51FETB-InvnWTOMjGfd1iqGxYPN7I0TwgqdJNCQ8zyIXn-8QxvbKpY7pWPQLq-Z3Ull-KbHKMGzmQaEw03zDkNPbS7IEmqnMVCoxGDF1Es52zZiCBnsaK7yI3sYgtjM6vA',
  bagTag: 'Croc Tote',
  paletteColors: ['#E8E1D7', '#3E2B25', '#501624']
};
