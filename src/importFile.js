import fs from 'fs';

export default class ImportFile {
  #logRead;
  #logNotFound;

  constructor() {
    this.#logRead = [];
    this.#logNotFound = [];
  }

  async toObject(data) {
    for (const key in data) {
      const item = data[key];

      const newObj = {
        user: {
          name: item.nome,
          email: '',
          anonymous: item.anonimo != 'Sim',
        },
      };

 

      this.addLogFind(newObj);
    }

    this.createFileLog('./log/read-entries', this.#logRead);
  }

  addLogFind(entry) {
    this.#logRead.push(entry);
  }

  addLogUnfind(entry) {
    this.#logNotFound.push(entry);
  }

  createFileLog(path, obj) {
    var stream = fs.createWriteStream(path);

    try {
      stream.once('open', (fd) => {
        for (const key in obj) {
          stream.write(`${JSON.stringify(obj[key])}\n`);
        }

        stream.end();
      });
    } catch (e) {
      console.log('Cannot write file ', e);
    }
  }
}
