const fs = require("fs");

//this extracts data from a json file
function extractData(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}
function msToSrt(timeInMs) {
  const convertMs = Math.floor(timeInMs / 1000);

  const ms = convertMs % 1000;
  const totalSeconds = (convertMs - ms) / 1000;
  const seconds = totalSeconds % 60;
  const totalMinutes = (totalSeconds - seconds) / 60;
  const minutes = totalMinutes % 60;
  const hour = (totalMinutes - minutes) / 60;
  return `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds},${ms}`;
}

var draftFileName = "draft_content.json";
let os = process.env.os;
switch (os) {
  case "Windows_NT":
    draftFileName = "draft_content.json";
    break;
  case "Darwin":
    draftFileName = "draft_info.json";
    break;
  case "Linux":
    draftFileName = "draft_info.json";
}
console.log("file: " + draftFileName);
const data = extractData(draftFileName);
const { materials, tracks } = data;

// let regexOptions = [ /\<size.*?\>((.|\n)*?)\<\/size.*?\>/, /\[((.|\n)*?)\]/ ]

let subTrackNumber = 1;
let subTiming = tracks[subTrackNumber].segments;
var subtitlesInfo = materials.texts.map((i) => {
  // var matches = regexOptions.map(r => i.content.match(r))
  let content = i.content
    .replace(/\<.*?\>/g, "")
    .replace(/\<\/.*?\>/g, "")
    .replace(/\[|\]/g, "");
  try {
    let contentV3 = JSON.parse(i.content);
    if (contentV3) {
      content = contentV3.text;
    }
  } catch (error) {}
  // console.log(matches)
  // var content = matches.reduce((acc, m) => {
  //   if (m){
  //     // console.log(i.id, m[1])
  //     if (m[1].substring(0,1) === '<') {
  //       return acc}
  //     else {
  //       // console.log(acc+m[1])
  //       return acc + m[1]
  //     }
  //   } else {
  //     return acc
  //   }
  // }
  //   , '')
  return {
    content,
    id: i.id,
  };
});
// console.log(subtitlesInfo)
subtitlesInfo = subtitlesInfo.map((s, i) => {
  let segment = subTiming.find((i) => i.material_id === s.id);
  while (!segment) {
    subTrackNumber++;
    subTiming = tracks[subTrackNumber].segments;
    segment = subTiming.find((i) => i.material_id === s.id);
  }
  s.start = segment.target_timerange.start;
  s.end = s.start + segment.target_timerange.duration;
  s.srtStart = msToSrt(s.start);
  s.srtEnd = msToSrt(s.end);
  s.subNumber = i + 1;
  s.srtTiming = s.srtStart + " --> " + s.srtEnd;

  return s;
});

// console.log(subtitlesInfo)
const srtOut = subtitlesInfo.reduce((srt, i) => {
  const subtitle = `${i.subNumber}\n${i.srtTiming}\n${i.content}\n\n`;
  return srt + subtitle;
}, "");
const copyOut = subtitlesInfo.reduce((srt, i) => {
  const subtitle = `${i.content}\n`;
  return srt + subtitle;
}, "");
//this function writes the string to a file
function writeToFile(data, filename) {
  console.log("Saving subtitles to file...");
  fs.writeFileSync(filename, data);
  console.log("Done!");
  // fs.writeFileSync('subtitles.json', JSON.stringify(subtitlesInfo));
}
if (process.argv[2] === "--txt") {
  console.log("Copy extraction is a courtesy of @dellucanil");
  writeToFile(copyOut, "copy.txt");
} else {
  writeToFile(srtOut, "subtitles.srt");
  console.log(
    'Run "node index.js --txt" to get a copy version of the subtitles, courtesy of @dellucanil'
  );
}
