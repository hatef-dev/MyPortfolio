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
        this.createControls()
    }
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.perspectiveCamera.position.set(-1.8, 0.66, 0.41)
        if (this.debug.active) {
            this.cameraFolder.add(this.perspectiveCamera.position, 'x').min(-10).max(10).step(0.01)
            this.cameraFolder.add(this.perspectiveCamera.position, 'y').min(-10).max(10).step(0.01)
            this.cameraFolder.add(this.perspectiveCamera.position, 'z').min(-10).max(10).step(0.01)
        }
        this.scene.add(this.perspectiveCamera)
    }
    createControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        
        // Set rotation limits
        this.controls.minPolarAngle = Math.PI / 4 // Limit vertical rotation (45 degrees)
        this.controls.maxPolarAngle = Math.PI / 2.3 // Limit vertical rotation (80 degrees)
        
        // Set zoom limits
        this.controls.minDistance = 1
        this.controls.maxDistance = 2
        
        // // Set pan 
        this.controls.enablePan = false

        
        // Set rotation speed
        this.controls.rotateSpeed = 0.5
    }
    resize() {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height
        this.perspectiveCamera.updateProjectionMatrix()
    }
    update() {
        this.controls.update()
    }
}