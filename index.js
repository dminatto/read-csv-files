import { connect } from './src/db/mongo.js';

import ImportFile from './src/importFile.js';
import Reader from './src/reader.js';

await connect();

const file = './files/opa.csv';

const readerClass = new Reader(file);
const resp = await readerClass.read();

const fileClass = new ImportFile();
await fileClass.toObject(resp.data);
