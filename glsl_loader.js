
const strTest = ["_abc", "_abc_xyz", "_abc987", "_xyz_987", "_aBC", "_abc_Abc"];

module.exports = function (source){
  // console.log(source);
  let str = parseGLSL(source);
  console.log(mangle_underscore_functions_in_the_code(str));
  // return mangle_underscore_functions_in_the_code(str);
  return "const myGLSL = GLSL`"+ mangle_underscore_functions_in_the_code(str)+"`;";

}

function parseGLSL(str) {
  // str = str.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');
	let firstvariable = "`";
  let secondvariable = "`";
  let result = str.replace(/\n/g, '');
  result = result.match(new RegExp(firstvariable + "(.*)" + secondvariable));
  // // console.dir(str);
  // console.dir(result);
  return result[1];
}

// Convert a string to a string hash.
function hashString(str) {
  let hashInt = 0;
  for (let i = 0; i < str.length; i++) {
    hashInt += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hashInt = hashInt & hashInt; // Convert to 32bit integer
  }
  // Now convert to a string.
  const hashchars = ("" + hashInt).split('');
  /* console.log(hashchars) */
  let hash = "";
  for(let ch of hashchars){
    hash += String.fromCharCode(97+Number.parseInt(ch))
  }
  return hash;
}


function mangle_underscore_functions_in_the_code(str){
  let words = str.split(" ");
  let newStr = str;
  const underscoreWords = new Set();
  let SymbolMapping ={};
  words.forEach(function(word) {
  	if(word.startsWith("_")){
  	      word = word.split(".")[0];
          word = word.split(";")[0];
          word = word.split("(")[0];
          word = word.split(")")[0];
  	      underscoreWords.add(word);
  	    }
	});
   underscoreWords.forEach(function(val) {
       /* console.log(hashString(val)); */
      SymbolMapping[val] = hashString(val);
   });
   
   for (let key in SymbolMapping) {
      let val = SymbolMapping[key];
      // console.log(key,val);
  
      /* console.log(wordToReplace) */;
      newStr = newStr.replace(new RegExp(key, 'g'), val);
    }
    return newStr;
}





