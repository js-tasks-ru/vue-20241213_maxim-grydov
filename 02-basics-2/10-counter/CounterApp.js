import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const cnt = ref(0)
    const minimum = 0
    const maximum = 5

    const disableDecrement = computed(
      () => {
        return cnt.value === minimum
      }
    )

    const disableIncrement = computed(
      () => {
        return cnt.value === maximum
      }
    )

    return {
      cnt,
      disableDecrement,
      disableIncrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="disableDecrement"
        @click="cnt--"
      >➖</button>

      <span class="count" data-testid="count">{{ cnt }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="disableIncrement"
        @click="cnt++"
      >➕</button>
    </div>
  `,
})
