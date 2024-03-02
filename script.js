const API_KEY = "86db7fdf0bacccfc3742a3ae027fa8fa"


async function check_weather(city){
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(URL)

    if (response.status === 404){
        document.querySelector('#error').style.display = "block"
        document.querySelector('#weather').style.display = "none"
    } else {
        let data = await response.json()

        console.log(data)   

        // change weather image
        weather_img = document.querySelector('#weather-img')

        if (data.weather[0].main === 'Clouds'){
            weather_img.src = "images/clouds.png"
        } else if (data.weather[0].main === 'Clear'){
            weather_img.src = "images/sun.png"
        } else if (data.weather[0].main === 'Rain'){
            weather_img.src = "images/rain.png"
        } else if (data.weather[0].main === 'Drizzle'){
            weather_img.src = "images/drizzle.png"
        } else if (data.weather[0].main === 'Mist'){
            weather_img.src = "images/foggy-day.png"
        } 


        // weather temperature
        document.querySelector('#weather-temp').innerHTML = Math.round(data.main.temp) + '°C'


        // Get the local time
        // timezone offset in seconds
        const timezone_offset_in_seconds = data.timezone;
        const current_time = new Date();
        const offset_time = new Date(current_time.getTime() + timezone_offset_in_seconds * 1000);
        // Format the offset time as HH:mm
        const formatted_time = offset_time.toISOString().substr(11, 5);


        // time
        document.querySelector('#weather-time-text').innerHTML = formatted_time

        // city
        document.querySelector('#weather-city').innerHTML = data.name

        // humidity
        document.querySelector('#weather-humidity-text-percentage').innerHTML = data.main.humidity + '%'
        
        // wind speed
        document.querySelector('#weather-wind-speed-text-km-hour').innerHTML = data.wind.speed + ' km/h'
        
        document.querySelector('#error').style.display = "none"
        document.querySelector('#weather').style.display = "block"
    }

}


document.addEventListener('DOMContentLoaded', () => {
    const search_input = document.querySelector('#search-input');

    document.querySelector('#search-button').addEventListener('click', () => {
        const input_city = search_input.value;
        if (input_city) {
            check_weather(input_city);
            search_input.value = '';
        }
    });

    search_input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const input_city = search_input.value;
            if (input_city) {
                check_weather(input_city);
                search_input.value = '';
            }
        }
    });
});
