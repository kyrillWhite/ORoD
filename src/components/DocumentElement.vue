<template>
  <tr :class="titleClasses">
    <th
      class="document__field"
      :class="{'document__field_selected' : document.detailsAreOpened}"
      scope="row"
    >
      {{index}}
    </th>
    <td class="document__field">{{document.name}}</td>
    <td class="document__field document__center">
      {{!document.ranking ? '-' : document.ranking.rank.toFixed(3)}}
    </td>
    <td class="document__option document__center">
      <button
        :class="{
          'button__close' : document.detailsAreOpened,
          'button__more': !document.detailsAreOpened,
        }"
        @click="detailsMenuClick">
      </button>
    </td>
    <td class="document__option document__center">
      <button class="button__remove" @click="removeDocument"></button>
    </td>
  </tr>
  <tr>
    <td colspan="100">
      <div class="document__details" v-if="document.detailsAreOpened">
        <div class="document__menu">
          <button
            class="document__menu_item tab"
            :class="{'tab__active': openedDetailsPart == 1}" 
            @click="openDetailsPart(1)"
          >
            Исходный текст
          </button>
          <button
            class="document__menu_item tab"
            :class="menuTabClasses(2)" 
            @click="openDetailsPart(2)"
          >
            Промеж. результат
          </button>
          <button
            class="document__menu_item tab"
            :class="menuTabClasses(3)" 
            @click="openDetailsPart(3)"
          >
            Результат оценки
          </button>
        </div>
        <div class="document__details_content">
          <div class="source-text" v-if="(openedDetailsPart == 1)"> 
            {{document.text}}
          </div>
          <IntermediateResult
            :document="document"
            v-else-if="(openedDetailsPart == 2)"
          />
          <RankResult
            :document="document"
            v-else-if="(openedDetailsPart == 3)"
            @find-rank="findRank"
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import IntermediateResult from './DocumentDetails/IntermediateResult.vue';
import RankResult from './DocumentDetails/RankResult.vue';

export default {
  name: 'DocumentElement',
  components: {
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
  computed: {
    titleClasses() {
      let classes = {};

      if (this.document?.detailsAreOpened) {
        classes['document__field_selected'] = true;
      } else {
        classes['document__field_odd'] = this.index % 2 == 0;
      }

      return classes;
    },
  },
  methods: {
    detailsMenuClick() {
      this.$emit(`doc-details-${this.document.detailsAreOpened ? 'closed' : 'opened'}`,
        this.document.id);
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
      this.$emit('find-rank', this.document.id);
    },
    removeDocument() {
      this.$emit('remove-document', this.document.id);
    },
    menuTabClasses(index) {
      let classes = {};

      if (this.document?.attachedOntology) {
        classes['tab__active'] = this.openedDetailsPart == index;
      } else {
        classes['tab__not-active'] = true;
      }

      return classes;
    },
  },
}
</script>