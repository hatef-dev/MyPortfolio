import Experience from "../Experience.js";
import Envirment from "./Envirment.js";
import Model from "./Model.js";
import Reflective2 from "./Reflective2.js";
import CatModel from "./CatModel.js";
import CamerStartAnimation from "../CameraAnimation/CamerStartAnimation.js";
import Raycast from "../Raycast.js";
import * as THREE from "three";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.cameraStartAnimation = new CamerStartAnimation();
    this.raycast = null;
    this.resources.on("ready", () => {
      this.cameraStartAnimation.start();
      this.model = new Model();
      this.catModel = new CatModel();
      this.envirment = new Envirment();
      this.reflective2 = new Reflective2();
      this.raycast = new Raycast();
    });
    const plane = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "red",
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(plane, material);
    this.scene.add(planeMesh);
    if (this.debug.active) {
      this.debug.gui.add(planeMesh.position, "x").min(-10).max(10).step(0.01);
      this.debug.gui.add(planeMesh.position, "y").min(-10).max(10).step(0.01);
      this.debug.gui.add(planeMesh.position, "z").min(-10).max(10).step(0.01);
    }
    if (this.raycast) {
      this.raycast.on("mousemove", () => {});
    }
  }
  update() {
    if (this.catModel) {
      this.catModel.update();
    }
    if (this.raycast) {
      this.raycast.update();
    }
  }
}
