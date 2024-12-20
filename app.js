const apiKey = '6da512e296ec96960eca6c642c0545d3';

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherResult = document.getElementById('weather-result');

    if (!city) {
        weatherResult.innerHTML = 'Please enter a city.';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error(`City not found. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const { main: { temp, humidity }, weather: [{ description }], name } = data;

        weatherResult.innerHTML =
        
           `
           <h2>Weather in ${name}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${description}</p>`;
    } catch (error) {
        weatherResult.innerHTML = `Error: ${error.message}`;
    }
}
