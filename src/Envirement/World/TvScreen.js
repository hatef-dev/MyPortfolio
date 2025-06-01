import * as THREE from "three"
import Experience from "../Experience.js"
export default class TvScreen {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        if(this.debug.active) {
            this.tvScreenFolder = this.debug.gui.addFolder("TvScreen")
        }
        this.resources = this.experience.resources
        this.aboutMeTextures = [
            this.resources.items.AboutMe1,
            this.resources.items.AboutMe2,
            this.resources.items.AboutMe3,
            this.resources.items.AboutMe4,
        ]
        this.createTvScreen()

    } 
    createTvScreen() {
        this.TvGeometry = new THREE.PlaneGeometry(10, 10)
        this.TvMaterial = new THREE.MeshBasicMaterial({map: this.aboutMeTextures[0]})
        this.TvScreen = new THREE.Mesh(
            this.TvGeometry,
            this.TvMaterial
        )
        this.TvScreen.position.set(0.01, 2.68, -3.83)
        this.TvScreen.scale.set(0.19, 0.11)
        if(this.debug.active) {
            this.tvScreenFolder.add(this.TvScreen.position, "x").min(-10).max(10).step(0.01).name("TvScreen X")
            this.tvScreenFolder.add(this.TvScreen.position, "y").min(-10).max(10).step(0.01).name("TvScreen Y")
            // this.tvScreenFolder.add(this.TvScreen.position, "z").min(-10).max(10).step(0.01).name("TvScreen Z")
            this.tvScreenFolder.add(this.TvScreen.scale, "x").min(0.01).max(1).step(0.01).name("TvScreen Scale X")
            this.tvScreenFolder.add(this.TvScreen.scale, "y").min(0.01).max(1).step(0.01).name("TvScreen Scale Y")
            // this.tvScreenFolder.add(this.TvScreen.scale, "z").min(0.01).max(1).step(0.01).name("TvScreen Scale Z")
        }
        this.TvScreen.rotation.x = Math.PI
        this.TvScreen.rotation.z = Math.PI
        this.scene.add(this.TvScreen)
        
    }
}