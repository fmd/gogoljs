import { mat4, vec3 } from 'gl-matrix'
import { gogol, Color, Palette, Scene, Conway, Geometry,
         DefaultMaterial, PerspectiveCamera } from '../src'

gogol.init('gogol-example', { clearColor: Color.fromHex('#232323') })

let scene = new Scene({ camera: new PerspectiveCamera() })
gogol.scene = scene

scene.camera.translate(0.0, 0.0, 4.0)

let mat = () => { return new DefaultMaterial() }

let b = new Conway({ material: mat(),
                     conway: 'ppgT',
                     palette: [...Palette.giantGoldfish],
                     shading: Geometry.FLAT_SHADING })

scene.addChild(b)
scene.bake()

function render() {
  gogol.processOneFrame()

  b.rotate(0.5, vec3.fromValues(-1,0,0))
  b.rotate(0.5, vec3.fromValues(0,1,0))

  window.setTimeout(render, 1000 / 60)
}

render()