// api keys
import config from "./config.js";
const apiKey = config.API_KEY
const geoApiKey = config.GEO_KEY

// Current weather info
const getLocation = document.getElementById('city');
const getCurrentTemp = document.getElementById('temp-live')
const getMinTemp = document.getElementById('min-temp')
const getMaxTemp = document.getElementById('max-temp')
const windSpeed = document.getElementById('wind-speed')
const humidity = document.getElementById('humidity')
const rainProb = document.getElementById('rain-prob')
const sunriseBox = document.getElementById('sunrise')
const sunsetBox = document.getElementById('sunset')

//  air quality info
const quality = document.getElementById('air-quality-info')
const airIndex = document.getElementById('air-quality-index')
const pm2Info = document.getElementById('pm2-info')
const pm10Info = document.getElementById('pm10-info')
const so2Info = document.getElementById('so-info')
const no2Info = document.getElementById('no-info')
const ozoneInfo = document.getElementById('ozone-info')
const coInfo = document.getElementById('co-info')

//  week-weather info
const d1Weather = document.getElementById('day1-weather-icon')
const d2Weather = document.getElementById('day2-weather-icon')
const d3Weather = document.getElementById('day3-weather-icon')
const d4Weather = document.getElementById('day4-weather-icon')
const d5Weather = document.getElementById('day5-weather-icon')
const day1Max = document.getElementById('week-today-max')
const day1Min = document.getElementById('week-today-min')
const day2Max = document.getElementById('day2-max')
const day2Min = document.getElementById('day2-min')
const day3Max = document.getElementById('day3-max')
const day3Min = document.getElementById('day3-min')
const day4Max = document.getElementById('day4-max')
const day4Min = document.getElementById('day4-min')
const day5Max = document.getElementById('day5-max')
const day5Min = document.getElementById('day5-min')


// Definindo a função no escopo global
window.getCoord = getCoord
let timeZoneId = null

// definindo localização
getLocation.addEventListener('click', () => {
    let city = ''
    do {
        // recebendo dado do usuário
        city = prompt('Digite a sua cidade: ')
    } while (city == '')

    getCoord(city)
})
async function getCoord(city) {
    // requisição da api de geolocalização para recuperar latitude e longitude da localização
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoApiKey}`

    try {
        const response = await fetch(geoUrl)
        const lugar = await response.json()
        // const city = null

        if (lugar[0].local_names.pt) {
            city = lugar[0].local_names.pt
        } else {
            city = lugar[0].local_names.en
        }

        const lat = lugar[0].lat
        const lon = lugar[0].lon

        getWeather(lat, lon, city)
    } catch (error) {
        alert('Não foi possível identificar o lugar de sua escolha. Tente novamente')
    }
}

// definindo clima atual
async function getWeather(latitude, longitude, city) {
    // requisição da previsão de tempo através da latitude e longitude.
    try {
        let currentWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&lang=pt&aqi=yes&days=3`

        const resp = await fetch(currentWeatherUrl)
        const weather = await resp.json()

        getLocation.innerHTML = `${city} - ${weather.location.region}`

        timeZoneId = weather.location.tz_id

        const date = new Date()
        const milisegundosDia = 1000 * 60 * 60 * 24
        const data_final = new Date(date.getTime() - 2 * milisegundosDia)
        const day = data_final.getDate()
        const month = data_final.getMonth() + 1
        const year = data_final.getFullYear()
        const dt = `${year}-${month}-${day}`
        const endDt = `${year}-${month}-${day + 1}`

        let historyWeatherUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${dt}&end_dt=${endDt}`

        const respHist = await fetch(historyWeatherUrl)
        const histWeather = await respHist.json()

        setCurrentWeather(weather)
        setWeekWeather(weather, histWeather)
        setAirQualityIndex(weather)
        setInterval(updateTime, 100) // atualiza horário atual a cada 1seg

    } catch (error) {
        console.log(`Erro ao buscar dados: ${error}`);
    }

    try {

    } catch (err) {
        console.log(`Erro ao buscar dados: ${err}`);
    }

}

function setCurrentWeather(weather) {
    getCurrentTemp.innerText = weather.current.temp_c
    getMaxTemp.innerText = weather.forecast.forecastday[0].day.maxtemp_c
    getMinTemp.innerText = weather.forecast.forecastday[0].day.mintemp_c
    windSpeed.innerText = weather.current.wind_kph
    humidity.innerHTML = weather.current.humidity
    rainProb.innerHTML = weather.forecast.forecastday[0].day.daily_chance_of_rain

    // formatando sunrise e sunset
    let sunrise = weather.forecast.forecastday[0].astro.sunrise.split(' ')
    let sunset = weather.forecast.forecastday[0].astro.sunset.split(' ')
    if (sunset[1] == 'PM') {
        const sunsetTime = sunset[0].split(':')
        let sunsetHour = Number(sunsetTime[0])
        let sunsetMin = sunsetTime[1]
        sunsetHour += 12
        sunset = `${sunsetHour}:${sunsetMin}`
    }
    sunriseBox.innerHTML = sunrise[0]
    sunsetBox.innerHTML = sunset

}

// definindo horario atual - Sun time info
function updateTime() {
    if (timeZoneId) {
        const date = new Date()
        // const hh = date.getHours()
        // const mm = date.getMinutes()

        const formattedTime = new Intl.DateTimeFormat('pt-br', {
            timeStyle: 'short',
            timeZone: timeZoneId
        }).format(date)

        document.getElementById('time-now').innerText = formattedTime
    }
}

// definindo clima da semana
function setWeekWeather(weekWeather, historyWeather) {

    d1Weather.setAttribute('src', `${historyWeather.forecast.forecastday[0].day.condition.icon}`)
    d1Weather.setAttribute('title', `${historyWeather.forecast.forecastday[0].day.condition.text}`)

    d2Weather.setAttribute('src', `${historyWeather.forecast.forecastday[1].day.condition.icon}`)
    d2Weather.setAttribute('title', `${historyWeather.forecast.forecastday[1].day.condition.text}`)

    d3Weather.setAttribute('src', `${weekWeather.forecast.forecastday[0].day.condition.icon}`)
    d3Weather.setAttribute('title', `${weekWeather.forecast.forecastday[0].day.condition.text}`)

    d4Weather.setAttribute('src', `${weekWeather.forecast.forecastday[1].day.condition.icon}`)
    d4Weather.setAttribute('title', `${weekWeather.forecast.forecastday[1].day.condition.text}`)

    d5Weather.setAttribute('src', `${weekWeather.forecast.forecastday[2].day.condition.icon}`)
    d5Weather.setAttribute('title', `${weekWeather.forecast.forecastday[2].day.condition.text}`)

    day1Max.innerText = historyWeather.forecast.forecastday[0].day.maxtemp_c
    day1Min.innerText = historyWeather.forecast.forecastday[0].day.mintemp_c
    day2Max.innerText = historyWeather.forecast.forecastday[1].day.maxtemp_c
    day2Min.innerText = historyWeather.forecast.forecastday[1].day.mintemp_c
    day3Max.innerText = weekWeather.forecast.forecastday[0].day.maxtemp_c
    day3Min.innerText = weekWeather.forecast.forecastday[0].day.mintemp_c
    day4Max.innerText = weekWeather.forecast.forecastday[1].day.maxtemp_c
    day4Min.innerText = weekWeather.forecast.forecastday[1].day.mintemp_c
    day5Max.innerText = weekWeather.forecast.forecastday[2].day.maxtemp_c
    day5Min.innerText = weekWeather.forecast.forecastday[2].day.mintemp_c

    const today = new Date()
    const day = today.getDay()
    switch (day) {
        case 1:
            document.getElementById('day1-title').innerText = 'Sábado'
            document.getElementById('day5-title').innerText = 'Quarta'
            break;
        case 2:
            document.getElementById('day1-title').innerText = 'Domingo'
            document.getElementById('day5-title').innerText = 'Quinta'
            break;
        case 3:
            document.getElementById('day1-title').innerText = 'Segunda'
            document.getElementById('day5-title').innerText = 'Sexta'
            break;
        case 4:
            document.getElementById('day1-title').innerText = 'Terça'
            document.getElementById('day5-title').innerText = 'Sábado'
            break;
        case 5:
            document.getElementById('day1-title').innerText = 'Quarta'
            document.getElementById('day5-title').innerText = 'Domingo'
            break;
        case 6:
            document.getElementById('day1-title').innerText = 'Quinta'
            document.getElementById('day5-title').innerText = 'Segunda'
            break;
        case 7:
            document.getElementById('day1-title').innerText = 'Sexta'
            document.getElementById('day5-title').innerText = 'Terça'
            break;
    }
}

// definindo qualidade do ar
function setAirQualityIndex(airQuality) {
    let index = airQuality.current.air_quality['us-epa-index']
    airIndex.innerText = index

    switch (index) {
        case 1:
            quality.innerText = 'Ótima'
            quality.style.color = '#87EBCD'
            break;
        case 2:
            quality.innerText = 'Boa'
            quality.style.color = '#c0eb87'
            break;
        case 3:
            quality.innerText = 'Moderado'
            quality.style.color = 'yellow'
            break;
        case 4:
            quality.innerText = "Ruim"
            quality.style.color = 'orange'
            break;
        case 5:
            quality.innerText = 'Péssima'
            quality.style.color = 'red'
            break;
    }

    // definindo pm2.5
    let pm2 = airQuality.current.air_quality.pm2_5
    pm2Info.innerText = pm2.toFixed(1)
    if (pm2 >= 0 && pm2 < 10) {
        pm2Info.style.color = '#87EBCD'
    } else if (pm2 > 10 && pm2 < 25) {
        pm2Info.style.color = '#c0eb87'
    } else if (pm2 > 25 && pm2 < 50) {
        pm2Info.style.color = 'yellow'
    } else if (pm2 > 50 && pm2 < 75) {
        pm2Info.style.color = 'orange'
    } else if (pm2 >= 75) {
        pm2Info.style.color = 'red'
    }

    // definindo pm10
    let pm10 = airQuality.current.air_quality.pm10
    pm10Info.innerText = pm10
    if (pm10 >= 0 && pm2 < 10) {
        pm10Info.style.color = '#87EBCD'
    } else if (pm10 > 10 && pm10 < 25) {
        pm10Info.style.color = '#c0eb87'
    } else if (pm10 > 25 && pm10 < 50) {
        pm10Info.style.color = 'yellow'
    } else if (pm10 > 50 && pm10 < 75) {
        pm10Info.style.color = 'orange'
    } else if (pm10 >= 75) {
        pm10Info.style.color = 'red'
    }

    // definindo so2
    let so2 = airQuality.current.air_quality.so2
    so2Info.innerText = so2
    if (so2 >= 0 && so2 < 20) {
        so2Info.style.color = '#87EBCD'
    } else if (so2 > 20 && so2 < 80) {
        so2Info.style.color = '#c0eb87'
    } else if (so2 > 80 && so2 < 250) {
        so2Info.style.color = 'yellow'
    } else if (so2 > 250 && so2 < 350) {
        so2Info.style.color = 'orange'
    } else if (so2 >= 350) {
        so2Info.style.color = 'red'
    }

    // definindo no2
    let no2 = airQuality.current.air_quality.no2
    no2Info.innerText = no2
    if (no2 >= 0 && no2 < 20) {
        no2Info.style.color = '#87EBCD'
    } else if (no2 > 20 && no2 < 80) {
        no2Info.style.color = '#c0eb87'
    } else if (no2 > 80 && no2 < 250) {
        no2Info.style.color = 'yellow'
    } else if (no2 > 250 && no2 < 350) {
        no2Info.style.color = 'orange'
    } else if (no2 >= 350) {
        no2Info.style.color = 'red'
    }

    // definindo o3
    let o3 = airQuality.current.air_quality.o3
    ozoneInfo.innerText = o3
    if (o3 >= 0 && o3 < 60) {
        ozoneInfo.style.color = '#87EBCD'
    } else if (o3 > 60 && o3 < 100) {
        ozoneInfo.style.color = '#c0eb87'
    } else if (o3 > 100 && o3 < 140) {
        ozoneInfo.style.color = 'yellow'
    } else if (o3 > 140 && o3 < 180) {
        ozoneInfo.style.color = 'orange'
    } else if (o3 >= 180) {
        ozoneInfo.style.color = 'red'
    }


    // definindo CO
    let co = airQuality.current.air_quality.co
    coInfo.innerText = co
    if (co >= 0 && co < 4400) {
        so2Info.style.color = '#87EBCD'
    } else if (co > 4400 && co < 9400) {
        so2Info.style.color = '#c0eb87'
    } else if (co > 9400 && co < 12400) {
        so2Info.style.color = 'yellow'
    } else if (co > 12400 && co < 15400) {
        so2Info.style.color = 'orange'
    } else if (co >= 15400) {
        so2Info.style.color = 'red'
    }
}
