# Hotel Booking System - Microservices Architecture

## Overview

The **Hotel Booking System** is a distributed application implemented using a microservices architecture. Each service handles a specific domain, ensuring scalability, maintainability, and high availability. Services communicate with each other through REST APIs and RabbitMQ for asynchronous messaging.

## Features and Microservices

### 1. **User Service**
Handles user registration, authentication, and profile management.

**Responsibilities:**
- User registration and login (JWT-based authentication).
- Profile management.

**Endpoints:**
- `POST /register` - Register a new user.
- `POST /login` - Log in a user.
- `GET /profile` - Retrieve user profile.
- `PUT /profile` - Update user profile.

---

### 2. **Hotel Service**
Manages hotel information, room details, and availability.

**Responsibilities:**
- CRUD operations for hotels and rooms.
- Retrieve room availability.

**Endpoints:**
- `GET /hotels` - Retrieve all hotels.
- `POST /hotels` - Add a new hotel (Admin only).
- `GET /hotels/:id` - Get hotel details.
- `PUT /hotels/:id` - Update hotel details (Admin only).
- `GET /hotels/:id/rooms` - Retrieve room availability.

---

### 3. **Booking Service**
Handles room bookings and reservations.

**Responsibilities:**
- Manage bookings.
- Support cancellation of bookings.

**Endpoints:**
- `POST /bookings` - Create a booking.
- `GET /bookings` - Retrieve user bookings.
- `GET /bookings/:id` - Retrieve booking details.
- `PUT /bookings/:id/cancel` - Cancel a booking.

---

### 4. **Payment Service**
Manages payment processing and transaction history.

**Responsibilities:**
- Process payments.
- Retrieve payment history.

**Endpoints:**
- `POST /payments` - Initiate a payment.
- `GET /payments` - Retrieve payment history.
- `GET /payments/:id` - Get payment details.

---

### 5. **Notification Service**
Handles notifications for booking confirmations, reminders, and updates.

**Responsibilities:**
- Send notifications via email/SMS.
- Triggered by events using RabbitMQ.

---

### 6. **Review Service**
Allows users to leave reviews and ratings for hotels.

**Responsibilities:**
- Add, update, retrieve, and delete reviews.

**Endpoints:**
- `POST /reviews` - Add a review.
- `GET /reviews` - Retrieve reviews for a hotel.
- `PUT /reviews/:id` - Update a review.
- `DELETE /reviews/:id` - Delete a review.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Databases:** MongoDB, Redis (for caching)
- **Messaging Queue:** RabbitMQ
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Authentication:** JSON Web Tokens (JWT)
- **API Gateway:** Routing and securing microservices

---

## Architecture Overview

1. **API Gateway**: Central entry point for all incoming requests, routing them to the appropriate microservices.
2. **Service Communication**: RabbitMQ handles events like bookings and payments asynchronously.
3. **Database Management**: Each microservice uses its own MongoDB instance for decoupling data.
4. **Cache Layer**: Redis is used for caching frequently accessed data such as room availability.

---

## Implementation Steps

### Step 1: Project Structure
- Create a separate folder for each microservice.
- Initialize Node.js and Express.js for each service.

### Step 2: API Design
- Define REST endpoints for each service.
- Document APIs using Swagger or Postman.

### Step 3: Database Configuration
- Use MongoDB for persistent storage.
- Redis for caching data.

### Step 4: Implement Core Features
-
