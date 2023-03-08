require('colors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Console } = require('console');


//carpeta o directorio
//archivo o file esta dentro de el directorio


//-----------------------Identificar si la ruta existe
const doesPathExist = (inputPath) => fs.existsSync(inputPath);

//----------------------Identificar si la ruta es absoluta
const isPathAbsolute = (inputPath) => path.isAbsolute(inputPath);

//---------------------Convertir la ruta relativa a absoluta
const turnIntoAbsolute = (inputPath) => (isPathAbsolute(inputPath) ? inputPath : path.resolve(inputPath));
//console.log(turnIntoAbsolute('prueba/prueba.md'));

// identificar si la ruta absoluta es un directorio
// const isItDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

//--------------------Identificar si la ruta absoluta es un archivo
const isItFile = (inputPath) => fs.statSync(inputPath).isFile();

//----------------Identificar si el archivo es .md(si la ruta es valida)
const isItMarkdown = (inputPath) => path.extname(inputPath) === '.md';
//console.log(isItMarkdown('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links'));


//------------- Retorna un array solo con archivos .md (con su respectiva ruta)
const arrayForFiles = (inputPath) => {
    let arrayOnlyFiles = [];
    if (isItFile(inputPath)) {
        arrayOnlyFiles.push(inputPath);
    } else {
        const folderPath = fs.readdirSync(inputPath);
        folderPath.map((file) => {
            // el metodo path.join une todos los seg de ruta, si la cadena es de long 0 devolverá 
            const folderPathJoin = path.join(inputPath, file);
            arrayOnlyFiles = [...arrayOnlyFiles, ...(arrayForFiles(folderPathJoin))];
        })
    }
    return arrayOnlyFiles;
};
//console.log(arrayForFiles('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links'))


const returnOnlyFilesMd = (inputPath) => {
    return arrayForFiles(inputPath).filter((file => path.extname(file) === '.md'));
};


//---------------------------Leer el archivo .md
const readFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');
//console.log(readFile('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/mas.md'));

const findLinks = (content, inputPath) => {
    const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
    let arrayLinks = [...content.matchAll(regExp)]; // spread operator
    //console.log(arrayLinks)
    let arrayObjects = [];
    //console.log(arrayObjects)
    for (let i = 0; i < arrayLinks.length; i++) {
        arrayObjects.push({
            href: arrayLinks[i][2],
            text: arrayLinks[i][1],
            file: inputPath,
        });
    }
    return arrayObjects;
};


//console.log(findLinks(readFile('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/README2.md'), '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/README2.md'));
// console.log(findLinks('README.md'));

const validatedLinks = (arr , inputPath) => {
    let arrayPromises = [];
    for (let i = 0; i < arr.length; i++) {
        const object = arr[i];
        const links = axios.get(object.href)
            .then((res) => ({
                href: res.config.url,
                text: object.text,
                file: inputPath,
                status: res.status,
                message: 'ok',
            }))
            .catch((error) => {
                // console.log(error)
                if ('response' in error) {
                    return {
                        href: object.href,
                        text: object.text,
                        file: inputPath,
                        status: error.response.status,
                        message: 'fail',
                    };
                }
            });
        arrayPromises.push(links);
    }
    return Promise.all(arrayPromises);
};

//const fileContent = readFile('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/pruebaDocs1/menos.md')
//const linkObjectArray = findLinks(fileContent)
//validatedLinks(linkObjectArray, '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/pruebaDocs1/menos.md').then(console.log);



//TOTAL DE LINKS
const totalStats = (links) => {
    const totalLinks = links.length;
    return `Cantidad de links unicos: ${links.length}`.bgBlue;
  };
  console.log(totalStats('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs')); // 4

//// LINKS ÚNICOS
const uniqueStats = (links) => {
    const uniqueLinks = [...new Set(links.map((link) => link.href))];
    return `Cantidad de links unicos: ${uniqueLinks.length}`.bgWhite;
 };
 console.log(uniqueStats([{
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: 'C:\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\README2.md',
    status: 200,
    message: 'ok'
  }
])); // 

// LINKS ROTOS
const brokenStats = (links) => {
   const brokenLinks = links.filter((link) => link.message === 'fail');
    return `Cantidad de links rotos: ${brokenLinks.length}`.bgRed;
  };
console.log(brokenStats([{
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio',
    file: 'C:\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\README2.md',
    status: 200,
    message: 'ok'
  },
  {
    href: 'https://nodejs.org/api/path.',
    text: 'Path',
    file: 'C:\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\README2.md',
    status: 404,
    message: 'fail'
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: 'C:\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\README2.md',
    status: 200,
    message: 'ok'
  }
])); // 



module.exports = {
  
    doesPathExist,
    isPathAbsolute,
    returnOnlyFilesMd,
    turnIntoAbsolute,
    isItFile,
    isItMarkdown,
    readFile,
    findLinks,
    totalStats,
    //uniqueStats,
    //brokenStats,
    validatedLinks

};