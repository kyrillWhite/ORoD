<template>
  <div class="parameter-part">
    <div class="parameter-part__parameters">
      <parameter-text :name="`N`" :value="N" @parameter-changed="changeN"/>
      <parameter-text :name="`K`" :value="K" @parameter-changed="changeK"/>
      <parameter-text :name="`B`" :value="B" @parameter-changed="changeB"/>
    </div>
    <div class="parameter-part__ranking">
      <button v-on:click="rankingAll">Выполнить ранжирование</button>
    </div>
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
  },
  data() {
    return {
      N: this.pN,
      K: this.pK,
      B: this.pB,
    }
  },
  methods: {
    changeN(value) {
      this.N = value;
      this.$emit('changed-n', this.N);
    },
    changeK(value) {
      this.K = value;
      this.$emit('changed-k', this.N);
    },
    changeB(value) {
      this.B = value;
      this.$emit('changed-b', this.N);
    },
    rankingAll() {
      this.$emit('ranking-all', this.N, this.K, this.B);
    },
  },
}
</script>