<template>
  <table class="document">
    <thead>
      <tr>
        <th class="document__header" scope="col">№</th>
        <th class="document__header document__start" scope="col" v-on:click="sortByNameClicked">
          Название документа <span>{{sortSymbols[sortByName]}}</span>
        </th>
        <th class="document__header" scope="col" v-on:click="sortByRankClicked">
          Ранг <span>{{sortSymbols[sortByRank]}}</span>
        </th>
        <th class="document__header" scope="col">Инф.</th>
        <th class="document__header" scope="col">Удал.</th>
      </tr>
    </thead>
    <tbody>
      <document-element v-for="(document, index) in sortedDocuments"
      :key="index" :document="document"
      :index="document.index"
      @doc-details-opened="openDocumentDetails"
      @doc-details-closed="closeDocumentDetails"
      @find-rank="findRank"
      @remove-document="removeDocument"/>
    </tbody>
    
  </table>
</template>

<script>
import DocumentElement from './DocumentElement.vue';

export default {
  name: 'DocumentPart',
  components: {
    DocumentElement,
  },
  props: {
    documents: Array,
  },
  data() {
    return {
      docWithOpenedDetailsNum: null,
      sortByName: 1,
      sortByRank: 0,
      sortSymbols: [' ', '▼', '▲'],
      dDocuments: this.documents,
    }
  },
  computed: {
    sortedDocuments() {
      let documents = [];

      for (let i in this.documents) {
        documents.push({
          detailsAreOpened: i == this.docWithOpenedDetailsNum,
          index: i,
          ...this.documents[i]
        });
      }

      if (this.sortByName) {
        documents.sort(this.compareDocsByName);
      } else if (this.sortByRank) {
        documents.sort(this.compareDocsByRank);
      }

      for (let i in documents) {
        documents[i].number = Number(i) + 1;
      }

      return documents;
    },
  },
  methods: {
    openDocumentDetails(num) {
      this.docWithOpenedDetailsNum = num;
    },
    closeDocumentDetails() {
      this.docWithOpenedDetailsNum = null;
    },
    findRank(index) {
      this.$emit('find-rank', index);
    },
    removeDocument(index) {
      if (index < this.docWithOpenedDetailsNum) {
        this.docWithOpenedDetailsNum--;
      }
      this.$emit('remove-document', index);
    },
    sortByNameClicked() {
      this.sortByRank = 0;

      switch (this.sortByName) {
        case 0:
        case 1:
          this.sortByName = 2;
          break;
        case 2:
          this.sortByName = 1;
          break;
      }

      this.$emit('sort-changed', 'name', this.sortByName);
    },
    sortByRankClicked() {
      this.sortByName = 0;

      switch (this.sortByRank) {
        case 1:
          this.sortByRank = 2;
          break;
        case 0:
        case 2:
          this.sortByRank = 1;
          break;
      }

      this.$emit('sort-changed', 'rank', this.sortByRank);
    },
    compareDocsByName(a, b) {
      let res = 0;

      if (a.name < b.name) {
        res = -1;
      } else if (a.name > b.name) {
        res = 1;
      }

      if (this.sortByName == 1) {
        return res * -1;
      }

      return res;
    },
    compareDocsByRank(a, b) {
      let res = 0;

      if (a?.ranking?.rank < b?.ranking?.rank) {
        res = -1;
      } else if (a?.ranking?.rank > b?.ranking?.rank) {
        res = 1;
      }

      if (this.sortByRank == 1) {
        return res * -1;
      }

      return res;
    },
  },
}
</script>