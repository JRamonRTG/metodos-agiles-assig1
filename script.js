const apiKey = '2bfd3211df23f2d600ef10c05d08d9af';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const card = document.getElementById('weatherCard');
  card.classList.add('hidden');
  card.innerHTML = '';

  if (!city) {
    card.classList.remove('hidden');
    card.innerHTML = `<p class="error">Por favor ingresa una ciudad.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Ciudad no encontrada');
    }

    const data = await response.json();
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    card.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>${data.name}</strong></p>
      <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
      <p>Temperatura: ${data.main.temp} °C</p>
      <p>Humedad: ${data.main.humidity}%</p>
      <p>Viento: ${data.wind.speed} m/s</p>
    `;
    card.classList.remove('hidden');
  } catch (error) {
    card.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    card.classList.remove('hidden');
  }
}
