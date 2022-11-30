<template>
  <div class="parameter-part">
    <div class="parameter-part__parameters">
      <parameter-text :name="`N`"/>
      <parameter-text :name="`K`"/>
    </div>
    <div class="parameter-part__ranking">
      <button>Выполнить ранжирование</button>
    </div>
  </div>
</template>

<script>
import ParameterText from './ParameterText.vue';

export default {
  name: 'ParameterPart',
  components: {
    ParameterText,
  },
  props: {
  },
  data() {
    return {

    }
  },
}
</script>