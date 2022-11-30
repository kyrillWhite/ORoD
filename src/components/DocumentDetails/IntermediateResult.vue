<template>
  <div class="intermediate-result">
    <div class="intermediate-result__block">
      <div class="intermediate-result__title">
        Привязавшаяся онтология
      </div>
      <button>Скачать</button>
    </div>
    <div class="intermediate-result__block">
      <div class="intermediate-result__title">
        Привязавшиеся понятия
      </div>
      <div class="intermediate-result__list">
        <div class="intermediate-result__item"
          v-for="(term, index) in document?.terms" :key="index">
          {{`${index + 1}. ${term}`}}
        </div>
      </div>
    </div>
    <div class="intermediate-result__block">
      <div class="intermediate-result__title">
        Отфильтрованные предложения
      </div>
      <div class="intermediate-result__list">
        <div class="intermediate-result__item"
          v-for="(sentence, index) in document?.sentences" :key="index">
          {{`${index + 1}. ${sentence}`}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntermediateResult',
  props: {
    document: Object,
  },
  data() {
    return {

    };
  }
}
</script>