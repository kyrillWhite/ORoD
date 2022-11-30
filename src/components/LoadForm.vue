<template>
  <label :for="`load-form_${loadId}`"
    class="load-form__label">Загрузить {{loadObject}}</label>
  <input type="file" :id="`load-form_${loadId}`"
    extension=".txt" :multiple="multipleFiles" hidden>
</template>

<script>
export default {
  name: 'LoadForm',
  props: {
    multipleFiles: Boolean,
    extension: String,
    loadId: Number,
    loadObject: String,
    callback: Function,
  },
  data() {
    return {

    }
  },
}

</script>