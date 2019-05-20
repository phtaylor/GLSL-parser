module.exports = function (source){
  let str = parseGLSL(source);
  str = removeWhitespace(str);
  let ans = "const myGLSL = GLSL`"+ mangle_underscore_functions_in_the_code(str)+"`;"
  console.log(ans);
  return ans;
}

function parseGLSL(str) {
	let firstvariable = "`";
  let secondvariable = "`";
  let result = removeComments(str);
  result = result.replace(/\n/g, '');
  result = result.match(new RegExp(firstvariable + "(.*)" + secondvariable));
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


function removeComments(str){
  return str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm," ");
}

//This funcirton
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
      newStr = newStr.replace(new RegExp(key, 'g'), val);
    }
    return newStr;
}

//This function removes the whitespaces.
function removeWhitespace (str){  
  return str.replace(/\s\s+/g, ' ');
}









