<template>
  <table class="document">
    <thead>
      <tr>
        <th class="document__header" scope="col">№</th>
        <th class="document__header document__name" scope="col" @click="sortByNameClicked">
          Название документа <span>{{sortSymbols[sortByName]}}</span>
        </th>
        <th class="document__header" scope="col" @click="sortByRankClicked">
          Ранг <span>{{sortSymbols[sortByRank]}}</span>
        </th>
        <th class="document__header" scope="col">Инф.</th>
        <th class="document__header" scope="col">Удал.</th>
      </tr>
    </thead>
    <tbody>
      <DocumentElement
        v-for="(document, index) in sortedDocuments"
        :key="document.id"
        :document="document"
        :index="index + 1"
        @doc-details-opened="openDocumentDetails"
        @doc-details-closed="closeDocumentDetails"
        @find-rank="findRank"
        @remove-document="removeDocument"
      />
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
    prDocuments: Object,
  },
  data() {
    return {
      docWithOpenedDetailsId: null,
      sortByName: 2,
      sortByRank: 0,
      sortSymbols: [' ', '▼', '▲'],
      documents: this.prDocuments,
    }
  },
  computed: {
    sortedDocuments() {
      let documents = Object.values(this.documents);

      if (this.sortByName) {
        documents.sort(this.compareDocsByName);
      } else if (this.sortByRank) {
        documents.sort(this.compareDocsByRank);
      }

      return documents;
    },
  },
  methods: {
    openDocumentDetails(id) {
      if (this.docWithOpenedDetailsId) {
        this.documents[this.docWithOpenedDetailsId].detailsAreOpened = false;
      }
      this.documents[id].detailsAreOpened = true;
      this.docWithOpenedDetailsId = id;
    },
    closeDocumentDetails() {
      this.documents[this.docWithOpenedDetailsId].detailsAreOpened = false;
      this.docWithOpenedDetailsId = null;
    },
    findRank(id) {
      this.$emit('find-rank', id);
    },
    removeDocument(id) {
      if (this.docWithOpenedDetailsId == id) {
        this.docWithOpenedDetailsId = null;
      }
      this.$emit('remove-document', id);
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