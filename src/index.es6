// Core
import { Engine, gogol, gl } from './core/engine'
import { Axis } from './core/axis'
import { Color } from './core/color'
import { Palette } from './core/palette'
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
import { Conway } from './geometry/conway'
import { Torus } from './geometry/torus'
import { Sphere } from './geometry/sphere'

// Refactored
import { ProgramPipeline } from './builder/program/pipeline'
import { ProgramComponent } from './builder/program/component'
import { ShaderComponent } from './builder/shader/component'
import { ShaderGlobal } from './builder/shader/global'
import { ShaderLocal } from './builder/shader/local'
import { BasicLightingComponent } from './builder/components/basic_lighting'
import { BasicMaterialComponent } from './builder/components/basic_material'

export {

  // Core
  Axis,
  Color,
  Palette,
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
  Conway,
  Torus,
  Sphere,

  // New Refactor
  ShaderComponent,
  ShaderGlobal,
  ShaderLocal,
  BasicLightingComponent,
  BasicMaterialComponent,
  ProgramPipeline,

  // Objects
  gogol,
  gl
}