import React, { useState } from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isToday, 
  isPast, 
  startOfWeek, 
  endOfWeek,
  differenceInDays,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Adapted from localmedicaldiary/frontend/src/components/booking/SelectDateTimeStep.tsx
 * Custom-styled for iDez Entertainment luxury branding with automated rush fee warnings.
 */
export const SelectDateTimeStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Standard iDez Performance & Studio slots
  const TIME_SLOTS = [
    '09:00 - 11:00 (Morning Rehearsal / Show)',
    '11:30 - 13:30 (Midday Session)',
    '14:00 - 16:00 (Afternoon Rehearsal)',
    '16:30 - 18:30 (Evening Event / Reception Entry)',
    '19:00 - 22:00 (Prime Gala / Night Wedding Reception)',
  ];

  const handleDateClick = (day: Date) => {
    if (isPast(day) && !isToday(day)) return;
    const dateStr = format(day, 'yyyy-MM-dd');
    updateFormData({
      selectedDate: dateStr,
      selectedSlot: formData.selectedSlot || TIME_SLOTS[3], // default evening slot
    });
  };

  const selectedDateObj = formData.selectedDate ? parseISO(formData.selectedDate) : null;
  const daysUntil = selectedDateObj ? differenceInDays(selectedDateObj, new Date()) : null;
  const isRushNotice = daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h3 className="text-lg font-bold text-white font-display">
          Step 2: Pick Your Event or Rehearsal Date
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Select the date on our calendar. Real-time availability is tracked for both Abuja studio sessions and nationwide event dates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calendar Grid (7 cols) */}
        <div className="lg:col-span-7 glass-card p-5 rounded-2xl border border-white/10">
          
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h4 className="font-bold text-white text-base">
              {format(currentMonth, 'MMMM yyyy')}
            </h4>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-bold text-slate-400 uppercase">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const isSelected = selectedDateObj && isSameDay(day, selectedDateObj);
              const isCurrentDay = isToday(day);
              const isPastDay = isPast(day) && !isCurrentDay;
              const isCurrentMonthDay = day.getMonth() === currentMonth.getMonth();

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isPastDay}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square p-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-brand-crimson text-white shadow-lg shadow-brand-crimson/30 scale-105'
                      : isPastDay
                      ? 'text-slate-400 opacity-20 cursor-not-allowed'
                      : isCurrentDay
                      ? 'bg-white/10 text-brand-gold border border-brand-gold/30'
                      : isCurrentMonthDay
                      ? 'text-slate-200 hover:bg-white/10 hover:text-white'
                      : 'text-slate-400 opacity-40 hover:bg-white/5'
                  }`}
                >
                  <span>{format(day, 'd')}</span>
                  {isSelected && (
                    <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Time Slot Picker (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Available Time Slots
          </label>

          <div className="space-y-2">
            {TIME_SLOTS.map((slot, index) => {
              const isSlotSelected = formData.selectedSlot === slot;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => updateFormData({ selectedSlot: slot })}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSlotSelected
                      ? 'bg-brand-crimson/20 border-brand-crimson text-white font-semibold'
                      : 'bg-brand-card border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                    <span>{slot}</span>
                  </div>
                  {isSlotSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-crimson" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rush fee notice if booked <= 7 days */}
          {isRushNotice && (
            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Short-Notice Date Selected ({daysUntil} days away)</strong>
                <span>Per official iDez T&C, projects requiring delivery within 7 days attract a 25% rush fee for accelerated preparation.</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Nav Controls */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Package
        </button>

        <button
          onClick={nextStep}
          disabled={!formData.selectedDate}
          className="px-8 py-3 rounded-xl bg-brand-crimson hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-brand-crimson/25 transition-all flex items-center gap-2"
        >
          <span>Continue to Customization</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
