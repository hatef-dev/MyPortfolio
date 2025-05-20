import * as THREE from "three";
import Experience from "../Experience.js";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setModel();
    this.setAnimation();
  }
  setModel() {
    this.model = this.resources.items.catModel;
    this.model.scene.scale.set(0.0025, 0.0025, 0.0025);
    this.model.scene.position.set(0.007, 0.606, -0.077);
    this.scene.add(this.model.scene);
    
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
