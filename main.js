import './style.css'
import { getWeather, displayWeather } from './src/weather.js'

const app = document.getElementById('app')

app.innerHTML = `
  <div class="min-h-screen bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Weather App</h1>
      
      <div class="mb-6">
        <input 
          type="text" 
          id="cityInput" 
          placeholder="Enter city name..." 
          class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition"
        />
        <button 
          id="searchBtn" 
          class="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>

      <div id="weatherDisplay" class="hidden">
        <div class="text-center">
          <h2 id="cityName" class="text-2xl font-bold text-gray-800 mb-2"></h2>
          <div id="weatherIcon" class="text-6xl mb-4"></div>
          <p id="temperature" class="text-5xl font-bold text-gray-800 mb-2"></p>
          <p id="description" class="text-xl text-gray-600 capitalize mb-4"></p>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-gray-600 text-sm">Humidity</p>
              <p id="humidity" class="text-2xl font-bold text-gray-800"></p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-gray-600 text-sm">Wind Speed</p>
              <p id="windSpeed" class="text-2xl font-bold text-gray-800"></p>
            </div>
          </div>
        </div>
      </div>

      <div id="error" class="hidden text-red-500 text-center mt-4"></div>
    </div>
  </div>
`

// Event listeners
document.getElementById('searchBtn').addEventListener('click', handleSearch)
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch()
})

async function handleSearch() {
  const city = document.getElementById('cityInput').value.trim()
  if (!city) return

  try {
    const data = await getWeather(city)
    displayWeather(data)
  } catch (error) {
    showError(error.message)
  }
}

function showError(message) {
  const errorDiv = document.getElementById('error')
  const weatherDisplay = document.getElementById('weatherDisplay')
  
  weatherDisplay.classList.add('hidden')
  errorDiv.classList.remove('hidden')
  errorDiv.textContent = message
}