# GogolJS - WebGL at its best.
------------------------------

```
npm install -g gogol
```

* Texture smoothing
* Textures should store their own UV coordinates
* Renderables should store "custom attributes" that the material knows how to render.
* Allow multiple `Engine`s.
* Camera system.
* Make `NormalTextureMaterial` and lighting system.
* Make documentation.
* Make `gogol-ui`
* Make `gogol-audio`
* Make `gogol-input`
* Add `AnimatedSprite`, `TileMap`, etc.
* Find a sensible way to handle custom UV mapping on `Sprite`s.
* Split vertex attributes out into more sensible dynamic system that materials can use and render.
* Build a spritesheet editor and a tilemap editor.

possible:

program
  lights
  fog

material
  texture optional
  extra program functions
  required attributes
  geometry

geometry
  material
  attributes

cube < geometry
 default material = colors
 vertices <- attribute
 colors <- attribute

s = scene
g = cube

s.add(g)
