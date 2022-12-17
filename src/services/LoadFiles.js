import Ontology from "@/models/Ontology";
import RankingDocument from "@/models/RankingDocument";

export default class LoadFiles {
  static async loadDocument(file, onProgress) {
    let loadingPromise = this.loadFile(file, onProgress);

    return loadingPromise.then(
      result => {
        return new RankingDocument(file.name, result);
      },
      () => {
        return 'Ошибка загрузки документа';
      }
    );
  }

  static async loadOntology(file, onProgress) {
    let loadingPromise = this.loadFile(file, onProgress);

    return loadingPromise.then(
      result => new Promise((resolve, reject) => {
        try {
          let parsedOnt = JSON.parse(result);
          resolve(new Ontology(file.name, parsedOnt.nodes, parsedOnt.relations));
        } catch {
          reject('Ошибка загрузки онтологии');
        }
      }),
      () => 'Ошибка загрузки онтологии'
    );
  }

  static async loadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
      reader.onprogress = onProgress;
  
      reader.readAsText(file);
    });
  }

  static validateFileName(fileName, extension) {
    let regexp = new RegExp(`^.+${extension}$`);
    return fileName.match(regexp);
  }
}