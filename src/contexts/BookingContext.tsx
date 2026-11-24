import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  BookingFormState, 
  BookingPriceCalculation, 
  PaymentChoice, 
  ServiceCategory, 
  BookingRecord 
} from '../types';
import { ALL_SERVICES, CREATIVE_DIRECTION_OPTIONS } from '../data/rateCards';
import { differenceInDays, parseISO } from 'date-fns';

interface BookingContextType {
  // Wizard State
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  formData: BookingFormState;
  updateFormData: (updates: Partial<BookingFormState>) => void;
  resetBooking: () => void;
  
  // Pricing Calculation
  pricing: BookingPriceCalculation;
  
  // Bookings Storage (Client / Admin)
  bookings: BookingRecord[];
  activeBooking: BookingRecord | null;
  setActiveBooking: (b: BookingRecord | null) => void;
  createBooking: () => Promise<BookingRecord>;
  markBalancePaid: (bookingCode: string) => void;
  
  // Modal State
  isWizardOpen: boolean;
  openWizardWithService: (serviceId?: string, category?: ServiceCategory) => void;
  closeWizard: () => void;
}

const INITIAL_FORM_DATA: BookingFormState = {
  selectedCategory: 'wedding',
  selectedServiceId: 'wed-signature-package',
  selectedDate: null,
  selectedSlot: null,
  creativeDirection: 'none',
  eventLocation: 'abuja',
  eventCity: 'Abuja',
  performerCount: 4,
  isRushDelivery: false,
  rushFeePercentage: 0,
  specialRequirements: '',
  fullName: '',
  email: '',
  phone: '',
  organizationOrCouple: '',
  notes: '',
  createAccount: false,
  paymentChoice: 'deposit_70',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormState>(INITIAL_FORM_DATA);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [activeBooking, setActiveBooking] = useState<BookingRecord | null>(null);

  // Local storage persisted bookings
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('idez_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Initial sample booking for testing
    return [
      {
        id: 'sample-1',
        bookingCode: 'IDEZ-2026-9042',
        createdAt: new Date().toISOString(),
        serviceCategory: 'wedding',
        serviceTitle: 'Signature Wedding Dance Experience Package',
        eventDate: '2026-12-15',
        eventSlot: '16:00 - 20:00',
        eventLocation: 'Abuja (Inside)',
        outsideAbuja: false,
        creativeDirection: 'Full Creative Direction',
        totalAmount: 2000000,
        depositAmount: 1400000,
        balanceDue: 600000,
        paymentChoice: 'deposit_70',
        paymentStatus: 'deposit_paid',
        bookingStatus: 'confirmed',
        clientName: 'Ngozi & Tunde Adeleke',
        clientEmail: 'ngozi@example.com',
        clientPhone: '0803 123 4567',
        organizationOrCouple: 'Adeleke Wedding 2026',
        notes: 'Theme is Royal Emerald. Couple wants a blend of traditional entry and modern afrobeats.',
      }
    ];
  });

  const saveBookings = (newBookings: BookingRecord[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem('idez_bookings', JSON.stringify(newBookings));
    } catch (e) {
      console.error(e);
    }
  };

  const updateFormData = (updates: Partial<BookingFormState>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };

      // Calculate rush fee automatically if date is selected
      if (next.selectedDate) {
        try {
          const daysUntil = differenceInDays(parseISO(next.selectedDate), new Date());
          if (daysUntil >= 0 && daysUntil <= 7) {
            next.isRushDelivery = true;
            next.rushFeePercentage = 25; // 25% within 7 days (PDF states 20-50%)
          } else {
            next.isRushDelivery = false;
            next.rushFeePercentage = 0;
          }
        } catch (err) {
          console.error(err);
        }
      }

      return next;
    });
  };

  // Live price calculation based on official rate cards & rules
  const pricing = useMemo<BookingPriceCalculation>(() => {
    const service = ALL_SERVICES.find((s) => s.id === formData.selectedServiceId);
    const basePrice = service ? service.startingPrice : 0;

    const cdOption = CREATIVE_DIRECTION_OPTIONS.find((cd) => cd.id === formData.creativeDirection);
    const creativeDirectionPrice = cdOption ? cdOption.price : 0;

    const subtotal = basePrice + creativeDirectionPrice;
    
    // Rush fee (20-50% if within 7 days)
    const rushFeeAmount = formData.isRushDelivery 
      ? Math.round(subtotal * (formData.rushFeePercentage / 100))
      : 0;

    const totalAmount = subtotal + rushFeeAmount;
    
    // Deposit is strictly 70% as mandated by iDez T&C
    const depositAmount = Math.round(totalAmount * 0.7);
    const balanceDue = formData.paymentChoice === 'deposit_70' ? totalAmount - depositAmount : 0;
    const amountToPayNow = formData.paymentChoice === 'deposit_70' ? depositAmount : totalAmount;

    return {
      basePrice,
      creativeDirectionPrice,
      rushFeeAmount,
      travelNoteRequired: formData.eventLocation === 'outside_abuja',
      totalAmount,
      depositAmount,
      balanceDue,
      amountToPayNow,
    };
  }, [formData]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const resetBooking = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setActiveBooking(null);
  };

  const openWizardWithService = (serviceId?: string, category?: ServiceCategory) => {
    if (serviceId) {
      const s = ALL_SERVICES.find((x) => x.id === serviceId);
      if (s) {
        setFormData((prev) => ({
          ...prev,
          selectedServiceId: s.id,
          selectedCategory: s.category,
        }));
      }
    } else if (category) {
      setFormData((prev) => ({
        ...prev,
        selectedCategory: category,
      }));
    }
    setStep(1);
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
  };

  const createBooking = async (): Promise<BookingRecord> => {
    const service = ALL_SERVICES.find((s) => s.id === formData.selectedServiceId);
    const cdOption = CREATIVE_DIRECTION_OPTIONS.find((c) => c.id === formData.creativeDirection);
    const randomCode = `IDEZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: BookingRecord = {
      id: `booking-${Date.now()}`,
      bookingCode: randomCode,
      createdAt: new Date().toISOString(),
      serviceCategory: formData.selectedCategory,
      serviceTitle: service?.title || 'Dance Performance Experience',
      eventDate: formData.selectedDate || new Date().toISOString().split('T')[0],
      eventSlot: formData.selectedSlot || 'TBD - Slot To Be Assigned',
      eventLocation: formData.eventLocation === 'outside_abuja' 
        ? `Outside Abuja (${formData.eventCity || 'Other State'})`
        : 'Abuja (Within FCT)',
      outsideAbuja: formData.eventLocation === 'outside_abuja',
      creativeDirection: cdOption?.title || 'None',
      totalAmount: pricing.totalAmount,
      depositAmount: pricing.depositAmount,
      balanceDue: pricing.balanceDue,
      paymentChoice: formData.paymentChoice,
      paymentStatus: formData.paymentChoice === 'full_100' ? 'fully_paid' : 'deposit_paid',
      bookingStatus: 'confirmed',
      clientName: formData.fullName,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      organizationOrCouple: formData.organizationOrCouple,
      notes: formData.notes,
      paystackReference: `PSTK-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    };

    const updated = [newRecord, ...bookings];
    saveBookings(updated);
    setActiveBooking(newRecord);
    return newRecord;
  };

  const markBalancePaid = (bookingCode: string) => {
    const updated = bookings.map((b) => {
      if (b.bookingCode === bookingCode) {
        return {
          ...b,
          paymentStatus: 'fully_paid' as const,
          balanceDue: 0,
        };
      }
      return b;
    });
    saveBookings(updated);
    if (activeBooking && activeBooking.bookingCode === bookingCode) {
      setActiveBooking({
        ...activeBooking,
        paymentStatus: 'fully_paid',
        balanceDue: 0,
      });
    }
  };

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        formData,
        updateFormData,
        resetBooking,
        pricing,
        bookings,
        activeBooking,
        setActiveBooking,
        createBooking,
        markBalancePaid,
        isWizardOpen,
        openWizardWithService,
        closeWizard,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
