<template>
  <div class="load-part">
    <load-form :load-id="0" :load-object="`онтологию`"
      :extension="`.ont`" :multiple-files="false"/>
    <load-form :load-id="1" :load-object="`документы`"
      :extension="`.txt`"  :multiple-files="true"/>
  </div>
</template>

<script>
import LoadForm from './LoadForm.vue';

export default {
  name: 'LoadPart',
  components: {
    LoadForm
  },
  props: {
    callback: Function,
  },
  data() {
    return {

    }
  },
}
</script>