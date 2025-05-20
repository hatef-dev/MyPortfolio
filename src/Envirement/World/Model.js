import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Model {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.setModel()
    }
    setModel() {
        this.model = this.resources.items.glbModel.scene;
        this.model.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.emissiveIntensity = 10
            }
        })
        this.scene.add(this.model)
    }
}
