import * as THREE from "three";
import Experience from "../Experience.js";
import vertexSmoke from "../../Shaders/Smoke/vertexSmoke.glsl";
import fragmentSmoke from "../../Shaders/Smoke/fragmentSmoke.glsl";
export default class Smoke {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    if (this.debug.active) {
      this.SmokeFolder = this.debug.gui.addFolder("Smoke");
    }

    this.createSmoke();
  }
  createSmoke() {
    this.parameters = {
      color: "#ffffff",
    };
    this.smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
    this.smokeGeometry.translate(0, 0.5, 0);
    
    this.smokeGeometry.scale(0.25, 5, 0.25);


    this.smokePerlinTexture = this.resources.items.smokePerlinTexture;
    this.smokePerlinTexture.wrapS = THREE.RepeatWrapping;
    this.smokePerlinTexture.wrapT = THREE.RepeatWrapping;
    this.smokePosition = new THREE.Vector3(-0.43, 7.5, 1.27);
    this.smokeColor = new THREE.Color(this.parameters.color);
    this.smokeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uPerlinTexture: new THREE.Uniform(this.smokePerlinTexture),
        uModelPosition: new THREE.Uniform(this.smokePosition),
        uColor: new THREE.Uniform(this.smokeColor),
        uTime: new THREE.Uniform(0),
      },
      vertexShader: vertexSmoke,
      fragmentShader: fragmentSmoke,
      side: THREE.DoubleSide,
    });

    this.smoke = new THREE.Mesh(this.smokeGeometry, this.smokeMaterial);

    if (this.debug.active) {
      this.SmokeFolder.add(this.smokePosition, "x", -10, 10, 0.01).name("SmokeX");
      this.SmokeFolder.add(this.smokePosition, "y", -10, 10, 0.01).name("SmokeY");
      this.SmokeFolder.add(this.smokePosition, "z", -10, 10, 0.01).name("SmokeZ");
      this.SmokeFolder.addColor(this.parameters, "color").name("SmokeColor").onChange(() => {
        this.smokeColor.set(this.parameters.color);
        this.smokeMaterial.uniforms.uColor.value = this.smokeColor;
      });
    }
    this.scene.add(this.smoke);
  }
  update() {
    this.smokeMaterial.uniforms.uTime.value =
      this.experience.renderer.clock.getElapsedTime();
  }
}
