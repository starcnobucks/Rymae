import React, { useState } from 'react';
import {
  UserEvent,
  EventCategory,
  LinkedLookRef,
  generateDefaultReminders,
  formatRelativeDays,
  calculateDaysUntil
} from '../utils/wardrobeLogic';
import {
  saveSingleEvent,
  deleteStoredEvent,
  linkLookToStoredEvent,
  toggleStoredEventReminder
} from '../services/contextService';

interface EventPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: UserEvent[];
  onEventsChange: (updatedEvents: UserEvent[]) => void;
  onOpenAtelierWithLook?: (lookId: string) => void;
  onShowToast: (msg: string) => void;
}

export const EventPlannerModal: React.FC<EventPlannerModalProps> = ({
  isOpen,
  onClose,
  events,
  onEventsChange,
  onOpenAtelierWithLook,
  onShowToast
}) => {
  const [activeView, setActiveView] = useState<'month' | 'week' | 'agenda'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 24)); // Oct 2026 anchor
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-27');
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);

  // Form states for creating / editing
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<EventCategory>('Party');
  const [formDate, setFormDate] = useState('2026-10-28');
  const [formStartTime, setFormStartTime] = useState('19:00');
  const [formEndTime, setFormEndTime] = useState('22:00');
  const [formLocation, setFormLocation] = useState('');
  const [formDressCode, setFormDressCode] = useState('Cocktail Chic');
  const [formStyleDirection, setFormStyleDirection] = useState('Minimalist Architectural');
  const [formBudget, setFormBudget] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formReminderPref, setFormReminderPref] = useState<'1_day_before' | '3_days_before' | '1_week_before' | 'morning_of' | 'none'>('1_day_before');

  // Look picker modal state
  const [isLookPickerOpen, setIsLookPickerOpen] = useState(false);
  const [eventToLinkLook, setEventToLinkLook] = useState<UserEvent | null>(null);

  // Delete confirmation
  const [eventToDelete, setEventToDelete] = useState<UserEvent | null>(null);

  // Google Calendar Integration state
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  // Available sample looks to link
  const availableLooksToLink: LinkedLookRef[] = [
    {
      id: 'look-1',
      title: 'Autumn Minimalist Column',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBra3pKr76I1-b64li4ror-47JfO2Lq2AB1w1Ns1fO86_xO0uNuqnqS-nZb2yw2KqDiutesRvivvXCp1T0a_rTvbF-XUyf1B9gY_OjmLfqOhbTfOOihe6wMUWk6TbKIS4V1S4H5_cYsdp_ZdPlvw7WakScCvULogWt1-_nK09bFa9Zr3WT_GSQaDgBEthJjPcxk3FnN2nbFjHj9zJIX7ldpBX7b2XP3q3boDBpT3TBB18Iy6_9mhL3nEw',
      styleCategory: 'Minimalist',
      layersCount: 3,
      paletteColors: ['#F5F2EC', '#4A1521', '#2A201F']
    },
    {
      id: 'look-2',
      title: 'Fluid Silk Bias & Cashmere Knit',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqOy_28YsCSbOToi_5h-imASNv5PauhZjpfXzMnAFMEgs9vQyKkNXq90ybrgKG6lAvxdpbfm99ZQ4Ljz5dVekUY4Djel5TZUNetZ43W9k7t63Pi1bMEzA7DX75D2c0pwWIfc1RpgdMSzmQ8kJEHnRaZdkk_LuFCoy7kjSfnG_3bqDzN0yQlkZ8QBuUu_AYnlKYBGJzgKC-V-grLvgihPkag-YMIFui4Ihr0JFJhNKrmJlnfm3sDJjw8g',
      styleCategory: 'Quiet Luxury',
      layersCount: 3,
      paletteColors: ['#E8DEC8', '#3E2B25', '#4A1521']
    },
    {
      id: 'look-3',
      title: 'Monochromatic Camel Tailoring',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6JXYxa-WxWR4adVNbunMg9PR2_9AUvGYOPNQRDaGQyp0H8dqSHi8O4n6co0vl4GuX6H8NU6zPAlhaa5gmRFTqD3OYePGBMPE2CLMazJEyQC8jLWtkj7DBj4BnBuAiRNa5WLG5wafYfuzH_Es2HdT3Nj7b9zmGlOZvIJfBiUBvGtdUgc-x5hQu5mKZ3ZaLWfxdCCcxoyacq5OB8XAsbRMzMuqbXEMmxb6t2ikEslskDTxz6mJgBm7xg',
      styleCategory: 'Architectural',
      layersCount: 4,
      paletteColors: ['#C59B6C', '#F5F2EC', '#1D1819']
    },
    {
      id: 'look-4',
      title: 'Parisian Evening Gala Velvet',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtXIUUyUbx-W4gXoQkid07ZyrNvF2eNll1e0nwN2fcfhheLjnpVOk8qPN091-Vy_-5qs7FxXibmOIqFLr3fBJ7i6pZsoYkMt7qarENymuIY5u4Gk_q-ZUX9gcAZKdmBbsnl1DdGtVDPFMtmq4v9-_aG53Y9uqZ8k-Zik1bAu-hhFHnwr3qLYmF9vwuoKaGzJ9c-31paD_orqux_IY_B56SZLKOTX2E0yan7FPrl8MnHJjCnFr6BPoRCA',
      styleCategory: 'Evening Black Tie',
      layersCount: 3,
      paletteColors: ['#3B121B', '#1D1819', '#C5A880']
    }
  ];

  // Calendar matrix calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const monthName = currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' });

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date(2026, 9, 24);
    setCurrentDate(today);
    setSelectedDateStr('2026-10-24');
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(e => e.date === dateStr);
  };

  const selectedDateEvents = getEventsForDate(selectedDateStr);

  const handleOpenAddForm = (datePreset?: string) => {
    setEditingEventId(null);
    setFormTitle('');
    setFormCategory('Party');
    setFormDate(datePreset || selectedDateStr);
    setFormStartTime('19:00');
    setFormEndTime('22:00');
    setFormLocation('');
    setFormDressCode('Cocktail Chic');
    setFormStyleDirection('Minimalist Architectural');
    setFormBudget('');
    setFormNotes('');
    setFormReminderPref('1_day_before');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (ev: UserEvent) => {
    setEditingEventId(ev.id);
    setFormTitle(ev.title);
    setFormCategory(ev.category);
    setFormDate(ev.date);
    setFormStartTime(ev.startTime);
    setFormEndTime(ev.endTime || '');
    setFormLocation(ev.location);
    setFormDressCode(ev.dressCode);
    setFormStyleDirection(ev.styleDirection || '');
    setFormBudget(ev.budget ? String(ev.budget) : '');
    setFormNotes(ev.notes || '');
    setFormReminderPref(ev.reminderPreference);
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      onShowToast('Please enter an event title');
      return;
    }

    const reminders = generateDefaultReminders(formCategory, formDressCode);

    const eventPayload: UserEvent = {
      id: editingEventId || 'evt-' + Date.now(),
      title: formTitle.trim(),
      category: formCategory,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime || undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London',
      location: formLocation.trim() || 'Mayfair, London',
      dressCode: formDressCode.trim(),
      styleDirection: formStyleDirection.trim(),
      budget: formBudget ? Number(formBudget) : undefined,
      notes: formNotes.trim(),
      reminderPreference: formReminderPref,
      reminders: reminders,
      linkedLook: editingEventId
        ? events.find(e => e.id === editingEventId)?.linkedLook
        : undefined,
      isSyncedToGoogle: isGoogleCalendarConnected,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = saveSingleEvent(eventPayload);
    onEventsChange(updated);
    setIsFormOpen(false);
    onShowToast(editingEventId ? `Event "${formTitle}" updated` : `Scheduled "${formTitle}"`);
    if (selectedEvent?.id === editingEventId) {
      setSelectedEvent(eventPayload);
    }
  };

  const handleDeleteConfirm = () => {
    if (!eventToDelete) return;
    const updated = deleteStoredEvent(eventToDelete.id);
    onEventsChange(updated);
    if (selectedEvent?.id === eventToDelete.id) {
      setSelectedEvent(null);
    }
    onShowToast(`Deleted event "${eventToDelete.title}"`);
    setEventToDelete(null);
  };

  const handleSelectLookToLink = (look: LinkedLookRef) => {
    if (!eventToLinkLook) return;
    const updated = linkLookToStoredEvent(eventToLinkLook.id, look);
    onEventsChange(updated);
    if (selectedEvent?.id === eventToLinkLook.id) {
      setSelectedEvent({ ...eventToLinkLook, linkedLook: look });
    }
    setIsLookPickerOpen(false);
    setEventToLinkLook(null);
    onShowToast(`Linked "${look.title}" to ${eventToLinkLook.title}`);
  };

  const handleToggleReminder = (eventId: string, reminderId: string) => {
    const updated = toggleStoredEventReminder(eventId, reminderId);
    onEventsChange(updated);
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(updated.find(e => e.id === eventId) || null);
    }
    onShowToast('Updated styling preparation milestone');
  };

  const handleToggleGoogleSync = () => {
    if (!isGoogleCalendarConnected) {
      setIsSyncing(true);
      setTimeout(() => {
        setIsGoogleCalendarConnected(true);
        setIsSyncing(false);
        onShowToast('Connected to Google Calendar (Read & Write Synced)');
      }, 700);
    } else {
      setIsGoogleCalendarConnected(false);
      onShowToast('Disconnected Google Calendar sync');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121011]/80 backdrop-blur-sm flex justify-center selection:bg-[#F5E9EC] selection:text-[#501624]">
      {/* 430px luxury mobile viewport */}
      <main className="w-full max-w-[430px] min-h-screen bg-[#FAF8F5] flex flex-col relative overflow-hidden shadow-2xl">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#E8E3DC]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A1521] hover:bg-[#F4ECE8] active:scale-95 transition-all"
              type="button"
              aria-label="Close Event Planner"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div>
              <h2
                className="text-[#3B121B] font-bold uppercase text-[15px] tracking-[0.2em]"
                style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
              >
                OCCASION PLANNER
              </h2>
              <p className="font-sans text-[10px] text-[#8A7D80] font-semibold uppercase tracking-wider">
                CALENDAR & STYLING MILESTONES
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenAddForm()}
            className="h-8 px-3 rounded-full bg-[#3B121B] text-white font-sans text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1 active:scale-95 transition-all shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            <span>Add Event</span>
          </button>
        </header>

        {/* View Switcher: Month / Week / Agenda */}
        <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-[#E8E3DC] bg-[#FAF8F5]">
          <div className="flex items-center gap-1 bg-[#F4ECE8] p-0.5 rounded-full border border-[rgba(104,32,48,0.12)]">
            {(['month', 'week', 'agenda'] as const).map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1 rounded-full font-sans text-[11px] font-semibold tracking-wide uppercase transition-all ${
                  activeView === view
                    ? 'bg-[#3B121B] text-white shadow-xs'
                    : 'text-[#574C4E] hover:text-[#4A1521]'
                }`}
                type="button"
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={goToToday}
              className="px-2.5 py-1 rounded-full border border-[#E2D7D1] bg-white font-sans text-[11px] font-medium text-[#4A1521] hover:bg-[#F4ECE8] transition-colors"
              type="button"
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              className="w-7 h-7 rounded-full flex items-center justify-center border border-[#E2D7D1] text-[#4A1521] hover:bg-[#F4ECE8]"
              type="button"
              aria-label="Previous Month"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              onClick={nextMonth}
              className="w-7 h-7 rounded-full flex items-center justify-center border border-[#E2D7D1] text-[#4A1521] hover:bg-[#F4ECE8]"
              type="button"
              aria-label="Next Month"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar pb-24">
          {/* Header Title with Current Month & Timezone */}
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-[19px] text-[#1D1819] font-medium">
              {monthName}
            </h3>
            <span className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </div>

          {/* 1. MONTH VIEW */}
          {activeView === 'month' && (
            <div className="bg-white rounded-xl p-3 border border-[rgba(104,32,48,0.12)] shadow-sm">
              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={i} className="font-sans text-[11px] font-semibold text-[#8A7D80]">
                    {d}
                  </span>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty offset padding cells */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 rounded-md" />
                ))}

                {/* Days in Month */}
                {daysArray.map(dayNum => {
                  const mStr = String(month + 1).padStart(2, '0');
                  const dStr = String(dayNum).padStart(2, '0');
                  const dateKey = `${year}-${mStr}-${dStr}`;
                  const dayEvents = getEventsForDate(dateKey);
                  const isSelected = selectedDateStr === dateKey;
                  const isToday = dayNum === 24 && month === 9; // Oct 24, 2026

                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDateStr(dateKey)}
                      className={`h-11 rounded-lg flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#3B121B] text-white shadow-xs'
                          : isToday
                          ? 'bg-[#F4ECE8] text-[#4A1521] font-bold border border-[#4A1521]/30'
                          : 'text-[#1D1819] hover:bg-[#F4ECE8]/60'
                      }`}
                      type="button"
                    >
                      <span className="font-sans text-[12px]">{dayNum}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {dayEvents.map((_, dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected ? 'bg-[#C5A880]' : 'bg-[#4A1521]'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. WEEK VIEW */}
          {activeView === 'week' && (
            <div className="space-y-2">
              {daysArray.slice(20, 27).map(dayNum => {
                const dateKey = `${year}-10-${String(dayNum).padStart(2, '0')}`;
                const dayEvents = getEventsForDate(dateKey);
                const dObj = new Date(year, 9, dayNum);
                const dayLabel = dObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedDateStr(dateKey)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedDateStr === dateKey
                        ? 'bg-white border-[#3B121B] shadow-sm'
                        : 'bg-[#FAF8F5] border-[rgba(104,32,48,0.1)] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[14px] text-[#1D1819] font-medium">{dayLabel}</span>
                      <span className="font-sans text-[11px] text-[#8A7D80]">
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>

                    {dayEvents.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {dayEvents.map(ev => (
                          <div
                            key={ev.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-[#F4ECE8] text-[#3B121B]"
                          >
                            <span className="font-sans text-[12px] font-semibold truncate">{ev.title}</span>
                            <span className="font-sans text-[11px] text-[#8A7D80]">{ev.startTime}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. AGENDA / CHRONOLOGICAL VIEW */}
          {activeView === 'agenda' && (
            <div className="space-y-3">
              {events.length === 0 ? (
                <div className="p-6 text-center text-[#8A7D80] font-sans text-[13px]">
                  No upcoming occasions scheduled yet.
                </div>
              ) : (
                events.map(ev => {
                  const daysLeft = calculateDaysUntil(ev.date, currentDate);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => {
                        setSelectedEvent(ev);
                        setSelectedDateStr(ev.date);
                      }}
                      className="p-3.5 rounded-xl bg-white border border-[rgba(104,32,48,0.12)] shadow-sm hover:border-[#4A1521]/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-[#F4ECE8] text-[#4A1521] font-sans text-[10px] font-semibold uppercase tracking-wider">
                          {ev.category}
                        </span>
                        <span className="font-sans text-[11px] font-semibold text-[#8A7D80]">
                          {formatRelativeDays(daysLeft)} · {ev.date}
                        </span>
                      </div>
                      <h4 className="font-serif text-[16px] text-[#1D1819] font-medium mt-1.5">{ev.title}</h4>
                      <p className="font-sans text-[12px] text-[#574C4E] mt-0.5">
                        {ev.location} · {ev.startTime}
                      </p>
                      {ev.linkedLook && (
                        <div className="mt-2 flex items-center gap-2 p-1.5 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.08)]">
                          <img src={ev.linkedLook.thumbnail} alt="" className="w-8 h-8 rounded object-cover" />
                          <span className="font-sans text-[11px] font-medium text-[#1D1819] truncate">
                            Linked: {ev.linkedLook.title}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Selected Date Schedule & Occasion Details */}
          <div className="pt-2 border-t border-[rgba(104,32,48,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-[16px] text-[#1D1819] font-medium">
                  Occasions for {selectedDateStr}
                </h4>
                <p className="font-sans text-[11px] text-[#8A7D80]">
                  {selectedDateEvents.length} scheduled atelier fitting
                </p>
              </div>

              <button
                onClick={() => handleOpenAddForm(selectedDateStr)}
                className="font-sans text-[11px] font-semibold text-[#4A1521] uppercase tracking-wider flex items-center gap-1 hover:underline"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">add_circle</span>
                <span>Plan Date</span>
              </button>
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="p-4 rounded-xl bg-white border border-dashed border-[rgba(104,32,48,0.2)] text-center">
                <p className="font-sans text-[12px] text-[#8A7D80]">No events scheduled on this date.</p>
                <button
                  onClick={() => handleOpenAddForm(selectedDateStr)}
                  className="mt-2 px-3 py-1.5 rounded-full bg-[#F4ECE8] text-[#4A1521] font-sans text-[11px] font-semibold uppercase tracking-wider inline-flex items-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Create Occasion</span>
                </button>
              </div>
            ) : (
              selectedDateEvents.map(ev => (
                <div
                  key={ev.id}
                  className="bg-white rounded-xl p-4 border border-[rgba(104,32,48,0.15)] shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#F4ECE8] text-[#4A1521] font-sans text-[10px] font-semibold uppercase tracking-wider">
                          {ev.category}
                        </span>
                        {ev.isSyncedToGoogle && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-sans text-[9px] font-semibold">
                            <span className="material-symbols-outlined text-[11px]">sync</span>
                            Google Calendar
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-[18px] text-[#1D1819] font-medium mt-1 leading-snug">
                        {ev.title}
                      </h4>
                      <p className="font-sans text-[12px] text-[#8A7D80] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {ev.startTime} {ev.endTime ? `– ${ev.endTime}` : ''} · {ev.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditForm(ev)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#574C4E] hover:text-[#4A1521] hover:bg-[#F4ECE8]"
                        type="button"
                        aria-label="Edit event"
                      >
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                      </button>
                      <button
                        onClick={() => setEventToDelete(ev)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#8A7D80] hover:text-[#B3261E] hover:bg-[#FCE8E6]"
                        type="button"
                        aria-label="Delete event"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Dress Code & Style Guidance */}
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[rgba(104,32,48,0.1)] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4A1521] text-[17px] mt-0.5">palette</span>
                    <div>
                      <p className="font-sans text-[10px] text-[#4A1521] font-bold uppercase tracking-wider">
                        Dress Code & Direction
                      </p>
                      <p className="font-sans text-[12px] text-[#1D1819] font-medium">
                        {ev.dressCode} · {ev.styleDirection}
                      </p>
                      {ev.notes && (
                        <p className="font-sans text-[11px] text-[#574C4E] mt-1 leading-relaxed">
                          {ev.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Linked Look Section */}
                  <div className="space-y-1.5">
                    <p className="font-sans text-[10px] text-[#8A7D80] font-bold uppercase tracking-wider">
                      Curated Ensemble for this Event
                    </p>
                    {ev.linkedLook ? (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4ECE8] border border-[rgba(104,32,48,0.12)]">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={ev.linkedLook.thumbnail}
                            alt=""
                            className="w-12 h-14 rounded object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-serif text-[13px] text-[#1D1819] font-medium truncate">
                              {ev.linkedLook.title}
                            </p>
                            <p className="font-sans text-[10px] text-[#8A7D80] uppercase tracking-wider">
                              {ev.linkedLook.styleCategory} · {ev.linkedLook.layersCount || 3} layers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {onOpenAtelierWithLook && (
                            <button
                              onClick={() => onOpenAtelierWithLook(ev.linkedLook!.id)}
                              className="px-2.5 py-1 rounded-full bg-[#3B121B] text-white font-sans text-[10px] font-semibold uppercase tracking-wider"
                              type="button"
                            >
                              View
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEventToLinkLook(ev);
                              setIsLookPickerOpen(true);
                            }}
                            className="px-2 py-1 rounded-full border border-[#C5A880] text-[#4A1521] font-sans text-[10px] font-medium hover:bg-white"
                            type="button"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEventToLinkLook(ev);
                          setIsLookPickerOpen(true);
                        }}
                        className="w-full py-2.5 rounded-lg border border-dashed border-[#4A1521]/40 bg-[#FAF8F5] text-[#4A1521] font-sans text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#F4ECE8] transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">link</span>
                        <span>Link Saved Atelier Look</span>
                      </button>
                    )}
                  </div>

                  {/* Styling Preparation Reminders */}
                  <div className="space-y-1.5 pt-1">
                    <p className="font-sans text-[10px] text-[#8A7D80] font-bold uppercase tracking-wider">
                      Styling Preparation Timeline
                    </p>
                    <div className="space-y-1">
                      {ev.reminders.map(rem => (
                        <div
                          key={rem.id}
                          onClick={() => handleToggleReminder(ev.id, rem.id)}
                          className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-sans cursor-pointer transition-all ${
                            rem.completed
                              ? 'bg-[#F4ECE8]/50 border-transparent text-[#8A7D80] line-through'
                              : 'bg-white border-[rgba(104,32,48,0.1)] text-[#1D1819] hover:border-[#4A1521]/30'
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
              ))
            )}
          </div>

          {/* Calendar Sync & Google Workspace Integration Card */}
          <div className="p-3.5 rounded-xl bg-white border border-[rgba(104,32,48,0.12)] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4A1521] text-[18px]">calendar_month</span>
                <span className="font-sans text-[12px] font-semibold text-[#1D1819]">Google Calendar Sync</span>
              </div>
              <button
                onClick={handleToggleGoogleSync}
                disabled={isSyncing}
                className={`px-3 py-1 rounded-full font-sans text-[11px] font-semibold tracking-wider uppercase transition-all ${
                  isGoogleCalendarConnected
                    ? 'bg-[#546255] text-white'
                    : 'bg-[#F4ECE8] text-[#4A1521] border border-[rgba(104,32,48,0.2)] hover:bg-[#F5E9EC]'
                }`}
                type="button"
              >
                {isSyncing ? 'Syncing...' : isGoogleCalendarConnected ? 'Connected' : 'Connect Calendar'}
              </button>
            </div>
            <p className="font-sans text-[11px] text-[#574C4E] leading-relaxed">
              {isGoogleCalendarConnected
                ? 'Authorized: Rymae events synchronize with your Google Calendar, complete with styling reminders.'
                : 'Connect your personal Google Calendar to automatically view your upcoming events and schedule styling milestones.'}
            </p>
          </div>
        </div>

        {/* --- MODAL 1: ADD / EDIT EVENT FORM --- */}
        {isFormOpen && (
          <div className="absolute inset-0 z-50 bg-[#121011]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
            <div className="w-full max-w-[390px] bg-[#FAF8F5] rounded-2xl p-5 shadow-2xl border border-[#E8E3DC] max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E3DC] pb-3">
                <h3 className="font-serif text-[18px] text-[#3B121B] font-medium">
                  {editingEventId ? 'Edit Occasion' : 'Schedule New Occasion'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#8A7D80] hover:text-[#1D1819]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-3 font-sans text-[12px]">
                {/* Event Title */}
                <div>
                  <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                    Occasion Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Venice Biennale Gala Dinner"
                    className="w-full bg-white px-3 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] focus:outline-none focus:border-[#4A1521] text-[#1D1819]"
                  />
                </div>

                {/* Category & Date Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as EventCategory)}
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    >
                      {[
                        'Wedding',
                        'Birthday',
                        'Party',
                        'Date',
                        'College event',
                        'Office event',
                        'Interview',
                        'Vacation',
                        'Fashion show',
                        'Custom event'
                      ].map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={e => setFormDate(e.target.value)}
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    />
                  </div>
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formStartTime}
                      onChange={e => setFormStartTime(e.target.value)}
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      End Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={formEndTime}
                      onChange={e => setFormEndTime(e.target.value)}
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    />
                  </div>
                </div>

                {/* Venue / Location */}
                <div>
                  <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                    Venue / Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    placeholder="e.g. Hauser & Wirth, Mayfair"
                    className="w-full bg-white px-3 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                  />
                </div>

                {/* Dress Code & Style */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      Dress Code
                    </label>
                    <input
                      type="text"
                      value={formDressCode}
                      onChange={e => setFormDressCode(e.target.value)}
                      placeholder="e.g. Black Tie, Cocktail"
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                      Style Direction
                    </label>
                    <input
                      type="text"
                      value={formStyleDirection}
                      onChange={e => setFormStyleDirection(e.target.value)}
                      placeholder="e.g. Minimalist"
                      className="w-full bg-white px-2.5 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-bold text-[#8A7D80] uppercase tracking-wider mb-1">
                    Stylist Notes / Context
                  </label>
                  <textarea
                    rows={2}
                    value={formNotes}
                    onChange={e => setFormNotes(e.target.value)}
                    placeholder="Weather considerations, footwear endurance, formal protocol..."
                    className="w-full bg-white px-3 py-2 rounded-lg border border-[rgba(104,32,48,0.18)] text-[#1D1819]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E3DC]">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#E2D7D1] text-[#574C4E] font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#3B121B] text-white font-semibold uppercase tracking-wider shadow-sm active:scale-95 transition-all"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 2: LINK LOOK PICKER --- */}
        {isLookPickerOpen && (
          <div className="absolute inset-0 z-50 bg-[#121011]/70 backdrop-blur-xs flex items-center justify-center p-3">
            <div className="w-full max-w-[390px] bg-[#FAF8F5] rounded-2xl p-4 shadow-2xl border border-[#E8E3DC] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8E3DC] pb-2.5">
                <div>
                  <h3 className="font-serif text-[17px] text-[#3B121B] font-medium">
                    Link Saved Look
                  </h3>
                  <p className="font-sans text-[11px] text-[#8A7D80]">
                    Select an atelier ensemble for {eventToLinkLook?.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsLookPickerOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#8A7D80]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                {availableLooksToLink.map(look => (
                  <div
                    key={look.id}
                    onClick={() => handleSelectLookToLink(look)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[rgba(104,32,48,0.12)] hover:border-[#3B121B] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={look.thumbnail} alt="" className="w-12 h-14 rounded object-cover" />
                      <div>
                        <h4 className="font-serif text-[14px] text-[#1D1819] font-medium leading-snug">
                          {look.title}
                        </h4>
                        <p className="font-sans text-[11px] text-[#8A7D80]">
                          {look.styleCategory} · {look.layersCount} layers
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#4A1521] opacity-0 group-hover:opacity-100 transition-opacity">
                      check_circle
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL 3: DELETE CONFIRMATION --- */}
        {eventToDelete && (
          <div className="absolute inset-0 z-50 bg-[#121011]/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-[340px] bg-white rounded-2xl p-5 shadow-2xl border border-[#E8E3DC] space-y-3 text-center">
              <span className="material-symbols-outlined text-[36px] text-[#B3261E]">delete_forever</span>
              <h3 className="font-serif text-[18px] text-[#1D1819] font-medium">Delete Occasion?</h3>
              <p className="font-sans text-[12px] text-[#574C4E] leading-relaxed">
                Are you sure you want to delete <span className="font-semibold">"{eventToDelete.title}"</span>? This will remove all scheduled reminders.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => setEventToDelete(null)}
                  className="px-4 py-2 rounded-full border border-[#E2D7D1] text-[#574C4E] font-sans text-[12px] font-medium"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-full bg-[#B3261E] text-white font-sans text-[12px] font-semibold uppercase tracking-wider active:scale-95"
                  type="button"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
