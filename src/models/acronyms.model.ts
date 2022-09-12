import * as fs from 'fs';

const acronymPath = './src/config/acronym.json';
const myAcronymPath = './src/config/myAcronym.json';

export const readData = () => {
  return JSON.parse(fs.readFileSync(acronymPath, 'utf-8').toString());
};

export const writeData = () => {
  const acronymsData = readData();

  const acronyms = [];
  acronymsData.forEach(acronym => {
    acronyms.push({ name: Object.keys(acronym)[0], description: acronym[Object.keys(acronym)[0]] });
  });
  fs.writeFileSync(myAcronymPath, JSON.stringify(acronyms), 'utf8');
};

const getData = () => {
  return JSON.parse(fs.readFileSync(myAcronymPath, 'utf-8').toString());
};

export default getData;
