require('axios');

const {
  doesPathExist,
  isPathAbsolute,
  turnIntoAbsolute,
  isItFile,
  isItMarkdown,
  readFile,
  findLinks,
  returnOnlyFilesMd,
  totalStats,
  uniqueStats,
  brokenStats,
  validatedLinks
} = require('../index');

const {  mdLinks } = require('../mdlinks.js');


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

//verificar si el file es .md o no.
describe('isItMarkdown', () => {
    it('should be a function', () => {
      expect(typeof isItMarkdown).toBe('function');
    });
    it('should return "true" if the file is .md', () => {
      const pathAbsolute = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/leer.md';
      expect(isItMarkdown(pathAbsolute)).toBeTruthy();
    });
    it('should return "false" if it IS NOT an .md file', () => {
      const txt = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/contenido.txt';
      expect(isItMarkdown(txt)).toBeFalsy();
   });
  });
////Retornar solo los archivos md
  describe('returnOnlyFilesMd, función para retornar solo los archivos md', () => {
    it('Deberia ser una fucnión', () => {
        expect(typeof returnOnlyFilesMd).toBe('function');
    });
    it('Si le pasamos un array de archivos, hace un filtro y deberia retornar un array solo con archivos md', () => {
        expect(returnOnlyFilesMd('\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs'))
            .toEqual([
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\contenido.md',
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\leer.md',
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\mas.md',
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\menos.md',
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\pruebaDocs1\\contenido3.md',
                '\\Users\\NICOLE CONDE DUQUE\\OneDrive\\Escritorio\\DEV003-md-links\\pruebaDocs\\read.md',
                
            
            ]);
    });
});
 

//leer que hay adentro del file
describe('readFile', () => {
    it('should be a function', () => {
      expect(typeof readFile).toBe('function');
    });
    it('should read what is inside the file "texto.md" ', () => {
      const pathWithText = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/contenido.md';
      expect(readFile(pathWithText)).toEqual('Hola soy un archivo .md con texto.');
    });
  });
  
  const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/menos.md';
  
  const links = [
        {
          href: 'https://nodejs.org/es/about/',
          text: 'Acerca de Node.js - Documentación oficial',
          file: path,
        },
        {
          href: 'https://nodejs.org/api/fs.html',
          text: 'Node.js file system - Documentación oficial',
          file: path,
        },
        {
          href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
          text: 'Node.js http.get - Documentación oficial',
          file: path,
        },
        {
          href: 'https://es.wikipedia.org/wiki/Noe.js',
          text: 'Node.js - Wikipedia',
          file: path,
        }
      ];
  
  const arrResponse = [
    {
   href: 'https://nodejs.org/es/about/',
   text: 'Acerca de Node.js - Documentación oficial',
   file: '/pruebaDocs/menos.md',
    status: 200,
    message: 'ok'
  }
];
  const arrayLinks = [{
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial',
    file: '/pruebaDocs/menos.md',
  }];
  
  const arrResponseFail = [
    {
        href: 'https://es.wikipedia.org/wiki/Noe.js',
        text: 'Node.js - Wikipedia',
        file: '/pruebaDocs/menos.md',
        status: 404,
        message: 'fail'
  },
  ];
  const arrayLinksFail = [{
    href: 'https://es.wikipedia.org/wiki/Noe.js',
    text: 'Node.js - Wikipedia',
    file: '/pruebaDocs/menos.md',
  }];
  
// encuentra links en un file md
 describe('findLinks', () => {
    it('should be a function', () => {
      expect(typeof findLinks).toBe('function');
    });
    it('should find the links', () => {
      const content = `* [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
      * [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
      * [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
      * [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Noe.js)`;
      expect(findLinks(content, path)).toStrictEqual(links);
   });
  });
  
  describe('validatedLinks', () => {
    it('should be a function', () => {
      expect(typeof validatedLinks).toBe('function');
    });
    it('should return status: 200 and message "ok" ', () => {
      validatedLinks(arrayLinks).then(((response) => {
        expect(response).toEqual(arrResponse);
      }));
    });
    it('should return status: 404 and message "fail" ', () => {
      validatedLinks(arrayLinksFail).then(((response) => {
        expect(response).toEqual(arrResponseFail);
      }));
    });
  });
// cantidad de links
 describe('totalStats', () => {
    it('should be a function', () => {
      expect(typeof totalStats).toBe('function');
    });
    it('should count the total of links', () => {
      expect(totalStats(links)).toBe(4);
    });
  });
 
//cantidad de links unicos
  describe('uniqueStats', () => {
    it('should be a function', () => {
      expect(typeof uniqueStats).toBe('function');
    });
    it('should count the unique links', () => {
      expect(uniqueStats(links)).toBe(4);
    });
  });
  
//cantidad de links rotos
describe('brokenStats', () => {
    it('should be a function', () => {
      expect(typeof brokenStats).toBe('function');
    });
    it('should count the broken links', () => {
      expect(brokenStats(arrResponseFail)).toBe(1);
    });
  });
  