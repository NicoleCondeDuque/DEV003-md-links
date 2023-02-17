const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Debería devolver una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('Debería rechazar cuando el path no existe', () => {
    return mdLinks('estepathnoexiste.md').catch((error)=>{
    expect(error).toBe('la ruta no existe')
    });
  });
});