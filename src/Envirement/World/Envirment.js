import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Envirment {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.parameters = {
            colorDirectionalLight: 0xffffff,
            colorHemisphereLight: 0x00AAFF,
            colorHemisphereLight2: 0xFFAA00,
        }
        if (this.debug.active) {
            this.envirmentFolder = this.debug.gui.addFolder('Envirment Folder')
        }
        this.setLight()
    }
    setLight() {
        this.light = new THREE.DirectionalLight(this.parameters.colorDirectionalLight, 4)
        this.light.position.set(-1, 1, 0)
        this.scene.add(this.light)

        this.hemisphereLight = new THREE.HemisphereLight(this.parameters.colorHemisphereLight, this.parameters.colorHemisphereLight2, 2)
        this.hemisphereLight.position.set(0, 3, 0)
        this.scene.add(this.hemisphereLight)
        if (this.debug.active) {
            this.envirmentFolder.add(this.light, 'intensity').min(0).max(10).step(0.001)
            this.envirmentFolder.add(this.hemisphereLight, 'intensity').min(0).max(10).step(0.001)
            this.envirmentFolder.addColor(this.parameters, 'colorDirectionalLight').onChange(() => {
                this.light.color.set(this.parameters.colorDirectionalLight)
            })
            this.envirmentFolder.addColor(this.parameters, 'colorHemisphereLight').onChange(() => {
                this.hemisphereLight.color.set(this.parameters.colorHemisphereLight)
            })
            this.envirmentFolder.addColor(this.parameters, 'colorHemisphereLight2').onChange(() => {
                this.hemisphereLight.groundColor.set(this.parameters.colorHemisphereLight2)
            })
        }
    }
    setEnvironmentMap() {
        this.environmentMap = this.resources.items.environmentMap
        console.log(this.environmentMap)
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = this.environmentMap
        this.scene.environment = this.environmentMap
        this.scene.environmentIntensity = 0.6
    }
}
