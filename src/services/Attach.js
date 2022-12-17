import { newStemmer } from "snowball-stemmers";

export default class Attach {
  static attachOntology(documentText, ontology) {
    if (!documentText) {
      throw "Empty document text";
    }

    if (!ontology || !ontology.nodes || !ontology.relations) {
      throw "Invalid ontology object";
    }

    let sentences = documentText.split(/\. */).filter((s) => s);
    let ontologyTerms = ontology.nodes.map((n, i) => ({name: n.name, index: i}));

    let stemmedOntology = this.stemOntology(ontologyTerms);
    let stemmedSentences = sentences.map((s) => this.stemSentence(s.toLowerCase().split(/[^а-яА-Яa-zA-Z0-9-]+/)));

    stemmedOntology = stemmedOntology.filter((t) =>
      t.words.length > 0 && stemmedSentences.some((s) => s.join(' ').includes(t.words.join(' '))));
    
    let attachedTerms = stemmedOntology.map((t) => t.sourceTerm);

    let filteredSentences = sentences.map((s, i) => ({text: s,
      terms: attachedTerms.filter((_, j) => stemmedSentences[i].join(' ').includes(stemmedOntology[j].words.join(' ')))}))
      .filter((s) => s.terms.length);
      
    let attachedOntology = ontology.getCopy();

    let stemmedTerms = Array.apply(null, Array(attachedOntology.nodes.length)).map(() => false);

    stemmedOntology.forEach(term => {
      stemmedTerms[term.index] = true;
    });

    for (let i in attachedOntology.nodes) {
      if (!stemmedTerms[i]) {
        attachedOntology.nodes[i].name = '';
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