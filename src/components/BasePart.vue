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
    <div class="main__part">
      <div class="main__part_title">
        Загрузка файлов
      </div>
      <div class="main__part_content">
        <load-part class="main__part" @on-load-ont="updateOntolgy"
          @on-load-txt="pushDocument" @load-error="outputError"/>
      </div>
    </div>
    <div class="main__part">
      <div class="main__part_title">
        Настройка параметров
      </div>
      <div class="main__part_content">
        <parameter-part class="main__part" />
      </div>
    </div>
    <div class="main__part">
      <div class="main__part_title">
        Онтология
      </div>
      <div class="main__part_content">
        {{!ontology ? 'Онтология не загружена' : ontology.name}}
      </div>
    </div>
    <div class="main__part">
      <div class="main__part_title">
        Документы
      </div>
      <div class="main__part_content">
        <document-part class="main__part" :documents="documents"/>
      </div>
    </div>
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
import Attach from '@/assets/js/Attach';

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

      for (let i in this.documents) {
        let attachResult = this.attachOntologyToDocument(this.documents[i]);
        Object.assign(this.documents[i], attachResult);
      }
    },
    pushDocument(document) {
      if (this.ontology) {
        let attachResult = this.attachOntologyToDocument(document);
        Object.assign(document, attachResult);
      }

      this.documents.push(document);
    },
    outputError(errorText) {
      this.errors.push(errorText);
      setTimeout(()=> {
        this.errors.shift();
      }, 4000);
    },
    attachOntologyToDocument(document) {
      try {
        return Attach.attachOntology(document.text, this.ontology);
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>