# WeatherPro - Advanced Weather Application

A modern weather application with dynamic animations, real-time data, and glassmorphism UI built with Vite and Tailwind CSS v4.

## Features

- Real-time weather data for any city worldwide
- 5-day weather forecast
- Dynamic weather animations (rain, snow, sun, clouds, thunderstorm, fog)
- Auto-location detection
- Favorites system with local storage
- Smart city search with autocomplete
- Temperature unit toggle (Celsius/Fahrenheit)
- Detailed weather metrics (humidity, wind speed, pressure, visibility, sunrise/sunset)
- Air Quality Index display
- Fully responsive design
- Dark mode interface

## Tech Stack

**Frontend:**
- Vite - Build tool and dev server
- Tailwind CSS v4 - Styling framework
- Vanilla JavaScript - Core logic

**APIs:**
- OpenWeatherMap API - Weather data

**Deployment:**
- Vercel (recommended)
- Netlify (alternative)

**Storage:**
- LocalStorage - Favorites persistence

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- OpenWeatherMap API key

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# Install dependencies
npm install

# Create .env file
VITE_WEATHER_API_KEY=your_api_key_here

# Start dev server
npm run dev

# Build for production
npm run build
```

### Get API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Get your API key from dashboard

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variable
vercel env add VITE_WEATHER_API_KEY

# Deploy to production
vercel --prod
```

### Via Vercel Dashboard
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variable: `VITE_WEATHER_API_KEY`
4. Deploy

## Usage

- **Search**: Type city name for autocomplete suggestions
- **Favorites**: Click star icon to save cities
- **Units**: Toggle between Celsius/Fahrenheit
- **Animations**: Automatic based on current weather

## Configuration

### Change Background
Edit `main.js` line ~15:
```javascript
bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900
```

### Adjust Animations
Modify animation counts in `main.js` functions:
- `createRainEffect()` - Change loop count (default: 100)
- `createSnowEffect()` - Change loop count (default: 50)

Built with Vite + Tailwind CSS v4