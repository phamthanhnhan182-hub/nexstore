# NexStore – AI-Powered B2B2C E-commerce Platform

NexStore is a modern enterprise-grade e-commerce platform that demonstrates an advanced **Headless Architecture**, developed specifically for **Modern Front-End Ecosystems (Topic 2)**.

The project focuses on:

* Clear separation of concerns
* High-performance rendering strategies
* Real-time state synchronization
* AI-powered shopping and analytics experiences

---

# Live Demo & Credentials

### Live Deployment

`[To be deployed on Vercel]`

### Admin Dashboard Credentials

* **URL:** `/login`
* **Email:** `admin@nexstore.dev`
* **Password:** `admin123`

---

# Tech Stack & Architecture

## Core Technologies

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** TailwindCSS + Framer Motion + shadcn/ui
* **State Management:** Zustand with persisted global cart state and hydration-safe localStorage synchronization
* **Data Layer:** Frontend-focused Headless Architecture with Replaceable Seeded Dataset
* **Charts & Analytics:** Recharts

---

# Rendering Strategies

To maximize performance and SEO capabilities, NexStore combines multiple rendering strategies:

### 1. SSG (Static Site Generation)

Used for the `Home` page (`/`) to maximize edge caching and reduce Time To First Byte (TTFB).

### 2. ISR (Incremental Static Regeneration)

Used for:

* `/products`
* `/products/[slug]`

This allows product stock and pricing to update periodically while maintaining fast loading performance.

### 3. SSR + CSR Hybrid Rendering

Used for the `Admin Dashboard` (`/admin`).

* SSR verifies authentication
* CSR powers real-time charts, analytics, and dashboard interactivity

---

# Key Features

## 1. AI Shopping Assistant (Generative UI)

A floating AI chatbot capable of rendering interactive product recommendation components directly inside the chat flow based on customer context.

## 2. AI-Driven SEO Generator

An admin tool that simulates LLM behavior to generate:

* SEO titles
* OpenGraph metadata
* Product descriptions

## 3. Persistent Global State

Shopping cart state and UI preferences (Dark Mode) persist through Zustand middleware with localStorage synchronization.

## 4. Production-Grade UI

Modern UI inspired by Vercel:

* Dark Mode support
* Smooth animations
* Skeleton loading states
* Responsive layouts

## 5. AI Business Insights

The admin dashboard provides:

* Revenue analysis
* Conversion risk detection
* Product demand insights
* AI-generated strategic recommendations

## 6. Persistent Shopping Cart & Checkout Flow

The checkout system includes:

* Persistent cart state
* Quantity management
* Checkout success modal
* Order ID generation
* localStorage session persistence

## 7. Real-Time Inventory Synchronization

* Product stock updates instantly after checkout
* Admin can manually update stock and pricing
* Customers cannot purchase out-of-stock products
* Dashboard analytics update dynamically based on live order data

## 8. AI Analytics Dashboard

Dashboard metrics dynamically react to:

* Customer purchases
* Revenue changes
* Product stock updates
* Order delivery status

AI-generated business insights are calculated from real customer activity instead of static demo values.

---

# Local Development Setup

## Prerequisites

* Node.js v18 or higher
* npm or pnpm

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd nexstore
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Open the following URL in your browser:

```text
http://localhost:3000
```

---

# Checkout Flow

NexStore includes a presentation-ready checkout system for demonstrating e-commerce architecture and state management.

## Features

* Persistent cart state
* Quantity management
* Remove item actions
* Checkout success modal
* Order ID generation
* localStorage persistence

---

# Folder Structure

```text
src/
├── app/
│   ├── (customer)/       # Customer-facing pages
│   ├── (admin)/          # Admin dashboard pages
│   ├── compare/          # Rendering strategy demo
│   └── login/            # Authentication page
│
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── customer/         # Customer components
│   ├── admin/            # Admin components
│   └── shared/           # Shared components (Navbar, AIChat)
│
├── lib/                  # Utilities and seeded datasets
│
└── store/                # Zustand global state management
```

---

# AI-Powered Business Workflow

1. Customer purchases products
2. Product stock updates automatically
3. Orders synchronize in real time
4. Dashboard analytics refresh dynamically
5. AI Business Insights generate recommendations based on:

   * Revenue movement
   * Inventory levels
   * Customer purchasing behavior
   * Delivery status trends

---

# Educational Objectives

This project demonstrates:

* Modern Headless Commerce Architecture
* Hybrid Rendering Strategies
* Advanced Front-End Ecosystem Design
* Real-Time State Synchronization
* AI-Augmented User Experience
* Enterprise-Level Admin Dashboard Design
* Type-Safe Full Front-End Development with TypeScript
