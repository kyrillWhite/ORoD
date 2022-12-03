<template>
  <div class="load-part__element">
    <label :for="`load-form_${loadId}`"
      class="load-part__button button">Загрузить {{loadObject}}</label>
    <input type="file" :id="`load-form_${loadId}`" :ref="`load-form_${loadId}`"
      :accept="extension" :multiple="multipleFiles" hidden
      v-on:change="loadFile">
  </div>
</template>

<script>
export default {
  name: 'LoadForm',
  props: {
    multipleFiles: Boolean,
    extension: String,
    loadId: Number,
    loadObject: String,
  },
  data() {
    return {
    }
  },
  methods: {
    loadFile() {
      let files = [...this.$refs[`load-form_${this.loadId}`].files];
      let regexp = new RegExp(`^.+${this.extension}$`);
      if (files.every((file) => file.name.match(regexp))) {
        this.$emit('on-load', this.$refs[`load-form_${this.loadId}`].files);
      }
      else {
        this.$emit('load-error', `Ожидался файл с расширением ${this.extension}`);
      }
    },
  },
}
</script>
