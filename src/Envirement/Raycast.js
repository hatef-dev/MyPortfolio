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
    // Textures 
    this.currentTexture = 0;
    this.aboutMeTextures = [
      this.experience.resources.items.AboutMe1,
      this.experience.resources.items.AboutMe2,
      this.experience.resources.items.AboutMe3,
      this.experience.resources.items.AboutMe4,
    ];
    for(let i = 0; i < this.aboutMeTextures.length; i++) {
      this.aboutMeTextures[i].colorSpace = THREE.SRGBColorSpace;
    }
    // Raycast
    this.projectClicked = null;
    this.AboutMeClicked = null;
    this.contactUs = null;
    this.linkdinClicked = null;
    this.githubClicked = null;
    this.instagramClicked = null;
    this.tvScreen = null;
    this.nextButton = null;
    this.previousButton = null;
    this.exitButton = null;

    // Camera
    this.isCameraMoving = false;
    this.currentIntersect = null;

    // Camera Animation
    this.projectCamera = new ProjectCamera();
    this.contactUsCamera = new ContactUsCamera();
    // Bind the event handler to this instance
    this.onMouseMove = this.onMouseMove.bind(this);
    this.selectedObject();
    // Add single event listener
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("click", () => {
      this.doAction();
    });
  }
  selectedObject() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {

       

        // Social Media
        if (child.name == "Linkedin_click") {
          this.linkdinClicked = child;
        }
        if (child.name == "Github_click") {
          this.githubClicked = child;
        }
        if (child.name == "Instagram_click") {
          this.instagramClicked = child;
        }

        // TvScreen
        if(child.name == "TvScreen"){
          this.tvScreen = child;
        }
        if(child.name == "Next_Button"){
          this.nextButton = child;
        }
        if(child.name == "Previous_Button"){
          this.previousButton = child;
        }
        if(child.name == "Exit_Button"){
          this.exitButton = child;
        }


         // Project About Me Contact Me
         if (child.name == "FindingWaySign_Card1") {
          this.projectClicked = child;
        }
        if (child.name == "FindingWaySign_Card2") {
          this.AboutMeClicked = child;
        }
        if (child.name == "FindingWaySign_Card3") {
          this.contactUs = child;
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

    // Project About Me Contact Me
    if (this.projectClicked) {
      intersects = this.raycaster.intersectObject(this.projectClicked);
      
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "project";
        }
      } else {
        this.currentIntersect = null;
        // this.tvScreen.material.map = this.aboutMeTextures[this.currentTexture];
      }
    }
    if (this.AboutMeClicked) {
      intersects = this.raycaster.intersectObject(this.AboutMeClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "aboutMe";
        } else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.contactUs) {
      intersects = this.raycaster.intersectObject(this.contactUs);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "contactUs";
        } else {
          this.currentIntersect = null;
        }
      }
    }


    // Social Media
    if (this.linkdinClicked) {
      intersects = this.raycaster.intersectObject(this.linkdinClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "linkdin";
        } else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.githubClicked) {
      intersects = this.raycaster.intersectObject(this.githubClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "github";
        } else {
          this.currentIntersect = null;
        }
      }
    }
    if (this.instagramClicked) {
      intersects = this.raycaster.intersectObject(this.instagramClicked);
      if (intersects.length > 0) {
        if (!this.currentIntersect) {
          this.currentIntersect = "instagram";
        } else {
          this.currentIntersect = null;
        }
      }
    }

    // TvScreen
    if(this.tvScreen){
      intersects = this.raycaster.intersectObject(this.tvScreen);
      if(intersects.length > 0){
        this.currentIntersect = "tvScreen";
      }
    }

    // Next Button  
    if(this.nextButton){
      intersects = this.raycaster.intersectObject(this.nextButton);
      if(intersects.length > 0){
        this.currentIntersect = "nextButton";
      }
    }

    // Previous Button
    if(this.previousButton){
      intersects = this.raycaster.intersectObject(this.previousButton);
      if(intersects.length > 0){
        this.currentIntersect = "previousButton";
      }
    }

    // Exit Button
    if(this.exitButton){
      intersects = this.raycaster.intersectObject(this.exitButton);
      if(intersects.length > 0){
        this.currentIntersect = "exitButton";
      }
    }
  }
  doAction() {
    // Project About Me Contact Me
    if (
      this.currentIntersect === "project" ||
      this.currentIntersect === "aboutMe"
    ) {
      this.tvScreen.material.map = this.aboutMeTextures[0];
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.projectCamera.start();
      }
    }
    if (this.currentIntersect === "contactUs") {
      this.isCameraMoving = true;
      if (this.isCameraMoving) {
        this.contactUsCamera.start();
      }
    }

    // Social Media
    if (this.currentIntersect === "linkdin") {
      window.open("https://www.linkedin.com/in/hatef-sanati/");
    }
    if (this.currentIntersect === "github") {
      window.open("https://github.com/hatef-dev");
    }
    if (this.currentIntersect === "instagram") {
      window.open("https://www.instagram.com/hatef_sanati/");
    }

    // TvScreen
    if(this.currentIntersect === "nextButton"){
      if(this.currentTexture < this.aboutMeTextures.length - 1){
        this.currentTexture++;
        this.changeTexture();
      }
    }
    if(this.currentIntersect === "previousButton"){
      if(this.currentTexture > 0){
        this.currentTexture--;
        this.changeTexture();
      }
    }
    if(this.currentIntersect === "exitButton"){
      this.tvScreen.material.map = null;
      this.tvScreen.material.needsUpdate = true;
      this.currentTexture = 0;
    }


  }
  changeTexture(){
    this.tvScreen.material.map = this.aboutMeTextures[this.currentTexture];
    this.tvScreen.material.needsUpdate = true;
  }
}
