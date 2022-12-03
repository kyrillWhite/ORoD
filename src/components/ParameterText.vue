<template>
  <div class="parameter">
    <div class="parameter__name">{{name}}</div>
    <input class="parameter__input text-input" type="text" v-model="parameter" v-on:change="parameterChanged">
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
  watch: {
    value() {
      this.parameter = this.value;
    },
  },
  methods: {
    parameterChanged() {
      this.$emit('parameter-changed', this.parameter);
    }
  },
}
</script>