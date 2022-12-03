<template>
  <div class="rank-result">
    <div class="rank-result__result" v-if="document?.ranking">
      <div class="rank-result__header">
        Понятие 1
      </div>
      <div class="rank-result__header">
        Понятие 2
      </div>
      <div class="rank-result__header">
        Степ. близости (S<sub>ij</sub>)
      </div>
      <div class="rank-result__header">
        Норм. степ. близости (S'<sub>ij</sub>)
      </div>
      <div class="rank-result__header">
        Кол-во путей (P'<sub>ij</sub>)
      </div>
      <div class="rank-result__header">
        Мощность понятия (Ub)
      </div>
      <div class="rank-result__header">
        Вес дуги (E<sub>ij</sub>)
      </div>
      <div class="rank-result__header">
        B<sub>i*</sub>
      </div>
      <div class="rank-result__header">
        B<sub>*j</sub>
      </div>
      <template v-for="(termPair, index) in document.ranking.pairs" :key="index">
        <div class="rank-result__cell">
          {{termPair.term1}}
        </div>
        <div class="rank-result__cell">
          {{termPair.term2}}
        </div>
        <div class="rank-result__cell">
          {{termPair.s.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.sNorm.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.pathsCount.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.power.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.weight.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.betaI.toFixed(3)}}
        </div>
        <div class="rank-result__cell">
          {{termPair.betaJ.toFixed(3)}}
        </div>
      </template>    
    </div>
    <button v-else v-on:click="findRank">Вычислить оценку</button>
  </div>
</template>

<script>
export default {
  name: 'RankResult',
  props: {
    document: Object,
  },
  data() {
    return {

    };
  },
  methods: {
    findRank() {
      this.$emit('find-rank');
    }
  }
}
</script>