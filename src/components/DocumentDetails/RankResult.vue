<template>
  <table class="rank-result" v-if="document?.ranking">
    <thead>
      <tr>
        <th class="rank-result__start rank-result__header" scope="col">
          Понятие 1
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Понятие 2
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Степ. близости (S<sub>ij</sub>)
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Норм. степ. близости (S'<sub>ij</sub>)
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Кол-во путей (P'<sub>ij</sub>)
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Мощность понятия (Ub)
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          Вес дуги (E<sub>ij</sub>)
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          B<sub>i*</sub>
        </th>
        <th class="rank-result__start rank-result__header" scope="col">
          B<sub>*j</sub>
        </th>          
      </tr>
    </thead>
    <tbody>
      <tr v-for="(termPair, index) in document.ranking.pairs" :key="index">
        <td class="rank-result__cell rank-result__start" scope="row">
          {{termPair.term1}}
        </td>
        <td class="rank-result__cell rank-result__start" scope="row">
          {{termPair.term2}}
        </td>
        <td class="rank-result__cell">
          {{termPair.s.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.sNorm.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.pathsCount.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.power.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.weight.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.betaI.toFixed(3)}}
        </td>
        <td class="rank-result__cell">
          {{termPair.betaJ.toFixed(3)}}
        </td>
      </tr> 
    </tbody>
  </table>
  <button class="button document__details_button" v-else v-on:click="findRank">Вычислить оценку</button>
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