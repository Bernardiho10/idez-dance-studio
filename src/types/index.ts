// Core Types for iDez Entertainment Booking System

export type ServiceCategory = 
  | 'corporate' 
  | 'wedding' 
  | 'training' 
  | 'performers';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle?: string;
  startingPrice: number;
  priceFormatted: string;
  priceNote?: string; // e.g. "From ₦1,500,000" or "₦180k - ₦350k"
  description: string;
  idealFor?: string[];
  includes?: string[];
  durationMinutes?: number;
  highlight?: boolean;
}

export interface CreativeDirectionOption {
  id: 'none' | 'lite' | 'full';
  title: string;
  price: number;
  priceFormatted: string;
  description: string;
  deliverables: string[];
}

export type PaymentChoice = 'deposit_70' | 'full_100';

export interface BookingFormState {
  // Step 1: Package Selection
  selectedCategory: ServiceCategory;
  selectedServiceId: string | null;
  
  // Step 2: Date & Slot
  selectedDate: string | null; // YYYY-MM-DD
  selectedSlot: string | null; // e.g. "14:00 - 16:00"
  
  // Step 3: Customization & Logistics
  creativeDirection: 'none' | 'lite' | 'full';
  eventLocation: 'abuja' | 'outside_abuja';
  eventCity?: string;
  performerCount?: number;
  isRushDelivery?: boolean; // if event within 7 days (20-50% rush fee)
  rushFeePercentage: number;
  specialRequirements?: string;
  
  // Step 4: Client Info
  fullName: string;
  email: string;
  phone: string;
  organizationOrCouple?: string;
  notes?: string;
  createAccount?: boolean;
  
  // Step 5: Payment
  paymentChoice: PaymentChoice;
}

export interface BookingPriceCalculation {
  basePrice: number;
  creativeDirectionPrice: number;
  rushFeeAmount: number;
  travelNoteRequired: boolean;
  totalAmount: number;
  depositAmount: number; // 70% of total
  balanceDue: number; // 30% if deposit selected, or 0 if 100% paid
  amountToPayNow: number;
}

export interface BookingRecord {
  id: string;
  bookingCode: string; // e.g. IDEZ-2026-7841
  createdAt: string;
  serviceCategory: ServiceCategory;
  serviceTitle: string;
  eventDate: string;
  eventSlot: string;
  eventLocation: string;
  outsideAbuja: boolean;
  creativeDirection: string;
  totalAmount: number;
  depositAmount: number;
  balanceDue: number;
  paymentChoice: PaymentChoice;
  paymentStatus: 'deposit_paid' | 'fully_paid' | 'pending';
  bookingStatus: 'confirmed' | 'pending_review' | 'completed' | 'cancelled';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  organizationOrCouple?: string;
  notes?: string;
  paystackReference?: string;
}

export interface AppNotification {
  id: string;
  bookingId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'payment' | 'reminder' | 'system';
}

export interface VideoShowcaseItem {
  id: string;
  title: string;
  category: ServiceCategory | 'all';
  duration: string;
  thumbnail: string;
  videoUrl: string; // Embed or mp4 URL
  description: string;
  highlights: string[];
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  category: ServiceCategory;
  imageUrl: string;
  caption: string;
}
