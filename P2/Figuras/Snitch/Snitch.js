import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Snitch extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.rotacionS = 0.0;
        this.rotacionW = 0.0;
        
        var goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            metalness: 0.5, // Set the metalness to 1.0
            roughness: 0.1, // Set the roughness to a low value
            clearcoat: 1.0, // Add a clearcoat layer for a more realistic appearance
            clearcoatRoughness: 0.05 // Set the clearcoat roughness to a low value
        });

        var material = new THREE.MeshNormalMaterial();

        var spheregeom = new THREE.SphereGeometry(2.5, 30, 30);

        const sphere = new THREE.Mesh(spheregeom, material);

        var minispheregeom = new THREE.SphereGeometry(0.5,30,30);

        this.minisphere1 = new THREE.Mesh(minispheregeom, goldMaterial);
        this.minisphere1.position.set(1.9,1.5,0);

        this.minisphere2 = this.minisphere1.clone();
        this.minisphere2.position.set(-1.9,1.5,0);

        var wingShape = new THREE.Shape();
        this.createShape(wingShape);

        this.settings = {
            depth: 0.2,
            bevelEnabled: true
        };

        var wingGeom = new THREE.ExtrudeGeometry(wingShape, this.settings);

        this.wing1= new THREE.Mesh(wingGeom, material);
        this.wing1.scale.set(0.7,0.7,0.7);

        this.wing2 = this.wing1.clone();
        this.wing2.rotateY(180*Math.PI/180);

        this.wing1.position.set(3.3,2.75,0);
        this.wing2.position.set(-3.3,2.75,0);
        

        this.add(this.wing1);
        //this.add(this.wing2);
/*
        this.add(this.minisphere1);
        this.add(this.minisphere2);

        this.add(sphere);
        */
        
    }

    createShape(shape)
    {
        shape.moveTo(0, -1);
        shape.bezierCurveTo(0,-1,1,0,1,0);
        shape.bezierCurveTo(1,0,1.5,1.5,1.5,1.5);
        shape.bezierCurveTo(1.5,1.5,0,0.5,0,0.5);
        shape.bezierCurveTo(0,0.5,-1.5,-1.5,-1.5,-1.5);

    }
    update()
    {
        this.rotacionS+=0.1;
        this.minisphere1.rotation.set(this.rotacionS, this.rotacionS, 0);
        this.minisphere2.rotation.set(this.rotacionS, this.rotacionS, 0);

        this.rotacionW+=0.1;
        
        this.wing1.rotateX(this.rotacionW)
        this.wing2.rotation.set(this.rotacionW, 180*Math.PI/180, 0);
    }
}

export { Snitch };
