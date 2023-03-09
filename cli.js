//require('colors');
//const { mdLinks, } = require ('./mdLinks.js');
////if(process.argv.includes("--validate"))
////console.log(process.argv)


////const option = process.argv
////console.log(option)
//mdLinks(process.argv[2], { validate : true})
//.then((res)=> console.log(res))
//.catch((error)=>{
//console.log(error)
//});

////const option = process.argv
////console.log(option)
////mdLinks('README2.md', { validate : true})
////.then((res)=> console.log(res))
////.catch((error)=>{
////console.log(error)
////});

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
require('colors');
const {
   totalStats, uniqueStats, brokenStats,
} = require('./index.js');
const { mdLinks, } = require ('./mdLinks.js');

// const args = process.argv;
const path = process.argv[2];
const config = process.argv.slice(2);
const stats = config.includes('--stats') || config.includes('--s');
const valid = config.includes('--validate') || config.includes('--v');
// console.log(args);
// console.log(path);
// console.log(config);

if (valid && !stats) {
  mdLinks(path, { validate: valid }).then((links) => {
    console.log(`\n
                                          LINKS VALIDATION`.bgBlue);
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
    console.log(`\n                               
                                            THE FOLLOWING LINKS WERE FOUND`
      .bgBlue);
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
          
    Add after your path: 
    ${'--validate :'.bgBlue} IF YOU WANT TO VALIDATE IF THE LINKS THAT WERE FOUND WORK OR NOT
    ${'--stats :'.bgBlue} IF YOU WANT TO RECEIVE AN OUTPUT WITH A TEXT CONTAINING BASIC STATISTICS ABOUT THE LINKS
    ${'--validate --stats :'.bgBlue} IF YOU WANT TO OBTANIN STATISTICS THAT REQUIRE THE VALIDATION RESULTS `.blue);
  }).catch((error) => { console.log(error); });
}