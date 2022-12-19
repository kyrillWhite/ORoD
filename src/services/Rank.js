export default class Rank {
  static findRank(document, N, K, B) {
    if (!document || !document.attachedOntology ||
      !document.attachedOntology.nodes || !document.attachedOntology.relations) {
      throw "Invalid document object";
    }
    let ontology = document.attachedOntology;
    let termPairs = [];

    let weights = this.findWeights(document);
    let muSum = 0;
    let countOfAttached = 0;

    for (let i in ontology.nodes) {
      if (ontology.nodes[i].name) {
        muSum += weights[i].filter((w) => w >= B).length;
        countOfAttached++;
      }
    }
    let mu = muSum / countOfAttached;

    for (let i = 0; i < ontology.nodes.length; i++) {
      for (let j = 0; j < i; j++) {
        if (ontology.nodes[i].name && ontology.nodes[j].name) {
          let coefs = this.semanticProximity(document, weights, i, j, N, K, B, mu);

          if (coefs) {
            termPairs.push({term1: ontology.nodes[i].name,
              term2: ontology.nodes[j].name, ...coefs});
          }
        }
      }
    }

    termPairs = this.normSemanticProximity(termPairs);
    let rank = termPairs.length ? termPairs.reduce((sum, t) => sum + t.sNorm, 0) / termPairs.length : 0;

    return {
      rank: rank,
      pairs: termPairs,      
    };
  }
  
  static semanticProximity(document, weights, i, j, N, K, B, _mu) {
    let ontology = document.attachedOntology;

    const nodeTerm1 = ontology.nodes[i].name;
    const nodeTerm2 = ontology.nodes[j].name;

    const nodeId1 = ontology.nodes[i].id;
    const nodeId2 = ontology.nodes[j].id;

    const index1 = document.sentences.map((s, _i) => (s.terms.includes(nodeTerm1) ? _i : null)).filter((_i) => _i !== null)[0];
    const index2 = document.sentences.map((s, _i) => (s.terms.includes(nodeTerm2) ? _i : null)).filter((_i) => _i !== null)[0];

    if (index1 === undefined || index2 === undefined || Math.abs(index1 - index2) > K) {
      return null;
    }

    let relations = {};

    for (let node of ontology.nodes) {
      relations[node.id] = [];
    }

    for (let relation of ontology.relations) {
      relations[relation.source_node_id].push(relation.destination_node_id);
    }

    let pathCount = 
      this.findPathsCount(relations, nodeId1, nodeId2, N) +
      this.findPathsCount(relations, nodeId2, nodeId1, N);

    if (pathCount === 0) {
      return null;
    }

    let bi = weights[i].filter((w) => w >= B).length;
    let bj = weights[j].filter((w) => w >= B).length;
    let mu = _mu;
    let e = weights[i][j];
    let semanticProximity = (bi + bj) ? Math.sqrt(pathCount) * 2 * mu * e / (bi + bj) : 0;

    return {
      s: semanticProximity,
      pathsCount: pathCount,
      power: mu,
      weight: e,
      betaI: bi,
      betaJ: bj,
    }
  }

  static findPathsCount(relations, id1, id2, N) {
    let pathCount = 0;
    let query = [];
    query.push({ depth: 0, id: id1 });

    while (query.length != 0) {
      let p = query.pop();
      let depth = p.depth;
      let u = p.id;

      if (u == id2) {
        pathCount++;
      }

      if (depth != N) {
        query.push(...relations[u].map((id) => ({depth: depth + 1, id: id})));
      }
    }

    return pathCount;
  }

  static normSemanticProximity(_termPairs) {
    let termPairs = [..._termPairs];
    let sMin = termPairs.reduce((min, cur) => (min.s < cur.s ? min : cur), Number.MAX_VALUE).s;
    let sMax = termPairs.reduce((max, cur) => (max.s > cur.s ? max : cur), Number.MIN_VALUE).s;

    if (sMax == 0) {
      for (let i in termPairs) {
        termPairs[i].sNorm = 0;
      }
    }
    else {
      for (let i in termPairs) {
        termPairs[i].sNorm = (termPairs[i].s - sMin) / sMax;
      }
    }
    
    return termPairs;
  }

  static findWeights(document) {
    let ontology = document.attachedOntology;
    let nCount = ontology.nodes.length;
    let weights = Array(nCount).fill(0).map(() => Array(nCount).fill(0));

    for (let i = 0; i < nCount; i++) {
      for (let j = 0; j < i; j++) {
        let nodeNameI = ontology.nodes[i].name;
        let nodeNameJ = ontology.nodes[j].name;

        if (nodeNameI && nodeNameJ) {
          weights[i][j] = weights[j][i] = document.sentences.filter((s) =>
            s.terms.includes(nodeNameI) && s.terms.includes(nodeNameJ)).length;
        }
      }
    }

    return weights;
  }
}