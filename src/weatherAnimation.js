export function createWeatherAnimation(weatherType) {
  // Remove any existing weather animations
  removeWeatherAnimation()
  
  const container = document.getElementById('weatherAnimationContainer')
  if (!container) return
  
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
    case 'mist':
    case 'fog':
    case 'haze':
      createFogEffect(container)
      break
    default:
      createDefaultEffect(container)
  }
}

export function removeWeatherAnimation() {
  const container = document.getElementById('weatherAnimationContainer')
  if (container) {
    container.innerHTML = ''
  }
}

function createRainEffect(container) {
  const numDrops = 100
  
  for (let i = 0; i < numDrops; i++) {
    const drop = document.createElement('div')
    drop.className = 'rain-drop'
    drop.style.left = `${Math.random() * 100}%`
    drop.style.animationDelay = `${Math.random() * 2}s`
    drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`
    container.appendChild(drop)
  }
}

function createSnowEffect(container) {
  const numFlakes = 50
  
  for (let i = 0; i < numFlakes; i++) {
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
  // Animated sun rays
  const sunRays = document.createElement('div')
  sunRays.className = 'sun-rays'
  sunRays.innerHTML = `
    <div class="sun-orb"></div>
  `
  container.appendChild(sunRays)
  
  // Floating particles
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
  const numClouds = 5
  
  for (let i = 0; i < numClouds; i++) {
    const cloud = document.createElement('div')
    cloud.className = 'weather-cloud'
    cloud.innerHTML = '☁️'
    cloud.style.top = `${Math.random() * 60}%`
    cloud.style.left = `${-20 + Math.random() * 120}%`
    cloud.style.fontSize = `${40 + Math.random() * 40}px`
    cloud.style.animationDelay = `${Math.random() * 5}s`
    cloud.style.animationDuration = `${15 + Math.random() * 10}s`
    container.appendChild(cloud)
  }
}

function createThunderstormEffect(container) {
  // Rain drops
  createRainEffect(container)
  
  // Lightning flashes
  const lightning = document.createElement('div')
  lightning.className = 'lightning'
  container.appendChild(lightning)
  
  // Random lightning strikes
  setInterval(() => {
    if (Math.random() > 0.7) {
      lightning.classList.add('flash')
      setTimeout(() => lightning.classList.remove('flash'), 200)
    }
  }, 3000)
}

function createFogEffect(container) {
  const numFogLayers = 3
  
  for (let i = 0; i < numFogLayers; i++) {
    const fog = document.createElement('div')
    fog.className = 'fog-layer'
    fog.style.animationDelay = `${i * 5}s`
    fog.style.animationDuration = `${20 + i * 5}s`
    fog.style.opacity = `${0.3 - i * 0.1}`
    container.appendChild(fog)
  }
}

function createDefaultEffect(container) {
  // Subtle ambient particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div')
    particle.className = 'ambient-particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.animationDelay = `${Math.random() * 5}s`
    container.appendChild(particle)
  }
}