class Engine {
  constructor() {
    this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    console.log('ok');
  }

  get version() {
    return 'v0.1.0'
  }
}

module.exports = Engine
