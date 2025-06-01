import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Model {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.setModel()
        // this.setPlane()
    }
    setModel() {
        this.model = this.resources.items.glbModel.scene;
        this.model.traverse((child) => {
            if(child.isMesh){
                

                child.material.emissiveIntensity = 7;
            }
        })
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)
    }
    setPlane() {
        const geometry = new THREE.PlaneGeometry(100, 100)
        const material = new THREE.MeshBasicMaterial({color: "#3b3b3b"})
        const plane = new THREE.Mesh(geometry, material)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -0.5
        this.scene.add(plane)
    }
}
