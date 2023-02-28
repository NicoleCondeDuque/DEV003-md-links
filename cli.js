require('colors');
const { mdLinks, isItMarkdown, isItFile } = require ('./index.js');


mdLinks('./README.md').then(()=> {})
.catch((error)=>{
console.log(error)
});