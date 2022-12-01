import { newStemmer } from "snowball-stemmers";

export default class Attach {
  static attachOntology(document, ontology) {
    if (!document) {
      throw "Invalid document object";
    }

    if (!ontology || !ontology.ontology || !ontology.ontology.nodes || !ontology.ontology.relations) {
      throw "Invalid ontology object";
    }

    let sentences = document.split('.').filter((s) => s);
    let ontologyTerms = ontology.ontology.nodes.map((n, i) => ({name: n.name, index: i}));

    let stemmedOntology = this.stemOntology(ontologyTerms);
    let stemmedSentences = sentences.map((s) => this.stemSentence(s.toLowerCase().split(/[^а-яА-Яa-zA-Z0-9-]+/)));

    stemmedOntology = stemmedOntology.filter((t) =>
      t.words.length > 0 && stemmedSentences.some((s) => s.join(' ').includes(t.words.join(' '))));
    
    let attachedTerms = stemmedOntology.map((t) => t.sourceTerm);

    let filteredSentences = sentences.filter((_, i) => 
      stemmedOntology.some((t) => stemmedSentences[i].join(' ').includes(t.words.join(' '))));

    let attachedOntology = JSON.parse(JSON.stringify(ontology));

    let stemmedTerms = Array.apply(null, Array(attachedOntology.ontology.nodes.length)).map(() => false);

    stemmedOntology.forEach(term => {
      stemmedTerms[term.index] = true;
    });

    for (let i in attachedOntology.ontology.nodes) {
      if (!stemmedTerms[i]) {
        attachedOntology.ontology.nodes[i].name = '';
      }
    }

    return {
      attachedOntology: attachedOntology,
      terms: attachedTerms,
      sentences: filteredSentences,
    };
  }

  static stemOntology(terms) {
    let rusStemmer = newStemmer('russian');
    let stemTerms = [];
    for (let term of terms) {
      let words = term.name.toLowerCase().split(' ').filter((t) => t).map((t) => rusStemmer.stem(t));
      stemTerms.push({sourceTerm: term.name, words: words, index: term.index});
    }
    return stemTerms;
  }

  static stemSentence(words) {
    let rusStemmer = newStemmer('russian');
    return words.map((w) => rusStemmer.stem(w)).filter((t) => t);
  }
}