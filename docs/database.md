# Database Documentation

This document provides an overview of the MongoDB collections (Mongoose models) used in the **ServiceBook** project, their fields, relationships, and any important notes.

---

## 1. User (`models/User.js`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key (auto‑generated). |
| `name` | String | Full name of the user. |
| `email` | String | Unique email address (used for login). |
| `password` | String | Bcrypt‑hashed password. |
| `role` | String (enum) | `user`, `provider`, or `admin`. Determines access rights. |
| `createdAt` | Date | Timestamp of creation (auto). |
| `updatedAt` | Date | Timestamp of last update (auto). |

**Indexes:** Unique index on `email`.

---

## 2. Category (`models/Category.js`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key. |
| `name` | String | Category name (e.g., "Home Cleaning"). |
| `description` | String | Optional description. |
| `createdAt` | Date | Auto timestamp. |
| `updatedAt` | Date | Auto timestamp. |

---

## 3. Service (`models/Service.js`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key. |
| `title` | String | Service title. |
| `description` | String | Detailed description. |
| `provider` | ObjectId (ref **User**) | Reference to the provider user who offers the service. |
| `category` | ObjectId (ref **Category**) | Category reference. |
| `price` | Number | Base price for the service. |
| `images` | [String] | Array of image URLs. |
| `rating` | Number | Average rating (default 0). |
| `numReviews` | Number | Count of reviews (default 0). |
| `isActive` | Boolean | Whether the service is publicly listed. |
| `createdAt` | Date | Auto timestamp. |
| `updatedAt` | Date | Auto timestamp. |

---

## 4. Booking (`models/Booking.js`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key. |
| `user` | ObjectId (ref **User**) | Customer who made the booking. |
| `service` | ObjectId (ref **Service**) | Service being booked. |
| `provider` | ObjectId (ref **User**) | Provider who will fulfill the booking. |
| `status` | String (enum) | `pending`, `confirmed`, `completed`, `cancelled`. |
| `date` | Date | Scheduled service date. |
| `time` | String | Slot identifier (e.g., `morning`). |
| `address` | String | JSON‑stringified address details. |
| `totalPrice` | Number | Final amount charged. |
| `paymentStatus` | String (enum) | `pending`, `paid`, `refunded`. |
| `createdAt` | Date | Auto timestamp. |
| `updatedAt` | Date | Auto timestamp. |

---

## 5. Review (`models/Review.js`)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key. |
| `service` | ObjectId (ref **Service**) | Service being reviewed. |
| `user` | ObjectId (ref **User**) | Reviewer. |
| `rating` | Number | Rating score (1‑5). |
| `comment` | String | Optional textual feedback. |
| `createdAt` | Date | Auto timestamp. |
| `updatedAt` | Date | Auto timestamp. |

---

### Notes
* All schemas use `{ timestamps: true }` to automatically manage `createdAt` and `updatedAt`.
* References (`ref`) enable population of related documents (e.g., `Booking` → `User`, `Service`).
* The `Booking` model stores the address as a JSON string to keep the schema flexible.

You can view the source files for each model under `server/models/`.
