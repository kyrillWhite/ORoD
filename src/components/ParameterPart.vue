<template>
  <div class="parameter-part">
    <parameter-text :name="`N`"/>
    <parameter-text :name="`K`"/>
    <parameter-select :parameter-id="0" :name="`Метрика`"/>
  </div>
</template>

<script>
import ParameterText from './ParameterText.vue';
import ParameterSelect from './ParameterSelect.vue';

export default {
  name: 'ParameterPart',
  components: {
    ParameterText,
    ParameterSelect,
  },
  props: {
  },
  data() {
    return {

    }
  },
}
</script>