const fs = require('fs');
function translate(fichier){
    // /\[.+[A-Z]+\]/g
    //let titles = file.match(/((#.+[A-Z]))/g);
    const regexEqual = /(=)/g;
    let result = "{\n";
    let file = fs.readFileSync(fichier, 'utf8');
    const splittedContent = file.split(/\r?\n/);
    splittedContent.forEach(function (line, i) {
        if (!line.match(/^#/) && line.length != 0 && i < splittedContent.length-2){
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
    
    fs.writeFileSync("text.json", changeEqual);
    //return titles;
    console.log(changeEqual);
}

console.log(translate("env.txt"));