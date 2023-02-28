require('colors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');



// identificar si la ruta existe
const doesPathExist = (inputPath) => fs.existsSync(inputPath);

// identificar si la ruta es absoluta
const isPathAbsolute = (inputPath) => path.isAbsolute(inputPath);

// convertir la ruta relativa a absoluta
const turnIntoAbsolute = (inputPath) => (isPathAbsolute(inputPath) ? inputPath : path.resolve(inputPath));
// console.log(turnIntoAbsolute('prueba/prueba.md'));

// identificar si la ruta absoluta es un directorio
// const isItDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();
// identificar si la ruta absoluta es un archivo
const isItFile = (inputPath) => fs.statSync(inputPath).isFile();
//console.log(doesPathExist('./pruebaDocs/leer.md'));
//console.log( typeof doesPathExist('./pruebaDocs/leer.md'));
//console.log(isPathAbsolute('./leer.md'));
//console.log(turnIntoAbsolute('./leer.md'));
//console.log(isItFile('./pruebaDocs/leer.md'));

// identificar si el archivo es .md
const isItMarkdown = (inputPath) => path.extname(inputPath) === '.md';
//console.log(isItMarkdown('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links'));

// leer el archivo md
const readFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');
//console.log(readFile('pruebaDocs/leer.md'));

const findLinks = (content, inputPath) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  let arrayLinks = [...content.matchAll(regExp)]; // spread operator
//   console.log(arrayLinks)
  let arrayObjects = [];
//   console.log(arrayObjects)
  for (let i = 0; i < arrayLinks.length; i++) {
    arrayObjects.push({
      href: arrayLinks[i][2],
      text: arrayLinks[i][1],
      file: inputPath,
    });
  }
  return arrayObjects;
};
//console.log(findLinks(readFile('./README2.md'), './README2.md'));
//console.log(findLinks('README.md'));

const linkValidation = (arr) => {
  let arrayPromises = [];

  for (let i = 0; i < arr.length; i++) {
    const object = arr[i];
    let links = axios.get(object.href)
      .then((res) => ({
        href: res.config.url,
        text: object.text,
        file: object.file,
        status: res.status,
        message: 'ok',
      }))
      .catch((error) => {
        // console.log(error)
        if ('response' in error) {
          return {
            href: object.href,
            text: object.text,
            file: object.file,
            status: error.response.status,
            message: 'fail',
          };
        }
      });
    arrayPromises.push(links);
  }

  return Promise.all(arrayPromises);
 
}

/* ------------------------------- FUNCIÓN MDLINKS -------------------------------*/
const mdLinks = (inputPath, options = { }) => new Promise((resolve, reject) => {
    if (doesPathExist(inputPath)) { // identificar si la ruta existe
      // console.log('The path exists');
      if (!isPathAbsolute(inputPath)) {
        // console.log('The path is RELATIVE');
        const absolutePath = turnIntoAbsolute(inputPath);
        // console.log(`The relative path was turned into absolute ${absolutePath}`);
        if (isItFile(absolutePath)) {
          // console.log('It is a file');
          if (isItMarkdown(inputPath)) { // si es un archivo y es md, extrae los links
        // console.log('It is a markdown file');
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
  

//const md = fs.readdir('./pruebaDocs/leer.md','utf8');
//  console.log( `eso es md:\n`, md);

module.exports = {
    doesPathExist,
    isPathAbsolute,
    turnIntoAbsolute,
    isItFile,
    mdLinks,
    isItMarkdown,
  readFile,
  findLinks,
  mdLinks,
  linkValidation,
};