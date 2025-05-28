import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Overlay {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.createOverlay()

    }
    createOverlay() {
        this.overlayGeometry = new THREE.PlaneGeometry(2,2,1,1);
        this.overlayMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader
        })
    }
}