import * as THREE from 'three';
import createText from '../Utils/Text';

export default class Launcher {
    constructor() {
        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.Mesh(
            new THREE.SphereGeometry(0.08),
            new THREE.MeshBasicMaterial({color: 0x0077b6})
        )

        this.indicator = createText('Launcher',0.08);
    }
}