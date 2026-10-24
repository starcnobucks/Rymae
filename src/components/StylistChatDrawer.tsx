import React, { useState } from 'react';

interface StylistChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'stylist';
  time: string;
  text?: string;
  isLookCard?: boolean;
}

export const StylistChatDrawer: React.FC<StylistChatDrawerProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      time: '18:42',
      text: '"I need an elevated look for a gallery opening in Mayfair tonight. Chic but not overly stiff, comfortable shoes, budget around $150 if adding a new piece."'
    },
    {
      id: 'm2',
      sender: 'stylist',
      time: 'Just now',
      isLookCard: true
    }
  ]);

  const [feedbackLiked, setFeedbackLiked] = useState(false);
  const [flatAlternativeActive, setFlatAlternativeActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `"${text}"`
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Gather active context
      const loc = localStorage.getItem('rymae_selected_location_v1');
      const events = localStorage.getItem('rymae_user_events_v2');

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            location: loc ? JSON.parse(loc) : { city: 'London' },
            upcomingEvents: events ? JSON.parse(events) : []
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyMsg: ChatMessage = {
          id: 'reply-' + Date.now(),
          sender: 'stylist',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: data.reply
        };
        setMessages(prev => [...prev, replyMsg]);
        setIsTyping(false);
        onShowToast('Couture Advisory consultation updated');
        return;
      }
    } catch (err) {
      console.warn('Live chat API call fallback', err);
    }

    // Heuristic Fallback
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'stylist',
        time: 'Just now',
        text: text.toLowerCase().includes('flat')
          ? "I've recalibrated the ensemble with The Row black nappa point-toe flats, reducing new acquisitions while preserving your gallery-walking poise."
          : text.toLowerCase().includes('coat') || text.toLowerCase().includes('weather')
          ? "Added your Totême double-breasted oxblood trench as the architectural outer layer to drape over shoulders against the crisp air."
          : text.toLowerCase().includes('trend')
          ? "AW26 intelligence highlights Quiet Luxury Oxblood Leather and Monastic Draping—both seamlessly match your existing trench and cashmere."
          : "Analyzing your catalogued wardrobe items and autumn schedule to assemble a balanced variation with warm neutrals."
      };
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
      onShowToast('Couture Advisory consultation updated');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121011]/80 backdrop-blur-sm flex justify-center selection:bg-[#F5E9EC] selection:text-[#501624]">
      {/* Mobile container centered (390px baseline luxury viewport) */}
      <main className="w-full max-w-[430px] min-h-screen bg-[#FAF8F5] flex flex-col relative overflow-hidden shadow-2xl">
        {/* 1. Top Navigation Header */}
        <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-3 flex flex-col gap-1.5 shadow-[0_4px_20px_rgba(80,22,36,0.03)] border-b border-[#E8E3DC]">
          <div className="flex items-center justify-between">
            <button
              aria-label="Go back"
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A1521] hover:bg-[#F4ECE8] transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex flex-col items-center">
              <span
                className="text-[#3B121B] font-bold uppercase text-[15px] tracking-[0.22em]"
                style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
              >
                RYMAE STYLIST
              </span>
              <span className="font-sans text-[10px] text-[#8A7D80] flex items-center gap-1 font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#546255] inline-block animate-pulse" />
                <span>RYMAE ATELIER CONSULTATION</span>
              </span>
            </div>
            <button
              aria-label="Stylist options"
              onClick={() => onShowToast('Consultation preferences calibrated')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A1521] hover:bg-[#F4ECE8] transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>

          {/* Memory Context Pill */}
          <div className="self-center flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE8]/80 border border-[#E8E3DC] shadow-xs max-w-full">
            <span className="material-symbols-outlined text-[#C06C78] text-[13px]">auto_awesome</span>
            <p className="font-sans text-[10.5px] text-[#574C4E] truncate">
              Using your style preferences <span className="text-[#501624] font-semibold">(Minimal, Warm Neutrals, Relaxed Fit)</span>
            </p>
          </div>
        </header>

        {/* 2. Chat Stream Area */}
        <div className="flex-1 px-4 pt-3 pb-36 space-y-4 overflow-y-auto custom-scroll">
          {/* Timestamp Divider */}
          <div className="flex items-center justify-center my-1">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#8A7D80] px-3 py-0.5 rounded-full bg-[#F5F3F0]">
              Today • London, Mayfair Evening
            </span>
          </div>

          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex flex-col items-end pl-10">
                  <div className="bg-[#3B121B] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md border border-[#4A1521]/40">
                    <p className="font-sans text-[13px] leading-relaxed text-[#FAF8F5]">
                      {msg.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 mr-1">
                    <span className="font-sans text-[10px] text-[#8A7D80]">Sent • {msg.time}</span>
                    <span className="material-symbols-outlined text-[13px] text-[#546255]">done_all</span>
                  </div>
                </div>
              );
            }

            if (!msg.isLookCard) {
              return (
                <div key={msg.id} className="space-y-1.5 pr-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#3B121B] flex items-center justify-center text-[#C5A880] shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                    </div>
                    <span className="font-sans text-[12px] font-semibold text-[#501624]">Couture Advisory</span>
                    <span className="font-sans text-[10px] text-[#8A7D80]">{msg.time}</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 border border-[#E8E3DC] shadow-sm">
                    <p className="font-sans text-[13px] text-[#1D1819] leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }

            // Master Look Composition Card
            return (
              <div key={msg.id} className="space-y-3">
                {/* AI Stylist Meta Header */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3B121B] flex items-center justify-center text-[#C5A880] shadow-sm border border-[#C5A880]/30">
                    <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                  </div>
                  <span className="font-sans text-[12px] font-semibold text-[#501624]">Couture Advisory</span>
                  <span className="w-1 h-1 rounded-full bg-[#8A7D80]" />
                  <span className="font-sans text-[11px] text-[#8A7D80]">{msg.time}</span>
                </div>

                {/* Stylist Context Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E5EBE5]/70 border border-[#546255]/20">
                  <span className="material-symbols-outlined text-[#546255] text-[14px]">thermostat</span>
                  <p className="font-sans text-[11px] text-[#546255]">
                    Refined with your preferences & local evening weather <span className="font-semibold">(14°C, Crisp Clear)</span>
                  </p>
                </div>

                {/* Master Look Card */}
                <article className="bg-white rounded-xl border border-[rgba(104,32,48,0.12)] shadow-md overflow-hidden">
                  {/* Brief Header */}
                  <div className="p-4 bg-gradient-to-b from-[#F5F2EC] to-white border-b border-[#E8E3DC]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-[#725B38] font-bold">
                        Curated Ensemble
                      </span>
                      <span className="font-sans text-[11px] text-[#3B121B] bg-[#F3EDE4] border border-[#C5A880]/30 px-2 py-0.5 rounded-full font-semibold">
                        Curation #408
                      </span>
                    </div>
                    <h3 className="font-serif text-[22px] text-[#3B121B] font-medium tracking-tight">
                      The Modern Curator Look
                    </h3>
                    <p className="font-sans text-[12px] text-[#706963] mt-1 leading-snug">
                      Combining your owned silk bias-cut skirt with a structured oxblood knit and architectural kitten heels.
                    </p>
                  </div>

                  {/* Palette Tone Ratio Strip */}
                  <div className="px-4 py-2 border-y border-[rgba(104,32,48,0.12)] bg-[#FAF8F5] flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#8A7D80] font-semibold">
                      Palette Tone Ratio
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-2.5 w-28 rounded-full overflow-hidden border border-[#E8E3DC]">
                        <div className="w-[55%] bg-[#E8DEC8]" title="Warm Champagne Silk (55%)" />
                        <div className="w-[35%] bg-[#4A1521]" title="Bordeaux Noir (35%)" />
                        <div className="w-[10%] bg-[#141212]" title="Obsidian Noir (10%)" />
                      </div>
                      <span className="font-sans text-[10.5px] text-[#574C4E] font-medium">
                        Champagne / Oxblood
                      </span>
                    </div>
                  </div>

                  {/* Visual Look Canvas Spreads */}
                  <div className="p-4 grid grid-cols-12 gap-2.5">
                    {/* Main Left Image */}
                    <div className="col-span-7 relative rounded-lg overflow-hidden border border-[#E8E3DC] bg-[#F4ECE8] aspect-[3/4]">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzkudO9UjEzSLkDBrR0ARWmRaOtZYhbrqtcb_a-223oyJbsOVz6HtfYw0c685h7HfSdR0RpfGqNX1V_FwxOc6FrNnZF4KN3SAAOb-6BSV1F98NM6gILOWfEKs28dk3x8P_JA8IggpjVhSEWR7dobUL-o3tzKnPtum4JeNZP99dilvpUwqr6wNm6w1sKmkiWnpmckEAhQcAsMKE_0uTOzrR1seTuLhmyFr7F7X-fFSSvs5lYBV9QnMyZQ"
                        alt="The Modern Curator Silhouette"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#501624]/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-sans text-[9px] tracking-wider uppercase font-semibold">
                        Full Silhouette
                      </div>
                    </div>

                    {/* Right Garment Highlights */}
                    <div className="col-span-5 flex flex-col gap-2.5">
                      <div className="relative rounded-lg overflow-hidden border border-[#E8E3DC] bg-[#F4ECE8] flex-1 aspect-square">
                        <img
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm-ORr_cLSQs8XpXU7QsgGAZQItC_ctEM_wIXknagA65RjSdCh4jF1ugNPz7NTuJc1u9vJEyuq_KRinmZtXS0jnJkSb7kuFZOrGS037OdmH-4OEn-rriv_8Y2MGdP2s_SEK3437Zy8soKL-6H0J6kcJsaBX_swOChwmi_UDEV3C59OQDtJJC-DqcojNngncx5jQ4ArgZEcci9KxUXqfY4tXr3TRfdIogbwMV7djSDEV8rEFFa321590w"
                          alt="Fine-knit Merino Mockneck"
                        />
                        <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm text-[#1D1819] font-sans text-[9px] font-semibold px-1.5 py-0.5 rounded">
                          New Piece
                        </div>
                      </div>
                      <div className="relative rounded-lg overflow-hidden border border-[#E8E3DC] bg-[#F4ECE8] flex-1 aspect-square">
                        <img
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTcxF-ib12uSvsTGwkt-uhQKIRfvY92DP6OyRPogME_BuwU8GA3K9MHnSra0oqWsh_xYWOAa-w8fVpWiDDvVNnaQtPRKY1Od-2VwAKEaTvyDBtqSD-_7Y3sPhrMKau8E88hE-2pohpwhoOGShyYtnQhdXpu7wXgYA25UpQkVvswxHcZJt1ObtkFoy4v_Hqja_KPDSAEfId1ZezoaM4gHkz0F4w2c-d9gvqfa46A4-haJcZlWtv88YvoA"
                          alt="Sculptural Leather Kitten Heel"
                        />
                        <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-sm text-[#1D1819] font-sans text-[9px] font-semibold px-1.5 py-0.5 rounded">
                          Comfort Heel
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Structured Items Breakdown List */}
                  <div className="px-4 pb-2 divide-y divide-[#E8E3DC]">
                    {/* Item 1: Owned */}
                    <div className="py-2.5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F4ECE8] flex-shrink-0 border border-[#E8E3DC]">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsLSYneiI7BqxU9ode1Igj-mBvr9J4JX2_TsmVa64FEeUdLAl98k7mQIbkDkJbrz8WF-czF7gJXLw0JenjVP59qJylvkwvxcuD6puWCGovwgkvQoaT_yBf4jqmh-iVNHAMV07zoVPzTKfqtKELXKpOErTVQHs75tfCUc4uf8IeTN8YeIKcJNLxISqxNvNyDDkXflVrIXs3uATOjXas1LfvdyqPaystlktnF_RS2e40KB3U12M6-y14vA"
                            alt="Mulberry Silk Slip Skirt"
                          />
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1 font-sans text-[9px] uppercase font-bold text-[#546255] bg-[#E5EBE5] px-1.5 py-0.5 rounded">
                            <span className="material-symbols-outlined text-[11px]">checkroom</span>
                            From Your Wardrobe
                          </span>
                          <h4 className="font-serif text-[13.5px] text-[#1D1819] mt-0.5 font-medium">
                            Mulberry Silk Slip Skirt
                          </h4>
                          <p className="font-sans text-[11px] text-[#8A7D80]">
                            Champagne • Relaxed Bias Cut
                          </p>
                        </div>
                      </div>
                      <span className="font-sans text-[11px] text-[#501624] font-semibold mt-1">
                        Owned
                      </span>
                    </div>

                    {/* Item 2: Recommended Mockneck */}
                    <div className="py-2.5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F4ECE8] flex-shrink-0 border border-[#E8E3DC]">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLwgbr1KgANRNn-_DtjE-EbmmffS6RTfoDt14gqnEOS2ifXvk7EtVpUZ3D9P9EvAhGPhsj7vQunJPwMwlevwyCghdWvawV78vZTzlZnnehb4lXC_GxPxJRdtayym1FC0RuBusTubZRLqjMsdfcxyNvNmxsMvkoMcjDphKwP4HC2uyLpHz0W6n8roFFstDSPDg9OQZv1FWhiDTYtvqnPcVxjHtxowy39Q3vlx21Uk0Hf1guWrAHjEwysQ"
                            alt="Fine-knit Merino Mockneck"
                          />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] uppercase font-bold text-[#4B091B] bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                            Recommended Add
                          </span>
                          <h4 className="font-serif text-[13.5px] text-[#1D1819] mt-0.5 font-medium">
                            Fine-knit Merino Mockneck
                          </h4>
                          <p className="font-sans text-[11px] text-[#8A7D80]">
                            Deep Wine • Mango Atelier
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-[13px] font-bold text-[#1D1819]">$55</span>
                      </div>
                    </div>

                    {/* Item 3: Recommended Heels */}
                    <div className="py-2.5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F4ECE8] flex-shrink-0 border border-[#E8E3DC]">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4A3vjc22F7yDDuyt6wZayopGzYOFEtmBH5gsT9eMTOGdoNLW9EurpRv3mM_nobfbgJCFF-l8diKHx52-Bt6f0HE08hdn3hjxwemfRL86znHovt3e6FzsaHm54JoTNg6nICGnME0pg48VvTKaFZOWcVU0Awq934BSEkaZYNRI1HsVY8NUkn-8hOzk2jry84KgEblwItQlY-zhsr-oHrPenXlBupuk4vgQrJZONLrLfbzxxoxTY9tZxw"
                            alt="Sculptural Leather Kitten Heel"
                          />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] uppercase font-bold text-[#4B091B] bg-[#F5E9EC] px-1.5 py-0.5 rounded">
                            Recommended Add
                          </span>
                          <h4 className="font-serif text-[13.5px] text-[#1D1819] mt-0.5 font-medium">
                            Sculptural Leather Kitten Heel
                          </h4>
                          <p className="font-sans text-[11px] text-[#8A7D80]">
                            45mm Walkable Arch • Zara Studio
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-[13px] font-bold text-[#1D1819]">$85</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Budget Calculation Strip */}
                  <div className="mx-4 my-2 p-3 bg-[#F4ECE8] rounded-lg flex items-center justify-between border border-[#E8E3DC]">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#574C4E] font-semibold">
                        Total New Additions
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="font-serif text-[18px] text-[#4B091B] font-bold">$140</span>
                        <span className="font-sans text-[11px] text-[#546255] font-semibold">
                          Within $150 budget
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#E5EBE5] text-[#546255] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                  </div>

                  {/* Why this works for you */}
                  <div className="p-3.5 mx-4 mb-3 rounded-lg bg-[#FAF8F5] border border-[#E8E3DC]">
                    <div className="flex items-center gap-1.5 mb-1 text-[#501624]">
                      <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
                        Why this works for you
                      </span>
                    </div>
                    <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">
                      "Preserves your relaxed-fit aesthetic while introducing seasonal oxblood tones that complement your warm undertone palette. The 45mm sculptural kitten heel provides effortless gallery walking endurance without compromising architectural polish."
                    </p>
                  </div>

                  {/* Action CTA inside Look Card */}
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => onShowToast('Reserved 2 pieces ($140) for try-on')}
                      className="w-full bg-[#3B121B] hover:bg-[#4A1521] active:scale-[0.98] transition-all text-[#FAF8F5] h-12 rounded-full font-sans text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm border border-[#C5A880]/40"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#C5A880]">shopping_bag</span>
                      <span>Reserve & Acquire Recommended Pieces ($140)</span>
                    </button>
                  </div>
                </article>

                {/* Feedback Reaction Bar */}
                <div className="pt-1">
                  <p className="font-sans text-[10.5px] uppercase tracking-widest text-[#8A7D80] mb-2 text-center font-semibold">
                    Refine this ensemble
                  </p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => {
                        setFeedbackLiked(!feedbackLiked);
                        onShowToast(feedbackLiked ? 'Feedback removed' : 'Stylist saved your preference: Loved this look');
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11.5px] font-sans font-medium transition-all active:scale-95 shadow-xs ${
                        feedbackLiked
                          ? 'bg-[#4B091B] text-white border-[#4B091B]'
                          : 'bg-white hover:bg-[#F4ECE8] border-[#E8E3DC] text-[#1D1819]'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#C06C78]">thumb_up</span>
                      <span>Love it</span>
                    </button>

                    <button
                      onClick={() => handleSendMessage('Can we swap the heels for flats or comfortable boots?')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#F4ECE8] border border-[#E8E3DC] text-[#574C4E] font-sans text-[11.5px] font-medium transition-all active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#8A7D80]">swap_horiz</span>
                      <span>Swap shoes</span>
                    </button>

                    <button
                      onClick={() => handleSendMessage('A bit too dressy for this gallery opening. Make it slightly more effortless.')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#F4ECE8] border border-[#E8E3DC] text-[#574C4E] font-sans text-[11.5px] font-medium transition-all active:scale-95"
                      type="button"
                    >
                      <span>Too dressy</span>
                    </button>

                    <button
                      onClick={() => handleSendMessage('I already own a similar merino knit. Can we use my existing tops?')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#F4ECE8] border border-[#E8E3DC] text-[#574C4E] font-sans text-[11.5px] font-medium transition-all active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#8A7D80]">inventory_2</span>
                      <span>Already own similar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Docked Floating Conversation Input Bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8E3DC] shadow-[0_-8px_30px_rgba(80,22,36,0.06)] pb-5 pt-2 px-3">
          {/* Suggested Prompt Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-0.5 px-1 scroll-smooth">
            <button
              onClick={() => {
                setFlatAlternativeActive(true);
                handleSendMessage('Show a flats alternative for gallery walking');
              }}
              className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F4ECE8] hover:bg-[#F5E9EC] text-[#574C4E] hover:text-[#4B091B] font-sans text-[11px] font-medium border border-[#E8E3DC] transition-all active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px] text-[#4B091B]">auto_awesome</span>
              <span>Show a flats alternative</span>
            </button>

            <button
              onClick={() => handleSendMessage('Add a tailored coat to layer over this look')}
              className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F4ECE8] hover:bg-[#F5E9EC] text-[#574C4E] hover:text-[#4B091B] font-sans text-[11px] font-medium border border-[#E8E3DC] transition-all active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px] text-[#4B091B]">add</span>
              <span>Add a tailored coat</span>
            </button>

            <button
              onClick={() => handleSendMessage('Suggest a more casual option with denim')}
              className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F4ECE8] hover:bg-[#F5E9EC] text-[#574C4E] hover:text-[#4B091B] font-sans text-[11px] font-medium border border-[#E8E3DC] transition-all active:scale-95"
              type="button"
            >
              <span>More casual option</span>
            </button>
          </div>

          {/* Docked Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center bg-white rounded-full border border-[#E8E3DC] shadow-xs pl-2 pr-1.5 py-1.5 focus-within:border-[#4B091B] transition-all"
          >
            <button
              aria-label="Upload photo"
              onClick={() => onShowToast('Camera ready: Take photo of wardrobe piece')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#574C4E] hover:text-[#4B091B] hover:bg-[#F4ECE8] transition-colors active:scale-95 flex-shrink-0"
              title="Upload wardrobe piece or photo"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">photo_camera</span>
            </button>
            <button
              aria-label="Select wardrobe"
              onClick={() => onShowToast('Opening Camille’s wardrobe picker')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#574C4E] hover:text-[#4B091B] hover:bg-[#F4ECE8] transition-colors active:scale-95 flex-shrink-0 -ml-1"
              title="Select from saved wardrobe"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">checkroom</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for variations, layering, or accessories..."
              className="flex-1 bg-transparent border-none text-[#1D1819] placeholder-[#8A7D80] font-sans text-[13px] px-2.5 py-1 outline-none"
            />

            <button
              aria-label="Send query"
              type="submit"
              className="w-9 h-9 rounded-full bg-[#3B121B] hover:bg-[#4A1521] text-white flex items-center justify-center transition-transform active:scale-90 shadow-sm flex-shrink-0 border border-[#C5A880]/30"
            >
              <span className="material-symbols-outlined text-[18px] text-[#C5A880]">arrow_upward</span>
            </button>
          </form>

          {/* Micro Privacy Guarantee */}
          <p className="text-center font-sans text-[9.5px] text-[#8A7D80] mt-2 tracking-tight">
            <span className="font-semibold uppercase tracking-wider">RYMAE ATELIER</span> • Curating from 48 saved personal items & London boutique partners
          </p>
        </div>
      </main>
    </div>
  );
};
