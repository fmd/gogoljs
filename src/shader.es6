export class Shader {
  constructor(shader) {
    this.shader = gl.createShader(type);
    return this
  }

  compileFromUrl(url) {
    return this
  }

  compileFromElement(id) {
    return this
  }

  compileFromString(str) {
    gl.shaderSource(this.shader, str);
    gl.compileShader(this.shader);

    var success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)
    if (!success) {
      throw "Could not compile shader:" + gl.getShaderInfoLog(this.shader);
    }

    return this
  }
}

export class VertexShader extends Shader {
  constructor() {
    super(gl.VERTEX_SHADER)
  }

  static get default() {
    let src = `#version 330 core

               layout(location = 0) in vec3 vpos;
               uniform mat4 mvp;

               void main() {
                 gl_Position =  mvp * vec4(vpos,1);
               }`

    return new VertexShader().compileFromString(src)
  }
}

export class FragmentShader extends Shader {
  constructor() {
    super(gl.FRAGMENT_SHADER)
  }

  static get default() {
    let src = `#version 330 core

               layout(location = 0) out vec3 color;

               void main() {
                 color = vec3(1,1,1);
               }`

    return new FragmentShader().compileFromString(src)
  }
}