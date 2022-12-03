<template>
  <div>
    <div class="intermediate-result">
      <div class="intermediate-result__title">
        Привязавшаяся онтология:
      </div>
        <button class="button" v-on:click="downloadAttachedOntology">Скачать</button>
    </div>
    <div class="intermediate-result">
      <div class="intermediate-result__title">
        Привязавшиеся понятия:
      </div>
        <div v-for="(term, index) in document?.terms" :key="index">
          {{`${index + 1}. ${term}`}}
        </div>
    </div>
    <div class="intermediate-result">
      <div class="intermediate-result__title">
        Отфильтрованные предложения:
      </div>
      <div v-for="(sentence, index) in document?.sentences" :key="index">
        {{`${index + 1}. ${sentence.text}.`}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntermediateResult',
  props: {
    document: Object,
  },
  data() {
    return {
      
    };
  },
  methods: {
    downloadAttachedOntology() {
      let json = JSON.stringify(this.document.attachedOntology.ontology);
      let fileName = `${this.document.attachedOntology.name.replace('.ont', '')}_${(new Date())
        .toLocaleString().replaceAll(/[ ,:.]/g, '_')}.ont`;
      let file = new File([json], {name: fileName, type: "octet/stream"});
      let url = window.URL.createObjectURL(file);

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  },
}
</script>