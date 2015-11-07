the new way:

a vertex shader has inputs and outputs.
a fragment shader has inputs and outputs.

let p = input('projectionMatrix');
let v = input('viewMatrix');
let m = input('modelMatrix');
let mv = input('modelViewMatrix');

let position = input('position')
let color = input('color')

let positionWriter = new Component()

let vertexPosition = output('gl_Position')
let fragmentColor = output('gl_FragColor')

positionWriter.inputs = [p, v, m, positions]
positionWriter.outputs = [vertexPosition]
positionWriter.method = positionMethod

let positionMethod = () => {
  return `vertexPosition = projectionMatrix * viewMatrix * modelMatrix * aPosition`
}

let fragmentColorWriter = new Component()

fragmentColorWriter.inputs = [color]
fragmentColorWriter.outputs = [fragmentColor]
fragmentColorWriter.method = fragmentMethod

let fragmentMethod = () => {
  return `fragmentColor = vec4(color, 1.0)`
}

attribute