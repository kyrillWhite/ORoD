<template>
  <div class="page">
    <header class="header">
      <h1 class="header__logo">
        ORoD
      </h1>
    </header>
    <div class="pop-up-error">
      <div class="pop-up-error__text" v-for="(error, index) in errors" v-bind:key="index">
        {{ error }}
      </div>
    </div>
    <div class="page__content">
      <main class="page__main">
        <div class="page__part">
          <div class="page__part_title">
            ЗАГРУЗКА ФАЙЛОВ
          </div>
          <div class="page__part_content">
            <load-part @on-load-ont="updateOntolgy" @on-load-txt="pushDocument"
              @load-error="outputError"/>
          </div>
        </div>
        <div class="page__part">
          <div class="page__part_title">
            НАСТРОЙКА ПАРАМЕТРОВ
          </div>
          <div class="page__part_content">
            <parameter-part :pN="N" :pK="K" :pB="B" :hasDocuments="(documents.length != 0)" :hasOntology="(ontology != null)"
            @ranking-all="rankingAll" @changed-n="changeN" @changed-k="changeK"
            @changed-b="changeB" @ranking-error="outputError"/>
          </div>
        </div>
        <div class="page__part">
          <div class="page__part_title">
            ОНТОЛОГИЯ
          </div>
          <div class="page__part_content">
            {{ !ontology ? 'ОНТОЛОГИЯ НЕ ЗАГРУЖЕНА' : ontology.name }}
          </div>
        </div>
        <div class="page__part">
          <div class="page__part_title">
            ДОКУМЕНТЫ
          </div>
          <div class="page__part_content">
            <document-part :documents="documents" @find-rank="findRank"
              @remove-document="removeDocument" @ranking-error="outputError"/>
          </div>
        </div>
      </main>
    </div>
    <footer class="footer">
      2022 - kyrillWhite<br>
      kiribel2000@gmail.com
    </footer>
  </div>
</template>

<script>
import DocumentPart from './DocumentPart.vue';
import LoadPart from './LoadPart.vue';
import ParameterPart from './ParameterPart.vue';
import Attach from '@/assets/js/Attach';
import Rank from '@/assets/js/Rank';

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
      N: 10,
      K: 10,
      B: 1,
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
    rankingAll(N, K, B) {
      for (let i in this.documents) {
        this.documents[i].ranking = Rank.findRank(this.documents[i], N, K, B);
      }
    },
    findRank(index) {
      this.documents[index].ranking = Rank.findRank(this.documents[index], this.N, this.K, this.B);
    },
    removeDocument(index) {
      this.documents.splice(index, 1);
    },
    changeN(value) {
      this.N = value;
    },
    changeK(value) {
      this.K = value;
    },
    changeB(value) {
      this.B = value;
    },
  },
}
</script>