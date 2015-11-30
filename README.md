# GogolJS - WebGL at its best.
------------------------------

```
npm install -g gogol
```

* Refactor material system
--

Material system refactor:

1. Have materials find, enable and disable attributes according to whether the current target has the attribute in question (i.e. if the geometry has no colors, don't enable the color attribute). Ensure that each attribute gets coupled with a boolean uniform that determines whether it is active.

2. Add a generic "renderer" to choose between lines, triangles, etc.

3. Remove all materials that aren't the "default material".

4. Refactor the input/output system so it's less verbose.

* Refactor renderer

Ensure that the renderer is not just populating a buffer on the fly. Optimise, optimise, optimise. Large stuff should have its own buffer. Make sure that Prefabs are decoupled from actual transforms - we shouldn't have to store the same data in the buffers multiple times.

* Refactor the scene.es6 file

Scenes shouldn't be rendering their own stuff. This is ideally done by the engine, or perhaps a new "Renderer" class that goes through and renders Prefabs/Resources.

* Get rid of scene.bake.

Scene buffers should be generated on the fly.

* Benchmark against three.js

Figure out if / why it's slower

* Come up with several default pipelines

AAA, 3DRetro, 3DRetro, etc.

* Add normal maps

* DRY up the existing shading models and add phong shading

* Start using glslify.

* Conway smoothing

Currently conway geometries don't color properly when they're shaded smoothly.
--
* Texture smoothing
Currently textures only have gl.Nearest.

* Textures should store their own UV coordinates
uv coordinates shouldn't have to exist unless a texture exists on the geometry

* Renderables should store "custom attributes" that the material knows how to render.
i.e. you should be able to define attributes in a geometry that get picked up by the material.

* DRY up a lot of these unused files.

* Do something with ShaderComponents.

* Allow multiple `Engine`s.

* Better camera system.

* Make documentation.

* Make `gogol-ui`
* Make `gogol-audio`
* Make `gogol-input`
* Add `AnimatedSprite`, `TileMap`, etc.
* Build a spritesheet editor and a tilemap editor.
