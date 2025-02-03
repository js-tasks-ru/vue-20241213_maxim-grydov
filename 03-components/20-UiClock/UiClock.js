import { computed, defineComponent, ref, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(new Date())

    const showTime = computed(
      () => {
        return currentTime.value.toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
      }
    )

    const intervalId = setInterval(
      () => {
        currentTime.value = new Date()
      },
      1000
    )

    onBeforeUnmount(
      () => {
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    )

    return {
      showTime,
    }
  },


  template: `<div class="clock">{{ showTime }}</div>`,
})
