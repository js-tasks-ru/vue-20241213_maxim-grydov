import { computed, defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(new Date())

    // либо так
    // const showTime = computed(
    //   () => {
    //     return currentTime.value.toLocaleTimeString(undefined, { timeStyle: 'medium' })
    //   }
    // )

    // либо так =)
    const showTime = ref('')
    watchEffect(
      () => {
        showTime.value = currentTime.value.toLocaleTimeString(undefined, { timeStyle: 'medium' })
      }
    )

    const intervalId = setInterval(
      () => {
        currentTime.value = new Date()
      },
      1000
    )

    return {
      showTime,
      intervalId,
    }
  },

  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },

  template: `<div class="clock">{{ showTime }}</div>`,
})
