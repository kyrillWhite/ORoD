export default class ErrorPopUp {
  text = null;
  id = null;

  constructor(text) {
    this.text = text;
    this.id = Math.random();
  }
}