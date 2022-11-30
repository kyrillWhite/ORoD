<template>
  <div class="parameter">
    <div class="parameter__name">{{name}}</div>
    <select class="parameter__select" :id="`select_${parameterId}`">
      
    </select>
  </div>
</template>

<script>
export default {
  name: 'ParameterSelect',
  props: {
    parameterId: Number,
    name: String,
    callback: Function,
  },
  data() {
    return {

    }
  },
}
</script>