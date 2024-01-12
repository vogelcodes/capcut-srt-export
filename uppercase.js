const fs = require('fs');

function extractData(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}
function writeToFile(data, filename) {
  console.log('Saving to file '+filename+'...')
  fs.writeFileSync(filename, data);
  console.log('Done!')

}

var draftFileName = ''
let os = process.env.os
switch (os) {
  case 'Windows_NT':
    draftFileName = 'draft_content.json'
    break;
  case 'Darwin':
    draftFileName = 'draft_info.json'
    break;
  case 'Linux':
    draftFileName = 'draft_info.json'
}

const data = extractData(draftFileName);
fs.copyFileSync(draftFileName, draftFileName+'.bak')
const { materials } = data;

var upperCaseTexts = materials.texts.map(i=>{
  let content = i.content.replace(/\<.*?\>/g, '').replace(/\<\/.*?\>/g, '').replace(/\[|\]/g, '')
  let contentIndex = i.content.indexOf(content)
  let contentLength = content.length
  i.content = i.content.substring(0, contentIndex)+content.toUpperCase()+i.content.substring(contentIndex+contentLength)
  return i
})
data.materials.texts = upperCaseTexts


writeToFile(JSON.stringify(data), draftFileName);
