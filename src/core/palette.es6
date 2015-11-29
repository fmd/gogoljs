import { Color } from './color'

export class Palette extends Array {
  static get giantGoldfish() {
    return [Color.fromHex('#69D2E7'),
            Color.fromHex('#A7DBD8'),
            Color.fromHex('#E0E4CC'),
            Color.fromHex('#F38630'),
            Color.fromHex('#FA6900')]
  }
}