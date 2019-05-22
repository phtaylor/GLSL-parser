module.exports = function (source){

  // do we we have GLSL code in this file?
  const startIndex = source.indexOf("GLSL`");
  if(startIndex!= -1) {
    const endIndex = source.indexOf("`", startIndex+5);
    if(endIndex == -1) {
      console.warn("Unmatching GLSL backtick found");
      return source;
    }

    // extract the GLSL code for processing...
    const count = endIndex - (startIndex+5);
    const glsl = source.substring(startIndex+5, count);

    // Modify the GLSL code...
    if(options.removeWhitespace) {
      glsl = removeWhitespace(glsl)
    }

    if(options.removeComments) {
      glsl = removeComments(glsl)
    }

    if(options.manglePrivateVariables) {
      glsl = manglePrivateVariables(glsl)
    }

    // put it back where we found it. 

    return source.substring(0, startIndex+5) + glsl + source.substring(endIndex+1);
  }
  retiurn source;
}

// This function removes the whitespaces.
function removeWhitespace (str){  
  return str.replace(/\s\s+/g, ' ');
}

function removeComments(str){
  return str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm," ");
}

//This funcirton
function manglePrivateVariables(str){

  const words = str.split(" ");
  const underscoreWords = new Set();
  const symbolMapping = {};

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
    symbolMapping[val] = hashString(val);
  });
   
  let newStr = str;
  for (let originalName in symbolMapping) {
    const mangledName = symbolMapping[originalName];
    newStr = newStr.replace(new RegExp(originalName, 'g'), mangledName);
  }
  return newStr;
}


