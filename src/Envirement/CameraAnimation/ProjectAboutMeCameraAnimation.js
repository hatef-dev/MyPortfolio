import Experience from "../Experience.js";
import * as THREE from "three";

export default class ProjectCamera {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.gsap = this.experience.gsap;
    this.debug = this.experience.debug;
    this.targetPoint = new THREE.Vector3(0, 2.6, -5.5);

    if (this.debug && this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder('Camera Target Tv');
      
      // Add controls for target point
      this.debugFolder.add(this.targetPoint, 'x').min(-10).max(10).step(0.1).name('Target X')
        .onChange(() => this.updateTarget());
      this.debugFolder.add(this.targetPoint, 'y').min(-10).max(10).step(0.1).name('Target Y')
        .onChange(() => this.updateTarget());
      this.debugFolder.add(this.targetPoint, 'z').min(-10).max(20).step(0.1).name('Target Z')
        .onChange(() => this.updateTarget());
    }
  }
  
  updateTarget() {
    if (this.camera.controls) {
      this.camera.controls.target.copy(this.targetPoint);
      this.camera.perspectiveCamera.lookAt(this.targetPoint);
    }
  }
  
  start() {
    // Temporarily disable controls during animation
    if (this.camera.controls) {
      this.camera.controls.enabled = false;
    }

    // Animate camera position
    this.gsap.to(this.camera.perspectiveCamera.position, {
      duration: 1,
      x: 0.01, 
      y: 2.62,
      z: -6,
      ease: "power2.inOut",
      onComplete: () => {
        // Set the controls target and re-enable them
        if (this.camera.controls) {
          this.camera.controls.target.copy(this.targetPoint);
          this.camera.controls.enableRotate= false
          this.camera.controls.enabled = true;

        }
        this.camera.perspectiveCamera.lookAt(this.targetPoint);
      },
    });

    // Animate the controls target
    if (this.camera.controls) {
      this.gsap.to(this.camera.controls.target, {
        duration: 1,
        x: this.targetPoint.x,
        y: this.targetPoint.y,
        z: this.targetPoint.z,
        ease: "power2.inOut"
      });
    }
  }
}
