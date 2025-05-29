import Experience from "../Experience.js";
export default class ProjectCamera {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera.perspectiveCamera;
    this.gsap = this.experience.gsap;
  }
  start() {
    this.gsap.to(this.camera.position, {
      duration: 1,
      x: 0, 
      y: 0.12,
      z: -0.32,
    });
  }
}
