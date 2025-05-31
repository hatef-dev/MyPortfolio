import Experience from '../Experience.js'

export default class CamerStartAnimation {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.perspectiveCamera
        this.gsap = this.experience.gsap
    }
    start() {
        this.gsap.to(this.camera.position, {
            x: 10,
            delay: 0.5,
            duration: 2,
            ease: 'power2.inOut',
        })
    }
}

