import * as THREE from 'three';
import createText from '../Utils/Text';

export default class Launcher {
    constructor() {
        this.setInstance();
        this.moving = false;

        
    }

    setInstance() {
        this.instance = new THREE.Mesh(
            new THREE.SphereGeometry(0.06),
            new THREE.MeshBasicMaterial({color: 0xD93934})
        )

        this.instance.position.set(4,0,0);
        this.indicator = createText('Target',0.08);
    }


}