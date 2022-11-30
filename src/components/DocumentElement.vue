<template>
  <div class="document__number">{{document.number}}</div>
  <div class="document__name">{{document.name}}</div>
  <div class="document__score">{{!document.rank ? '-' : document.rank}}</div>
  <button class="document__options" v-on:click="detailsMenuClick"></button>
  <div class="document__details" :hidden="!detailsIsOpened">
    <div class="document__menu">
      <button class="document__menu_item" v-on:click="openDetailsPart(1)">Исходный текст</button>
      <button class="document__menu_item" v-on:click="openDetailsPart(2)">Промежуточный результат</button>
      <button class="document__menu_item" v-on:click="openDetailsPart(3)">Результат ранжирования</button>
    </div>
    <div class="document__details">
      <source-text :document="document" v-if="(openedDetailsPart == 1)"/>
      <intermediate-result :document="document" v-else-if="(openedDetailsPart == 2)"/>
      <rank-result :document="document" v-else-if="(openedDetailsPart == 3)"/>
    </div>
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
    detailsIsOpened: Boolean,
    document: Object,
  },
  data() {
    return {
      openedDetailsPart: null,
    }
  },
  methods: {
    detailsMenuClick() {
      this.$emit(`doc-details-${this.detailsIsOpened ? 'closed' : 'opened'}`,
        this.document.number - 1);
      if (this.detailsIsOpened) {
        this.openedDetailsPart = null;
      }
    },
    openDetailsPart(detailsPart) {
      this.openedDetailsPart = this.openedDetailsPart == detailsPart ? 
        null : detailsPart;
    },
  },
}
</script>