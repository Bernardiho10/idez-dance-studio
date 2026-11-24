# iDez Entertainment — Dance Studio & Booking Backend (Go)

High-performance Go backend API for iDez Entertainment dance booking and calendar slot management.

## Features
- **Strict Rate Card Engine**: Adheres 100% to official iDez pricing cards.
- **70% Deposit Calculator**: Automatically splits fees between initial 70% date-locking deposit and remaining 30% balance before event date.
- **Automatic Rush Fee**: Detects bookings within 7 days and applies the 25% surcharge per official terms.
- **Outside Abuja Travel Flag**: Notes travel and accommodation surcharges for events outside the FCT.
- **Paystack Webhook & Payment Verification**: Processes card, bank transfer, and USSD payments.
- **Calendar Availability & Blocker**: Admin date blocking for public holidays and private rehearsals.

## Endpoints
- `GET  /api/health` — Health status
- `GET  /api/availability` — Available slots and admin-blocked dates
- `POST /api/bookings` — Create a new booking with deposit calculation
- `GET  /api/bookings/:code` — Retrieve booking record and balance by code (e.g. `IDEZ-2026-9042`)
- `POST /api/bookings/:code/pay-balance` — Settle outstanding 30% balance
- `GET  /api/notifications` — In-app notification messages
- `GET  /api/admin/bookings` — View all bookings with deposit status filters
- `POST /api/admin/calendar/block` — Block a calendar date from public selection

## Run Locally
```bash
cd backend
go run main.go
```
The server will start at `http://localhost:8080`.
