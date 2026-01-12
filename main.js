import './style.css'
import { getWeather, getForecast, searchCities } from './src/weather.js'

const app = document.getElementById('app')

// Initialize app
let currentUnit = 'metric'
let favorites = JSON.parse(localStorage.getItem('favorites')) || []

app.innerHTML = `
  <div class="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-zinc-900 relative overflow-hidden">
    
    <!-- Weather Animation Container -->
    <div id="weatherAnimationContainer"></div>
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>

    <!-- Main container -->
    <div class="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="flex items-center gap-3">
          <div class="text-5xl">🌤️</div>
          <h1 class="text-4xl font-bold text-white">Weatherly</h1>
        </div>
        
        <div class="flex gap-3">
          <button id="unitToggle" class="glass-card px-4 py-2 text-white hover:bg-white/20 transition-all">
            °C / °F
          </button>
          <button id="favoritesBtn" class="glass-card px-4 py-2 text-white hover:bg-white/20 transition-all">
            ⭐ Favorites
          </button>
        </div>
      </header>

      <!-- Search section -->
      <div class="mb-8">
        <div class="glass-card p-6 backdrop-blur-xl">
          <div class="relative">
            <input 
              type="text" 
              id="cityInput" 
              placeholder="Search for a city..." 
              autocomplete="off"
              class="w-full px-6 py-4 bg-white/10 text-white placeholder-white/60 rounded-2xl border-2 border-white/20 focus:border-white/40 focus:outline-none transition-all text-lg backdrop-blur-sm"
            />
            <button id="searchBtn" class="absolute right-0 top-10 -translate-y-1/2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all font-semibold">
              Search
            </button>
          </div>
          <div id="suggestions" class="mt-2 space-y-1"></div>
        </div>
      </div>

      <!-- Loading state -->
      <div id="loading" class="hidden text-center py-12">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
        <p class="text-white mt-4 text-lg">Loading weather data...</p>
      </div>

      <!-- Error state -->
      <div id="error" class="hidden glass-card p-6 backdrop-blur-xl text-center">
        <div class="text-6xl mb-4">😢</div>
        <p class="text-white text-xl" id="errorMessage"></p>
      </div>

      <!-- Main weather display -->
      <div id="weatherDisplay" class="hidden">
        
        <!-- Current weather card -->
        <div class="glass-card p-8 backdrop-blur-xl mb-6 transform hover:scale-[1.01] transition-all">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <!-- Left side - Main info -->
            <div class="flex-1 text-center md:text-left">
              <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
                <h2 id="cityName" class="text-4xl font-bold text-white"></h2>
                <button id="favoriteToggle" class="text-3xl hover:scale-125 transition-transform">⭐</button>
              </div>
              <p id="currentDate" class="text-white/80 text-lg mb-2"></p>
              <div class="flex items-center justify-center md:justify-start gap-4 my-6">
                <div id="weatherIcon" class="text-9xl animate-bounce-slow"></div>
                <div>
                  <p id="temperature" class="text-7xl font-bold text-white"></p>
                  <p id="feelsLike" class="text-white/80 text-xl mt-2"></p>
                </div>
              </div>
              <p id="description" class="text-2xl text-white/90 capitalize font-medium"></p>
            </div>

            <!-- Right side - Details grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">💧</div>
                <p class="text-white/70 text-sm">Humidity</p>
                <p id="humidity" class="text-white text-2xl font-bold"></p>
              </div>
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">💨</div>
                <p class="text-white/70 text-sm">Wind Speed</p>
                <p id="windSpeed" class="text-white text-2xl font-bold"></p>
              </div>
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">🌡️</div>
                <p class="text-white/70 text-sm">Pressure</p>
                <p id="pressure" class="text-white text-2xl font-bold"></p>
              </div>
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">👁️</div>
                <p class="text-white/70 text-sm">Visibility</p>
                <p id="visibility" class="text-white text-2xl font-bold"></p>
              </div>
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">🌅</div>
                <p class="text-white/70 text-sm">Sunrise</p>
                <p id="sunrise" class="text-white text-xl font-bold"></p>
              </div>
              <div class="glass-card p-4 text-center backdrop-blur-sm">
                <div class="text-3xl mb-2">🌇</div>
                <p class="text-white/70 text-sm">Sunset</p>
                <p id="sunset" class="text-white text-xl font-bold"></p>
              </div>
            </div>
          </div>
        </div>

        <!-- 5-day forecast -->
        <div class="glass-card p-8 backdrop-blur-xl mb-6">
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📅</span> 5-Day Forecast
          </h3>
          <div id="forecast" class="grid grid-cols-2 md:grid-cols-5 gap-4"></div>
        </div>

        <!-- Additional info -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Air quality (placeholder) -->
          <div class="glass-card p-6 backdrop-blur-xl">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🌫️</span> Air Quality
            </h3>
            <div id="airQuality" class="space-y-3"></div>
          </div>

          <!-- Weather alerts -->
          <div class="glass-card p-6 backdrop-blur-xl">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>⚠️</span> Weather Insights
            </h3>
            <div id="insights" class="space-y-3"></div>
          </div>
        </div>
      </div>

      <!-- Favorites modal -->
      <div id="favoritesModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center p-4">
        <div class="glass-card max-w-2xl w-full p-8 backdrop-blur-xl transform scale-95 transition-all" id="favoritesContent">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-white">⭐ Favorite Cities</h2>
            <button id="closeFavorites" class="text-white text-3xl hover:scale-125 transition-transform">&times;</button>
          </div>
          <div id="favoritesList" class="space-y-3"></div>
        </div>
      </div>
    </div>
  </div>
`

// Event listeners
document.getElementById('searchBtn').addEventListener('click', handleSearch)
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch()
})
document.getElementById('cityInput').addEventListener('input', handleCityInput)
document.getElementById('unitToggle').addEventListener('click', toggleUnit)
document.getElementById('favoritesBtn').addEventListener('click', showFavorites)
document.getElementById('closeFavorites').addEventListener('click', hideFavorites)

// Auto-detect user location on load
detectLocation()

// Weather Animation Functions
function createWeatherAnimation(weatherType) {
  const container = document.getElementById('weatherAnimationContainer')
  if (!container) return
  
  container.innerHTML = '' // Clear previous animations
  
  switch(weatherType.toLowerCase()) {
    case 'rain':
    case 'drizzle':
      createRainEffect(container)
      break
    case 'snow':
      createSnowEffect(container)
      break
    case 'clear':
      createSunEffect(container)
      break
    case 'clouds':
      createCloudsEffect(container)
      break
    case 'thunderstorm':
      createThunderstormEffect(container)
      break
    default:
      createDefaultEffect(container)
  }
}

function createRainEffect(container) {
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div')
    drop.className = 'rain-drop'
    drop.style.left = `${Math.random() * 100}%`
    drop.style.animationDelay = `${Math.random() * 2}s`
    drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`
    container.appendChild(drop)
  }
}

function createSnowEffect(container) {
  for (let i = 0; i < 50; i++) {
    const flake = document.createElement('div')
    flake.className = 'snow-flake'
    flake.textContent = '❄'
    flake.style.left = `${Math.random() * 100}%`
    flake.style.fontSize = `${10 + Math.random() * 20}px`
    flake.style.animationDelay = `${Math.random() * 3}s`
    flake.style.animationDuration = `${3 + Math.random() * 4}s`
    container.appendChild(flake)
  }
}

function createSunEffect(container) {
  const sunRays = document.createElement('div')
  sunRays.className = 'sun-rays'
  sunRays.innerHTML = '<div class="sun-orb"></div>'
  container.appendChild(sunRays)
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'sun-particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.animationDelay = `${Math.random() * 3}s`
    particle.style.animationDuration = `${2 + Math.random() * 2}s`
    container.appendChild(particle)
  }
}

function createCloudsEffect(container) {
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div')
    cloud.className = 'weather-cloud'
    cloud.innerHTML = '☁️'
    cloud.style.top = `${10 + Math.random() * 50}%`
    cloud.style.left = `-100px`
    cloud.style.fontSize = `${50 + Math.random() * 50}px`
    cloud.style.animationDelay = `${i * 3}s`
    cloud.style.animationDuration = `${20 + Math.random() * 10}s`
    container.appendChild(cloud)
  }
}

function createThunderstormEffect(container) {
  createRainEffect(container)
  
  const lightning = document.createElement('div')
  lightning.className = 'lightning'
  container.appendChild(lightning)
  
  setInterval(() => {
    if (Math.random() > 0.7) {
      lightning.classList.add('flash')
      setTimeout(() => lightning.classList.remove('flash'), 200)
    }
  }, 3000)
}

function createDefaultEffect(container) {
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div')
    particle.className = 'ambient-particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.animationDelay = `${Math.random() * 5}s`
    container.appendChild(particle)
  }
}

async function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeather(null, position.coords.latitude, position.coords.longitude)
          await displayWeather(data)
        } catch (error) {
          console.error('Error getting location weather:', error)
        }
      },
      (error) => {
        console.log('Location access denied')
      }
    )
  }
}

let searchTimeout
async function handleCityInput(e) {
  clearTimeout(searchTimeout)
  const query = e.target.value.trim()
  
  if (query.length < 2) {
    document.getElementById('suggestions').innerHTML = ''
    return
  }

  searchTimeout = setTimeout(async () => {
    try {
      const cities = await searchCities(query)
      displaySuggestions(cities)
    } catch (error) {
      console.error('Error searching cities:', error)
    }
  }, 300)
}

function displaySuggestions(cities) {
  const suggestionsDiv = document.getElementById('suggestions')
  
  if (cities.length === 0) {
    suggestionsDiv.innerHTML = ''
    return
  }

  suggestionsDiv.innerHTML = cities.slice(0, 5).map(city => `
    <div class="suggestion-item px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all text-white backdrop-blur-sm" data-city="${city.name}" data-lat="${city.lat}" data-lon="${city.lon}">
      ${city.name}, ${city.country}
    </div>
  `).join('')

  document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', async () => {
      const city = item.dataset.city
      document.getElementById('cityInput').value = city
      suggestionsDiv.innerHTML = ''
      await handleSearch()
    })
  })
}

async function handleSearch() {
  const city = document.getElementById('cityInput').value.trim()
  if (!city) return

  showLoading()
  
  try {
    const data = await getWeather(city)
    await displayWeather(data)
  } catch (error) {
    showError(error.message)
  }
}

async function displayWeather(data) {
  hideLoading()
  hideError()
  
  const weatherDisplay = document.getElementById('weatherDisplay')
  const temp = currentUnit === 'metric' ? data.main.temp : (data.main.temp * 9/5) + 32
  const feelsLike = currentUnit === 'metric' ? data.main.feels_like : (data.main.feels_like * 9/5) + 32
  const unit = currentUnit === 'metric' ? '°C' : '°F'
  const speed = currentUnit === 'metric' ? 'm/s' : 'mph'
  
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`
  document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  })
  document.getElementById('temperature').textContent = `${Math.round(temp)}${unit}`
  document.getElementById('feelsLike').textContent = `Feels like ${Math.round(feelsLike)}${unit}`
  document.getElementById('description').textContent = data.weather[0].description
  document.getElementById('humidity').textContent = `${data.main.humidity}%`
  document.getElementById('windSpeed').textContent = `${data.wind.speed} ${speed}`
  document.getElementById('pressure').textContent = `${data.main.pressure} hPa`
  document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`
  document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  document.getElementById('weatherIcon').textContent = getWeatherIcon(data.weather[0].main)
  
  // Create weather animation based on current weather
  createWeatherAnimation(data.weather[0].main)
  
  // Update favorite button
  updateFavoriteButton(data.name)
  
  // Generate insights
  generateInsights(data)
  
  // Generate air quality info
  generateAirQuality(data)
  
  // Load forecast
  await loadForecast(data.coord.lat, data.coord.lon)
  
  weatherDisplay.classList.remove('hidden')
}

async function loadForecast(lat, lon) {
  try {
    const forecast = await getForecast(lat, lon)
    displayForecast(forecast)
  } catch (error) {
    console.error('Error loading forecast:', error)
  }
}

function displayForecast(forecast) {
  const forecastDiv = document.getElementById('forecast')
  const dailyData = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5)
  
  forecastDiv.innerHTML = dailyData.map(day => {
    const temp = currentUnit === 'metric' ? day.main.temp : (day.main.temp * 9/5) + 32
    const unit = currentUnit === 'metric' ? '°C' : '°F'
    const date = new Date(day.dt * 1000)
    
    return `
      <div class="glass-card p-4 text-center backdrop-blur-sm hover:scale-105 transition-transform">
        <p class="text-white/80 font-semibold mb-2">${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
        <div class="text-4xl mb-2">${getWeatherIcon(day.weather[0].main)}</div>
        <p class="text-white text-2xl font-bold mb-1">${Math.round(temp)}${unit}</p>
        <p class="text-white/70 text-sm capitalize">${day.weather[0].description}</p>
      </div>
    `
  }).join('')
}

function generateInsights(data) {
  const insights = []
  
  if (data.main.humidity > 80) {
    insights.push({ icon: '💧', text: 'High humidity - might feel muggy' })
  }
  if (data.wind.speed > 10) {
    insights.push({ icon: '💨', text: 'Windy conditions - secure loose items' })
  }
  if (data.main.temp < 5 && currentUnit === 'metric') {
    insights.push({ icon: '🧥', text: 'Cold weather - dress warmly' })
  }
  if (data.visibility < 1000) {
    insights.push({ icon: '🌫️', text: 'Low visibility - drive carefully' })
  }
  if (data.weather[0].main === 'Rain') {
    insights.push({ icon: '☔', text: "Don't forget your umbrella!" })
  }
  
  if (insights.length === 0) {
    insights.push({ icon: '✨', text: 'Perfect weather conditions!' })
  }
  
  document.getElementById('insights').innerHTML = insights.map(insight => `
    <div class="flex items-center gap-3 text-white/90">
      <span class="text-2xl">${insight.icon}</span>
      <span>${insight.text}</span>
    </div>
  `).join('')
}

function generateAirQuality(data) {
  // Simulated air quality based on weather conditions
  let quality = 'Good'
  let color = 'from-green-500 to-emerald-500'
  let index = 45
  
  if (data.weather[0].main === 'Haze' || data.weather[0].main === 'Smoke') {
    quality = 'Moderate'
    color = 'from-yellow-500 to-orange-500'
    index = 75
  }
  
  document.getElementById('airQuality').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <span class="text-white/80">AQI Index</span>
      <span class="text-white text-2xl font-bold">${index}</span>
    </div>
    <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">
      <div class="bg-linear-to-r ${color} h-full rounded-full transition-all" style="width: ${(index/200)*100}%"></div>
    </div>
    <p class="text-white/90 mt-3">${quality} - Safe for outdoor activities</p>
  `
}

function getWeatherIcon(weather) {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⛈️',
    Drizzle: '🌦️',
    Mist: '🌫️',
    Haze: '🌫️',
    Smoke: '💨',
    Fog: '🌁',
  }
  return icons[weather] || '🌤️'
}

function toggleUnit() {
  currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric'
  const city = document.getElementById('cityInput').value.trim()
  if (city) {
    handleSearch()
  }
}

function updateFavoriteButton(cityName) {
  const isFavorite = favorites.includes(cityName)
  const btn = document.getElementById('favoriteToggle')
  btn.textContent = isFavorite ? '⭐' : '☆'
  btn.onclick = () => toggleFavorite(cityName)
}

function toggleFavorite(cityName) {
  if (favorites.includes(cityName)) {
    favorites = favorites.filter(f => f !== cityName)
  } else {
    favorites.push(cityName)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
  updateFavoriteButton(cityName)
  if (document.getElementById('favoritesModal').classList.contains('hidden') === false) {
    renderFavorites()
  }
}

function showFavorites() {
  document.getElementById('favoritesModal').classList.remove('hidden')
  renderFavorites()
}

function hideFavorites() {
  document.getElementById('favoritesModal').classList.add('hidden')
}

function renderFavorites() {
  const list = document.getElementById('favoritesList')
  
  if (favorites.length === 0) {
    list.innerHTML = '<p class="text-white/70 text-center py-8">No favorite cities yet. Add some by clicking the star icon!</p>'
    return
  }
  
  list.innerHTML = favorites.map(city => `
    <div class="glass-card p-4 backdrop-blur-sm flex justify-between items-center hover:bg-white/20 transition-all">
      <span class="text-white text-lg">${city}</span>
      <div class="flex gap-2">
        <button class="load-favorite px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all" data-city="${city}">
          Load
        </button>
        <button class="remove-favorite px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all" data-city="${city}">
          Remove
        </button>
      </div>
    </div>
  `).join('')
  
  document.querySelectorAll('.load-favorite').forEach(btn => {
    btn.addEventListener('click', async () => {
      document.getElementById('cityInput').value = btn.dataset.city
      hideFavorites()
      await handleSearch()
    })
  })
  
  document.querySelectorAll('.remove-favorite').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFavorite(btn.dataset.city)
    })
  })
}

function showLoading() {
  document.getElementById('loading').classList.remove('hidden')
  document.getElementById('weatherDisplay').classList.add('hidden')
  document.getElementById('error').classList.add('hidden')
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden')
}

function showError(message) {
  document.getElementById('error').classList.remove('hidden')
  document.getElementById('errorMessage').textContent = message
  document.getElementById('weatherDisplay').classList.add('hidden')
  hideLoading()
}

function hideError() {
  document.getElementById('error').classList.add('hidden')
}