# capcut-srt-export

WebUI Available [here](https://capcut-srt-export.vogelcodes.com)

This script extracts auto captions from a CapCut Desktop project file into a .srt subtitle file.

NodeJS needed.
[Download](https://nodejs.org/en/download/)

Copy draft_content.json from your CapCut project folder located in `C:\Users\user\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\` on Windows.
On MacOS the file is called draft_info.json and is located in:
`/Users/user/Movies/CapCut/User Data/Projects/com.lveditor.draft`

Paste it inside the script folder, then run `node index.js`. A subtitles.srt will be saved.

Run `node index.js --txt` to save a copy.txt version with no timestamps.

[Video Tutorial](https://youtu.be/26fd2_s1c7U)

## Uppercase your project

Now you can convert every caption in your project to UPPERCASE.

First close your project and CapCut. Copy draft_content.json from your CapCut project folder located in `C:\Users\user\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\` on Windows.
On MacOS the file is called draft_info.json and is located in:
`/Users/user/Movies/CapCut/User Data/Projects/com.lveditor.draft`

Paste it inside the script folder, then run `node uppercase.js`.

It will backup the original file and update the draft_content.json file, turning every caption to uppercase.

Now copy the draf_content.json file back to the project folder **replacing** the old one.

Open your project, your subtitles will be in uppercase.

