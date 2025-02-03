import { defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent(
  {
    name: 'WeatherListItem',


    props: {
      weatherItem: {
        type: Object,
        required: true,
      },
    },


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


      return {
        WeatherConditionIcons,

        pressureMPAToMM,
        tempKelvinToCelsius,
        isNight,
      }
    },


    template: `
      <li class="weather-card"
          :class="{ 'weather-card--night': isNight(weatherItem.current) }"
      >
        <div class="weather-alert"
             v-if="weatherItem.alert"
        >
          <span class="weather-alert__icon">⚠️</span>
          <span class="weather-alert__description">{{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}</span>
        </div>
        <div>
          <h2 class="weather-card__name">
            {{ weatherItem.geographic_name }}
          </h2>
          <div class="weather-card__time">
            {{ weatherItem.current.dt }}
          </div>
        </div>
        <div class="weather-conditions">
          <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ WeatherConditionIcons[weatherItem.current.weather.id] }}</div>
          <div class="weather-conditions__temp">{{ tempKelvinToCelsius(weatherItem.current.temp) }} °C</div>
        </div>
        <div class="weather-details">
          <div class="weather-details__item">
            <div class="weather-details__item-label">Давление, мм рт. ст.</div>
            <div class="weather-details__item-value">{{ pressureMPAToMM(weatherItem.current.pressure) }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Влажность, %</div>
            <div class="weather-details__item-value">{{ weatherItem.current.humidity }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Облачность, %</div>
            <div class="weather-details__item-value">{{ weatherItem.current.clouds }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Ветер, м/с</div>
            <div class="weather-details__item-value">{{ weatherItem.current.wind_speed }}</div>
          </div>
        </div>
      </li>
    `
  }
)
