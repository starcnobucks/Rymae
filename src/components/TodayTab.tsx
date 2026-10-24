import React, { useState, useEffect } from 'react';
import { TODAY_LOOK_DATA } from '../data/mockData';
import {
  UserEvent,
  LiveWeatherContext,
  formatRelativeDays,
  calculateDaysUntil,
  generateWeatherStylingNote,
  filterUpcomingEvents
} from '../utils/wardrobeLogic';
import {
  LocationOption,
  CURATED_LOCATIONS,
  getStoredLocation,
  saveStoredLocation,
  fetchLiveWeather,
  toggleStoredEventReminder
} from '../services/contextService';

interface TodayTabProps {
  onOpenStylist: () => void;
  onOpenTryOn: () => void;
  onSaveLook: () => void;
  onOpenCalendar: () => void;
  events: UserEvent[];
  onEventsChange: (updated: UserEvent[]) => void;
  onShowToast: (msg: string) => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  onOpenStylist,
  onOpenTryOn,
  onSaveLook,
  onOpenCalendar,
  events,
  onEventsChange,
  onShowToast
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState('Office Meeting');
  const [isWorn, setIsWorn] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Live Time state updating every 10 seconds
  const [currentTime, setCurrentTime] = useState(new Date());

  // Location & Weather state
  const [location, setLocation] = useState<LocationOption>(getStoredLocation());
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [customCityInput, setCustomCityInput] = useState('');
  const [weather, setWeather] = useState<LiveWeatherContext>({
    temperatureC: 17,
    feelsLikeC: 16,
    condition: 'Crisp Autumn Air',
    rainProbability: 10,
    humidity: 62,
    windKmH: 12,
    city: 'London',
    timezone: 'Europe/London',
    isLive: true,
    lastUpdated: '12:00'
  });
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Tick clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live weather when location changes
  useEffect(() => {
    let isMounted = true;
    setIsWeatherLoading(true);
    fetchLiveWeather(location)
      .then(wData => {
        if (isMounted) {
          setWeather(wData);
          setIsWeatherLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsWeatherLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [location]);

  // Handle browser geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      onShowToast('Geolocation is not supported by your browser');
      return;
    }
    onShowToast('Requesting browser location permission...');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const newLoc: LocationOption = {
          city: 'My Location',
          country: '',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        setLocation(newLoc);
        saveStoredLocation(newLoc);
        setIsLocationModalOpen(false);
        onShowToast(`Location updated to GPS coordinates (${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)})`);
      },
      err => {
        console.warn('Geolocation permission denied or failed', err);
        onShowToast('Location permission denied. Continuing with selected city.');
      },
      { timeout: 8000 }
    );
  };

  const handleSelectCity = (loc: LocationOption) => {
    setLocation(loc);
    saveStoredLocation(loc);
    setIsLocationModalOpen(false);
    onShowToast(`Location set to ${loc.city}, ${loc.country}`);
  };

  const handleCustomCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const name = customCityInput.trim();
    // Check if in curated
    const match = CURATED_LOCATIONS.find(l => l.city.toLowerCase() === name.toLowerCase());
    if (match) {
      handleSelectCity(match);
    } else {
      const customLoc: LocationOption = {
        city: name,
        country: 'Global',
        lat: 51.5,
        lon: -0.12,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      handleSelectCity(customLoc);
    }
    setCustomCityInput('');
  };

  // Weather-aware recommendation
  const weatherStylingNote = generateWeatherStylingNote(weather);

  // Dynamic occasion adaptations
  const occasionAdaptations: Record<string, {
    title: string;
    rationale: string;
    knitName: string;
    knitDesc: string;
    knitImg: string;
    shoeTag: string;
    shoeImg: string;
  }> = {
    'Office Meeting': {
      title: 'The Atelier Tailored Drape',
      rationale: 'Soft textures balance structured tailoring for your morning studio meetings, transitioning effortlessly to evening cocktails.',
      knitName: 'Oatmeal Cashmere',
      knitDesc: 'Oversized knit · Loro Piana',
      knitImg: TODAY_LOOK_DATA.heroImage,
      shoeTag: 'Slingbacks',
      shoeImg: TODAY_LOOK_DATA.shoeImage,
    },
    'Gallery Opening': {
      title: 'The Modern Curator Look',
      rationale: 'Deep oxblood accents with sculptural kitten heels deliver gallery-walking comfort with elevated architectural poise.',
      knitName: 'Merino Mockneck',
      knitDesc: 'Fine knit in Deep Wine · Mango Atelier',
      knitImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzkudO9UjEzSLkDBrR0ARWmRaOtZYhbrqtcb_a-223oyJbsOVz6HtfYw0c685h7HfSdR0RpfGqNX1V_FwxOc6FrNnZF4KN3SAAOb-6BSV1F98NM6gILOWfEKs28dk3x8P_JA8IggpjVhSEWR7dobUL-o3tzKnPtum4JeNZP99dilvpUwqr6wNm6w1sKmkiWnpmckEAhQcAsMKE_0uTOzrR1seTuLhmyFr7F7X-fFSSvs5lYBV9QnMyZQ',
      shoeTag: 'Comfort Kitten',
      shoeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcxF-ib12uSvsTGwkt-uhQKIRfvY92DP6OyRPogME_BuwU8GA3K9MHnSra0oqWsh_xYWOAa-w8fVpWiDDvVNnaQtPRKY1Od-2VwAKEaTvyDBtqSD-_7Y3sPhrMKau8E88hE-2pohpwhoOGShyYtnQhdXpu7wXgYA25UpQkVvswxHcZJt1ObtkFoy4v_Hqja_KPDSAEfId1ZezoaM4gHkz0F4w2c-d9gvqfa46A4-haJcZlWtv88YvoA',
    },
    'Casual Friday': {
      title: 'Relaxed Architectural Cashmere',
      rationale: 'Unbuttoned drape with relaxed trousers provides effortless ease while maintaining clean monochromatic discipline.',
      knitName: 'Espresso Chunky Knit',
      knitDesc: 'Pure ribbed cashmere · Khaite',
      knitImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxL4Q7UnHCcedfVZHwncBJhlRDG_qJLXnam2_QkDth_oMeeC9fB5q0jI_x1cR2WcLgg3emY3W0my990PRCRhxabDqXp_R7PLaBzMcHN5sGTwcdmSiNPFqJb8a2xZtCo7EabkwQpUUUcHNlxfHGRfCoZTaoa6beNgPBhIvaPS-FTUkBSlx6hVHx2LTxhXOhLH0VEizGDbaSKSSUGrjwj0I-mn7UAxEKxpWdN1RzzUFOOOrZLzEG8zewQQ',
      shoeTag: 'Leather Loafers',
      shoeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiE2Qfkfs9ECWGNFoFiEuYk9e2LfSlrbV_h8pyml6ew3cq4YhF6CeWK834VfDg7t_nq58wvdInxLuJ8fFsRAbRc_iJ6VqiXJpYxSaumH0aMW7cZtxDoUGEdCX3zwZrkifPoU7tX-pYxBaz6jH4_S9k43GkapfMQvxugXlVzDckhlPYdlDci-QN_jgdkOCWUmpB8UGk859bQ4c6Z_iFU2hD6rv-hFHbmvnNv00UOPTdy5a5YRQeYQLfA',
    },
    'Rainy Day': {
      title: 'Water-Resistant Wool & Leather Layer',
      rationale: 'Treated double-faced wool trench paired with calfskin boots guards against autumn showers with high-fashion poise.',
      knitName: 'Totême Wool Wrap',
      knitDesc: 'Structured weather shield coat',
      knitImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7s_pIdDHBSZGtXg6L09-PHI4wnKBc2rMoHlsN8WaLXp26k4mMCgSviu47stBp0s3EF_PQ0YANz5mQZ_BgJnQ6I1fhvE0V7lJ5aa3vEJpoIW1xFw7L8iw9Qx5IASG-0RyVMLa93-8S7ZKwBXoARRIV0Gk1Q6gi-8PyTNMRn5p1JfO8So-gBtizh4RPYavTIQ1ys0WPkxLF_dp8e4mQadQGnXRyDJGRIBMvIPDlR5aPO7ff9Ihil3htg',
      shoeTag: 'Waterproof Calfskin',
      shoeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkUA3IbDrWgntGa-uuEQtfB_3LGkuvFFaHsJ7irvyzUN24sWdm8SnSFOcINaWbfNDrtJBl0gVOZlHJz4HYKnC2wpNIFZfSWroXWiKxXrltTpzJ5W96ur6_MVXuUwFwuZsOJlw51FnfcDdH6c5OQKiLryvLeZh3DOzl1X2DPrkzj38W3hgOWD63skhV_ThUIFIf4pBxFwPTrjfDXSzlmmtnOlLZPLxcM9wFPWcwTUK4RpAWL4NMJUyQRw',
    },
    'Under $100': {
      title: 'High-Low Studio Edit',
      rationale: 'Recombines 100% owned luxury foundation pieces with a versatile $55 silk-blend mockneck addition.',
      knitName: 'Silk-Blend Mockneck',
      knitDesc: 'High-street atelier complement',
      knitImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPWOwCRa38DOYnKwDQUqR3FM86VdTV6AOwTTvkFqyZB3_HETqvEBabgfyeXgyu6kYmx2GZiIyBuVRtV5T0AOFOaXgGGDgP3y9g85yBlZlpH8-KhD4Hn8o6qGMT5dDakdcYd7q8ktiMarskv9xGYEz2kslK1O89l_bz_BYv3743mWBxLCrFt42THFTyQk84WUk4yVqrrMJ5rBauiwoIjr1VQEtCwLbxvAtSo38Nt65_LF3Ed55AcSaCWg',
      shoeTag: 'Pointed Loafers',
      shoeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMiE2Qfkfs9ECWGNFoFiEuYk9e2LfSlrbV_h8pyml6ew3cq4YhF6CeWK834VfDg7t_nq58wvdInxLuJ8fFsRAbRc_iJ6VqiXJpYxSaumH0aMW7cZtxDoUGEdCX3zwZrkifPoU7tX-pYxBaz6jH4_S9k43GkapfMQvxugXlVzDckhlPYdlDci-QN_jgdkOCWUmpB8UGk859bQ4c6Z_iFU2hD6rv-hFHbmvnNv00UOPTdy5a5YRQeYQLfA',
    }
  };

  const current = occasionAdaptations[selectedOccasion] || occasionAdaptations['Office Meeting'];

  // Greeting helper based on actual hour
  const currentHour = currentTime.getHours();
  const greeting = currentHour < 12 ? 'Bonjour, Camille' : currentHour < 18 ? 'Bon après-midi, Camille' : 'Bonsoir, Camille';
  const formattedDayDate = currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' });
  const formattedLocalClock = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Upcoming occasions list sorted
  const upcomingEvents = filterUpcomingEvents(events, currentTime);

  const handleWearLook = () => {
    setIsWorn(!isWorn);
    onShowToast(isWorn ? 'Ensemble unworn' : 'Look Nº 084 confirmed for today');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onShowToast(isBookmarked ? 'Removed from saved looks' : 'Look Nº 084 saved to archive');
  };

  const handleToggleReminderCheck = (eventId: string, reminderId: string) => {
    const updated = toggleStoredEventReminder(eventId, reminderId);
    onEventsChange(updated);
    onShowToast('Styling preparation milestone updated');
  };

  return (
    <div className="max-w-[430px] mx-auto px-5 pt-4 pb-28 space-y-6">
      {/* 1. Live Context Greeting & Device Time & Location */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[11px] font-semibold text-[#8A7D80] uppercase tracking-wider">
            {formattedDayDate} · {formattedLocalClock}
          </p>

          {/* Interactive Location & Weather Pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE8] border border-[rgba(104,32,48,0.12)] hover:border-[#4A1521]/40 active:scale-95 transition-all"
            type="button"
            title="Change Location or view Weather"
          >
            <span className="material-symbols-outlined text-[#4A1521] text-[15px]">
              {weather.condition.toLowerCase().includes('rain') ? 'umbrella' : 'wb_cloudy'}
            </span>
            <span className="font-sans text-[11px] text-[#574C4E] font-medium">
              {location.city} {weather.temperatureC}°C · {weather.condition}
            </span>
            <span className="material-symbols-outlined text-[13px] text-[#8A7D80]">expand_more</span>
          </button>
        </div>

        <h1 className="font-serif text-[28px] sm:text-[32px] text-[#4A1521] tracking-tight mt-1 leading-snug">
          {greeting}
        </h1>
        <p className="font-sans text-[13px] text-[#574C4E]">
          Curated for {location.city}'s atmosphere and your refined movement.
        </p>
      </section>

      {/* 2. Main Hero Section: Today's Look (Bento / Editorial Spread) */}
      <section className="relative bg-white rounded-xl p-4 shadow-[0_12px_32px_-4px_rgba(80,22,36,0.06),0_4px_12px_-2px_rgba(29,24,25,0.04)] border border-[rgba(104,32,48,0.12)]">
        {/* Header Tag & Palette Strip */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(104,32,48,0.12)]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F5E9EC] text-[#4A1521] font-sans text-[11px] font-semibold uppercase tracking-wider">
              Today's Ensemble
            </span>
            <span className="font-sans text-[12px] text-[#8A7D80]">Look Nº {TODAY_LOOK_DATA.lookNumber}</span>
          </div>
          {/* Wardrobe Palette Gauge */}
          <div className="flex items-center gap-1" title="Color composition">
            {TODAY_LOOK_DATA.paletteColors.map((color, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full ring-1 ring-[rgba(104,32,48,0.12)]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Editorial Outfit Composition: Asymmetric Collage */}
        <div className="grid grid-cols-12 gap-2.5 mt-3.5">
          {/* Large Garment Card (Left: Knit & Trousers Focus) */}
          <div
            onClick={onOpenTryOn}
            className="col-span-7 relative rounded-lg overflow-hidden bg-[#F4ECE8] aspect-[3/4] cursor-pointer group"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={current.knitImg}
              alt={current.knitName}
            />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-[rgba(104,32,48,0.12)]">
              <p className="font-sans text-[11px] text-[#1D1819] font-semibold truncate">
                {current.knitName}
              </p>
              <p className="font-sans text-[10px] text-[#8A7D80] truncate">{current.knitDesc}</p>
            </div>
            <div className="absolute top-2 left-2 bg-[#3B121B]/85 text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Try In Atelier
            </div>
          </div>

          {/* Stacked Right Column: Accessories Details */}
          <div className="col-span-5 flex flex-col gap-2.5">
            {/* Slingbacks */}
            <div
              onClick={onOpenTryOn}
              className="relative rounded-lg overflow-hidden bg-[#F4ECE8] flex-1 min-h-[110px] cursor-pointer group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={current.shoeImg}
                alt={current.shoeTag}
              />
              <span className="absolute top-2 right-2 bg-[#F4ECE8]/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-sans text-[#4A1521] font-semibold">
                {current.shoeTag}
              </span>
            </div>

            {/* Croc Tote */}
            <div
              onClick={onOpenTryOn}
              className="relative rounded-lg overflow-hidden bg-[#F4ECE8] flex-1 min-h-[110px] cursor-pointer group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={TODAY_LOOK_DATA.bagImage}
                alt={TODAY_LOOK_DATA.bagTag}
              />
              <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-sans text-[#574C4E] font-medium">
                {TODAY_LOOK_DATA.bagTag}
              </span>
            </div>
          </div>
        </div>

        {/* Look Metadata / Composition Footnote */}
        <div className="mt-3.5 pt-3 border-t border-[rgba(104,32,48,0.12)]">
          <h2 className="font-serif text-[20px] text-[#1D1819] tracking-tight font-medium">
            {current.title}
          </h2>

          {/* Stylist Rationale Box */}
          <div className="mt-2.5 p-3 rounded-lg bg-[#F4ECE8] border border-[rgba(104,32,48,0.12)] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#4A1521] text-[18px] mt-0.5 flex-shrink-0">
              stylus
            </span>
            <div>
              <p className="font-sans text-[11px] text-[#4A1521] font-semibold uppercase tracking-wider mb-0.5">
                Stylist Rationale
              </p>
              <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">
                {current.rationale}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar: Wear this, Swap, Heart, Reject */}
        <div className="mt-4 pt-3.5 border-t border-[rgba(104,32,48,0.12)] flex items-center justify-between gap-2">
          {/* Primary Pill: Wear this */}
          <button
            onClick={handleWearLook}
            className={`flex-1 h-12 rounded-full font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm ${
              isWorn
                ? 'bg-[#546255] text-white border border-[#546255]'
                : 'bg-[#3B121B] hover:bg-[#501624] text-white border border-[#C5A880]/60'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isWorn ? 'task_alt' : 'check'}
            </span>
            <span>{isWorn ? 'Ensemble Worn' : 'Wear this'}</span>
          </button>

          {/* Secondary Pill: Swap an item */}
          <button
            onClick={onOpenTryOn}
            className="h-12 px-4 rounded-full border border-[#E2D7D1] bg-transparent text-[#1D1819] font-sans text-[12px] font-medium hover:bg-[#F4ECE8] active:scale-95 transition-all flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">sync_alt</span>
            <span>Swap</span>
          </button>

          {/* Bookmark Button */}
          <button
            aria-label="Save outfit"
            onClick={handleBookmark}
            className={`w-12 h-12 rounded-full border border-[#E2D7D1] flex items-center justify-center active:scale-95 transition-transform ${
              isBookmarked ? 'bg-[#F5E9EC] text-[#4A1521]' : 'text-[#4A1521] hover:bg-[#F5E9EC]'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              bookmark
            </span>
          </button>

          {/* Not for me Button */}
          <button
            aria-label="Not for me"
            onClick={() => onShowToast('Noted: Camille prefers alternative silhouettes')}
            className="w-10 h-12 rounded-full flex items-center justify-center text-[#8A7D80] hover:text-[#4A1521] active:scale-95 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </section>

      {/* 3. YOUR STYLE, RIGHT NOW — Live Weather Context Card */}
      <section className="bg-white rounded-xl p-4 border border-[rgba(104,32,48,0.12)] shadow-sm space-y-2.5">
        <div className="flex items-center justify-between border-b border-[rgba(104,32,48,0.08)] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4A1521] text-[16px]">thermostat</span>
            <span
              className="text-[#3B121B] font-bold uppercase text-[11px] tracking-[0.2em]"
              style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
            >
              YOUR STYLE, RIGHT NOW
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-sans text-[#8A7D80]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#546255] inline-block" />
            <span>{weather.isLive ? 'Live Sensor' : 'Cached Feed'}</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <p className="font-serif text-[18px] text-[#1D1819] font-medium">
            {location.city} · {formattedLocalClock} · {weather.temperatureC}°C
          </p>
          <span className="font-sans text-[11px] font-semibold text-[#574C4E] px-2 py-0.5 rounded-full bg-[#F4ECE8]">
            {weather.condition}
          </span>
        </div>

        {/* Dynamic weather-derived styling note */}
        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.1)]">
          <p className="font-sans text-[10px] text-[#4A1521] font-bold uppercase tracking-wider mb-0.5">
            {weatherStylingNote.headline}
          </p>
          <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">
            “{weatherStylingNote.recommendation}”
          </p>
          <div className="mt-2 flex items-center gap-3 text-[10px] font-sans text-[#8A7D80] border-t border-[rgba(104,32,48,0.08)] pt-1.5">
            <span>Feels like: {weather.feelsLikeC}°C</span>
            <span>Precipitation: {weather.rainProbability}%</span>
            <span>Wind: {weather.windKmH} km/h</span>
          </div>
        </div>
      </section>

      {/* 4. Occasion Adaptations: "Make it work for my day" */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
            Make it work for my day
          </h3>
          <button
            onClick={onOpenStylist}
            className="font-sans text-[11px] text-[#4A1521] font-semibold uppercase tracking-wider hover:underline"
            type="button"
          >
            Re-tailor
          </button>
        </div>

        {/* Horizontal Scrollable Occasion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
          {['Office Meeting', 'Gallery Opening', 'Casual Friday', 'Rainy Day', 'Under $100'].map((occ) => {
            const isActive = selectedOccasion === occ;
            return (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`whitespace-nowrap h-9 px-4 rounded-full font-sans text-[12px] font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#3B121B] text-white border border-[#C5A880]/50 shadow-sm'
                    : 'bg-[#F4ECE8] text-[#574C4E] border border-[rgba(104,32,48,0.12)] hover:text-[#4A1521]'
                }`}
                type="button"
              >
                {occ === 'Rainy Day' && (
                  <span className="material-symbols-outlined text-[15px]">umbrella</span>
                )}
                <span>{occ}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. DEDICATED UPCOMING OCCASIONS SECTION (Core User Request) */}
      <section className="space-y-3.5">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
              Upcoming Occasions
            </h3>
            <p className="font-sans text-[12px] text-[#8A7D80]">
              Linked couture looks & preparation milestones
            </p>
          </div>
          <button
            onClick={onOpenCalendar}
            className="font-sans text-[11px] text-[#4A1521] font-semibold uppercase tracking-wider hover:underline flex items-center gap-0.5"
            type="button"
          >
            <span>Full Calendar</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-xl p-5 border border-dashed border-[rgba(104,32,48,0.2)] text-center space-y-2">
            <span className="material-symbols-outlined text-[28px] text-[#8A7D80]">event_available</span>
            <p className="font-sans text-[13px] text-[#574C4E]">No upcoming occasions scheduled.</p>
            <button
              onClick={onOpenCalendar}
              className="px-4 py-2 rounded-full bg-[#3B121B] text-white font-sans text-[11px] font-semibold uppercase tracking-wider"
              type="button"
            >
              Add First Occasion
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 3).map(ev => {
              const daysLeft = calculateDaysUntil(ev.date, currentTime);
              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-xl p-4 border border-[rgba(104,32,48,0.12)] shadow-sm hover:border-[#4A1521]/30 transition-all space-y-3"
                >
                  {/* Event Title Header with Countdown Badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#F4ECE8] text-[#4A1521] font-sans text-[10px] font-semibold uppercase tracking-wider">
                          {ev.category}
                        </span>
                        <span className="font-sans text-[11px] font-bold text-[#8A7D80]">
                          {formatRelativeDays(daysLeft)} · {ev.date}
                        </span>
                      </div>
                      <h4 className="font-serif text-[17px] text-[#1D1819] font-medium mt-1 leading-snug">
                        {ev.title}
                      </h4>
                      <p className="font-sans text-[12px] text-[#574C4E] mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#8A7D80]">location_on</span>
                        <span>{ev.location}</span>
                      </p>
                    </div>

                    <button
                      onClick={onOpenCalendar}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E2D7D1] text-[#4A1521] hover:bg-[#F4ECE8]"
                      type="button"
                      aria-label="Edit Occasion in Planner"
                    >
                      <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
                    </button>
                  </div>

                  {/* Dress Code Footnote */}
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.08)] flex items-center justify-between text-[11px] font-sans">
                    <span className="text-[#8A7D80]">Dress Code:</span>
                    <span className="font-medium text-[#1D1819]">{ev.dressCode}</span>
                  </div>

                  {/* Linked Look Section */}
                  <div className="pt-1">
                    <p className="font-sans text-[10px] text-[#8A7D80] font-bold uppercase tracking-wider mb-1.5">
                      Curated Look
                    </p>
                    {ev.linkedLook ? (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4ECE8] border border-[rgba(104,32,48,0.1)]">
                        <div
                          onClick={onOpenTryOn}
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
                        >
                          <img
                            src={ev.linkedLook.thumbnail}
                            alt=""
                            className="w-12 h-14 rounded object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <p className="font-serif text-[13px] text-[#1D1819] font-medium truncate group-hover:text-[#4A1521]">
                              {ev.linkedLook.title}
                            </p>
                            <p className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider">
                              {ev.linkedLook.styleCategory} · {ev.linkedLook.layersCount || 3} layers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={onOpenTryOn}
                            className="px-2.5 py-1 rounded-full bg-[#3B121B] text-white font-sans text-[10px] font-semibold uppercase tracking-wider"
                            type="button"
                          >
                            Atelier
                          </button>
                          <button
                            onClick={onOpenCalendar}
                            className="px-2 py-1 rounded-full border border-[#C5A880] text-[#4A1521] font-sans text-[10px] font-medium hover:bg-white"
                            type="button"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={onOpenCalendar}
                        className="w-full py-2.5 rounded-lg border border-dashed border-[#4A1521]/40 bg-[#FAF8F5] text-[#4A1521] font-sans text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#F4ECE8] transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_link</span>
                        <span>Link Saved Atelier Look</span>
                      </button>
                    )}
                  </div>

                  {/* Styling Preparation Reminders Checklist */}
                  <div className="pt-2 border-t border-[rgba(104,32,48,0.08)] space-y-1.5">
                    <p className="font-sans text-[10px] text-[#8A7D80] font-bold uppercase tracking-wider">
                      Styling Preparation Checklist
                    </p>
                    <div className="space-y-1">
                      {ev.reminders.map(rem => (
                        <div
                          key={rem.id}
                          onClick={() => handleToggleReminderCheck(ev.id, rem.id)}
                          className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-sans cursor-pointer transition-all ${
                            rem.completed
                              ? 'bg-[#F4ECE8]/50 border-transparent text-[#8A7D80] line-through'
                              : 'bg-white border-[rgba(104,32,48,0.1)] text-[#1D1819] hover:border-[#4A1521]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-[#4A1521]">
                              {rem.completed ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span>{rem.label}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7D80]">
                            {rem.daysBefore === 0 ? 'Day of' : `T-${rem.daysBefore}d`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. From Your Wardrobe: Alternative mixes using owned garments */}
      <section className="space-y-3.5">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">
              From your wardrobe
            </h3>
            <p className="font-sans text-[12px] text-[#8A7D80]">
              Recombining 8 pieces you already own
            </p>
          </div>
          <button
            onClick={onOpenTryOn}
            className="font-sans text-[11px] text-[#4A1521] font-semibold uppercase tracking-wider hover:underline"
            type="button"
          >
            See all
          </button>
        </div>

        {/* 2-Column Lookbook Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1: Autumn Monochrome */}
          <div
            onClick={onOpenTryOn}
            className="bg-white rounded-xl p-3 border border-[rgba(104,32,48,0.12)] shadow-sm hover:border-[#4A1521]/30 transition-all cursor-pointer group"
          >
            <div className="relative rounded-lg overflow-hidden bg-[#F4ECE8] aspect-[3/4]">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxL4Q7UnHCcedfVZHwncBJhlRDG_qJLXnam2_QkDth_oMeeC9fB5q0jI_x1cR2WcLgg3emY3W0my990PRCRhxabDqXp_R7PLaBzMcHN5sGTwcdmSiNPFqJb8a2xZtCo7EabkwQpUUUcHNlxfHGRfCoZTaoa6beNgPBhIvaPS-FTUkBSlx6hVHx2LTxhXOhLH0VEizGDbaSKSSUGrjwj0I-mn7UAxEKxpWdN1RzzUFOOOrZLzEG8zewQQ"
                alt="Autumn Monochrome"
              />
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-sans text-[#1D1819] font-semibold">
                100% Owned
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="font-serif text-[14px] text-[#1D1819] font-medium leading-snug">
                Autumn Monochrome
              </h4>
              <p className="font-sans text-[11px] text-[#574C4E] mt-0.5">
                Camel coat + Tan knit
              </p>
              <div className="flex items-center gap-1 mt-2 text-[#4A1521]">
                <span className="material-symbols-outlined text-[14px]">checkroom</span>
                <span className="font-sans text-[11px] font-medium">3 items matched</span>
              </div>
            </div>
          </div>

          {/* Card 2: Silk & Wool Contrast */}
          <div
            onClick={onOpenTryOn}
            className="bg-white rounded-xl p-3 border border-[rgba(104,32,48,0.12)] shadow-sm hover:border-[#4A1521]/30 transition-all cursor-pointer group"
          >
            <div className="relative rounded-lg overflow-hidden bg-[#F4ECE8] aspect-[3/4]">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPWOwCRa38DOYnKwDQUqR3FM86VdTV6AOwTTvkFqyZB3_HETqvEBabgfyeXgyu6kYmx2GZiIyBuVRtV5T0AOFOaXgGGDgP3y9g85yBlZlpH8-KhD4Hn8o6qGMT5dDakdcYd7q8ktiMarskv9xGYEz2kslK1O89l_bz_BYv3743mWBxLCrFt42THFTyQk84WUk4yVqrrMJ5rBauiwoIjr1VQEtCwLbxvAtSo38Nt65_LF3Ed55AcSaCWg"
                alt="Silk & Wool Contrast"
              />
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-sans text-[#1D1819] font-semibold">
                2 Owned + 1 New
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="font-serif text-[14px] text-[#1D1819] font-medium leading-snug">
                Silk & Wool Contrast
              </h4>
              <p className="font-sans text-[11px] text-[#574C4E] mt-0.5">
                Silk slip + Structured blazer
              </p>
              <div className="flex items-center gap-1 mt-2 text-[#4A1521]">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span className="font-sans text-[11px] font-medium">Subtle day-to-night</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Editorial Trend Intelligence Card */}
      <section className="bg-white rounded-xl p-4 border border-[rgba(104,32,48,0.12)] shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-20 h-24 rounded-lg bg-[#F4ECE8] flex-shrink-0 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtXIUUyUbx-W4gXoQkid07ZyrNvF2eNll1e0nwN2fcfhheLjnpVOk8qPN091-Vy_-5qs7FxXibmOIqFLr3fBJ7i6pZsoYkMt7qarENymuIY5u4Gk_q-ZUX9gcAZKdmBbsnl1DdGtVDPFMtmq4v9-_aG53Y9uqZ8k-Zik1bAu-hhFHnwr3qLYmF9vwuoKaGzJ9c-31paD_orqux_IY_B56SZLKOTX2E0yan7FPrl8MnHJjCnFr6BPoRCA"
              alt="Burgundy leather texture"
            />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3EDE4] text-[#3B121B] mb-1">
              <span className="material-symbols-outlined text-[14px]">insights</span>
              <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">
                A trend that fits your style
              </span>
            </div>
            <h4 className="font-serif text-[16px] leading-snug text-[#1D1819] font-medium">
              Quiet Luxury Burgundy Leather
            </h4>
            <p className="font-sans text-[12px] text-[#574C4E] mt-1 leading-snug">
              Pairs seamlessly with your existing camel wool coat and vintage denim.
            </p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[rgba(104,32,48,0.12)] text-[#8A7D80]">
              <span className="material-symbols-outlined text-[13px]">menu_book</span>
              <cite className="font-sans text-[10px] not-italic">
                Vogue Trend Report, Oct 2026
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCATION SELECTION MODAL --- */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#121011]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[360px] bg-[#FAF8F5] rounded-2xl p-5 shadow-2xl border border-[#E8E3DC] space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-[#E8E3DC] pb-3">
              <div>
                <h3 className="font-serif text-[17px] text-[#3B121B] font-medium">Select Location</h3>
                <p className="text-[11px] text-[#8A7D80]">Updates time, weather, and styling context</p>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#8A7D80]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* GPS Location Option */}
            <button
              onClick={handleUseCurrentLocation}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-[rgba(104,32,48,0.15)] text-[#4A1521] text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-[#F4ECE8] active:scale-95 transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
              <span>Use My Device Location</span>
            </button>

            {/* Search Input */}
            <form onSubmit={handleCustomCitySearch} className="flex gap-1.5">
              <input
                type="text"
                value={customCityInput}
                onChange={e => setCustomCityInput(e.target.value)}
                placeholder="Search city (e.g. Pune, Paris...)"
                className="flex-1 bg-white text-[12px] px-3 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] focus:outline-none focus:border-[#4A1521]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#3B121B] text-white rounded-lg text-[11px] font-semibold uppercase tracking-wider"
              >
                Go
              </button>
            </form>

            {/* Curated Luxury Capitals List */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#8A7D80] uppercase tracking-wider">
                Fashion Capitals & Regions
              </p>
              <div className="max-h-[180px] overflow-y-auto no-scrollbar space-y-1">
                {CURATED_LOCATIONS.map(loc => (
                  <button
                    key={loc.city}
                    onClick={() => handleSelectCity(loc)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-[12px] transition-colors ${
                      location.city === loc.city
                        ? 'bg-[#3B121B] text-white'
                        : 'bg-white hover:bg-[#F4ECE8] text-[#1D1819]'
                    }`}
                    type="button"
                  >
                    <span className="font-medium">{loc.city}</span>
                    <span className="text-[11px] opacity-75">{loc.country}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
