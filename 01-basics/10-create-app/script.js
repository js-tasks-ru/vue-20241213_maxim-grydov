import { defineComponent, createApp } from 'vue'

const component = defineComponent(
  {
    name: 'CurrentDate',

    setup() {
      return {
        currentDate: `Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}`
      }
    },

    template: `<div>{{ currentDate }}</div>`
  }
)

const app = createApp(component)

app.mount('#app')
