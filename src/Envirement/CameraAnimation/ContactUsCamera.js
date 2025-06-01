import Experience from "../Experience.js";
import * as THREE from "three";

export default class ContactUsCamera {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.sizeWidth = this.experience.sizes.width;

    this.gsap = this.experience.gsap;
    this.debug = this.experience.debug;
    this.targetPoint = new THREE.Vector3(0, 0, 0);

    if (this.debug && this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder("Camera Target Link");

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

  updateTarget() {
    if (this.camera.controls) {
      this.camera.controls.target.copy(this.targetPoint);
      this.camera.perspectiveCamera.lookAt(this.targetPoint);
    }
  }

  start() {
    // Temporarily disable controls during animation
    const tl = this.gsap.timeline();
    if (this.sizeWidth < 480) {
      tl.to(
        this.camera.perspectiveCamera.position,
        {
          duration: 1,
          x: 10,
          y: 4,
          z: 0,
          ease: "power2.inOut",
        },
        "0"
      )
        .to(
          this.camera.controls.target,
          {
            //   duration: 1,
            x: -2,
            y: 0,
            z: -2.1,
          },
          "0"
        )
        .to(
          this.camera.perspectiveCamera.position,
          {
            duration: 1,
            x: -0.6,
            y: 2.2,
            z: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              this.camera.controls.enabled = true;
              this.camera.controls.enableRotate = true;
              this.camera.controls.enableZoom = true;
            },
          },

          "+=0.1"
        );
    }

    if (this.camera.controls) {
      this.camera.controls.enabled = false;
    }
    else{
        tl.to(
            this.camera.perspectiveCamera.position,
            {
              duration: 1,
              x: 10,
              y: 4,
              z: 0,
              ease: "power2.inOut",
            },
            "0"
          )
            .to(
              this.camera.controls.target,
              {
                //   duration: 1,
                x: -2,
                y: 0,
                z: -2.1,
              },
              "0"
            )
            .to(
              this.camera.perspectiveCamera.position,
              {
                duration: 1,
                x: -0.6,
                y: 1.8,
                z: -0.3,
                ease: "power2.inOut",
                onComplete: () => {
                  this.camera.controls.enabled = true;
                  this.camera.controls.enableRotate = true;
                  this.camera.controls.enableZoom = true;
                },
              },
      
              "+=0.1"
            );
    }

    // Animate the controls target
  }
}
