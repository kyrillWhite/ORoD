<template>
  <div class="load-part">
    <load-form :load-id="0" :load-object="`онтологию`"
      :extension="`.ont`" :multiple-files="false"
      @on-load="loadOntology" @load-error="loadFormError"/>
    <load-form :load-id="1" :load-object="`документы`"
      :extension="`.txt`"  :multiple-files="true"
      @on-load="loadDocuments" @load-error="loadFormError"/>
  </div>
</template>

<script>
import LoadForm from './LoadForm.vue';

export default {
  name: 'LoadPart',
  components: {
    LoadForm
  },
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    loadOntology(files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let ontology = {
          name: files[0].name,
          ontology: JSON.parse(event.target.result),
        };
        this.$emit('on-load-ont', ontology);
      };
      reader.onerror = () => {
        this.$emit('load-error', 'Ошибка загрузки онтологии');
      };
      reader.readAsText(files[0]);
    },
    loadDocuments(files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          let document = {
            name: file.name,
            text: event.target.result,
          };
          this.$emit('on-load-txt', document);
        };
        reader.onerror = () => {
          this.$emit('load-error', 'Ошибка загрузки документа');
        };
        reader.readAsText(file);
      }
    },
    loadFormError(text) {
        this.$emit('load-error', text);
    },
  }
}
</script>