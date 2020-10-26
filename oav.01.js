const fs = require('fs');
function translate(fichier){
    // /\[.+[A-Z]+\]/g
    //let titles = file.match(/((#.+[A-Z]))/g);
    let textJson = '{';
    const regexErased = /((#.+[A-Z]))/g;
    const regexEqual = /(=)/g;
    let file = fs.readFileSync(fichier, 'utf8');
    let erased = file.replace(regexErased, '');
    let flemmeMin = erased.toLowerCase();
    for (let i = 0; i < flemmeMin.length; i++){
        let code = flemmeMin.charCodeAt(i);

        if (code >= 97 || code <= 122 && flemmeMin.charCodeAt(-i) == 32){
            textJson += '"' + erased[i];
        }
        else if (code >= 97 || code <= 122 && flemmeMin.charCodeAt(+i) == 32){
            textJson += erased[i] + '"';
        }
        else{
            textJson += erased[i];
        }
    }
    let x = erased.replace(regexEqual, '":"');
    x += "\n}";
    console.log(x);

    fs.writeFileSync("text.json", x);
    //return titles;
}

console.log(translate("env.txt"));