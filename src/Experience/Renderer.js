import Experience from "./Experience";
import * as THREE from 'three'

export default class Renderer {
    constructor() {
        this.experience = new Experience();
    
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.setInstance();
    }
    
    setInstance() {
        this.instance = new THREE.WebGLRenderer({antialias: true});

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    render() {
        this.instance.render(this.scene, this.camera.instance);
    }
}