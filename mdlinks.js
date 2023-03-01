require('colors');
const {
    doesPathExist,
    isPathAbsolute,
    turnIntoAbsolute,
    isItFile,
    isItMarkdown,
    findLinks,
    linkValidation,

  } = require('./index.js')

// ------------------------------- FUNCIÓN MDLINKS -------------------------------/
const mdLinks = (inputPath, options = { }) => new Promise((resolve, reject) => {
    if (doesPathExist(inputPath)) { // identificar si la ruta existe
       console.log('The path exists');
      if (!isPathAbsolute(inputPath)) {
        console.log('The path is RELATIVE');
        const absolutePath = turnIntoAbsolute(inputPath);
        console.log(`The relative path was turned into absolute ${absolutePath}`);
        if (isItFile(absolutePath)) {
          console.log('It is a file');
          if (isItMarkdown(inputPath)) { // si es un archivo y es md, extrae los links
         console.log('It is a markdown file');
            let content = readFile(inputPath);
            if (content !== '') {
              const arrayObjects = findLinks(content, inputPath); // si encuentra archivos md, crear un arreglo de mds
              if (arrayObjects !== '' && options.validate) {
                resolve(linkValidation(arrayObjects));
              } else if (arrayObjects !== '' && options.validate !== true) {
                resolve(arrayObjects);
              }
            } else {
              reject(new Error('There IS NOT links in this file'.bgRed)); // si el arreglo es vacío, rechazamos la promesa diciendo que no hay archivos md
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


  module.exports = {
    mdLinks
};
  
