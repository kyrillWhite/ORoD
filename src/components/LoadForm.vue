<template>
  <div class="load-part__element">
    <label 
      class="load-part__button button" 
      :for="`load-form_${loadId}`"
    >
      Загрузить {{loadObject}}
    </label>
    <input
      type="file"
      hidden
      :id="`load-form_${loadId}`"
      :ref="`load-form_${loadId}`"
      :accept="extension"
      :multiple="multipleFiles"
      @change="loadFile"
    >
  </div>
</template>

<script>
import LoadFiles from '@/services/LoadFiles';

export default {
  name: 'LoadForm',
  props: {
    multipleFiles: Boolean,
    extension: String,
    loadId: Number,
    loadObject: String,
  },
  methods: {
    loadFile() {
      let files = [...this.$refs[`load-form_${this.loadId}`].files];

      if (files.every((file) => LoadFiles.validateFileName(file.name, this.extension))) {
        this.$emit('on-load', this.$refs[`load-form_${this.loadId}`].files);
      } else {
        this.$emit('load-error', `Ожидался файл с расширением ${this.extension}`);
      }
    },
  },
}
</script>
