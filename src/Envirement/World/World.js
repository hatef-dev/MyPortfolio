import Experience from "../Experience.js";
import Envirment from "./Envirment.js";
import Model from "./Model.js";
import Reflective2 from "./Reflective2.js";
import CatModel from "./CatModel.js";
import CamerStartAnimation from "../CameraAnimation/CamerStartAnimation.js";
import Raycast from "../Raycast.js";
import Smoke from "./Smoke.js";


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
      this.smoke = new Smoke();
    });
    
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
    if (this.smoke) {
      this.smoke.update();
    }
  }
}
