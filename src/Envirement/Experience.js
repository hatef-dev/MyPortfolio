import * as THREE from "three";
import Sizes from "./Utils/Size.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Resources from "./Utils/Resources.js";
import World from "./World/World.js";
import assets from "./assets.js";
import Debug from "./Utils/Debug.js";
import gsap from "gsap";
// import StatsTest from "./Utils/StatsTest.js";
import LoadingManager from "./LoadingManger.js";
let instance = null;



export default class Envirement {

  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    this.gsap = gsap;
    this.parameters = {
      backgroundColor: "#1c1c1c",
    };
    this.debug = new Debug();
    // this.statsTest = new StatsTest();
    this.loadingManager = new LoadingManager();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.parameters.backgroundColor);
    if(this.debug.active){
      this.debugFolder = this.debug.gui.addFolder("Envirement");
      this.debugFolder.addColor(this.parameters, "backgroundColor").name("BackgroundColor").onChange(() => {
        this.scene.background = new THREE.Color(this.parameters.backgroundColor);
      });
    }
    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera(this.canvas);
    this.resources = new Resources(assets);
    
    this.world = new World(this.scene, this.resources);
    this.renderer = new Renderer(this.canvas, this.scene);

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();

    // this.statsTest.update();
    this.world.update();
    this.renderer.update();
  }
}
