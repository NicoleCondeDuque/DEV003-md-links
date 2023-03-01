require('colors');
const { mdLinks, isItMarkdown, isItFile } = require ('./index.js');


mdLinks('./README.md'.bgCyan).then(()=> {})
.catch((error)=>{
console.log(error)
});