<template>
  <div class="source-text">
    {{document.text}}
  </div>
</template>

<script>
export default {
  name: 'SourceText',
  props: {
    document: Object,
  },
  data() {
    return {

    };
  }
}
</script>