import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.cameraFolder = this.debug.gui.addFolder('Camera Folder')
        }

        this.createPerspectiveCamera()
        this.createOrbitControls()
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.1, 100)
        this.perspectiveCamera.position.set(-40,15, 20)
        this.scene.add(this.perspectiveCamera)
    }

    createOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        
        // Configure controls for smooth rotation
        this.controls.enableDamping = true
        
        
        // Set rotation limits (optional, remove if you want full rotation)
        this.controls.minPolarAngle = 0 // Vertical rotation minimum (0 = straight down)
        this.controls.maxPolarAngle = Math.PI / 2.3 // Vertical rotation maximum (PI = straight up)
        
        // Set zoom limits (optional)
        this.controls.minDistance = 1
        this.controls.maxDistance = 20
        
        // Enable the controls
        this.controls.enabled = true
        
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height
        this.perspectiveCamera.updateProjectionMatrix()
    }

    update() {
        if (this.controls) {
            this.controls.update()
        }
    }
}