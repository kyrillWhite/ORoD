<template>
  <div class="parameter">
    <div class="parameter__name">{{name}}</div>
    <input class="parameter__text" type="text" v-model="parameter" v-on:change="parameterChanged">
  </div>
</template>

<script>
export default {
  name: 'ParameterText',
  props: {
    value: Number,
    name: String,
  },
  data() {
    return {
      parameter: this.value,
    }
  },
  methods: {
    parameterChanged() {
      this.$emit('parameter-changed', this.parameter);
    }
  },
}
</script>