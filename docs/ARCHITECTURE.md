# EverythingBeer Architecture

## Overview

EverythingBeer is built using a modern React architecture with Next.js 16 App Router, providing server-side rendering, API routes, and optimized performance.

## Technology Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Headless UI** - Unstyled accessible components
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Static Data** - JSON-based data storage

### Infrastructure
- **Docker** - Containerization
- **nginx** - Reverse proxy
- **GitHub Actions** - CI/CD pipeline

## Directory Structure

```
EverythingBeer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── docs/                       # Documentation
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── beers/
│   │   │   │   ├── route.ts   # GET /api/beers
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── breweries/
│   │   │   └── styles/
│   │   ├── beers/
│   │   │   ├── page.tsx       # Beer listing
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Beer detail
│   │   ├── breweries/
│   │   ├── compare/
│   │   ├── favorites/
│   │   ├── guides/
│   │   ├── login/
│   │   ├── quiz/
│   │   ├── styles/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── BeerCard.tsx
│   │   ├── BreweryCard.tsx
│   │   ├── StyleCard.tsx
│   │   ├── SearchFilters.tsx
│   │   └── Logo.tsx
│   ├── data/                  # Static data
│   │   ├── beers.ts
│   │   ├── styles.ts
│   │   └── guides.ts
│   ├── lib/                   # Utilities
│   │   └── images.ts          # Image URL helpers
│   └── types/                 # TypeScript types
│       └── index.ts
├── Dockerfile                 # Docker build
├── docker-compose.yml         # Docker orchestration
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── package.json
```

## Component Architecture

### Layout Components
```
Layout (layout.tsx)
├── Header
│   ├── Logo
│   ├── MegaMenu
│   └── Navigation
├── Main Content (children)
└── Footer
```

### Page Components
```
Page
├── SearchFilters (optional)
├── Content Grid
│   └── Card Components
│       ├── BeerCard
│       ├── BreweryCard
│       └── StyleCard
└── Pagination (future)
```

## Data Flow

### Static Data
```
src/data/*.ts → API Routes → Page Components → UI
```

### API Request Flow
```
Client Request
    ↓
Next.js API Route (/api/*)
    ↓
Data Processing & Filtering
    ↓
JSON Response
```

### URL Parameter Filtering
```
/beers?filter=craft    → Shows only craft beers
/beers?filter=trending → Shows only trending beers
/beers?style=ipa       → Shows only IPAs
```

## Image Architecture

Images are served from Unsplash using verified photo IDs:

```typescript
// src/lib/images.ts
const VERIFIED_BEER_PHOTOS = {
  golden1: 'photo-1535958636474-b021ee887b13',
  dark1: 'photo-1532634922-8fe0b757fb13',
  // ...
};

function unsplashUrl(photoId: string, w: number, h: number): string {
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop`;
}
```

## Deployment Architecture

```
GitHub Push
    ↓
GitHub Actions CI/CD
    ↓
SSH to IONOS VPS
    ↓
Docker Build & Deploy
    ↓
nginx Reverse Proxy
    ↓
Public Access
```

### Port Mapping
- **Internal**: Container runs on port 3000
- **Docker**: Maps to host port 8096
- **nginx**: Proxies domain/path to localhost:8096
- **External**: Access via domain or IP/path

## Security Considerations

- Non-root user in Docker container
- Environment variables for sensitive data
- HTTPS via Let's Encrypt (when domain configured)
- No direct database exposure (static data)

## Performance Optimizations

- Next.js standalone output for minimal container size
- Image optimization with Next.js Image component
- Server-side rendering for SEO and initial load
- Tailwind CSS purging for minimal CSS bundle
