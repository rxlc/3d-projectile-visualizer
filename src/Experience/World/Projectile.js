import * as THREE from 'three'

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import Experience from '../Experience';

export default class Projectile {
    constructor() {
        this.experience = new Experience();

        this.scene = this.experience.scene;
        this.trlimit = 4;
        this.animate = false;
        this.vertexCounter = 0;

        this.updateProjectilesEvent = new CustomEvent("updateProjectiles");
        this.invalidInputEvent = new CustomEvent("invalidInput");

        this.projectileSpeed = 2.4; //0-4

        this.trajectories = [];
    }

    convertToRad(deg) {
        return deg * Math.PI / 180;
    }

    convertToDeg(rad) {
        return rad * 180/ Math.PI;
    }

    newTrajectory(launcherVec, targetVec, angle) {
        this.angle = angle;
        this.angleInRad = this.convertToRad(angle);

        this.distanceFlat = launcherVec.distanceTo(new THREE.Vector3(targetVec.x,launcherVec.y,targetVec.z))
        this.initHeight = launcherVec.y - targetVec.y

        this.initVel = Math.sqrt((9.81*Math.pow(this.distanceFlat,2))/(2*Math.cos(this.angleInRad)*((this.distanceFlat*Math.sin(this.angleInRad)) + (this.initHeight*Math.cos(this.angleInRad)))));
        this.timeTaken = (this.initVel * Math.sin(this.angleInRad) + Math.sqrt(Math.pow(this.initVel* Math.sin(this.angleInRad),2) + 2 * 9.81 * this.initHeight))/9.81;
        this.turningRad = Math.asin((targetVec.z - launcherVec.z)/this.distanceFlat);

        if (isNaN(this.initVel) || this.initVel == Infinity) {
            document.dispatchEvent(this.invalidInputEvent)
        } else {
            this.projectilePoints = [];

            this.vel = {
                x: (this.initVel * Math.cos(this.angleInRad)) * Math.cos(this.turningRad),
                y: this.initVel * Math.sin(this.angleInRad),
                z: (this.initVel * Math.cos(this.angleInRad)) * Math.sin(this.turningRad)
            }

            this.pos = {
                x: launcherVec.x,
                y: launcherVec.y,
                z: launcherVec.z
            }

            for (let i=0; i<this.timeTaken+(this.timeTaken/50); i+=(this.timeTaken/(this.projectileSpeed*100))) {
                this.projectilePoints.push(this.pos.x,this.pos.y,this.pos.z);

                this.pos.x = (this.vel.x * i);
                this.pos.y = (this.vel.y * i) + (-9.81*Math.pow(i,2))/2;
                this.pos.z = (this.vel.z * i);
            }
            
            this.trajPoints = [];

            const projectile = new MeshLine();
            projectile.setPoints(this.trajPoints.flat());

            const material = new MeshLineMaterial({lineWidth: 0.01, color: 0xE7622F});

            this.trajectory = new THREE.Mesh(projectile, material);
            this.scene.add(this.trajectory);

            this.animate = true;

            document.dispatchEvent(this.updateProjectilesEvent)

            this.trajectories.unshift({id:this.trajectories.length+1,targetPos: {x: Math.floor(targetVec.x*100)/100, y: Math.floor(targetVec.y*100)/100, z: Math.floor(targetVec.z*100)/100},angleV: this.angle, angleH: Math.floor(this.convertToDeg(this.turningRad)*10)/10, initVel: Math.floor(this.initVel*100)/100, timeTaken: Math.floor(this.timeTaken*100)/100, line: this.trajectory});

            if (this.trajectories.length > this.trlimit) {
                this.scene.remove(this.trajectories.shift());
            }

            let colorChange = 0;
            for (let i=0; i<this.trajectories.length; i++) {
                if (colorChange == 0) {
                    this.trajectories[i].line.material = new MeshLineMaterial({lineWidth: 0.01, color: 0xE7622F}); 
                } else if (colorChange == 1) {
                    this.trajectories[i].line.material = new MeshLineMaterial({lineWidth: 0.01, color: 0x8B4000});
                } else {
                    this.trajectories[i].line.material = new MeshLineMaterial({lineWidth: 0.01, color: 0x876E58});
                }

                colorChange++;
            }
        }
    }

    update() {
        if (this.animate) {
            if (this.vertexCounter <= this.projectilePoints.length) {
                this.trajPoints = this.projectilePoints.slice(0,this.vertexCounter);
                this.trajectory.geometry.setPoints(this.trajPoints.flat());

                this.vertexCounter += 3;
            } else if (this.vertexCounter >= this.projectilePoints.length) {
                this.vertexCounter = 0;
                this.animate = false;
            }
        }
    }
}