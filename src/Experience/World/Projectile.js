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

        this.maxHeight = 0;
    }

    convertToRad(deg) {
        return deg * Math.PI / 180;
    }

    convertToDeg(rad) {
        return rad * 180/ Math.PI;
    }

    newTrajectoryAngle(launcherVec, targetVec, angle) {
        this.angle = angle;
        this.angleInRad = this.convertToRad(angle);

        this.distanceFlat = launcherVec.distanceTo(new THREE.Vector3(targetVec.x,launcherVec.y,targetVec.z))
        this.initHeight = launcherVec.y - targetVec.y

        this.initVel = Math.sqrt((9.81*Math.pow(this.distanceFlat,2))/(2*Math.cos(this.angleInRad)*((this.distanceFlat*Math.sin(this.angleInRad)) + (this.initHeight*Math.cos(this.angleInRad)))));
        this.timeTaken = (this.initVel * Math.sin(this.angleInRad) + Math.sqrt(Math.pow(this.initVel* Math.sin(this.angleInRad),2) + 2 * 9.81 * this.initHeight))/9.81;
        this.turningRad = Math.atan2(targetVec.z - launcherVec.z, targetVec.x - launcherVec.x);

        if (isNaN(this.initVel) || this.initVel == Infinity) {
            document.dispatchEvent(this.invalidInputEvent)
        } else {
            this.launchTrajectory(launcherVec, targetVec)
        }
    }

    clear() {
        for (let i=0; i<this.trajectories.length; i++) {
            this.scene.remove(this.trajectories[i].line)
            this.trajectories.pop()
        }
    }

    newTrajectoryVel(launcherVec, targetVec, vel) {
        this.initVel = vel
        this.distanceFlat = launcherVec.distanceTo(new THREE.Vector3(targetVec.x, launcherVec.y, targetVec.z));
        this.initHeight = launcherVec.y - targetVec.y;
        this.angleInRad = Math.atan((this.initVel * this.initVel + Math.sqrt(this.initVel * this.initVel * this.initVel * this.initVel - 9.81 * (9.81 * this.distanceFlat * this.distanceFlat + 2 * this.initHeight * this.initVel * this.initVel))) / (9.81 * this.distanceFlat));
        this.angle = this.convertToDeg(this.angleInRad);
        this.timeTaken = (this.initVel * Math.sin(this.angleInRad) + Math.sqrt(this.initVel * this.initVel * Math.sin(this.angleInRad) * Math.sin(this.angleInRad) + 2 * 9.81 * this.initHeight)) / 9.81;
        this.turningRad = Math.atan2(targetVec.z - launcherVec.z, targetVec.x - launcherVec.x);

        if (isNaN(this.angle)) {
            document.dispatchEvent(this.invalidInputEvent)
        } else {
            this.launchTrajectory(launcherVec, targetVec)
        }
    }

    launchTrajectory(launcherVec, targetVec) {
        this.experience.world.focus(this.experience.world.centerObject)
        document.dispatchEvent(this.experience.camera.startArEvent);

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
            if (Math.abs(this.pos.x - targetVec.x) < 0.1 && Math.abs(this.pos.y - targetVec.y) < 0.1 && Math.abs(this.pos.z - targetVec.z) < 0.1) {
                this.pos.x = targetVec.x;
                this.pos.y = targetVec.y;
                this.pos.z = targetVec.z;
                this.projectilePoints.push(this.pos.x,this.pos.y,this.pos.z);
                break;
            }

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

        this.trajectories.unshift({id:this.trajectories.length+1,targetPos: {x: Math.floor(targetVec.x*100)/100, y: Math.floor(targetVec.y*100)/100, z: Math.floor(targetVec.z*100)/100},angleV: Math.floor(this.angle*100)/100, angleH: Math.floor(this.convertToDeg(this.turningRad)*100)/100, initVel: Math.floor(this.initVel*100)/100, timeTaken: Math.floor(this.timeTaken*100)/100, line: this.trajectory});

        if (this.trajectories.length > this.trlimit) {
            this.scene.remove(this.trajectories.pop());
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