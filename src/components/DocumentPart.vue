<template>
  <div class="document-part">
    <div>№</div>
    <div>Название документа</div>
    <div>Ранг</div>
    <div></div>
    <document-element v-for="(document, index) in documents"
      :name="`N`" :key="index" :document="{number: index + 1, ...document}"/>
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
      
    }
  },
}
</script>