const fs = require('fs');

//this extracts data from a json file
function extractData() {
  const data = fs.readFileSync('draft_content.json');
  return JSON.parse(data);
}
function msToSrt(timeInMs){
  const convertMs= Math.floor(timeInMs / 1000)
  
  const ms = convertMs%1000
  const totalSeconds = (convertMs-ms)/(1000)
  const seconds = (totalSeconds)%(60)
  const totalMinutes = (totalSeconds-seconds)/60
  const minutes = totalMinutes%60
  const hour = (totalMinutes-minutes)/60
  return `${hour < 10 ? '0'+hour:hour}:${minutes<10 ? '0'+minutes:minutes}:${seconds<10? '0'+seconds:seconds},${ms}`
}
const data = extractData();
const { materials, tracks } = data;

//Habilitar apenas uma dessas linhas removendo o // da frente:
//let re = /\[((.|\n)*?)\]/ //regex que extrai o content entre []'s, alterado na ultima versao do capcut
let re = /\<size.*?\>((.|\n)*?)\<\/size\>/ //regex atual (v1.2.0) que localiza o content entre <size*></size>

let subTrackNumber = 1
let subTiming = tracks[subTrackNumber].segments
var subtitlesInfo = materials.texts.map(i=>{
  if(!re.exec(i.content)){
    re = /\<size.*?\>((.|\n)*?)\<\/size\>/
  }
  if (re.exec(i.content)[1].substring(0,1) === '<') {
    re = /\[((.|\n)*?)\]/
  }
  return {
    content: re.exec(i.content)[1],
    id: i.id
  }
})
// console.log(subtitlesInfo)
subtitlesInfo = subtitlesInfo.map((s,i) => {
  let segment = subTiming.find(i => i.material_id === s.id)
  while (!segment) {
    subTrackNumber++
    subTiming= tracks[subTrackNumber].segments
    segment = subTiming.find(i => i.material_id === s.id)
  }
  s.start = segment.target_timerange.start
  s.end = s.start + segment.target_timerange.duration
  s.srtStart = msToSrt(s.start)
  s.srtEnd = msToSrt(s.end)
  s.subNumber = i+1
  s.srtTiming = s.srtStart+' --> '+s.srtEnd

  return s


})


console.log(subtitlesInfo)
const srtOut = subtitlesInfo.reduce((srt,i)=>{
  const subtitle = `${i.subNumber}\n${i.srtTiming}\n${i.content}\n\n`
  return srt+subtitle
},'')
//this function writes the string to a file
function writeToFile(data) {
  fs.writeFileSync('subtitles.srt', data);
}
writeToFile(srtOut);