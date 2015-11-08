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
import { ShaderComponent } from './builder/shader_component'
import { ShaderGlobal } from './builder/shader_global'
import { ShaderLocal } from './builder/shader_local'
import { BasicLightingComponent } from './builder/components/basic_lighting'
import { BasicMaterialComponent } from './builder/components/basic_material'
import { ProgramPipeline } from './builder/program_pipeline'

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