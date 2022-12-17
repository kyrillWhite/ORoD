<template>
  <div class="load-part">
    <LoadForm
      :load-id="0"
      :load-object="`онтологию`"
      :extension="`.ont`"
      :multiple-files="false"
      @on-load="loadOntology"
      @load-error="loadFormError"
    />
    <LoadForm
      :load-id="1"
      :load-object="`документы`"
      :extension="`.txt`"
      :multiple-files="true"
      @on-load="loadDocuments"
      @load-error="loadFormError"
    />
  </div>
</template>

<script>
import LoadFiles from '@/services/LoadFiles';
import LoadForm from './LoadForm.vue';

export default {
  name: 'LoadPart',
  components: {
    LoadForm
  },
  methods: {
    async loadOntology(files) {
      await LoadFiles.loadOntology(files[0], (event) => {return event}).then(
        result => {
          this.$emit('on-load-ont', result);
        },
        error => {
          this.$emit('load-error', error);
        }
      );
    },
    async loadDocuments(files) {
      for (let file of files) {
        await LoadFiles.loadDocument(file, (event) => {return event}).then(
          result => {
            this.$emit('on-load-txt', result);
          },
          error => {
            this.$emit('load-error', error);
          }
        );
      }
    },
    loadFormError(text) {
      this.$emit('load-error', text);
    },
  }
}
</script>