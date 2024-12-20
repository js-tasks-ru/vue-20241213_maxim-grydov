import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {

    /**
     * @param { number } temp
     * @return { string }
     */
    function tempKelvinToCelsius(temp) {
      return (temp - 273.15).toFixed(1)
    }


    /**
     *
     * @param { number } pressure
     * @return { number }
     */
    function pressureMPAToMM(pressure) {
      return Math.round(pressure * 0.75)
    }


    /**
     *
     * @param { object } placeCurrent
     * @param { string } placeCurrent.dt
     * @param { string } placeCurrent.sunrise
     * @param { string } placeCurrent.sunset
     * @return { boolean }
     */
    function isNight(placeCurrent) {
      let {
        dt,
        sunrise,
        sunset
      } = placeCurrent

      dt = parseFloat(dt.split(':').join('.'))
      sunrise = parseFloat(sunrise.split(':').join('.'))
      sunset = parseFloat(sunset.split(':').join('.'))

      return dt < sunrise || dt > sunset
    }


    const weatherData = getWeatherData()

    return {
      weatherData,
      WeatherConditionIcons,

      pressureMPAToMM,
      tempKelvinToCelsius,
      isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card"
            v-for="place in weatherData"
            :class="{ 'weather-card--night': isNight(place.current) }"
        >
          <div class="weather-alert"
               v-if="place.alert"
          >
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ place.alert.sender_name }}: {{ place.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ place.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ place.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="place.current.weather.description">{{ WeatherConditionIcons[place.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ tempKelvinToCelsius(place.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureMPAToMM(place.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ place.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ place.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ place.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
