<template>
  <div class="document__field">{{document.number}}</div>
  <div class="document__field">{{document.name}}</div>
  <div class="document__field">{{!document.ranking ? '-' : document.ranking.rank.toFixed(3)}}</div>
  <button class="document__option" v-on:click="detailsMenuClick"></button>
  <button class="document__option" v-on:click="removeDocument"></button>
  <div class="document__details" :hidden="!detailsIsOpened">
    <div class="document__menu">
      <button class="document__menu_item" v-on:click="openDetailsPart(1)">Исходный текст</button>
      <button class="document__menu_item" v-on:click="openDetailsPart(2)">Промежуточный результат</button>
      <button class="document__menu_item" v-on:click="openDetailsPart(3)">Результат ранжирования</button>
    </div>
    <div class="document__details">
      <source-text :document="document" v-if="(openedDetailsPart == 1)"/>
      <intermediate-result :document="document" v-else-if="(openedDetailsPart == 2)"/>
      <rank-result :document="document" v-else-if="(openedDetailsPart == 3)" @find-rank="findRank"/>
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
    index: Number,
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
    findRank() {
      this.$emit('find-rank', this.index);
    },
    removeDocument() {
      this.$emit('remove-document', this.index);
    },
  },
}
</script>