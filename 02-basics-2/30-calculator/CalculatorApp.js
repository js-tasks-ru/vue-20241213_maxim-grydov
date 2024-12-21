import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const OPERATORS = {
      SUM: 'sum',
      SUBTRACT: 'subtract',
      MULTIPLY: 'multiply',
      DIVIDE: 'divide',
    }

    const op1 = ref(0)
    const op2 = ref(0)

    // по дефолту в радиогруппе должно быть выбрано хоть-что то
    const selectedOperator = ref(OPERATORS.SUM)

    const result = computed(
      () => {
        let result = null

        switch (selectedOperator.value) {
          case OPERATORS.SUM:
            result = op1.value + op2.value
            break

          case OPERATORS.SUBTRACT:
            result = op1.value - op2.value
            break

          case OPERATORS.MULTIPLY:
            result = op1.value * op2.value
            break

          case OPERATORS.DIVIDE:
            if (op2.value === 0) {
              result = 'Деление на 0 не возможно'
              break
            }

            result = op1.value / op2.value
            break
        }

        return result
      }
    )


    return {
      result,
      op1,
      op2,
      selectedOperator,
      OPERATORS,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="op1" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" :value="OPERATORS.SUM" v-model="selectedOperator"/>➕</label>
        <label><input type="radio" name="operator" :value="OPERATORS.SUBTRACT" v-model="selectedOperator"/>➖</label>
        <label><input type="radio" name="operator" :value="OPERATORS.MULTIPLY" v-model="selectedOperator"/>✖</label>
        <label><input type="radio" name="operator" :value="OPERATORS.DIVIDE" v-model="selectedOperator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand"  v-model="op2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
