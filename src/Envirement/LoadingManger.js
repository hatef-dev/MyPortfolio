import * as THREE from "three";
import gsap from "gsap";
export default class LoadingManger {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(
      () => {
        this.onLoad();
      },
      (item, loaded, total) => {
        this.update(item, loaded, total);
      }
    );
    this.loadingBar = document.querySelector(".loading");
    this.loadingText = document.querySelector(".loading-text");
    this.loadingTextSpan = document.querySelector(".loading-text-span");
  }

  onLoad() {
    console.log("onLoad");
    gsap.to(this.loadingText, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        this.loadingText.style.display = "none";
        this.loadingBar.style.display = "none";
      },
    });
  }

  update(item, loaded, total) {
    const progressRatio = Math.round((loaded / total) * 100);
    if (this.loadingTextSpan) {
      this.loadingTextSpan.textContent = `${progressRatio}%`;
    }
  }
}
