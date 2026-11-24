package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"sync"
	"time"
)

// ServiceItem represents an official iDez rate card offering
type ServiceItem struct {
	ID             string   `json:"id"`
	Category       string   `json:"category"`
	Title          string   `json:"title"`
	Subtitle       string   `json:"subtitle,omitempty"`
	StartingPrice  int      `json:"startingPrice"`
	PriceFormatted string   `json:"priceFormatted"`
	Description    string   `json:"description"`
	IdealFor       []string `json:"idealFor,omitempty"`
	Includes       []string `json:"includes,omitempty"`
}

// Booking represents a reservation
type Booking struct {
	ID                  string    `json:"id"`
	BookingCode         string    `json:"bookingCode"` // e.g. IDEZ-2026-8912
	CreatedAt           time.Time `json:"createdAt"`
	ServiceCategory     string    `json:"serviceCategory"`
	ServiceTitle        string    `json:"serviceTitle"`
	EventDate           string    `json:"eventDate"`
	EventSlot           string    `json:"eventSlot"`
	EventLocation       string    `json:"eventLocation"`
	OutsideAbuja        bool      `json:"outsideAbuja"`
	CreativeDirection   string    `json:"creativeDirection"`
	TotalAmount         int       `json:"totalAmount"`
	DepositAmount       int       `json:"depositAmount"` // 70% deposit
	BalanceDue          int       `json:"balanceDue"`    // 30% or 0
	PaymentChoice       string    `json:"paymentChoice"` // deposit_70 or full_100
	PaymentStatus       string    `json:"paymentStatus"` // deposit_paid, fully_paid
	BookingStatus       string    `json:"bookingStatus"` // confirmed, completed
	ClientName          string    `json:"clientName"`
	ClientEmail         string    `json:"clientEmail"`
	ClientPhone         string    `json:"clientPhone"`
	OrganizationOrCouple string   `json:"organizationOrCouple,omitempty"`
	Notes               string    `json:"notes,omitempty"`
	PaystackReference   string    `json:"paystackReference"`
}

type Notification struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
	Read      bool      `json:"read"`
	Type      string    `json:"type"`
}

// In-Memory Thread-Safe Database
type Store struct {
	mu            sync.RWMutex
	bookings      map[string]Booking
	blockedDates  []string
	notifications []Notification
}

var db = &Store{
	bookings: make(map[string]Booking),
	blockedDates: []string{
		"2026-12-25",
		"2027-01-01",
	},
	notifications: []Notification{
		{
			ID:        "notif-1",
			Title:     "iDez Booking API Online",
			Message:   "Ready to receive bookings and Paystack webhook notifications.",
			Timestamp: time.Now(),
			Read:      false,
			Type:      "system",
		},
	},
}

func init() {
	// Seed demo booking
	demo := Booking{
		ID:                  "demo-1",
		BookingCode:         "IDEZ-2026-9042",
		CreatedAt:           time.Now().Add(-24 * time.Hour),
		ServiceCategory:     "wedding",
		ServiceTitle:        "Signature Wedding Dance Experience Package",
		EventDate:           "2026-12-15",
		EventSlot:           "16:00 - 20:00",
		EventLocation:       "Abuja (Inside)",
		OutsideAbuja:        false,
		CreativeDirection:   "Full Creative Direction",
		TotalAmount:         2000000,
		DepositAmount:       1400000,
		BalanceDue:          600000,
		PaymentChoice:       "deposit_70",
		PaymentStatus:       "deposit_paid",
		BookingStatus:       "confirmed",
		ClientName:          "Ngozi & Tunde Adeleke",
		ClientEmail:         "ngozi@example.com",
		ClientPhone:         "0803 123 4567",
		OrganizationOrCouple: "Adeleke Wedding 2026",
		Notes:               "Royal Emerald Theme",
		PaystackReference:   "PSTK-DEMO-9042",
	}
	db.bookings[demo.BookingCode] = demo
}

// CORS Middleware
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func jsonResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

// Handlers
func handleHealth(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, http.StatusOK, map[string]interface{}{
		"status":    "healthy",
		"service":   "iDez Entertainment Dance Studio API",
		"timestamp": time.Now().UTC(),
		"currency":  "NGN",
	})
}

func handleGetAvailability(w http.ResponseWriter, r *http.Request) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	jsonResponse(w, http.StatusOK, map[string]interface{}{
		"blockedDates": db.blockedDates,
		"timeSlots": []string{
			"09:00 - 11:00 (Morning Rehearsal / Show)",
			"11:30 - 13:30 (Midday Session)",
			"14:00 - 16:00 (Afternoon Rehearsal)",
			"16:30 - 18:30 (Evening Event / Reception Entry)",
			"19:00 - 22:00 (Prime Gala / Night Wedding Reception)",
		},
	})
}

func handleCreateBooking(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		ServiceCategory      string `json:"serviceCategory"`
		ServiceTitle         string `json:"serviceTitle"`
		EventDate            string `json:"eventDate"`
		EventSlot            string `json:"eventSlot"`
		EventLocation        string `json:"eventLocation"`
		OutsideAbuja         bool   `json:"outsideAbuja"`
		CreativeDirection    string `json:"creativeDirection"`
		BasePrice            int    `json:"basePrice"`
		CreativePrice        int    `json:"creativePrice"`
		PaymentChoice        string `json:"paymentChoice"`
		ClientName           string `json:"clientName"`
		ClientEmail          string `json:"clientEmail"`
		ClientPhone          string `json:"clientPhone"`
		OrganizationOrCouple string `json:"organizationOrCouple"`
		Notes                string `json:"notes"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON body"})
		return
	}

	// Calculate rush fee if date is within 7 days
	eventTime, err := time.Parse("2006-01-02", req.EventDate)
	subtotal := req.BasePrice + req.CreativePrice
	rushFee := 0
	if err == nil {
		daysUntil := int(eventTime.Sub(time.Now()).Hours() / 24)
		if daysUntil >= 0 && daysUntil <= 7 {
			rushFee = int(float64(subtotal) * 0.25) // 25% rush fee
		}
	}

	totalAmount := subtotal + rushFee
	depositAmount := int(float64(totalAmount) * 0.70) // strict 70% deposit
	balanceDue := 0
	paymentStatus := "fully_paid"

	if req.PaymentChoice == "deposit_70" {
		balanceDue = totalAmount - depositAmount
		paymentStatus = "deposit_paid"
	}

	bookingCode := fmt.Sprintf("IDEZ-2026-%04d", rand.Intn(9000)+1000)
	booking := Booking{
		ID:                  fmt.Sprintf("book-%d", time.Now().UnixNano()),
		BookingCode:         bookingCode,
		CreatedAt:           time.Now(),
		ServiceCategory:     req.ServiceCategory,
		ServiceTitle:        req.ServiceTitle,
		EventDate:           req.EventDate,
		EventSlot:           req.EventSlot,
		EventLocation:       req.EventLocation,
		OutsideAbuja:        req.OutsideAbuja,
		CreativeDirection:   req.CreativeDirection,
		TotalAmount:         totalAmount,
		DepositAmount:       depositAmount,
		BalanceDue:          balanceDue,
		PaymentChoice:       req.PaymentChoice,
		PaymentStatus:       paymentStatus,
		BookingStatus:       "confirmed",
		ClientName:          req.ClientName,
		ClientEmail:         req.ClientEmail,
		ClientPhone:         req.ClientPhone,
		OrganizationOrCouple: req.OrganizationOrCouple,
		Notes:               req.Notes,
		PaystackReference:   fmt.Sprintf("PSTK-%d", time.Now().Unix()),
	}

	db.mu.Lock()
	db.bookings[bookingCode] = booking
	// Add notification
	db.notifications = append([]Notification{
		{
			ID:        fmt.Sprintf("notif-%d", time.Now().UnixNano()),
			Title:     "New Booking Confirmed",
			Message:   fmt.Sprintf("Booking %s received for %s on %s.", bookingCode, booking.ClientName, booking.EventDate),
			Timestamp: time.Now(),
			Read:      false,
			Type:      "booking",
		},
	}, db.notifications...)
	db.mu.Unlock()

	jsonResponse(w, http.StatusCreated, booking)
}

func handleGetBooking(w http.ResponseWriter, r *http.Request) {
	code := strings.TrimPrefix(r.URL.Path, "/api/bookings/")
	if code == "" {
		http.Error(w, "Missing booking code", http.StatusBadRequest)
		return
	}

	db.mu.RLock()
	booking, exists := db.bookings[strings.ToUpper(code)]
	db.mu.RUnlock()

	if !exists {
		jsonResponse(w, http.StatusNotFound, map[string]string{"error": "Booking not found"})
		return
	}

	jsonResponse(w, http.StatusOK, booking)
}

func handlePayBalance(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	code := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/api/bookings/"), "/pay-balance")
	code = strings.ToUpper(code)

	db.mu.Lock()
	booking, exists := db.bookings[code]
	if !exists {
		db.mu.Unlock()
		jsonResponse(w, http.StatusNotFound, map[string]string{"error": "Booking not found"})
		return
	}

	booking.PaymentStatus = "fully_paid"
	booking.BalanceDue = 0
	db.bookings[code] = booking
	db.mu.Unlock()

	jsonResponse(w, http.StatusOK, booking)
}

func handleAdminBookings(w http.ResponseWriter, r *http.Request) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	list := make([]Booking, 0, len(db.bookings))
	for _, b := range db.bookings {
		list = append(list, b)
	}

	jsonResponse(w, http.StatusOK, list)
}

func handleAdminBlockDate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Date string `json:"date"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}

	db.mu.Lock()
	db.blockedDates = append(db.blockedDates, req.Date)
	db.mu.Unlock()

	jsonResponse(w, http.StatusOK, map[string]string{"status": "blocked", "date": req.Date})
}

func handleGetNotifications(w http.ResponseWriter, r *http.Request) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	jsonResponse(w, http.StatusOK, db.notifications)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", enableCORS(handleHealth))
	mux.HandleFunc("/api/availability", enableCORS(handleGetAvailability))
	mux.HandleFunc("/api/bookings", enableCORS(handleCreateBooking))
	mux.HandleFunc("/api/bookings/", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/pay-balance") {
			handlePayBalance(w, r)
		} else {
			handleGetBooking(w, r)
		}
	}))
	mux.HandleFunc("/api/admin/bookings", enableCORS(handleAdminBookings))
	mux.HandleFunc("/api/admin/calendar/block", enableCORS(handleAdminBlockDate))
	mux.HandleFunc("/api/notifications", enableCORS(handleGetNotifications))

	port := ":8080"
	log.Printf("[iDez Server] Listening on port %s (Abuja Studio Backend)...", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
