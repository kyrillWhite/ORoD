import Attach from "@/services/Attach";
import Rank from "@/services/Rank";

export default class RankingDocument {
  id = Math.random();
  name = null;
  text = null;
  ranking = null;
  attachedOntology = null;
  terms = null;
  sentences = null;
  detailsAreOpened = false;

  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  attachOntology(ontology, N) {
    try {
      let {attachedOntology, terms, sentences} = Attach.attachOntology(this.text, ontology, N);
      this.attachedOntology = attachedOntology;
      this.terms = terms;
      this.sentences = sentences;
    } catch (e) {
      console.log(e);
    }
  }

  findRank(N, K, B) {
    try {
      this.ranking = Rank.findRank(this, N, K, B);
    } catch (e) {
      console.log(e);
    }
  }
}