<template>
  <div class="parameter-part">
    <div class="parameter-part__parameters">
      <ParameterText
        :name="`N`"
        :value="N"
        @parameter-changed="changeN"
      />
      <ParameterText 
        :name="`K`" 
        :value="K" 
        @parameter-changed="changeK"
      />
      <ParameterText 
        :name="`B`" 
        :value="B"
        @parameter-changed="changeB"
      />
    </div>
    <button
      class="button parameter-part__ranking"
      :class="{'button__not-active' : !canRanking}"
      :disabled="!canRanking"
      @click="rankingAll"
    >
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
  watch: {
    pN(newpN) {
      this.N = newpN;
    },
    pK(newpK) {
      this.K = newpK;
    },
    pB(newpB) {
      this.B = newpB;
    },
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
      if (this.N !== 0 && !parseInt(this.N)) {
        this.changeN(0);
      }

      if (this.K !== 0 && !parseInt(this.K)) {
        this.changeK(0);
      }

      if (this.B !== 0 && !parseInt(this.B)) {
        this.changeB(0);
      }

      this.$emit('ranking-all');
    },
  },
}
</script>