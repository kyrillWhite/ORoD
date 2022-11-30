<template>
  <div class="pop-up-error" v-for="(error, index) in errors" v-bind:key="index">
    <div class="pop-up-error__text">
      {{error}}
    </div>
  </div>
  <header class="header">
    <h1 class="header__logo">
        ORoD
    </h1>
  </header>
  <main class="main">
    <load-part class="main__part" @on-load-ont="updateOntolgy"
      @on-load-txt="pushDocument" @load-error="outputError"/>
    <parameter-part class="main__part" />
    <div class="main__part">
      <div class="main__part_header">
        Онтология
      </div>
      <div class="main__part_content">
        {{!ontology ? 'Онтология не загружена' : ontology.name}}
      </div>
    </div>
    <document-part class="main__part" :documents="documents"/>
  </main>
  <footer class="footer">
    2022 - kyrillWhite<br>
    kiribel2000@gmail.com
  </footer>
</template>

<script>
import DocumentPart from './DocumentPart.vue';
import LoadPart from './LoadPart.vue';
import ParameterPart from './ParameterPart.vue';

export default {
  name: 'BasePart',
  components: {
    LoadPart,
    ParameterPart,
    DocumentPart,
  },
  data() {
    return {
      errors: [],
      N: 0,
      K: 0,
      ontology: null,
      documents: [],
    };
  },
  methods: {
    updateOntolgy(ontology) {
      this.ontology = ontology;
    },
    pushDocument(document) {
      this.documents.push(document);
    },
    outputError(errorText) {
      this.errors.push(errorText);
      setTimeout(()=> {
        this.errors.shift();
      }, 4000);
    },
  },
}
</script>