import { color } from './color'
import { Engine, gl } from './engine'
import { Shader } from './shader'
import { Program } from './program'
import { Component } from './component'
import { Material } from './material'
import { Transform } from './transform'
import { Renderable } from './renderable'
import { Quad } from './quad'
import { Scene } from './scene'

var gogol = new Engine()

export {
  // Helper Classes
  color,

  // Classes
  Shader,
  Program,
  Component,
  Material,
  Transform,
  Renderable,
  Quad,
  Scene,

  // Objects
  gogol,
  gl
}