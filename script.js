// api key
const apiKey = 'd8d83803726a4fafadf221152241406 '
const geoApiKey = '00a0fcf0a964808654932bc322ab064d'

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

const todayWeather = document.getElementById('today-weather-icon')
const d2Weather = document.getElementById('day2-weather-icon')
const d3Weather = document.getElementById('day3-weather-icon')
const d4Weather = document.getElementById('day4-weather-icon')
const d5Weather = document.getElementById('day5-weather-icon')
const todayMax = document.getElementById('week-today-max')
const todayMin = document.getElementById('week-today-min')
const day2Max = document.getElementById('day2-max')
const day2Min = document.getElementById('day2-min')
const day3Max = document.getElementById('day3-max')
const day3Min = document.getElementById('day3-min')
const day4Max = document.getElementById('day4-max')
const day4Min = document.getElementById('day4-min')
const day5Max = document.getElementById('day5-max')
const day5Min = document.getElementById('day5-min')

const root = document.documentElement

// definindo localização
getLocation.addEventListener('click', () => {
    let city = ''
    do{
       city = prompt('Digite a sua cidade: ')
    }while(city == '')

    getCoord(city)
    // getWeather(city)
    // getHistoricalWeather(city)
    // getAirQuality(city)
})

async function getCoord(city){
    let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoApiKey}`

    response = await fetch(geoUrl)
    const lugar = await response.json()

    const lat = lugar[0].lat
    const lon = lugar[0].lon

    getWeather(lat,lon)
}

// definindo clima atual
async function getWeather(latitude,longitude) {
    let currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&lang=pt&aqi=yes&days=5`

    resp = await fetch(currentWeatherUrl)
    const weather = await resp.json()

    city = weather.location.name
    // const uf = weather.location.region.split(' ')
    // const str1 = uf.shift()
    // const str2 = uf.pop()
    // const state = str1.charAt(0)+str2.charAt(0)
    getLocation.innerHTML = `${city}`

    setCurrentWeather(weather)
    setWeekWeather(weather)
    setAirQualityIndex(weather)
}
function setCurrentWeather(weather) {
    getCurrentTemp.innerText = weather.current.temp_c
    getMaxTemp.innerText = weather.forecast.forecastday[0].day.maxtemp_c
    getMinTemp.innerText = weather.forecast.forecastday[0].day.mintemp_c
    windSpeed.innerText = weather.current.wind_kph
    humidity.innerHTML = weather.current.humidity
    rainProb.innerHTML = weather.current.precip_mm
    todayMax.innerText = weather.forecast.forecastday[0].day.maxtemp_c
    todayMin.innerText = weather.forecast.forecastday[0].day.mintemp_c

    const sunrise = weather.forecast.forecastday[0].astro.sunrise
    const sunset = weather.forecast.forecastday[0].astro.sunset

    sunriseBox.innerHTML = sunrise
    sunsetBox.innerHTML = sunset

    // definindo horario do sol// Sun time info
    setInterval(() => {
        const date = new Date()
        const hour = date.getHours()
        const min = date.getMinutes()

        document.getElementById('time-now').innerHTML = `${hour}:${min}`

        // root.style.setProperty('--pos-x', time)    
    }, 1000)
}

// definindo clima da semana
function setWeekWeather(weekWeather) {

    todayWeather.setAttribute('src', `${weekWeather.forecast.forecastday[0].day.condition.icon}`)
    todayWeather.setAttribute('title', `${weekWeather.forecast.forecastday[0].day.condition.text}`)

    d2Weather.setAttribute('src', `${weekWeather.forecast.forecastday[1].day.condition.icon}`)
    d2Weather.setAttribute('title', `${weekWeather.forecast.forecastday[1].day.condition.text}`)

    d3Weather.setAttribute('src', `${weekWeather.forecast.forecastday[2].day.condition.icon}`)
    d3Weather.setAttribute('title', `${weekWeather.forecast.forecastday[2].day.condition.text}`)

    d4Weather.setAttribute('src', `${weekWeather.forecast.forecastday[3].day.condition.icon}`)
    d4Weather.setAttribute('title', `${weekWeather.forecast.forecastday[3].day.condition.text}`)

    d5Weather.setAttribute('src', `${weekWeather.forecast.forecastday[4].day.condition.icon}`)
    d5Weather.setAttribute('title', `${weekWeather.forecast.forecastday[4].day.condition.text}`)

    day2Max.innerText = weekWeather.forecast.forecastday[1].day.maxtemp_c
    day2Min.innerText = weekWeather.forecast.forecastday[1].day.mintemp_c
    day3Max.innerText = weekWeather.forecast.forecastday[2].day.maxtemp_c
    day3Min.innerText = weekWeather.forecast.forecastday[2].day.mintemp_c
    day4Max.innerText = weekWeather.forecast.forecastday[3].day.maxtemp_c
    day4Min.innerText = weekWeather.forecast.forecastday[3].day.mintemp_c
    day5Max.innerText = weekWeather.forecast.forecastday[4].day.maxtemp_c
    day5Min.innerText = weekWeather.forecast.forecastday[4].day.mintemp_c

    const today = new Date()
    const day = today.getDay()
    switch (day) {
        case 1:
            document.getElementById('day3-title').innerText = 'Quarta'
            document.getElementById('day4-title').innerText = 'Quinta'
            document.getElementById('day5-title').innerText = 'Sexta'
            break;
        case 2:
            document.getElementById('day3-title').innerText = 'Quinta'
            document.getElementById('day4-title').innerText = 'Sexta'
            document.getElementById('day5-title').innerText = 'Sábado'
            break;
        case 3:
            document.getElementById('day3-title').innerText = 'Sexta'
            document.getElementById('day4-title').innerText = 'Sábado'
            document.getElementById('day5-title').innerText = 'Domingo'
            break;
        case 4:
            document.getElementById('day3-title').innerText = 'Sábado'
            document.getElementById('day4-title').innerText = 'Domingo'
            document.getElementById('day5-title').innerText = 'Segunda'
            break;
        case 5:
            document.getElementById('day3-title').innerText = 'Domingo'
            document.getElementById('day4-title').innerText = 'Segunda'
            document.getElementById('day5-title').innerText = 'Terça'
            break;
        case 6:
            document.getElementById('day3-title').innerText = 'Segunda'
            document.getElementById('day4-title').innerText = 'Terça'
            document.getElementById('day5-title').innerText = 'Quarta'
            break;
        case 7:
            document.getElementById('day3-title').innerText = 'Terça'
            document.getElementById('day4-title').innerText = 'Quarta'
            document.getElementById('day5-title').innerText = 'Quinta'
            break;
    }
}

// definindo qualidade do ar
function setAirQualityIndex(airQuality) {
    console.log();
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