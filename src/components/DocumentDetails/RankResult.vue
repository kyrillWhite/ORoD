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
        B<sub>i</sub>*
      </div>
      <template v-for="(termPair, index) in document.ranking.pairs" :key="index">
        <div class="rank-result__cell">
          {{termPair.term1}}
        </div>
        <div class="rank-result__cell">
          {{termPair.term2}}
        </div>
        <div class="rank-result__cell">
          {{termPair.s}}
        </div>
        <div class="rank-result__cell">
          {{termPair.sNorm}}
        </div>
        <div class="rank-result__cell">
          {{termPair.pathsCount}}
        </div>
        <div class="rank-result__cell">
          {{termPair.power}}
        </div>
        <div class="rank-result__cell">
          {{termPair.weight}}
        </div>
        <div class="rank-result__cell">
          {{termPair.beta}}
        </div>
      </template>    
    </div>
    <button v-else>Вычислить оценку</button>
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
  }
}
</script>