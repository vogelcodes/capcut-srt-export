# capcut-srt-export
This script extracts auto captions from a CapCut Desktop project file into a .srt subtitle file.
Necessário NodeJS instalado. NodeJS needed.
[Download](https://nodejs.org/en/download/)

To ensure the script works generate the subtitles in a fresh project. Do not change any subtitles style or properties as it may cause the script to fail.

Copy draft_content.json from your CapCut project folder located in `C:\Users\user\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\` on Windows. Paste it inside the script folder, then run `node index.js`. A subtitles.srt will be saved.

Copiar draft_content.json do projeto Capcut que no Windows fica em `C:\Users\user\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\` para esta pasta e rodar `node index.js`

[Video Tutorial](https://youtu.be/26fd2_s1c7U)

### Possíveis Erros:
Linha 22: Habilitar apenas uma das linhas seguintes utilizando o `//` para comentar a linha(desabilitar)

Linha 23: define o que procurar para achar o texto da legenda nas versoes antigas

Linha 24: versao atual 1.2.0

If my script helps you consider [buying me a pizza](https://www.buymeacoffee.com/UrsoowW)!

