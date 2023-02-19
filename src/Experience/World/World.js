import * as THREE from 'three';
import Experience from "../Experience";

import Helpers from "./Helpers"

import Launcher from './Launcher';
import Target from './Target';
import DistanceLine from './DistanceLine';
import Projectile from './Projectile'

import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { Vector2 } from 'three';

import gsap from 'gsap';


export default class World {
    constructor() {
        this.experience = new Experience();

        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;

        this.helpers = new Helpers();

        this.launcher = new Launcher();
        this.target = new Target();

        this.distanceLine = new DistanceLine();
        this.projectile = new Projectile();

        this.scene.add(this.launcher.instance);
        this.scene.add(this.target.instance);
        this.scene.add(this.launcher.indicator);
        this.scene.add(this.target.indicator);

        this.canvasReady = false;
     
        this.centerObject = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    }

    launch(angle) {
        this.projectile.newTrajectory(this.launcher.instance.position, this.target.instance.position, angle)
    }

    setTransform() {
        this.transformControls = new TransformControls(this.experience.camera.instance, this.experience.containerRef.current);
        
        this.transformControls.setSize(0.7);
        this.transformMode = 0;

        this.scene.add(this.transformControls)
        this.transformControls.addEventListener('mouseDown', () => {
            this.experience.camera.controls.enabled = false;
        });
        
        this.transformControls.addEventListener('mouseUp', () => {
            this.experience.camera.controls.enabled = true;
        });

        this.raycaster = new THREE.Raycaster();
        this.mouse = new Vector2();
        
        this.experience.containerRef.current.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / this.sizes.width)*2 - 1;
            this.mouse.y = - (event.clientY / this.sizes.height)*2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera.instance);

            const objects = [this.launcher.instance, this.target.instance]
            this.intersects = this.raycaster.intersectObjects(objects);

            if (this.intersects.length > 0) {
                let selected = this.intersects[0].object.uuid;

                if (selected == this.target.instance.uuid) {
                    if (this.transformMode != 2) {
                        this.transformControls.showX = true;
                        this.transformControls.showZ = true;
                        this.transformControls.attach(this.target.instance)
                        this.transformMode = 2;
                    }
                }
            } else {
                if (this.transformMode != 0) {
                    this.transformControls.detach(this.target.instance);
                    this.transformControls.detach(this.launcher.instance);
                    this.transformMode = 0;
                }
            }
        });
    }

    update() {
        this.distanceLine.update();
        this.projectile.update();

        this.launcher.indicator.position.set(this.launcher.instance.position.x, this.launcher.instance.position.y+0.22,this.launcher.instance.position.z)
        this.launcher.indicator.lookAt(this.camera.instance.position);

        this.target.indicator.position.set(this.target.instance.position.x, this.target.instance.position.y+0.22,this.target.instance.position.z)
        this.target.indicator.lookAt(this.camera.instance.position);

        if (this.experience.renderer.instance && this.canvasReady == false) {
            this.setTransform();
            this.canvasReady = true
        }

        let center = new THREE.Vector3();
        center.addVectors(this.launcher.instance.position, this.target.instance.position).multiplyScalar(0.5);
        this.centerObject.position.copy(center);
    }

    

    focus(targetInstance) {
        let def = this;

        // Focus animation
        let aabb = new THREE.Box3().setFromObject(targetInstance);
        let center = aabb.getCenter(new THREE.Vector3());
        let size = aabb.getSize(new THREE.Vector3());
        let camPosition = this.camera.instance.position.clone();
        let targPosition = targetInstance.position.clone();
        let distance = camPosition.sub(targPosition);
        let direction = distance.normalize();

        let offset;
        let offsetY;

        if (targetInstance == this.centerObject) {
            offset = distance.clone().sub(direction.multiplyScalar(12));
            offsetY = 6  
        } else {
            offset = distance.clone().sub(direction.multiplyScalar(6));  
            offsetY = 2
        }

        

        let newPos = targetInstance.position.clone().sub(offset);
        newPos.y = this.camera.instance.position.y;

        // Rotate animation
        let rotDuration = 1;

        let pl = gsap.timeline();

        // Add focus animation to timeline

        // Add camera position animation to timeline
        pl.to(this.camera.instance.position, {
            duration: rotDuration,
            ease: "power4.out",
            x: newPos.x,
            y: center.y + offsetY,
            z: newPos.z,
            onUpdate: function() {
                def.camera.controls.update();
            },
        },0);

        pl.to(this.camera.controls.target, {
            duration: rotDuration,
            x: center.x,
            y: center.y,
            z: center.z,
            ease: "power4.out",
            onUpdate: function() {
                def.camera.controls.update();
            },
        },0);

        // Play all animations simultaneously
        pl.play(0);
    }
    
}