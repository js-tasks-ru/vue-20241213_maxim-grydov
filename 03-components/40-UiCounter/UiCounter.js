import { computed, defineComponent, ref } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      default: 0,
      validator: (min) => {
        // допустим, что мы не проверяем тут пришедшее значение max и то что они не противоречат друг другу
        return min >= 0
      },
    },

    max: {
      type: Number,
      default: Infinity,
      validator: (max) => {
        return max <= Infinity
      },
    },

    count: {
      type: Number,
      required: true,
      // допустим что валидация тут не нужна на соответствие с max/min
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function increment() {
      emit('update:count', props.count + 1)
    }

    function decrement() {
      emit('update:count', props.count - 1)
    }

    const disableIncrement = computed(
      () => {
        return props.count >= props.max
      }
    )

    const disableDecrement = computed(
      () => {
        return props.count <= props.min
      }
    )

    return {
      increment,
      decrement,
      disableIncrement,
      disableDecrement,
    }
  },


  template: `
    <div class="counter">
      <UiButton
          @click.stop="decrement"
          :disabled="disableDecrement"
          aria-label="Decrement"
      >➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton
          @click.stop="increment"
          :disabled="disableIncrement"
          aria-label="Increment"
      >➕</UiButton>
    </div>
  `,
})
