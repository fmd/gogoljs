import { Engine, gl } from './engine'
import { Shader } from './shader'
import { Component } from './component'
import { Transform } from './transform'
import { Scene } from './scene'

var gogol = new Engine()

export {
  // Classes
  Shader,
  Component,
  Transform,
  Scene,

  // Objects
  gogol,
  gl
}