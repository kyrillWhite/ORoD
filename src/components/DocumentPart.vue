<template>
  <div class="document-part">
    <div>№</div>
    <div>Название документа</div>
    <div>Ранг</div>
    <div></div>
    <document-element v-for="(document, index) in documents"
      :key="index" :document="{number: index + 1, ...document}"
      :details-is-opened="documentsDetailsIsOpened[index]" @doc-details-opened="openDocumentDetails"
      @doc-details-closed="closeDocumentDetails"/>
  </div>
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
      documentsDetailsIsOpened: {},
      docWithOpenedDetailsNum: null,
    }
  },
  methods: {
    openDocumentDetails(num) {
      if (this.docWithOpenedDetailsNum !== null) {
        this.closeDocumentDetails(this.docWithOpenedDetailsNum);
      }

      this.documentsDetailsIsOpened[num] = true;
      this.docWithOpenedDetailsNum = num;
    },
    closeDocumentDetails(num) {
      this.documentsDetailsIsOpened[num] = false;
      this.docWithOpenedDetailsNum = null;
    },
  },
}
</script>