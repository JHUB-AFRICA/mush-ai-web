# SmartMushroom Web Platform

SmartMushroom is a Next.js 16 web application for JKUAT's SmartMushroom initiative - revolutionizing indoor mushroom agriculture with pumice-based structures, IoT monitoring, and AI-driven climate control. The platform enables farmers to purchase grow kits, spawn, and access training services while supporting a closed-loop value chain.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Project Overview

SmartMushroom addresses the challenges of traditional mushroom farming (high energy costs, strict climate requirements, 95% failure rate) through:

- **Pumice Structures**: Passive cooling reducing energy dependency
- **IoT Monitoring**: Real-time temperature, humidity, and CO₂ tracking
- **JKUAT Strains**: Proprietary JAMBO101 and MAMBO101 oyster mushroom strains
- **Closed-Loop System**: Spent substrate returned as organic fertilizer
- **Value-Add Products**: Dried mushrooms, mushroom crisp, and Myco-Vino mushroom wine

## Tech Stack

| Technology                                    | Version | Purpose                         |
| --------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                | 16.4.2  | React framework with App Router |
| [React](https://react.dev/)                   | 19.3.0  | UI library                      |
| [TypeScript](https://www.typescriptlang.org/) | ^5      | Type safety                     |
| [Tailwind CSS](https://tailwindcss.com/)      | ^4.3.3  | Styling                         |
| [Framer Motion](https://motion.dev/)          | ^14.6.0 | Animations                      |
| [Lucide React](https://lucide.dev/)           | ^1.55.0 | Icons                           |
| [Bun](https://bun.sh/)                        | 1.4.2   | Package manager/runtime         |

## Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Next.js App Router] --> B[React Components]
        B --> C[Cart Context]
        B --> D[Auth Context]
    end

    subgraph "Pages/Routes"
        E[Home] --> F[Shop]
        F --> G[Cart]
        G --> H[Checkout]
        H --> I[Payment]
        F --> J[Product Detail]
    end

    subgraph "Current State"
        K[Client-side State] --> L[localStorage - Cart]
        K --> M[localStorage - Auth Mock]
    end

    subgraph "Future Backend Needed"
        N[API Routes] --> O[Auth Service]
        N --> P[Payment Gateway]
        N --> Q[Order Management]
        N --> R[Product Inventory]
        N --> S[IoT Data]
    end

    A --> E
    C --> L
    D --> M
    I -.-> N
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.4.2 or higher
- Node.js 18+ (if not using Bun)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mush-ai

# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
bun run build
bun start
```

## Project Structure

```mermaid
graph TD
    A[mush-ai/] --> B[app/]
    A --> C[components/]
    A --> D[lib/]
    A --> E[public/]

    B --> B1[page.tsx - Home]
    B --> B2[shop/]
    B --> B3[cart/]
    B --> B4[checkout/]
    B --> B5[payment/]
    B --> B6[auth/]
    B --> B7[about/]
    B --> B8[contact/]

    C --> C1[shop/]
    C --> C2[layout/]
    C --> C3[home/]
    C --> C4[auth/]
    C --> C5[ui/]

    C1 --> C1a[cart/]
    C1 --> C1b[product/]
    C1 --> C1c[checkout/]
    C1 --> C1d[payment/]
    C1 --> C1e[reviews/]
    C1 --> C1f[navigation/]

    D --> D1[products.ts]
    D --> D2[content.ts]
    D --> D3[format.ts]
    D --> D4[site.ts]
```

### Directory Breakdown

| Directory            | Purpose                                                               |
| -------------------- | --------------------------------------------------------------------- |
| `app/`               | Next.js App Router pages and layouts                                  |
| `components/shop/`   | All e-commerce related components (cart, checkout, payment, products) |
| `components/layout/` | Header, Footer, navigation                                            |
| `components/home/`   | Homepage sections                                                     |
| `lib/`               | Utilities, product data, content                                      |
| `public/images/`     | Static assets organized by section                                    |
