import * as THREE from 'three'
import EventEmitter from "./EmitterEven.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
export default class Resources extends EventEmitter {
    constructor(assets) {
        super()
        this.assets = assets
        this.items = {}
        this.toLoad = this.assets.length
        this.loaded = 0
        this.setLoaders()
        this.startLoading()

    }
    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        // this.loaders.rgbeLoader = new RGBELoader()
        // this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
    }
    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === 'glbModel') {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.onLoaded(asset, file)
                })
            }
            // if (asset.type === 'RGBELoader') {
            //     this.loaders.rgbeLoader.load(asset.path, (file) => {
            //         this.onLoaded(asset,file)
            //     })
            // }
            // if (asset.type === 'cubeTexture') {
            //     this.loaders.cubeTextureLoader.load(asset.path, (file) => {
            //         this.onLoaded(asset,file)
            //     })
            // }
            if (asset.type === 'texture') {
                this.loaders.textureLoader.load(asset.path, (file) => {
                    this.onLoaded(asset,file)
                })
            }
        }
    }
    onLoaded(asset, file) {
        this.items[asset.name] = file
        this.loaded++;
        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}



