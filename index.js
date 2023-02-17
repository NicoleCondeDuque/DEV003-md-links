const fs = require('fs');
const path = require('path');

const mdLinks = (path,options) => {
  //resolve(resuelto) cuando se resuelve la promesa, y reject no, 
  //relacionado al then y catch, resolve y reject son callback
  //son funciones!! en resolve le damos el valor 
  return new Promise((resolve,reject)=> {
    //identificar si la ruta existe.
    //si no existe la ruta rechaza la promesa.
    if(fs.existsSync(path)) {
   //Chequear o convertir a una ruta absoluta.
   //Probar si va a ser archivo o directorio.
   //Si es un directorio hay que devolver un arreglo con archivosque sean md
   //Si es carpeta 
    } else {
       //Si no exite la ruta rechazamos la promesa.
  reject('la ruta no existe')
    }
  });

}

module.exports = {
  mdLinks

};