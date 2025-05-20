import * as THREE from "three";
import EventEmitter from "./Utils/EmitterEven.js";
import ProjectCamera from "./CameraAnimation/ProjectCamera.js";
import Experience from "./Experience.js";
export default class Raycast extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.perspectiveCamera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.projectClicked = null;
    this.isCameraMoving = false;
    this.currentIntersect = null;
    this.projectCamera = new ProjectCamera();
    // Bind the event handler to this instance
    this.onMouseMove = this.onMouseMove.bind(this);
    this.selectedObject();
    // Add single event listener
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("click", () => {
      this.changeCameraPosition();
    });
  }
  selectedObject() {
    this.scene.traverse((child) => {
        if(child.name == "FindingWaySign_Card1") {
            this.projectClicked = child;
        }
    })
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.trigger('mousemove')
  }
  update() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    if (this.projectClicked) {
      const intersects = this.raycaster.intersectObject(this.projectClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = intersects;
        }
      } else {
        this.currentIntersect = null;
      }
    }
  }
  changeCameraPosition() {
    if(this.currentIntersect) {
        this.isCameraMoving = true;
        if(this.isCameraMoving) {
            this.projectCamera.start();
        }
    }
  }
}