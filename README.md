# capcut-srt-export

WebUI Available [here](https://capcut-srt-export.vogelcodes.com)

This script extracts auto captions from a CapCut Desktop project file into a .srt subtitle file.

NodeJS needed.
[Download](https://nodejs.org/en/download/)

Copy draft_content.json from your CapCut project folder located in `C:\Users\user\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\` on Windows.
On MacOS the file is called draft_info.json and is located in:
`/Users/user/Movies/CapCut/User Data/Projects/com.lveditor.draft`

Paste it inside the script folder, then run `node index.js`. A subtitles.srt will be saved.

Use `--txt` to save a copy version with no timestamps. `node index.js --txt`

Then open the terminal in the script folder and run `node index.js` in the terminal.

A subtitles.srt file will be created.

[Video Tutorial](https://youtu.be/26fd2_s1c7U)

UPDATE!!
Now you can convert every caption in your project to Uppercase.

First close your project and CapCut. Then copy json project file (draft_content.json or draft_info.json) from your projects folder from your project folder to the script folder.

Then run `node uppercase.js`. It will update the draft_content.json file, turning every caption to uppercase.
A .bak file will be created in case you want to revert the changes.
Now copy the json file back to the project folder replacing the old one.

Open your project, your subtitles will be in uppercase.

