import { newStemmer } from "snowball-stemmers";

export default class Attach {
  static attachOntology(documentText, ontology, N) {
    if (!documentText) {
      throw "Empty document text";
    }

    if (!ontology || !ontology.nodes || !ontology.relations) {
      throw "Invalid ontology object";
    }

    let sentences = documentText.split(/\. */).filter((s) => s);
    let ontologyTerms = ontology.nodes.map((n, i) => ({name: n.name, index: i}));

    let stemmedOntology = this.stemOntology(ontologyTerms);
    let splitedSentences = sentences.map((s) => s.split(/([^а-яА-Яa-zA-Z0-9-]+)/));
    let stemmedSentences = sentences.map((s) => this.stemSentence(s.split(/[^а-яА-Яa-zA-Z0-9-]+/)));

    stemmedOntology = stemmedOntology.filter((t) =>
      t.words.length > 0 && stemmedSentences.some((s) => this.isArrayIncludeArray(s, t.words)));
    
    let attachedTerms = stemmedOntology.map((t) => t.sourceTerm);
    let markedSentences = this.getMarkedSentences(splitedSentences, stemmedSentences, stemmedOntology);

    let filteredSentences = sentences.map((s, i) => ({text: s, markedText: markedSentences[i],
      terms: attachedTerms.filter((_, j) => this.isArrayIncludeArray(stemmedSentences[i], stemmedOntology[j].words))}))
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

    const neededNodes = this.findNeededNodes(attachedOntology, N);
    console.log(neededNodes);
    attachedOntology.nodes = attachedOntology.nodes.filter(node => neededNodes.includes(node.id));
    attachedOntology.relations = attachedOntology.relations.filter(rel =>
      neededNodes.includes(rel.source_node_id) && neededNodes.includes(rel.destination_node_id));

    return {
      attachedOntology: attachedOntology,
      terms: attachedTerms,
      sentences: filteredSentences,
    };
  }

  static findNeededNodes(ontology, N) {
    let relations = {};

    for (let node of ontology.nodes) {
      relations[node.id] = [];
    }

    for (let relation of ontology.relations) {
      relations[relation.source_node_id].push(relation.destination_node_id);
    }

    let usedNodes = new Set();

    for (let node of ontology.nodes) {
      if (node.name !== '') {
        let nodeUsedNodes = this.findUsedNodes(ontology, relations, node.id, N);
        nodeUsedNodes.forEach(nod => usedNodes.add(nod));
      }
    }

    return Array.from(usedNodes);
  }

  static findUsedNodes(ontology, relations, id, N) {
    const ontologyNodesNames = {};

    ontology.nodes.forEach(node => {
      ontologyNodesNames[node.id] = node.name;
    });

    let usedNodes = new Set();
    usedNodes.add(id);
    let query = [];
    query.push({ prevs: [], depth: 0, id: id });

    while (query.length != 0) {
      let p = query.pop();
      let depth = p.depth;
      let u = p.id;
      let prevs = p.prevs;

      if (ontologyNodesNames[u] !== '') {
        prevs.forEach(prev => usedNodes.add(prev));
      }

      if (depth != N) {
        query.push(...relations[u].map((id) => (
          {
            prevs: [u, ...prevs],
            depth: depth + 1,
            id: id
          }
        )));
      }
    }

    return usedNodes;
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
    return words.map((w) => rusStemmer.stem(w.toLowerCase())).filter((t) => t);
  }

  static isArrayIncludeArray(array, subarray) {
    if (subarray.length > array.length) {
      return false;
    }

    for (let i = 0; i <= array.length - subarray.length; i++) {
      let slicesArray = array.slice(i, i + subarray.length);

      if (slicesArray.every((element, index) => element === subarray[index])) {
        return true;
      }
    }

  }

  static getMarkedSentences(splitedSentences, stemmedSentences, stemmedOntology) {
    let rusStemmer = newStemmer('russian');
    let markedSentences = [];

    for (let i in splitedSentences) {
      let ontologyTerms = stemmedOntology.filter(so => this.isArrayIncludeArray(stemmedSentences[i], so.words));
      let stemmedTextArray = splitedSentences[i].map((w) => {
        if (/[^а-яА-Яa-zA-Z0-9-]+/.test(w)) {
          return null;
        } else {
          return rusStemmer.stem(w.toLowerCase());
        }        
      });
      let textArray = splitedSentences[i].map((w) => ({word: w, mark: false}));

      for (let ontologyTerm of ontologyTerms) {
        for (let j in stemmedTextArray) {
          if (!stemmedTextArray[j]) {
            continue;
          }

          let fromJ = parseInt(j);
          let toJ = parseInt(j);

          let ow = 0;

          while (
            toJ < stemmedTextArray.length &&
            ow < ontologyTerm.words.length &&
            stemmedTextArray[toJ] == ontologyTerm.words[ow]
          ) {
            toJ += 2;
            ow++;
          }

          if (ow == ontologyTerm.words.length) {
            for (let k = fromJ; k <= toJ - 2; k++) {
              textArray[k].mark = true;
            }
          }
        }
      }
      
      let markedText = [];

      for (let word of textArray) {
        if (markedText.length != 0 && markedText[markedText.length - 1].mark == word.mark) {
          markedText[markedText.length - 1].text += word.word;
        } else {
          markedText.push({text: word.word, mark: word.mark});
        }       
      }

      markedSentences.push(markedText);
    }

    return markedSentences;
  }
}