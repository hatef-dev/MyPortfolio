import * as THREE from 'three'
import Experience from './Experience.js'
export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        this.clock = new THREE.Clock()
        this.renderer.setSize(this.experience.sizes.width, this.experience.sizes.height)
        this.renderer.setPixelRatio(this.experience.sizes.pixelRatio)
        this.renderer.render(this.experience.scene, this.experience.camera.perspectiveCamera)
    }
    resize() {
        this.renderer.setPixelRatio(this.experience.sizes.pixelRatio)
        this.renderer.setSize(this.experience.sizes.width, this.experience.sizes.height)
        this.renderer.render(this.experience.scene, this.experience.camera.perspectiveCamera)
    }
    update() {
        this.renderer.render(this.experience.scene, this.experience.camera.perspectiveCamera)
    }
}
