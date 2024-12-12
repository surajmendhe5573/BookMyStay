# BookMyStay - Microservices Architecture

## Overview

The **Hotel Booking System** is a distributed application implemented using a microservices architecture. Each service handles a specific domain, ensuring scalability, maintainability, and high availability. Services communicate with each other through REST APIs.

## Features and Microservices

### 1. **User Service**
Handles user registration, authentication, and profile management.

**Endpoints:**
- `POST /register` - Register a new user.
- `POST /login` - Log in a user.
- `GET /users` - Retrieve user profile.
- `PUT /update-user` - Update user profile.

---

### 2. **Hotel Service**
Manages hotel information, room details, and availability.

**Endpoints:**
- `POST /add-hotels` - Add a new hotel (Admin only).
- `GET /retrieve-all-hotels` - Retrieve all hotels.
- `GET /get-hotel-details/:id` - Get specific hotel details by ID.
- `PUT /update-hotel/:id` - Update hotel details (Admin only).
- `GET /room-availability/:id` - Retrieve room availability for a hotel.

---

### 3. **Booking Service**
Handles room bookings and reservations.

**Endpoints:**
- `POST /create-booking` - Create a booking.
- `GET /retrieve-user-bookings` - Retrieve user bookings.
- `GET /retrieve-booking-details/:id` - Retrieve booking details.
- `PUT /cancel-booking/:id` - Cancel a booking.

---

### 4. **Payment Service**
Processes payments and manages transaction history.

**Endpoints:**
- `POST /initiate-payment` - Initiate a payment.
- `GET /retrieve-payment-history` - Retrieve payment history.
- `GET /retrieve-payment/:id` - Retrieve specific payment details.

---

### 5. **Notification Service**
Sends booking confirmations, reminders, and updates via email or SMS.

**Endpoints:**
- `POST /send-notifications` - Send notifications.
- `GET /retrieve-notifications` - Retrieve notification details.

---

### 6. **Review Service**
Allows users to leave reviews and ratings for hotels.

**Endpoints:**
- `POST /add-review` - Add a review.
- `PUT /update-review/:id` - Update a review.
- `DELETE /delete-review/:id` - Delete a review.
- `GET /reviews/:hotelId` - Retrieve reviews by hotel ID.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Databases:** MongoDB, Redis (for caching)
- **Authentication:** JSON Web Tokens (JWT)
- **API Gateway:** Routing and securing microservices

---

## Architecture Overview

1. **API Gateway**: Central entry point for all incoming requests, routing them to the appropriate microservices.
2. **Database Management**: Each microservice uses its own MongoDB instance for decoupling data.
---

## Getting Started

### Prerequisites
- Node.js and npm installed
- Docker and Kubernetes configured
- MongoDB and Redis instances running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surajmendhe5573/BookMyStay.git
   cd hotel-booking-system
