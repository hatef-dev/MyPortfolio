import * as THREE from "three";
import EventEmitter from "./Utils/EmitterEven.js";
import ProjectCamera from "./CameraAnimation/ProjectAboutMeCameraAnimation.js";
import Experience from "./Experience.js";
import ContactUsCamera from "./CameraAnimation/ContactUsCamera.js";
export default class Raycast extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.perspectiveCamera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.projectClicked = null;
    this.AboutMeClicked = null;
    this.isCameraMoving = false;
    this.currentIntersect = null;
    this.projectCamera = new ProjectCamera();
    this.contactUsCamera = new ContactUsCamera();
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
      if(child instanceof THREE.Mesh){
        if(child.name == "FindingWaySign_Card1"){
          this.projectClicked = child;
        }
        if(child.name == "FindingWaySign_Card2"){
          this.AboutMeClicked =  child;
          
        }
      }
    });
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.trigger("mousemove");
  }
  update() {
    let intersects = null;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
     if (this.projectClicked) {
      intersects = this.raycaster.intersectObject(this.projectClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "project";
        }
      } else {
        this.currentIntersect = null;
      }
    }
    if (this.AboutMeClicked) {
      intersects = this.raycaster.intersectObject(this.AboutMeClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "aboutMe";
        }
        else {
          this.currentIntersect = null;
        }
      }
    }
  }
  changeCameraPosition() {
    if (this.currentIntersect === "project") {
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.projectCamera.start();
      }
    }
    if(this.currentIntersect === "aboutMe"){
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.contactUsCamera.start();
      }
    }
  }
}
