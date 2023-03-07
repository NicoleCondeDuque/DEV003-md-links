require('colors');
const { mdLinks } = require ('./mdLinks.js');

mdLinks('./README2.md'.bgCyan).then(()=> {})
.catch((error)=>{
console.log(error)
});