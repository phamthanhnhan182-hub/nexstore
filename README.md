#  NexStore - AI-Powered B2B2C E-commerce Platform

NexStore is a modern, enterprise-grade e-commerce solution showcasing an advanced Headless Architecture, built specifically to demonstrate **Modern Front-End Ecosystems (Topic 2)**. 

The project emphasizes a clear separation of concerns, high-performance rendering strategies, and an integrated Generative UI AI shopping assistant.

##  Live Demo & Credentials

**Live Deployment:** `[To be deployed on Vercel]`

###  Admin Dashboard Credentials
- **URL:** `/login`
- **Email:** `admin@nexstore.dev`
- **Password:** `admin123`

---

## 🛠 Tech Stack & Architecture

- **Core Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** TailwindCSS + Framer Motion + shadcn/ui
- **State Management:** Zustand with persisted global cart state and hydration-safe         localStorage synchronization.
- **Data Layer:** Frontend-focused Headless architecture with a Replaceable Seeded Dataset.
- **Charts:** Recharts


###  Rendering Strategies Demonstrated
To achieve maximum performance and SEO capabilities, NexStore employs hybrid rendering:
1. **SSG (Static Site Generation):** Used on the `Home` page (`/`). Maximizes Edge Cache for instant TTFB (Time to First Byte).
2. **ISR (Incremental Static Regeneration):** Used on `Catalog` (`/products`) and `Product Detail` (`/products/[slug]`). Ensures stock and prices are updated periodically without sacrificing load speed.
3. **SSR & CSR (Hybrid):** Used on the `Admin Dashboard` (`/admin`). The layout uses SSR to verify authentication, while the heavy charts and tables use CSR for real-time interactivity.

---

## ✨ Key "WOW" Features

1. **AI Shopping Assistant (Generative UI):** A smart floating chatbot that doesn't just return text, but renders actual interactive Product Components directly inside the chat flow based on contextual understanding.
2. **AI-Driven SEO Generator:** An admin tool that simulates calling an LLM to instantly generate optimized OpenGraph tags and Meta descriptions for new products.
3. **Persisted Global State:** Cart items and UI preferences (Dark Mode) are synced with local storage via Zustand middleware, ensuring session continuity.
4. **Production-Grade UI:** Vercel-inspired minimal design with seamless Dark Mode, smooth micro-interactions, and Skeleton loading states.
5. **AI Business Insights:** The admin dashboard includes proactive AI-generated revenue analysis, conversion risk detection, and strategic recommendations rendered through interactive insight cards.

6. **Persistent Shopping Cart & Checkout Flow:** Shopping cart state is persisted using Zustand middleware with localStorage hydration, combined with a multi-step demo-ready checkout experience.
---

## 💻 Local Development Setup

Follow these steps to run the project locally.

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd nexstore
npm install
```

### 3. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
---

## 🛒 Checkout Flow

NexStore includes a demo-ready checkout system designed for presentation and architecture demonstration purposes.

### Features
- Persistent cart state
- Quantity management
- Remove item actions
- Checkout success modal
- Order ID generation
- localStorage session persistence

---

## 📁 Folder Structure (Feature-Sliced)

The codebase is organized to scale effortlessly:

```text
src/
├── app/                  # Next.js App Router
│   ├── (customer)/       # B2C Layout Group
│   ├── (admin)/          # B2B Layout Group (Admin Dashboard)
│   ├── compare/          # Rendering Strategy Educational Demo
│   └── login/            # Auth Entry
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui primitives
│   ├── customer/         # B2C specific components
│   ├── admin/            # B2B specific components
│   └── shared/           # Cross-boundary components (Navbar, AIChat)
├── lib/                  # Utilities and Seeded Dataset
└── store/                # Zustand global state (useCartStore)
```

---

## 🌍 Deployment Guide

This project is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically be detected as **Next.js**.
5. Click **Deploy**.

Because the project uses a seeded data layer and no external databases, it will build and deploy seamlessly with zero environment variable configuration required for the demo.
