import { computed, defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'


export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const defaultMeetupId = 1

    const currentMeetupId = ref(defaultMeetupId)
    const meetupData = ref(null)

    // предположим что у нас всегда от 1 до 5 митапов
    const minimumMeetups = 1
    const maximumMeetups = 5

    const disabledPrev = computed(
      () => {
        return currentMeetupId.value === minimumMeetups
      }
    )
    const disabledNext = computed(
      () => {
        return currentMeetupId.value === maximumMeetups
      }
    )


    watchEffect(
      () => {
        // получаем нужный митап
        getMeetup(currentMeetupId.value)
          .then(
            (meetup) => {
              // допустим что все митапы у нас есть всегда и не будем ничего городить =)
              meetupData.value = meetup
            }
          )
          .catch(
            (err) => {
              alert(`Произошла непредвиденная ошибка ${err.message}`)
              console.error(err)
            }
          )
      }
    )


    const CHANGE_MODS = {
      PREV: 'prev',
      NEXT: 'next',
    }


    /**
     * Пролистывание назад/вперед
     *
     * @param { string } mod
     */
    function changeMeetupId(mod) {
      switch (mod) {
        case CHANGE_MODS.PREV:
          currentMeetupId.value = --currentMeetupId.value
          break
        case CHANGE_MODS.NEXT:
          currentMeetupId.value = ++currentMeetupId.value
          break

        default:
          throw new Error(`changeMeetupId: mod: ${mod}`)
      }
    }


    /**
     * Выбор конкретного митапа
     *
     * @param { number } meetupId
     */
    function choiceMeetupId(meetupId) {
      currentMeetupId.value = meetupId
    }


    return {
      disabledPrev,
      disabledNext,
      maximumMeetups,
      currentMeetupId,
      meetupData,
      CHANGE_MODS,
      changeMeetupId,
      choiceMeetupId,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="disabledPrev" 
                @click="changeMeetupId(CHANGE_MODS.PREV)"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="numMeetup of maximumMeetups">
            <input
              :id="'meetup-id-' + numMeetup"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="numMeetup"
              v-model="currentMeetupId"
              @change="choiceMeetupId(numMeetup)"
            />
            <label :for="'meetup-id-' + numMeetup" class="radio-group__label">{{ numMeetup }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="disabledNext"
                @click="changeMeetupId(CHANGE_MODS.NEXT)"
        >Следующий</button>
      </div>
      
      <div class="meetup-selector__cover" v-if="meetupData">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupData.title }}</h1>
        </div>
      </div>

      <div class="meetup-selector__cover" v-else>
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">Some Meetup Title</h1>
        </div>
      </div>

    </div>
  `,
})
