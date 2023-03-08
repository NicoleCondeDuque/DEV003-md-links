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
