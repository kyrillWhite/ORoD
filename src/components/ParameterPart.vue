<template>
  <div class="parameter-part">
    <div class="parameter-part__parameters">
      <parameter-text :name="`N`" :value="N" @parameter-changed="changeN"/>
      <parameter-text :name="`K`" :value="K" @parameter-changed="changeK"/>
      <parameter-text :name="`B`" :value="B" @parameter-changed="changeB"/>
    </div>
    <button :class="`button parameter-part__ranking ${!canRanking ? 'button__not-active' : ''}`"
      :disabled="!canRanking" v-on:click="rankingAll">
      Выполнить ранжирование
    </button>
  </div>
</template>

<script>
import ParameterText from './ParameterText.vue';

export default {
  name: 'ParameterPart',
  components: {
    ParameterText,
  },
  props: {
    pN: Number,
    pK: Number,
    pB: Number,
    hasDocuments: Boolean,
    hasOntology: Boolean,
  },
  data() {
    return {
      N: this.pN,
      K: this.pK,
      B: this.pB,
    }
  },
  computed: {
    canRanking() {
      return this.hasOntology && this.hasDocuments;
    },
  },
  methods: {
    changeN(value) {
      this.N = value;
      this.$emit('changed-n', this.N);
    },
    changeK(value) {
      this.K = value;
      this.$emit('changed-k', this.K);
    },
    changeB(value) {
      this.B = value;
      this.$emit('changed-b', this.B);
    },
    rankingAll() {
      let hasError = false;

      if (this.N !== 0 && !parseFloat(this.N)) {
        this.$emit('ranking-error', `Параметр N должен быть числом`);
        this.changeN(0);
        hasError = true;
      }

      if (this.K !== 0 && !parseFloat(this.K)) {
        this.$emit('ranking-error', `Параметр K должен быть числом`);
        this.changeK(0);
        hasError = true;
      }

      if (this.B !== 0 && !parseFloat(this.B)) {
        this.$emit('ranking-error', `Параметр B должен быть числом`);
        this.changeB(0);
        hasError = true;
      }

      if (!hasError){
        this.$emit('ranking-all', this.N, this.K, this.B);
      }
    },
  },
}
</script>