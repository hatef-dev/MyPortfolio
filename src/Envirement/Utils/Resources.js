import * as THREE from "three";
import EventEmitter from "./EmitterEven.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Experience from "../Experience.js";
export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.assets = assets;
    this.experience = new Experience();
    this.items = {};
    this.toLoad = this.assets.length;
    this.loaded = 0;
    this.loadingManager = this.experience.loadingManager.loadingManager;
    this.setLoaders();
    this.startLoading();
    
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    // this.loaders.rgbeLoader = new RGBELoader()
    // this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.onLoaded(asset, file);
        });
      }
      if (asset.type === "texture") {
        this.loaders.textureLoader.load(asset.path, (file) => {
          this.onLoaded(asset, file);
        });
      }
    }
  }
  onLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
