import * as THREE from 'three';
import Experience from "../Experience";

export default class Helpers {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.size = 6;
        this.divisions = 6;

        this.setInstance();
    }

    setInstance() {
        this.gridInstance = new THREE.GridHelper(this.size, this.divisions);
        this.axesInstance = new THREE.AxesHelper(10);
        
        this.scene.add(this.gridInstance);
        
        //this.scene.add(this.axesInstance);
    }
}