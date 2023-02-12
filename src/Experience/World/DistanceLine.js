import * as THREE from 'three';
import Experience from "../Experience";

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import createText from '../Utils/Text';

export default class DistanceLine {
    constructor() {
        this.experience = new Experience();

        this.init = false;
    }

    setDistanceLine() {
        const points = [this.launcher.instance.position.x,this.launcher.instance.position.y,this.launcher.instance.position.z,this.target.instance.position.x,this.target.instance.position.y,this.target.instance.position.z];

        const line = new MeshLine();
        line.setPoints(points.flat());

        const material = new MeshLineMaterial({lineWidth: 0.005, color: 0x7f7f7f});

        this.distanceLine = new THREE.Mesh(line, material);
        this.scene.add(this.distanceLine);

        this.distanceText = createText('', 0.08);

        this.scene.add(this.distanceText);
    }

    setAxesLines() {
        const xPoints = [this.launcher.instance.position.x,0,0,this.target.instance.position.x,0,0];

        const xline = new MeshLine();
        xline.setPoints(xPoints.flat());

        const xMaterial = new MeshLineMaterial({lineWidth: 0.01, color: 0xba181b});
        this.xLine = new THREE.Mesh(xline, xMaterial);

        this.scene.add(this.xLine);
        this.xText = createText('',0.06);
        this.scene.add(this.xText);

        const yPoints = [0,this.launcher.instance.position.y,0,0,this.target.instance.position.y,0];

        const yline = new MeshLine();
        yline.setPoints(yPoints.flat());

        const yMaterial = new MeshLineMaterial({lineWidth: 0.01, color: 0x70e000});
        this.yLine = new THREE.Mesh(yline, yMaterial);
        this.scene.add(this.yLine);
        this.yText = createText('',0.06);
        this.scene.add(this.yText);

        const zPoints = [this.target.instance.position.x,0,this.launcher.instance.position.y,this.target.instance.position.x,0,this.target.instance.position.z];

        const zline = new MeshLine();
        zline.setPoints(zPoints.flat());

        const zMaterial = new MeshLineMaterial({lineWidth: 0.01, color: 0x1a759f});
        this.zLine = new THREE.Mesh(zline, zMaterial);
        this.scene.add(this.zLine);
        this.zText = createText('',0.06);
        this.scene.add(this.zText);
    }

    updateAxesLines() {
        const xPoints = [this.launcher.instance.position.x,this.launcher.instance.position.y,0,this.target.instance.position.x,this.launcher.instance.position.y,0];
        this.xLine.geometry.setPoints(xPoints.flat())

        this.xText.position.set((this.launcher.instance.position.x + this.target.instance.position.x)/2,this.launcher.instance.position.y+0.1,0);
        this.xText.text = Math.floor((this.target.instance.position.x - this.launcher.instance.position.x)*100)/100;
        this.xText.lookAt(this.experience.camera.instance.position);

        const yPoints = [this.target.instance.position.x,this.launcher.instance.position.y,this.target.instance.position.z,this.target.instance.position.x,this.target.instance.position.y,this.target.instance.position.z];
        this.yLine.geometry.setPoints(yPoints.flat());

        this.yText.position.set(this.target.instance.position.x+0.08,(this.launcher.instance.position.y + this.target.instance.position.y)/2,this.target.instance.position.z+0.08);
        this.yText.text = Math.floor((this.target.instance.position.y - this.launcher.instance.position.y)*100)/100;
        this.yText.lookAt(this.experience.camera.instance.position);

        const zPoints = [this.target.instance.position.x,this.launcher.instance.position.y,this.launcher.instance.position.z,this.target.instance.position.x,this.launcher.instance.position.y,this.target.instance.position.z];
        this.zLine.geometry.setPoints(zPoints.flat())

        this.zText.position.set(this.target.instance.position.x+0.04,this.launcher.instance.position.y + 0.08,(this.launcher.instance.position.z + this.target.instance.position.z)/2);
        this.zText.text = Math.floor((this.target.instance.position.z - this.launcher.instance.position.z)*100)/100;
        this.zText.lookAt(this.experience.camera.instance.position);
    }

    updateDistanceLine() {
        const points = [this.launcher.instance.position.x,this.launcher.instance.position.y,this.launcher.instance.position.z,this.target.instance.position.x,this.target.instance.position.y,this.target.instance.position.z];
        this.distanceLine.geometry.setPoints(points.flat())

        this.distanceText.position.set((this.launcher.instance.position.x + this.target.instance.position.x)/2, (this.launcher.instance.position.y + this.target.instance.position.y)/2 + 0.2, (this.launcher.instance.position.z + this.target.instance.position.z)/2,)
        this.distanceText.lookAt(this.experience.camera.instance.position);
        this.distanceText.text = `${Math.floor(this.launcher.instance.position.distanceTo(this.target.instance.position)*100)/100}`
    }

    update() {
        if (!this.init && this.experience.world) {
            this.scene = this.experience.scene
            this.launcher = this.experience.world.launcher
            this.target = this.experience.world.target
            this.setDistanceLine();
            this.setAxesLines();
            this.init = true;
        }

        if (this.init) {
            this.updateDistanceLine();
            this.updateAxesLines();
        }
    }
}