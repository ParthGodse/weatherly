const API_KEY = import.meta.env.VITE_WEATHER_API_KEY // Get from openweathermap.org
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeather(city) {
  const response = await fetch(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
  )
  
  if (!response.ok) {
    throw new Error('City not found')
  }
  
  return await response.json()
}

export function displayWeather(data) {
  const weatherDisplay = document.getElementById('weatherDisplay')
  const errorDiv = document.getElementById('error')
  
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`
  document.getElementById('description').textContent = data.weather[0].description
  document.getElementById('humidity').textContent = `${data.main.humidity}%`
  document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`
  document.getElementById('weatherIcon').textContent = getWeatherIcon(data.weather[0].main)
  
  weatherDisplay.classList.remove('hidden')
  errorDiv.classList.add('hidden')
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
  }
  return icons[weather] || '🌤️'
}