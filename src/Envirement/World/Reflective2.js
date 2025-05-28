import * as THREE from "three";
import Experience from "../Experience.js";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import vertexReflectiveShader from "../../Shaders/Reflective/vertexReflectiveShader.glsl";
import fragmentReflectiveShader from "../../Shaders/Reflective/fragmentReflectiveShader.glsl";
 
export default class Reflective2 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.resources = this.experience.resources;
    if (this.debug.active) {
      this.reflectiveFolder = this.debug.gui.addFolder('Reflective Folder')
    }
    this.parameters = {
      blurAmount: 0.5,
      blurRadius: 0.0,
      color: 0x373739,
      clipBias: 0.001,
      height: 0.001,
    }
    this.setmirrorGeometry();
    this.setMirror();
    // this.setCircle();
  }
  setmirrorGeometry() {
    this.mirrorGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    
  }
  setMirror() {
    
    this.mirror = new Reflector(this.mirrorGeometry, {
      clipBias: 0.001,
      textureWidth: 496,
      color: this.parameters.color,
      textureHeight: 496,
      shader: {
        precision: 'lowp',
        uniforms: {
          color: { value: new THREE.Color(this.parameters.color) },
          tDiffuse: { value: null },
          tDepth: { value: null },
          textureMatrix: { value: new THREE.Matrix4() },
          blurAmount: { value: this.parameters.blurAmount },
          blurRadius: { value: this.parameters.blurRadius },
          colorTexture: { value: this.resources.items.textureFloor },
        },
            vertexShader: vertexReflectiveShader,
        fragmentShader: fragmentReflectiveShader,
      },
    });
    this.mirror.rotation.x = -Math.PI / 2;
    this.mirror.position.y = -0.001;
    this.mirror.position.x = -0.089;
    this.mirror.position.z = -0.139;
    this.mirror.scale.set(2.520, 2.520, 1);
    this.experience.scene.add(this.mirror);
    this.mirror.material.transparent = true;
    this.mirror.material.opacity = 0.8;

    if (this.debug.active) {
      this.reflectiveFolder.add(this.parameters, 'blurAmount', 0, 1).onChange(() => {
        this.mirror.material.uniforms.blurAmount.value = this.parameters.blurAmount
      })
      this.reflectiveFolder.add(this.parameters, 'blurRadius', 0, 1).onChange(() => {
        this.mirror.material.uniforms.blurRadius.value = this.parameters.blurRadius
      })
    }
  }








  setCircle() {
    this.geometry = new THREE.CircleGeometry(25, 32);
    this.groundMirror = new Reflector(this.geometry, {
      clipBias: 0.2,
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      color: 0x777777,
    });
    this.groundMirror.position.y = 0.051;
    this.groundMirror.material.transparent = true;
    this.groundMirror.material.uniforms.opacity = 0.2;
    this.groundMirror.rotateX(-Math.PI / 2);
    this.scene.add(this.groundMirror);
  }

  // update() {
  //     this.mirror.rotation.y = this.experience.camera.rotation.y;
  // }
}
