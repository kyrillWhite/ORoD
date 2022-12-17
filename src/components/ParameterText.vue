<template>
  <div class="parameter">
    <div class="parameter__name">{{name}}</div>
    <input
      class="parameter__input text-input"
      type="text"
      v-model="parameter"
      @change="parameterChanged"
      @keypress="onlyNumber"
    />
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
    value(newValue) {
      this.parameter = newValue;
    },
  },
  methods: {
    parameterChanged() {
      this.$emit('parameter-changed', this.parameter);
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

      if ((keyCode < 48 || keyCode > 57)) {
        $event.preventDefault();
      }
    }
  },
}
</script>