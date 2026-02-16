# EverythingBeer

Your one-stop destination to discover, compare, and understand beer. From craft to commercial, domestic to international.

## Overview

EverythingBeer is a comprehensive beer discovery platform built with Next.js 16. Browse our extensive database of beers, breweries, and styles. Compare different beers side-by-side, take quizzes to find your perfect beer, and explore educational guides.

## Features

- **Beer Database** - 65+ beers with detailed information including ABV, IBU, flavor profiles
- **Brewery Directory** - Explore breweries from around the world
- **Style Guide** - 40+ beer styles with descriptions and characteristics
- **Beer Comparison** - Compare up to 4 beers side-by-side
- **Beer Quiz** - Find your perfect beer based on preferences
- **Educational Guides** - Learn about beer tasting, food pairing, and more
- **Smart Filtering** - Filter by craft, commercial, trending, style, and more

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI, Lucide React
- **Deployment**: Docker with nginx reverse proxy

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Start development server (port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d --build

# The app runs on port 8096 internally
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── beers/        # Beer endpoints
│   │   ├── breweries/    # Brewery endpoints
│   │   └── styles/       # Style endpoints
│   ├── beers/            # Beer listing and detail pages
│   ├── breweries/        # Brewery pages
│   ├── compare/          # Beer comparison tool
│   ├── favorites/        # User favorites
│   ├── guides/           # Educational content
│   ├── login/            # Authentication
│   ├── quiz/             # Beer finder quiz
│   └── styles/           # Beer style pages
├── components/            # Reusable React components
├── data/                  # Static data (beers, styles, guides)
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Documentation

- [Features](docs/FEATURES.md) - Detailed feature documentation
- [Architecture](docs/ARCHITECTURE.md) - Technical architecture overview
- [Implementation](docs/IMPLEMENTATION.md) - Implementation details
- [Deployment](docs/DEPLOYMENT.md) - Deployment guide
- [Roadmap](docs/ROADMAP.md) - Development roadmap
- [Future](docs/FUTURE.md) - Future enhancements

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/beers` | List all beers with filtering |
| `GET /api/beers/:id` | Get beer details |
| `GET /api/breweries` | List all breweries |
| `GET /api/breweries/:id` | Get brewery details |
| `GET /api/styles` | List all beer styles |
| `GET /api/styles/:id` | Get style details |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |

## OpenSentinel Integration

EverythingBeer integrates with [OpenSentinel](https://opensentinel.ai) for AI-powered assistant capabilities including beer recommendations, natural language search, and smart notifications.

### Setup

1. Set environment variables in `.env`:
   ```env
   OPENSENTINEL_ENABLED=true
   OPENSENTINEL_URL=http://localhost:8030
   OPENSENTINEL_API_KEY=your-api-key
   ```

2. The service is available at `src/lib/opensentinel.ts`:
   ```typescript
   import { openSentinelService } from '@/lib/opensentinel';

   // Register with OpenSentinel
   await openSentinelService.register();

   // AI-powered beer chat
   const response = await openSentinelService.chat('Recommend a hoppy IPA');

   // Send notifications
   await openSentinelService.notify('telegram', 'New beer added to database');

   // Store beer discovery memories
   await openSentinelService.storeMemory('User prefers craft IPAs from Pacific Northwest');
   ```

### Features
- AI-powered beer recommendations and search
- Cross-platform notifications (Telegram, Discord, Slack)
- Memory system for personalized beer suggestions
- Smart home integration for beer-related automations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software.

## Contact

For questions or support, please open an issue on GitHub.
