require('axios');
const {  mdLinks } = require('../mdlinks.js');
//jest.mock("axios");
describe('mdLinks', () => {

    it('Debería ser una función', () => {
      expect(typeof mdLinks).toBe('function');
    });
    it('Deberia devolver una promesa', () => {
      return mdLinks()
        .then(() => {
          expect(mdLinks).toBe(typeof 'promise')
        })
        .catch((error) => { error });
    });
    it('Debe retornar un array con objetos con propiedades href, text, file', () => {
      const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/menos.md';
      const array = [{
          href: 'https://nodejs.org/es/about/',
          text: 'Acerca de Node.js - Documentación oficial',
          file: '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/menos.md',
      }];
      expect(mdLinks(path, { validate: false })).resolves.toStrictEqual(array);//Se usa para probar que los objetos tienen los mismos tipos y estructura.
    });
    it('Debe retornar un array con objetos con propiedades href, text, file, status, message', () => {
      const path = '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/menos.md';
      const array = [{
        href: 'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file: '/Users/NICOLE CONDE DUQUE/OneDrive/Escritorio/DEV003-md-links/pruebaDocs/menos.md',
         status: 200,
         message: 'ok'
        }
      ];
      expect(mdLinks(path, { validate: true })).resolves.toStrictEqual(expect.anything(array));
    });
  });