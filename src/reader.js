import fs from 'fs';
import Papa from 'papaparse';

export default class Reader {
  constructor(file) {
    this.file = file;
  }

  async read() {
    const content = fs.readFileSync(this.file, 'utf8');

    return await Papa.parse(content, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
    });
  }
}
