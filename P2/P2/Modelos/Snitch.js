import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class Snitch extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.translate = 0.0;
        this.rotacionW = 0.0;
        this.subeW = true;

        this.sube = true;
        this.subir = 0.0;
        
        this.aux = 0.0;
        
        var goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            metalness: 0.5, // Set the metalness to 1.0
            roughness: 0.1, // Set the roughness to a low value
            clearcoat: 1.0, // Add a clearcoat layer for a more realistic appearance
            clearcoatRoughness: 0.05 // Set the clearcoat roughness to a low value
        });

        var material = new THREE.MeshNormalMaterial();

        var spheregeom = new THREE.SphereGeometry(2, 30, 30);

        const sphere = new THREE.Mesh(spheregeom, goldMaterial);

        var minispheregeom = new THREE.SphereGeometry(0.5,30,30);

        this.minisphere1 = new THREE.Mesh(minispheregeom, goldMaterial);
        this.minisphere1.position.set(1.7,1,0);

        this.minisphere2 = this.minisphere1.clone();
        this.minisphere2.position.set(-1.7,1,0);

        var wingShape = new THREE.Shape();
        this.createShape(wingShape);

        this.settings = {
            depth: 0.1,
            bevelEnabled: true
        };

        this.wingGeom = new THREE.ExtrudeGeometry(wingShape, this.settings);
        this.wingGeom.translate(1.5,1.5,0);

        this.wing1= new THREE.Mesh(this.wingGeom, material);
        this.wing1.scale.set(0.7,0.7,0.7);

        this.wing2 = this.wing1.clone();
        this.wing2.rotateY(180*Math.PI/180);

        this.wing1.position.set(1.9,1.2,0);
        this.wing2.position.set(-1.9,1.2,0);

        this.add(this.wing1);
        this.add(this.wing2);


        this.add(this.minisphere1);
        this.add(this.minisphere2);

        this.add(sphere);

        this.scale.set(0.25,0.25,0.25);

        this.lasTimeUpdate = Date.now();
        this.time = 3000;
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
        
        if(this.subeW == true){
            this.translate=0.01;
            if(this.aux >0.1)
                this.subeW = false;
        }
        else{
            this.translate=-0.01;
            if(this.aux <-0.1)
                this.subeW = true;
        }

        this.aux += this.translate;
        this.wingGeom.translate(-this.translate, this.translate, 0);
        this.wing1.geometry.dispose();
        this.wing1.geometry= this.wingGeom;

        this.rotacionW+=0.0001;
        this.wing1.rotateX(this.rotacionW);
        this.wing2.rotateX(-this.rotacionW);

        if(this.sube && this.subir <=2.0){
            this.subir+=0.1;
            this.position.y+=0.1;
            if(this.subir >=2.0)
                this.sube = false;
        }
        else if(!this.sube && this.subir >= -2.0){
            this.subir-=0.1;
            this.position.y-=0.1;
            if(this.subir <= -2.0)
                this.sube = true;
        }
        this.animacionSnitch();
    }

    animacionSnitch(){
        this.timeSinceLastUpdate = Date.now() - this.lasTimeUpdate;

        if(this.timeSinceLastUpdate > this.time){
            
            // Generar números aleatorios dentro de los límites
            const randomX = Math.random() * (150 - (-10)) + (-10);
            const randomY = Math.random() * (40 - 10) + 10;
            const randomZ = Math.random() * (120 - (-120)) + (-120);

            // Actualizar la posición real de la Snitch
            
            this.position.x = randomX;
            this.position.y = randomY;
            this.position.z = randomZ;

            // Actualizar el tiempo de la última actualización
            this.lastUpdateTime = Date.now();
            this.time +=3000;
        }
    }
}

export { Snitch };
