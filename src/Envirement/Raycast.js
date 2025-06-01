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
    this.contactUs = null;
    this.linkdinClicked = null;
    this.githubClicked = null;
    this.instagramClicked = null;
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
        if(child.name == "FindingWaySign_Card3"){
          this.contactUs =  child;
          
        }
        if(child.name == "Linkedin_click"){
          this.linkdinClicked = child;
          
        }
        if(child.name == "Github_click"){
          this.githubClicked = child;
        }
        if(child.name == "Instagram_click"){
          this.instagramClicked = child;
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
    if (this.contactUs) {
      intersects = this.raycaster.intersectObject(this.contactUs);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "contactUs";
        }
        else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.linkdinClicked) {
      intersects = this.raycaster.intersectObject(this.linkdinClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "linkdin";
        }
        else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.githubClicked) {
      intersects = this.raycaster.intersectObject(this.githubClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "github";
        }
        else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.instagramClicked) {
      intersects = this.raycaster.intersectObject(this.instagramClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "instagram";
        } 
        else {
          this.currentIntersect = null;
        }
      }
    }
    
    
  }
  changeCameraPosition() {
    if (this.currentIntersect === "project" || this.currentIntersect === "aboutMe") {
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.projectCamera.start();
      }
    }
    if(this.currentIntersect === "contactUs"){
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.contactUsCamera.start();
      }
    }
    if(this.currentIntersect === "linkdin"){
      window.open("https://www.linkedin.com/in/hatef-sanati/")
    }
    if(this.currentIntersect === "github"){
      window.open("https://github.com/hatef-dev")
    }
    if(this.currentIntersect === "instagram"){
      window.open("https://www.instagram.com/hatef_sanati/")
    }
  }
}
