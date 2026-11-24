import React from 'react';
import { useBooking } from '../../../contexts/BookingContext';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Mail, Phone, Building, ArrowRight, ArrowLeft, Shield } from 'lucide-react';

export const ClientDetailsStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();
  const { loginAsClient } = useAuth();

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.phone) return;
    if (formData.createAccount) {
      loginAsClient(formData.email, formData.fullName);
    }
    nextStep();
  };

  const isFormValid = formData.fullName.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.phone.trim() !== '';

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h3 className="text-lg font-bold text-white font-display">
          Step 4: Your Contact & Event Details
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Tell us how to reach you. You can complete this as a guest or create an account to view notifications and track your balance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Full Name <span className="text-brand-crimson">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. Fatima Bello or Chidi Okafor"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Email Address <span className="text-brand-crimson">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              placeholder="e.g. yourname@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Phone Number (WhatsApp Preferred) <span className="text-brand-crimson">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              required
              placeholder="e.g. 0803 123 4567 or +234 803 123 4567"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
            />
          </div>
        </div>

        {/* Organization or Couple Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Organization or Couple Name (Optional)
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="e.g. First Bank Plc or Ngozi & Tunde 2026"
              value={formData.organizationOrCouple || ''}
              onChange={(e) => updateFormData({ organizationOrCouple: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-crimson"
            />
          </div>
        </div>

      </div>

      {/* Guest vs Account Option */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
        <input
          type="checkbox"
          id="createAccount"
          checked={formData.createAccount}
          onChange={(e) => updateFormData({ createAccount: e.target.checked })}
          className="w-5 h-5 accent-brand-crimson rounded cursor-pointer mt-0.5"
        />
        <label htmlFor="createAccount" className="text-xs cursor-pointer select-none">
          <strong className="text-white block font-semibold">Save my details to Client Portal</strong>
          <span className="text-slate-400 block mt-0.5">
            Allows you to view real-time in-app notifications, download receipts, and pay remaining 30% balance anytime.
          </span>
        </label>
      </div>

      {/* Nav Controls */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Customization
        </button>

        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className="px-8 py-3 rounded-xl bg-brand-crimson hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-brand-crimson/25 transition-all flex items-center gap-2"
        >
          <span>Continue to Payment & Deposit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
