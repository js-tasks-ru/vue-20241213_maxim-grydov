import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const cnt = ref(0)

    return {
      cnt,
      maximum: 5,
      minimum: 0,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="cnt <= minimum"
        @click="cnt--"
      >➖</button>

      <span class="count" data-testid="count">{{ cnt }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="cnt >= maximum"
        @click="cnt++"
      >➕</button>
    </div>
  `,
})
