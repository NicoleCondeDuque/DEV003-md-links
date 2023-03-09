require('axios');
const { doesPathExist,
    isPathAbsolute,
    turnIntoAbsolute,
    isItFile } = require('../index.js');

//Verificar si la ruta existe
describe('doesPathExist', () => {
    it('should be a function', () => {
        expect(typeof doesPathExist).toBe('function');
    });
    it('should return "true" if the path exists', () => {
        const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links';
        expect(doesPathExist(path)).toBeTruthy();
    });
    it('should return "false" if the path DOES NOT exist', () => {
        const path = '/Users/NICOLECONDEDUQUE/OneDrive/Escritorio/DEV003-md-links/';
        expect(doesPathExist(path)).toBeFalsy();
    });
});

//Verificar si es un path absoluto
describe('isPathAbsolute', () => {
    it('should be a function', () => {
        expect(typeof isPathAbsolute).toBe('function');
    });
    it('should return "true" if the path is absolute', () => {
        const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links';
        expect(isPathAbsolute(path)).toBeTruthy();
    });
    it('should return "false" if the path IS NOT absolute (relative)', () => {
        const path = 'pruebaDocs/leer.md';
        expect(isPathAbsolute(path)).toBeFalsy();
    });
});
//volver una ruta relativa a una ruta absoluta
describe('turnIntoAbsolute', () => {
    it('should be a function', () => {
        expect(typeof turnIntoAbsolute).toBe('function');
    });
    it('should return an absolute path', () => {
        const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/leer.md';
        const pathAbsolute = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/leer.md';
        expect(turnIntoAbsolute(path)).toBe(pathAbsolute);
    });
    it('should return the same path if it is already absolute', () => {
        const pathAbsolute = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links';
        expect(turnIntoAbsolute(pathAbsolute)).toBe('/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links');
    });
});
// verificar si la ruta es un archivo o no
describe('isItFile', () => {
    it('should be a function', () => {
        expect(typeof isItFile).toBe('function');
    });
    it('should return "true" if it is a file', () => {
        const pathAbsolute = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/leer.md';
        expect(isItFile(pathAbsolute)).toBeTruthy();
    });
    it('should return "false" if it IS NOT a file', () => {
        const notFile = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/';
        expect(isItFile(notFile)).toBeFalsy();
    });
});

////verificar si el file es .md o no.
//describe('isItMarkdown', () => {
//    it('should be a function', () => {
//      expect(typeof isItMarkdown).toBe('function');
//    });
//    it('should return "true" if the file is .md', () => {
//      const pathAbsolute = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/leer.md';
//      expect(isItMarkdown(pathAbsolute)).toBeTruthy();
//    });
//    it('should return "false" if it IS NOT an .md file', () => {
//      const txt = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/contenido.txt';
//      expect(isItMarkdown(txt)).toBeFalsy();
//    });
//  });
  
//  //leer si hay un .md dentro
//  describe('readFile', () => {
//    it('should be a function', () => {
//      expect(typeof readFile).toBe('function');
//    });
//    it('should read what is inside the file "leer.md" ', () => {
//      const pathWithText = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/pruebaDocs/leer.md';
//      expect(readFile(pathWithText)).toEqual('Hola soy un archivo .md con texto.');
//    });
//  });
  
//  const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/README2.md';
  
//  const links = [
//   {
//    href: 'https://nodejs.org/es/abo/',
//    text: 'Acerca de Node.js - Documentación oficial',
//    file: path,
//  },
//  {
//    href: 'https://nodejs.org/api/fs.html',
//    text: 'Node.js file system - Documentación oficial',
//    file: path,
//  },
//  {
//    href: 'https://nodejs.org/api/http.html#http_http_get_options_cal',
//    text: 'Node.js http.get - Documentación oficial',
//    file: path,
//  },
//  {
//    href: 'https://es.wikipedia.org/wiki/Node.js',
//    text: 'Node.js - Wikipedia',
//    file: path,
//  },
//  ];
  
//  const arrResponse = [
//     {
//    href: 'https://nodejs.org/api/http.html#http_http_get_options_cal',
//    text: 'Node.js http.get - Documentación oficial',
//    file: './README2.md',
//    status: 200,
//    message: 'ok'
//  },
//  ];
//  const arrayLinks = [ {
//    href: 'https://es.wikipedia.org/wiki/Node.js',
//    text: 'Node.js - Wikipedia',
//    file:'./README2.md',
//  },];
  
//  const arrResponseFail = [
//    {
//    href: 'https://nodejs.org/es/abo/',
//    text: 'Acerca de Node.js - Documentación oficial',
//    file: './README2.md',
//    status: 404,
//    message: 'fail'
//  },
//  ];
//  const arrayLinksFail = [{
//    href: 'https://nodejs.org/es/abo/',
//    text: 'Acerca de Node.js - Documentación oficial',
//    file: './README2.md',
//  }];
  
//  //Encuentra el links dentro de un file.md
//  describe('findLinks', () => {
//    it('should be a function', () => {
//      expect(typeof findLinks).toBe('function');
//    });
//    it('should find the links', () => {
//      const content = `[Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
//      * [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
//      * [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
//      * [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Node.js)
//      * [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)`;
//      expect(findLinks(content, path)).toStrictEqual(links);
//    });
//  });
  