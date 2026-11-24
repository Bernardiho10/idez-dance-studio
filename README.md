# iDez Entertainment — Dance Studio Booking System & Marketing Portal

> **Brand**: iDez Entertainment  
> **Tagline**: Premium Dance and Choreography | Creative Direction | Wedding Dance Training  
> **Base City**: Abuja, Nigeria  
> **Currency**: Nigerian Naira (₦)

A production-ready booking and marketing web application built with **React 19 + TypeScript + Vite + Tailwind CSS** frontend and **Go** REST API backend.

---

## 📖 The Rate Card Bible (100% Faithful to Official PDFs)

Every service, rate, and condition is drawn directly from the 4 official rate cards:
1. `iDez Corporate  RateCard.pdf`
2. `iDez Entertainment What we offer .pdf`
3. `iDez Events RateCard 26.pdf`
4. `iDez Wedding RateCard.pdf`

### 1. Corporate Event Experiences
* **Corporate Performance Experience**: From **₦1,500,000** (Gala Dinners, Award Ceremonies, End-of-Year Parties, Executive Celebrations, Corporate Anniversaries).
* **Brand-Themed Performance Production**: From **₦2,500,000** (Product Launches, Brand Activations, Corporate Conferences, Marketing Campaigns; includes concept development, bespoke choreography, music editing, performance direction, rehearsal management, and brand integration).
* **Team-Building Dance Workshop**: From **₦500,000** (Corporate Retreats, Team Building Events, Leadership Programmes, Staff Wellness).

### 2. Wedding Dance Services
* **Brides/Grooms Entrance with Dancers**: From **₦500,000**
* **Couple’s First Dance**: From **₦300,000**
* **Bridal Train Entrance**: From **₦300,000**
* **Signature Wedding Dance Experience Package**: From **₦1,500,000** (Couples' entrance/dance, bridal train choreography, bespoke troupe performance, and full event-day coordination).

### 3. Dance Training (Studio Sessions)
* **Private Session (1 hour)**: From **₦50,000**
* **4-Session Package**: **₦180,000 – ₦350,000**
* **8-Session Package**: **₦350,000 – ₦700,000**
* **Group Training**: **₦300,000 – ₦800,000**

### 4. Dancers, Performers & Creative Direction
* **Performers**: Animation (from **₦350,000**), Solo (from **₦400,000**), Duo (from **₦700,000**), Group 3–5 dancers (**₦500,000 – ₦900,000**), Troupe >6 dancers (from **₦1,000,000**).
* **Creative Direction Lite**: From **₦350,000** (adaptation of existing concept, choreography customization, existing wardrobe styling, event-day coordination).
* **Full Creative Direction**: From **₦500,000** (original concept development, bespoke choreography, music curation/editing, performance design, supervision from rehearsal to live execution).

### 5. Mandatory Terms & Conditions (T&C Rules)
* **70% Non-Refundable Deposit Required**: Locks down the date. Balance payable before event date.
* **100% Full Payment Option**: Available for clients who prefer clearing upfront.
* **Events Outside Abuja**: Transportation, accommodation, and logistics charges are billed separately.
* **Rush Delivery Fee**: Projects requiring delivery within 7 days attract a **20% to 50% rush fee**.
* **Custom Costumes & Specialty Props**: Quoted separately based on custom theme requirements.
* **Premium Dates**: Peak season dates attract higher rates.

---

## 🌟 Key Application Features

1. **Marketing Centerpiece (Video Reels & Photo Gallery)**:
   - High-energy video showcase with playable modal player, category filters (Weddings, Corporate, Cultural, Studio), and immediate "Book This Vibe" buttons.
   - High-resolution masonry photo gallery with lightbox viewer and placeholder slots for upcoming photoshoot updates.

2. **Unified Booking Wizard (Adapted from `localmedicaldiary`)**:
   - Reusable multi-step pattern and date-slot picker adapted from `localmedicaldiary`.
   - Live price calculation engine factoring in Creative Direction add-ons, location surcharges, and automatic 25% rush fee detection for dates within 7 days.
   - **Paystack integration**: Supports 70% Non-refundable Deposit or 100% Full Payment in Nigerian Naira (₦).
   - Generates unique tracking code (e.g. `IDEZ-2026-9042`) with printable/downloadable booking voucher.

3. **In-App Notification Center**:
   - Real-time notification drawer with unread badge counter.
   - Dispatches live booking confirmations, deposit receipts, and balance payment reminders.

4. **Client Portal**:
   - Clients can view all their reservations, download receipts, track rehearsal schedules, and pay their remaining 30% balance anytime via Paystack.

5. **Admin Console**:
   - Full booking overview with financial filters: All, 70% Deposit Paid, 100% Cleared.
   - Revenue analytics: Total Agreed Value, Deposits Collected, and Outstanding Balances.
   - **Calendar Blocker**: Ability to block out holidays or private rehearsal dates from public selection.

6. **Plain & Welcoming Tone**:
   - Zero confusing jargon. Straightforward, warm, and grounded in Nigerian hospitality.

---

## 🚀 How to Run

### 1. Frontend (Vite + React)
```bash
cd /Users/bou/code/idez-dance-studio
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend (Go REST API)
```bash
cd /Users/bou/code/idez-dance-studio/backend
go run main.go
```
The Go API will start on port `8080` (providing `/api/health`, `/api/bookings`, `/api/availability`, `/api/notifications`, `/api/admin/*`).
