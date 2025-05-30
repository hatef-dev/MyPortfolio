import EventEmitter from "./EmitterEven.js";

export default class Size extends EventEmitter {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.trigger('resize');
    }
    
}
