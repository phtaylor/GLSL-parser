const myGLSL = GLSL`
float _foo;

// Do super secret stuff.
float _bar(vec3 _pos) {
   // My algorithm explanation.
   return _pos.x + _pos.y + _foo;
}

float myPublicFn(vec3 _var){
  return _bar(_var);
}`;
