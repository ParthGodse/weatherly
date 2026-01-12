const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

export async function getWeather(city, lat, lon) {
  if (!API_KEY) {
    throw new Error('API key is missing. Please add VITE_WEATHER_API_KEY to your .env file')
  }

  let url
  if (city) {
    url = `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
  } else if (lat && lon) {
    url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  } else {
    throw new Error('Please provide either a city name or coordinates')
  }

  const response = await fetch(url)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.')
    }
    throw new Error('Failed to fetch weather data. Please try again.')
  }
  
  return await response.json()
}

export async function getForecast(lat, lon) {
  if (!API_KEY) {
    throw new Error('API key is missing')
  }

  const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data')
  }
  
  return await response.json()
}

export async function searchCities(query) {
  if (!API_KEY) {
    throw new Error('API key is missing')
  }

  const url = `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('Failed to search cities')
  }
  
  return await response.json()
}