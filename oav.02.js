const fs = require('fs');
function translate(fichier){

    const regexEqual = /(=)/g;
    let result = "{\n";
    let file = fs.readFileSync(fichier, 'utf8');
    const splittedContent = file.split(/\r?\n/);
    splittedContent.forEach(function (line, i) {
        if (line.match(/\[(.[A-Z].)\]/gm) && line.length != 0 && i < splittedContent.length-2){
            line = '    "' + line + '",'; 
            result += line + "\n";
        }
        else if (!line.match(/^#/) && line.length != 0 && i == splittedContent.length-2) {
            line = '    "' + line + '"'; 
            result += line + "\n";
        }
    });
    let changeEqual = result.replace(regexEqual, '" : "');
    changeEqual += "}";
    
    fs.writeFileSync("php.20181003133700.json", changeEqual);
    //return titles;
    console.log(changeEqual);
}

console.log(translate("php.ini"));