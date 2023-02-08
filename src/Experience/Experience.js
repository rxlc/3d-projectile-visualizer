import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from './Renderer'

import World from './World/World';

let instance = null;

export default class Experience {
    constructor(containerRef, canvas) {

        if (instance) {
            return instance;
        }
        instance = this;

        //can be accessed globally (from dev-tools console)

        this.canvas = canvas
        this.containerRef = containerRef;

        this.sizes = new Sizes();
        this.time = new Time();

        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();

        this.containerRef.current.appendChild(this.renderer.instance.domElement);

        this.world = new World();

        this.displayVel = document.querySelector('.angle');
        this.turningAngle = document.querySelector('.turningAngle')
        this.initialVel = document.querySelector('.initialVel');
        
        this.sizes.on('resize', () => {
            this.resize();
        });

        this.time.on('tick', () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.world.update();
        this.camera.update();
        this.renderer.render();
    }
}
