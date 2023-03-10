require('colors');
const {
    doesPathExist,
    isPathAbsolute,
    turnIntoAbsolute,
    isItFile,
    isItMarkdown,
    findLinks,
    readFile,
    validatedLinks,
    uniqueStats,
    brokenStats,

 
  } = require('./index.js')

// ------------------------------- FUNCIÓN MDLINKS -------------------------------/
const mdLinks = (inputPath, options) => new Promise((resolve, reject) => {
    if (doesPathExist(inputPath)) { // identificar si la ruta existe
    //console.log('The path exists');
      if (!isPathAbsolute(inputPath)) {
        //console.log('The path is RELATIVE');
        const absolutePath = turnIntoAbsolute(inputPath);
        //console.log(`The relative path was turned into absolute ${absolutePath}`);
        if (isItFile(absolutePath)) {
        //console.log('It is absolutePath file');
          if (isItMarkdown(inputPath)) { // si es un archivo y es md, extrae los links
        // console.log('It is a markdown file');
            let content = readFile(inputPath);
            //console.log(content);
            if (content !== '') {
              const arrayObjects = findLinks(content, absolutePath);// si encuentra archivos md, crear un arreglo de mds
            //  console.log(arrayObjects.length);  
              if (arrayObjects !== '' && options.validate !== false ) {
                    resolve(validatedLinks(arrayObjects, absolutePath));
            } else if (arrayObjects !== '' && options.validate !== true) {
              resolve(arrayObjects);
            }
             } else {
              reject('There IS NOT links in this file'.bgRed); // si el arreglo es vacío, rechazamos la promesa diciendo que no hay archivos md
              }
            } else {
              reject(new Error('It IS NOT an .md file'.bgRed));
            }
          } else {
            reject(new Error('It IS NOT a file'.bgRed));
          }
        }
      } else {
        reject(new Error('The path DOES NOT exist'.bgRed)); // si no existe la ruta, se rechaza la promesa
    }
    });

//console.log(findLinks(mdLinks('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/README2.md'), '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/README2.md')).then(res => console.log(res));
//mdLinks('./pruebaDocs/menos.md', {validate:false}).then(res => console.log(res));
//mdLinks('./pruebaDocs/menos.md', {validate:true}).then(res => console.log(res));
  
module.exports = {
    mdLinks
};
  
