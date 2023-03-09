require('colors');
const { mdLinks, } = require ('./mdLinks.js');
//if(process.argv.includes("--validate"))
//console.log(process.argv)


//const option = process.argv
//console.log(option)
mdLinks(process.argv[2], { validate : true})
.then((res)=> console.log(res))
.catch((error)=>{
console.log(error)
});

//const option = process.argv
//console.log(option)
//mdLinks('README2.md', { validate : true})
//.then((res)=> console.log(res))
//.catch((error)=>{
//console.log(error)
//});