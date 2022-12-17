<template>
  <div class="page">
    <header class="header">
      <h1 class="header__logo">
        ORoD
      </h1>
    </header>
    <div class="pop-up-error">
      <div
        class="pop-up-error__error"
        v-for="error in errors"
        :key="error.id"
      >
        <div class="pop-up-error__error_text">
          {{ error.text }}
        </div>
        <button
          class="button__close"
          @click="removeError(error.id)"
        >
        </button>
      </div>
    </div>
    <div class="page__content">
      <main class="page__main">
        <div class="page__part">
          <div class="page__part_title">
            ЗАГРУЗКА ФАЙЛОВ
          </div>
          <div class="page__part_content">
            <LoadPart
              @on-load-ont="updateOntology"
              @on-load-txt="pushDocument"
              @load-error="outputError"
            />
          </div>
        </div>
        <div class="page__part">
          <div class="page__part_title">
            НАСТРОЙКА ПАРАМЕТРОВ
          </div>
          <div class="page__part_content">
            <ParameterPart
              :p-n="N"
              :p-k="K"
              :p-b="B"
              :has-documents="(documents.length != 0)"
              :has-ontology="(ontology != null)"
              @ranking-all="rankingAll"
              @changed-n="changeN"
              @changed-k="changeK"
              @changed-b="changeB"
              @ranking-error="outputError"
            />
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
            <DocumentPart
              :pr-documents="documents"
              @find-rank="findRank"
              @remove-document="removeDocument"
              @ranking-error="outputError"
            />
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
import ErrorPopUp from '@/models/ErrorPopUp';
import DocumentPart from './DocumentPart.vue';
import LoadPart from './LoadPart.vue';
import ParameterPart from './ParameterPart.vue';

export default {
  name: 'MainPart',
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
      documents: {},
    };
  },
  watch: {
    N(newN) {
      if (newN !== 0 && !parseInt(newN)) {
        this.changeN(0);
      }
      else {
        for (let id in this.documents) {
          this.documents[id].attachOntology(this.ontology, newN);
        }
      }
    }
  },
  methods: {
    updateOntology(ontology) {
      this.ontology = ontology;

      for (let id in this.documents) {
        this.documents[id].attachOntology(this.ontology, this.N);
      }
    },
    pushDocument(document) {
      if (this.ontology) {
        document.attachOntology(this.ontology, this.N);
      }

      this.documents[document.id] = document;
    },
    findRank(id) {
      this.documents[id].findRank(this.N, this.K, this.B);
    },
    rankingAll() {
      for (let id in this.documents) {
        this.documents[id].findRank(this.N, this.K, this.B);
      }
    },
    removeDocument(id) {
      delete this.documents[id];
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
    outputError(errorText) {
      let newError = new ErrorPopUp(errorText);
      this.errors.push(newError);
      setTimeout(()=> {
        this.removeError(newError.id);
      }, 4000);
    },
    removeError(id) {
      const errorIndex = this.errors.findIndex(error => error.id == id);
      
      if (errorIndex !== -1) {
        this.errors.splice(errorIndex, 1);
      }
    },
  },
}
</script>