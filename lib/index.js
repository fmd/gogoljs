// Core
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _coreEngine = require('./core/engine');

var _coreAxis = require('./core/axis');

var _coreColor = require('./core/color');

var _corePalette = require('./core/palette');

var _coreComponent = require('./core/component');

var _coreMaterial = require('./core/material');

var _coreScene = require('./core/scene');

var _coreTransform = require('./core/transform');

var _coreGeometry = require('./core/geometry');

var _coreCamera = require('./core/camera');

// Materials

var _materialDefault = require('./material/default');

// Geometries

var _geometryCube = require('./geometry/cube');

var _geometryQuad = require('./geometry/quad');

var _geometryConway = require('./geometry/conway');

var _geometryTorus = require('./geometry/torus');

var _geometrySphere = require('./geometry/sphere');

// Refactored

var _builderProgramPipeline = require('./builder/program/pipeline');

var _builderProgramComponent = require('./builder/program/component');

var _builderShaderComponent = require('./builder/shader/component');

var _builderShaderGlobal = require('./builder/shader/global');

var _builderShaderLocal = require('./builder/shader/local');

var _builderComponentsBasic_lighting = require('./builder/components/basic_lighting');

var _builderComponentsBasic_material = require('./builder/components/basic_material');

exports.

// Core
Axis = _coreAxis.Axis;
exports.Color = _coreColor.Color;
exports.Palette = _corePalette.Palette;
exports.Transform = _coreTransform.Transform;
exports.Component = _coreComponent.Component;
exports.Geometry = _coreGeometry.Geometry;
exports.Material = _coreMaterial.Material;
exports.Scene = _coreScene.Scene;
exports.Camera = _coreCamera.Camera;
exports.PerspectiveCamera = _coreCamera.PerspectiveCamera;
exports.OrthographicCamera = _coreCamera.OrthographicCamera;
exports.

// Materials
DefaultMaterial = _materialDefault.DefaultMaterial;
exports.

// Geometries
Quad = _geometryQuad.Quad;
exports.Cube = _geometryCube.Cube;
exports.Conway = _geometryConway.Conway;
exports.Torus = _geometryTorus.Torus;
exports.Sphere = _geometrySphere.Sphere;
exports.

// New Refactor
ShaderComponent = _builderShaderComponent.ShaderComponent;
exports.ShaderGlobal = _builderShaderGlobal.ShaderGlobal;
exports.ShaderLocal = _builderShaderLocal.ShaderLocal;
exports.BasicLightingComponent = _builderComponentsBasic_lighting.BasicLightingComponent;
exports.BasicMaterialComponent = _builderComponentsBasic_material.BasicMaterialComponent;
exports.ProgramPipeline = _builderProgramPipeline.ProgramPipeline;
exports.

// Objects
gogol = _coreEngine.gogol;
exports.gl = _coreEngine.gl;