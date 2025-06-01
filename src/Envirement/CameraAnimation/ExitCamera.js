import Experience from "../Experience.js";
import * as THREE from "three";

export default class ExitCamera {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.sizeWidth = this.experience.sizes.width;
    this.gsap = this.experience.gsap;
    this.debug = this.experience.debug;
    this.targetPoint = new THREE.Vector3(0, 0, 0);

    if (this.debug && this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder("Camera Target Tv Exit");

      // Add controls for target point
      this.debugFolder
        .add(this.targetPoint, "x")
        .min(-10)
        .max(10)
        .step(0.1)
        .name("Target X")
        .onChange(() => this.updateTarget());
      this.debugFolder
        .add(this.targetPoint, "y")
        .min(-10)
        .max(10)
        .step(0.1)
        .name("Target Y")
        .onChange(() => this.updateTarget());
      this.debugFolder
        .add(this.targetPoint, "z")
        .min(-10)
        .max(20)
        .step(0.1)
        .name("Target Z")
        .onChange(() => this.updateTarget());
    }
  }

  start() {
    const tl = this.gsap.timeline();
    // Temporarily disable controls during animation
    if (this.camera.controls) {
      this.camera.controls.enabled = true;
      this.camera.controls.enableRotate = true;
      this.camera.controls.enableZoom = true;
    }

    tl.to(this.camera.perspectiveCamera.position, {
      y: 6,

      duration: 0.6,
      ease: "power2.inOut",
    }).to(
      this.camera.controls.target,
      {
        //   duration: 1,
        x: 0,
        y: 0,
        z: 0,
      },
      "0"
    ).to(this.camera.perspectiveCamera.position, {
        x: 15,
        z: 10,
        duration: 1,
        ease: "power2.inOut",
      },
      "+=0.25"
    )
  }
}
