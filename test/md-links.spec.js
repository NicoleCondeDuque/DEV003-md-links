const { doesPathExist,
    isPathAbsolute,
    turnIntoAbsolute,
    isItFile } = require('../index.js');


describe('doesPathExist', () => {
    it('should be a function', () => {
        expect(typeof doesPathExist).toBe('function');
    });
    it('should return "true" if the path exists', () => {
        const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
        expect(doesPathExist(path)).toBeTruthy();
    });
    it('should return "false" if the path DOES NOT exist', () => {
        const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTR.md';
        expect(doesPathExist(path)).toBeFalsy();
    });
});

// *** VERIFIES IF THE PATH IS ABSOLUTE ***
describe('isPathAbsolute', () => {
    it('should be a function', () => {
        expect(typeof isPathAbsolute).toBe('function');
    });
    it('should return "true" if the path is absolute', () => {
        const path = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
        expect(isPathAbsolute(path)).toBeTruthy();
    });
    it('should return "false" if the path IS NOT absolute (relative)', () => {
        const path = 'prueba/EXTRA.md';
        expect(isPathAbsolute(path)).toBeFalsy();
    });
});

// *** TURNS A RELATIVE PATH INTO ABSOLUTE ***
describe('turnIntoAbsolute', () => {
    it('should be a function', () => {
        expect(typeof turnIntoAbsolute).toBe('function');
    });
    it('should return an absolute path', () => {
        const path = 'prueba/EXTRA.md';
        const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
        expect(turnIntoAbsolute(path)).toBe(pathAbsolute);
    });
    it('should return the same path if it is already absolute', () => {
        const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
        expect(turnIntoAbsolute(pathAbsolute)).toBe('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md');
    });
});

// *** VERIFIES IF THE PATH IS A FILE OR NOT ***
describe('isItFile', () => {
    it('should be a function', () => {
        expect(typeof isItFile).toBe('function');
    });
    it('should return "true" if it is a file', () => {
        const pathAbsolute = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md';
        expect(isItFile(pathAbsolute)).toBeTruthy();
    });
    it('should return "false" if it IS NOT a file', () => {
        const notFile = '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba';
        expect(isItFile(notFile)).toBeFalsy();
    });
});