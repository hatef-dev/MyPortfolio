import * as THREE from 'three'
import Sizes from './Utils/Size.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';
import World from './World/World.js';
import assets from './assets.js';
import Debug from './Utils/Debug.js';
import gsap from 'gsap'
let instance = null;

export default class Envirement {
    constructor(canvas) {
        if (instance) {
            return instance;
        }
        instance = this;
        this.gsap = gsap
        this.debug = new Debug()
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera(this.canvas)
        this.resources = new Resources(assets)
        this.world = new World(this.scene, this.resources)
        
        this.renderer = new Renderer(this.canvas, this.scene)

        
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time.on('tick', () => {
            this.update()
        })
        

    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        // this.raycast.update()
    }
    
}