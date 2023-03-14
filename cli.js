#!/usr/bin/env node
require('colors');
const {
   totalStats, uniqueStats, brokenStats,
} = require('./index.js');
const { mdLinks, } = require ('./mdlinks.js');


const path = process.argv[2];
const config = process.argv.slice(2);
const stats = config.includes('--stats') ;
const valid = config.includes('--validate') ;
// console.log(args);
// console.log(path);
// console.log(config);

if (path === undefined) {
    console.log(`                            
    
    █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
    █                                                                                                        █
    █                            Hola! Bienvenido a tu libreia Markdown!                                     █
    █                                                                                                        █
    █                                                                                                        █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`.blue);
    console.log(`
    █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
    █                                                                                                        █
    █                            Introduce tu Path o ruta para analizarla:                                   █
    █      y luego escribe:                                                                                  █
    █    --validate : SI QUIERES VALIDAR QUE LOS LINKS QUE ENCONTRAMOS FUNCIONAN O NO                        █
    █    --stats : SI DESEA RECIBIR UNA SALIDA CON UN TEXTO CON ESTADÍSTICAS BÁSICAS SOBRE LOS ENLACES       █
    █    --validate --stats: SI DESEA OBTENER ESTADÍSTICAS QUE REQUIERAN RESULTADOS DE VALIDACIÓN            █
    █                                                                                                        █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    `.white);
  }

if (valid && !stats) {
  mdLinks(path, { validate: valid }).then((links) => {
    console.log(`                                              VALIDACION DE LINKS                                      `.bgBlue);
    for (let i = 0; i < links.length; i++) {
      const object = links[i];
      console.log(`
      ${'HREF    :'.bgCyan} ${object.href.brightCyan} 
      ${'MESSAGE :'.bgBlue} ${object.message.brightBlue} 
      ${'STATUS  :'.bgWhite} ${object.status} 
      ${'TEXT    :'.bgYellow} ${object.text.brightYellow}`);
    }
  }).catch((error) => { console.log(error); });
} else if (stats && !valid) {
  mdLinks(path, { validate: stats }).then((links) => {
    console.log(`\n${'TOTAL LINKS  :'.bgBlue} ${totalStats(links)}`.brightBlue);
    console.log(`\n${'UNIQUE LINKS :'.bgYellow} ${uniqueStats(links)}`.brightYellow);
  }).catch((error) => { console.log(error); });
} else if ((stats && valid) || (valid && stats)) {
  mdLinks(path, { validate: valid }).then((links) => {
    console.log(`\n${'TOTAL LINKS  :'.bgBlue} ${totalStats(links)}`.brightBlue);
    console.log(`\n${'UNIQUE LINKS :'.bgWhite} ${uniqueStats(links)}`.brightYellow);
    console.log(`\n${'BROKEN LINKS :'.bgRed} ${brokenStats(links)}`);
  }).catch((error) => { console.log(error); });
} else if (!valid && !stats && path !== undefined) {
  mdLinks(path, { validate: valid }).then((links) => {
    console.log(    `                            SEGUIMIENTO DE LINKS ENCONTRADOS                                               ` .bgBlue);
    for (let i = 0; i < links.length; i++) {
      const object = links[i];
      console.log(`
      ${'HREF    :'.bgCyan} ${object.href.brightCyan} 
      ${'PATH    :'.bgWhite} ${object.file} 
      ${'TEXT    :'.bgYellow} ${object.text.brightYellow}`);
    }
    console.log(`
    ██ ██ 
    ██ ██ 
    ██ ██ 
          
    ██ ██ 
          
    *AGREAGA DESPUES DEL PATH/RUTA: 
    ${'--validate :'.magenta} SI QUIERES VALIDAR QUE LOS LINKS QUE ENCONTRAMOS FUNCIONAN O NO 
    ${'--stats :'.magenta} SI DESEA RECIBIR UNA SALIDA CON UN TEXTO CON ESTADÍSTICAS BÁSICAS SOBRE LOS ENLACES
    ${'--validate --stats :'.magenta} SI DESEA OBTENER ESTADÍSTICAS QUE REQUIERAN RESULTADOS DE VALIDACIÓN `.blue);
  }).catch((error) => { console.log(error); });
}