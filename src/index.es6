// Core
import { Engine, gogol, gl } from './core/engine'
import { Color } from './core/color'
import { Shader } from './core/shader'
import { Program } from './core/program'
import { Component } from './core/component'
import { Material } from './core/material'
import { Scene } from './core/scene'
import { Transform } from './core/transform'
import { Geometry } from './core/geometry'
import { Camera, PerspectiveCamera, OrthographicCamera } from './core/camera'

// Materials
import { ColorMaterial } from './material/color'
import { TextureMaterial } from './material/texture'
import { ColorLightingMaterial } from './material/color_lighting'
import { ColorLightingTextureMaterial } from './material/color_lighting_texture'

// Geometries
import { Cube } from './geometry/cube'
import { Quad } from './geometry/quad'

// Refactored
import { Attribute, Uniform } from './program/attribute'
import { ColorProgram } from './program/color'

// Refactored better
import { ShaderComponent } from './builder/shader_component'
import { ShaderInput } from './builder/shader_input'
import { BasicVertexComponent } from './builder/components/basic_vertex'
import { BasicFragmentComponent } from './builder/components/basic_fragment'

export {

  // Core
  Color,
  Shader,
  Program,
  Transform,
  Component,
  Geometry,
  Material,
  Scene,
  Camera,
  PerspectiveCamera,
  OrthographicCamera,

  // Materials
  ColorMaterial,
  TextureMaterial,
  ColorLightingMaterial,
  ColorLightingTextureMaterial,

  // Geometries
  Quad,
  Cube,

  // Refactor
  Attribute,
  Uniform,
  ColorProgram,

  // New Refactor
  ShaderComponent,
  ShaderInput,
  BasicVertexComponent,
  BasicFragmentComponent,

  // Objects
  gogol,
  gl
}