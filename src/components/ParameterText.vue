<template>
  <div class="parameter">
    <div class="parameter__name">{{name}}</div>
    <input class="parameter__text" type="text">
  </div>
</template>

<script>
export default {
  name: 'ParameterText',
  props: {
    name: String,
  },
  data() {
    return {

    }
  },
}
</script>