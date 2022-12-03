const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/ORoD/',
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'ORoD | Ontology Ranking of Documents',
    },
  },
})
