<template>
  <tr :class="document.detailsAreOpened ? 'document__field_selected' : (document.number % 2 == 0 ? `document__field_odd` : '')">
    <th :class="(document.detailsAreOpened ? 'document__field_selected' : '') + ' document__field'" scope="row">{{document.number}}</th>
    <td :class="`document__field`">{{document.name}}</td>
    <td :class="`document__field document__center`">
      {{!document.ranking ? '-' : document.ranking.rank.toFixed(3)}}
    </td>
    <td :class="`document__option document__center`">
      <button :class="document.detailsAreOpened ? 'button__close' : 'button__more'" v-on:click="detailsMenuClick"></button>
    </td>
    <td :class="`document__option document__center`">
      <button class="button__remove" v-on:click="removeDocument"></button>
    </td>
  </tr>
  <tr>
    <td colspan="100">
      <div class="document__details" v-if="document.detailsAreOpened">
        <div class="document__menu">
          <button :class="`document__menu_item tab ${openedDetailsPart == 1 ? 'tab__active' : ''}`" 
            v-on:click="openDetailsPart(1)">
            Исходный текст
          </button>
          <button :class="menuTabClasses(2)" 
            v-on:click="openDetailsPart(2)">
            Промеж. результат
          </button>
          <button :class="menuTabClasses(3)" 
            v-on:click="openDetailsPart(3)">
            Результат оценки
          </button>
        </div>
        <div class="document__details_content">
          <source-text :document="document" v-if="(openedDetailsPart == 1)"/>
          <intermediate-result :document="document" v-else-if="(openedDetailsPart == 2)"/>
          <rank-result :document="document" v-else-if="(openedDetailsPart == 3)" @find-rank="findRank"/>
        </div>
      </div>
    </td>
  </tr>
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
    document: Object,
  },
  data() {
    return {
      openedDetailsPart: 1,
    }
  },
  methods: {
    detailsMenuClick() {
      this.$emit(`doc-details-${this.document.detailsAreOpened ? 'closed' : 'opened'}`,
        this.document.index);
      if (this.document.detailsAreOpened) {
        this.openedDetailsPart = 1;
      }
    },
    openDetailsPart(detailsPart) {
      if (this.document.attachedOntology || detailsPart == 1) {
        this.openedDetailsPart = detailsPart;
      }
    },
    findRank() {
      this.$emit('find-rank', this.index);
    },
    removeDocument() {
      this.$emit('remove-document', this.index);
    },
    menuTabClasses(index) {
      let classes = 'document__menu_item tab';
      if (this.document?.attachedOntology) {
        classes += this.openedDetailsPart == index ? ' tab__active' : '';
      }
      else {
        classes += ' tab__not-active';
      }
      return classes;
    },
  },
}
</script>