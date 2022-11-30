<template>
  <div class="document__number">{{document.number}}</div>
  <div class="document__name">{{document.name}}</div>
  <div class="document__score">{{document.rank}}</div>
  <button class="document__options"></button>
  <div class="document__menu" hidden>
    <button class="document__menu_item">Исходный текст</button>
    <button class="document__menu_item">Промежуточный результат</button>
    <button class="document__menu_item">Результат ранжирования</button>
  </div>
  <div class="document__details">
    <source-text v-if="(openedDetailsPart == 1)"/>
    <intermediate-result v-else-if="(openedDetailsPart == 2)"/>
    <rank-result v-else-if="(openedDetailsPart == 3)"/>
  </div>
</template>

<script>
import SourceText from './DocumentDetails/SourceText.vue';
import IntermediateResult from './DocumentDetails/IntermediateResult.vue';
import RankResult from './DocumentDetails/RankResult.vue';

export default {
  name: 'DocumentElement',
  components: {
    SourceText,
    IntermediateResult,
    RankResult,
  },
  props: {
    document: Object,
    callback: Function,
  },
  data() {
    return {
      openedDetailsPart: null,
    }
  },
}
</script>