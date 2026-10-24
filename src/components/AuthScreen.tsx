import React, { useState } from 'react';

interface AuthScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  onShowToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast
}) => {
  const [activeView, setActiveView] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('camille.dorsay@atelier-rymae.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Camille d’Orsay');
  const [showPassword, setShowPassword] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(email);
    onShowToast('Welcome to your private styling suite, Camille');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(email);
    onShowToast('Membership established. Silhouette vault initialized.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col lg:flex-row overflow-y-auto custom-scroll">
      {/* LEFT COLUMN: Editorial Haute Couture Atelier Imagery (56% Desktop Width) */}
      <div className="relative w-full lg:w-[56%] min-h-[420px] lg:min-h-screen bg-[#3B121B] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 order-1">
        {/* Background Monograph Imagery */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDj8GjFKVR0WxjqsqE9nOsmJ-x3oaujucwNkjwoY67GypD5OmkOKG-p5FkdhbnmnZa8OvPV25XqocfOIabim7YWB7kICaxb3kLugMD_Tkja6MmVgpw_p5nTCCrNQ8x0o1O4DY2fiNh3IoAgpMnws0XBcuvAtD62j0CDmqewK3bfjHisyVqs2q46Q2Jq9e7avSagjABhRfP2w_Xla9LdODKaI3KtbOYupj2EUwyYtA1CjGGeXIuCBHvxqg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B121B] via-[#3B121B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B121B]/40 to-transparent" />

        {/* Top Atelier Header */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A880]/40 flex items-center justify-center bg-[#4A1521]/40 backdrop-blur-md">
              <span className="font-serif text-[#C5A880] text-xs italic tracking-widest font-light">R</span>
            </div>
            <div>
              <h1 className="font-serif text-white tracking-[0.22em] text-sm uppercase font-normal">
                RYMAE ATELIER
              </h1>
              <p className="font-sans text-[#C5A880] tracking-widest text-[9px] uppercase font-semibold">
                Haute Couture Curation
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C5A880]/20 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="font-sans text-[#F3EDE4] tracking-wider text-[10px] uppercase font-semibold">
              Edition Nº 04 · Private Salon
            </span>
          </div>
        </div>

        {/* Center Quote */}
        <div className="relative z-10 my-auto py-10 hidden lg:block max-w-lg">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
            <span className="font-sans text-[#C5A880] text-xs tracking-[0.14em] uppercase font-semibold">
              Private Client Sanctum
            </span>
          </div>
          <blockquote className="font-serif text-[32px] text-white font-normal leading-tight italic tracking-tight mb-4">
            “Style is not an acquisition, but the architecture of one’s quiet poise.”
          </blockquote>
          <p className="font-sans text-[#F3EDE4]/80 max-w-md font-light leading-relaxed text-sm">
            Step into a private digital atelier crafted for intentional silhouette composition, archival wardrobe management, and personalized styling consultations.
          </p>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[#C5A880] tracking-[0.18em] uppercase text-xs font-semibold">
              YOUR PERSONAL STYLE, REIMAGINED
            </p>
            <p className="font-sans text-white/70 text-xs mt-1 max-w-sm">
              A bespoke digital salon for wardrobe curation, silhouette analysis, and mindful dressing.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-sans text-white text-xs font-semibold">Atelier Concorde, Paris</span>
              <span className="font-sans text-white/50 text-[10px]">48.8661° N, 2.3210° E</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#C5A880]">
              <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Authentication & Salon Portal (44% Desktop Width) */}
      <div className="relative w-full lg:w-[44%] min-h-screen bg-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto custom-scroll order-2">
        {/* Top Mobile Brand & Concierge Link */}
        <div className="w-full flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <span
              className="text-[#4A1521] text-lg tracking-[0.18em] uppercase font-medium"
              style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
            >
              RYMAE
            </span>
            <span className="text-[#E8E3DC]">|</span>
            <span className="font-sans text-[#706963] tracking-widest text-[10px] uppercase font-semibold">
              Private Salon
            </span>
          </div>

          <button
            onClick={() => setShowConcierge(true)}
            className="font-sans text-[#4A1521] hover:text-[#3B121B] flex items-center gap-1.5 text-xs py-1 px-3 rounded-full hover:bg-[#F5F2EC] font-semibold transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-sm text-[#C5A880]">support_agent</span>
            <span>Concierge</span>
          </button>
        </div>

        {/* Centered Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {/* Tabs: Sign In vs Create Account */}
          <div className="flex items-center p-1 bg-[#F5F2EC] rounded-full border border-[#E8E3DC] mb-7 w-fit mx-auto sm:mx-0">
            <button
              onClick={() => setActiveView('signin')}
              className={`px-5 py-1.5 rounded-full font-sans text-xs transition-all ${
                activeView === 'signin'
                  ? 'bg-[#4A1521] text-white shadow-sm font-semibold'
                  : 'text-[#706963] hover:text-[#141212] font-medium'
              }`}
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveView('register')}
              className={`px-5 py-1.5 rounded-full font-sans text-xs transition-all ${
                activeView === 'register'
                  ? 'bg-[#4A1521] text-white shadow-sm font-semibold'
                  : 'text-[#706963] hover:text-[#141212] font-medium'
              }`}
              type="button"
            >
              Create Account
            </button>
          </div>

          {/* VIEW: SIGN IN */}
          {activeView === 'signin' && (
            <div className="space-y-6">
              <header>
                <span className="font-sans text-[#C5A880] tracking-[0.15em] uppercase text-xs font-semibold">
                  Client Authentication
                </span>
                <h2 className="font-serif text-[28px] text-[#141212] mt-1 font-normal">
                  Welcome back.
                </h2>
                <p className="font-sans text-[13px] text-[#706963] mt-1 font-light">
                  Step back into your personal styling space.
                </p>
              </header>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] focus:border-[#4A1521] focus:ring-1 focus:ring-[#4A1521] outline-none text-sm font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveView('forgot')}
                      className="font-sans text-[#4A1521] text-[11px] font-semibold uppercase hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-11 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] focus:border-[#4A1521] focus:ring-1 focus:ring-[#4A1521] outline-none text-sm font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#9C948D] hover:text-[#141212]"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="keep-active"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#4A1521] focus:ring-[#4A1521] border-[#E8E3DC]"
                  />
                  <label htmlFor="keep-active" className="font-sans text-[#706963] text-xs cursor-pointer">
                    Keep my private salon active
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#4A1521] hover:bg-[#3B121B] text-white font-sans uppercase tracking-wider text-xs font-semibold shadow-md active:scale-[0.99] transition-all"
                >
                  SIGN IN
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E8E3DC]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#FAF8F5] px-4 font-sans text-[#9C948D] tracking-[0.18em] uppercase text-[10px] font-semibold">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => {
                    onSuccess('google.client@atelier-rymae.com');
                    onShowToast('Connected via Google Client Protocol');
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white border border-[#E8E3DC] hover:border-[#4A1521] text-xs font-sans font-semibold text-[#141212] transition-colors"
                  type="button"
                >
                  <span>Google</span>
                </button>
                <button
                  onClick={() => {
                    onSuccess('apple.client@atelier-rymae.com');
                    onShowToast('Connected via Apple Client Protocol');
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white border border-[#E8E3DC] hover:border-[#4A1521] text-xs font-sans font-semibold text-[#141212] transition-colors"
                  type="button"
                >
                  <span>Apple</span>
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E3DC]/60 text-center space-y-2">
                <p className="font-sans text-[12px] text-[#706963]">
                  New to RYMAE ATELIER?{' '}
                  <button
                    onClick={() => setActiveView('register')}
                    className="text-[#4A1521] font-semibold underline underline-offset-4"
                    type="button"
                  >
                    Create an account
                  </button>
                </p>
                <p>
                  <button
                    onClick={onClose}
                    className="font-sans text-[11px] text-[#9C948D] hover:text-[#4A1521] uppercase tracking-wider transition-colors font-semibold"
                    type="button"
                  >
                    Explore archive without signing in →
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* VIEW: REGISTER */}
          {activeView === 'register' && (
            <div className="space-y-6">
              <header>
                <span className="font-sans text-[#C5A880] tracking-[0.15em] uppercase text-xs font-semibold">
                  Salon Membership
                </span>
                <h2 className="font-serif text-[28px] text-[#141212] mt-1 font-normal">
                  Create your style space.
                </h2>
                <p className="font-sans text-[13px] text-[#706963] mt-1 font-light">
                  Your wardrobe. Your aesthetic. Your personal stylist.
                </p>
              </header>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] text-sm font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] text-sm font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                    Create password *
                  </label>
                  <input
                    type="password"
                    required
                    defaultValue="HauteSecurity2026!"
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] text-sm font-sans"
                  />
                  {/* Strength Bar */}
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-1.5 h-1">
                      <div className="bg-[#4A1521] rounded-full" />
                      <div className="bg-[#4A1521] rounded-full" />
                      <div className="bg-[#4A1521] rounded-full" />
                      <div className="bg-[#4A1521] rounded-full" />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] font-sans text-[#9C948D]">
                      <span className="uppercase text-[#4A1521] font-semibold">Haute Couture Security</span>
                      <span>Couture Encryption</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    defaultChecked
                    required
                    className="w-4 h-4 mt-0.5 rounded text-[#4A1521] focus:ring-[#4A1521] border-[#E8E3DC]"
                  />
                  <label htmlFor="terms" className="font-sans text-[11px] text-[#706963] leading-snug">
                    I accept the Atelier Terms of Service and acknowledge confidential treatment of my silhouette measurements.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#4A1521] hover:bg-[#3B121B] text-white font-sans uppercase tracking-wider text-xs font-semibold shadow-md transition-all"
                >
                  CREATE ACCOUNT
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveView('signin')}
                  className="font-sans text-xs text-[#706963] hover:text-[#4A1521]"
                  type="button"
                >
                  Already have an account? <strong className="font-semibold underline">Sign in</strong>
                </button>
              </div>
            </div>
          )}

          {/* VIEW: FORGOT */}
          {activeView === 'forgot' && (
            <div className="space-y-6">
              <button
                onClick={() => setActiveView('signin')}
                className="inline-flex items-center gap-1.5 font-sans text-[#706963] hover:text-[#4A1521] text-xs font-semibold"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Return to Sign In</span>
              </button>

              <header>
                <span className="font-sans text-[#C5A880] tracking-[0.15em] uppercase text-xs font-semibold">
                  Security Concierge
                </span>
                <h2 className="font-serif text-[28px] text-[#141212] mt-1 font-normal">
                  Let's get you back in.
                </h2>
                <p className="font-sans text-[13px] text-[#706963] mt-1 font-light leading-relaxed">
                  Enter the email address registered with your private salon. We will dispatch an encrypted restoration link to unlock your suite.
                </p>
              </header>

              {forgotSent && (
                <div className="p-3.5 bg-[#F5F2EC] rounded-lg border-l-2 border-[#4A1521]">
                  <p className="font-sans text-xs text-[#141212] font-semibold">Dispatch Successful</p>
                  <p className="font-sans text-[11px] text-[#706963] mt-0.5">
                    A secure restoration link has been dispatched to {email}.
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSent(true);
                  onShowToast('Encrypted recovery dispatched to your email');
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="block font-sans text-[#141212] text-xs uppercase tracking-wider font-semibold">
                    Registered email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] rounded text-[#141212] text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#4A1521] text-white font-sans uppercase tracking-wider text-xs font-semibold shadow-md"
                >
                  SEND RESET LINK
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Global Footer */}
        <footer className="w-full pt-8 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-between text-[#9C948D] gap-3 text-xs font-sans">
          <div>© 2025 RYMAE ATELIER · Confidentiality · Legal Archive</div>
          <div className="flex items-center gap-1.5 text-[#C5A880] font-semibold">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>End-to-End Bespoke Security</span>
          </div>
        </footer>
      </div>

      {/* Concierge Modal */}
      {showConcierge && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-2xl border border-[#E8E3DC] space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E3DC]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A1521]">support_agent</span>
                <h3 className="font-serif text-[18px] text-[#141212] font-semibold">Atelier Concierge</h3>
              </div>
              <button onClick={() => setShowConcierge(false)} className="text-[#9C948D]" type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-sans text-[12px] text-[#706963] leading-relaxed">
              Our digital salon concierge is available for private VIP client invitations, bespoke tailoring appointments, and identity recovery.
            </p>

            <div className="space-y-2 border-t border-[#E8E3DC] pt-3 text-[12px] font-sans">
              <div className="flex justify-between">
                <span className="text-[#9C948D]">Private Liaison:</span>
                <span className="text-[#141212] font-semibold">+33 1 42 68 55 00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9C948D]">Digital Folio:</span>
                <span className="text-[#141212] font-semibold">concierge@rymae.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9C948D]">Salon Hours:</span>
                <span className="text-[#141212] font-semibold">10:00 – 19:00 CET</span>
              </div>
            </div>

            <button
              onClick={() => setShowConcierge(false)}
              className="w-full py-2.5 rounded-full bg-[#4A1521] text-white font-sans text-xs uppercase tracking-wider font-semibold"
              type="button"
            >
              Close Concierge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
