import * as THREE from "three";
import Experience from "../Experience.js";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.catFolder = this.debug.gui.addFolder("Cat");
    }
    this.resources = this.experience.resources;
    this.setModel();
    this.setAnimation();
  }
  setModel() {
    this.model = this.resources.items.catModel;
    this.model.scene.scale.set(0.027, 0.027, 0.027);
    this.model.scene.position.set(1.9, 6, -0.077);

    this.scene.add(this.model.scene);
    if (this.debug.active) {
      this.catFolder.add(this.model.scene.position, "x").min(-20).max(10).step(0.001).name("Cat X");
      this.catFolder.add(this.model.scene.position, "y").min(-10).max(10).step(0.001).name("Cat Y");
      this.catFolder.add(this.model.scene.position, "z").min(-10).max(10).step(0.001).name("Cat Z");
    }

  }
  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model.scene);
    this.animation.actions = this.animation.mixer.clipAction(
        this.model.animations[0]
    );
    this.animation.actions.play();
  }
  update() {
    this.animation.mixer.update(this.experience.time.delta * 0.001);
  }
}
