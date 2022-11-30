<template>
  <header class="header">
    <h1 class="header__logo">
        ORoD
    </h1>
  </header>
  <main class="main">
    <load-part/>
    <parameter-part/>
    <document-part :documents="documents"/>
  </main>
  <footer class="footer">
    2022 - kyrillWhite<br>
    kiribel2000@gmail.com
  </footer>
</template>

<script>
import DocumentPart from './DocumentPart.vue';
import LoadPart from './LoadPart.vue';
import ParameterPart from './ParameterPart.vue';

export default {
  name: 'BasePart',
  components: {
    LoadPart,
    ParameterPart,
    DocumentPart,
  },
  data() {
    return {
      N: 0,
      K: 0,
      documents: [{number: 0, name: 'D1', rank: 0}, 
        {number: 0, name: 'D1', rank: 0}]
    };
  },

}
</script>