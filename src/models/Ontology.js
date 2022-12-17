export default class Ontology {
  name = null;
  nodes = null;
  relations = null;

  constructor(name, nodes, relations) {
    this.name = name;
    this.nodes = nodes;
    this.relations = relations;
  }

  getCopy() {
    return new Ontology(
      this.name,
      JSON.parse(JSON.stringify(this.nodes)),
      JSON.parse(JSON.stringify(this.relations)),
    );
  }
}