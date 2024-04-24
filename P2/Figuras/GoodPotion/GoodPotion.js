import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'

class GoodPotion extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();

        var glasspoints = [];

        this.createGlass(glasspoints);

        var glassmaterial = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            transmission: 1,
            thickness: 0.5,
            transparent: true,
            opacity: 0.8,
            refractionRatio: 0.95,
            color: 0xffffff,
            metalness: 0,
            clearcoat: 0,
            clearcoatRoughness: 0,
            envMapIntensity: 1
          });

        var crystal = new THREE.Mesh(new THREE.LatheGeometry(glasspoints,20),glassmaterial);

        var hueco = crystal.clone();

        hueco.scale.set(0.8,0.8,0.8);

        const figure = new CSG();
        figure.union([crystal]);
        figure.subtract([hueco]);


        var potion = figure.toMesh();
    
        this.add(crystal);
        this.add(hueco);
    }

    createGlass(points)
    {
        points.push(new THREE.Vector3(0.0001,-3,0));
        points.push(new THREE.Vector3(0.2,-3,0));
        
        points.push(new THREE.Vector3(1.4,-0.3,0));
        points.push(new THREE.Vector3(1.45,-0.15,0));
        points.push(new THREE.Vector3(1.5,0,0));
        points.push(new THREE.Vector3(1.45,0.15,0));
        points.push(new THREE.Vector3(1.4,0.3,0));
        
        points.push(new THREE.Vector3(0.6,2.05,0));
        points.push(new THREE.Vector3(0.57,2.1,0));
        points.push(new THREE.Vector3(0.54,2.15,0));
        points.push(new THREE.Vector3(0.51,2.2,0));
        points.push(new THREE.Vector3(0.48,2.25,0));

        
        points.push(new THREE.Vector3(0.45,2.35,0));
        points.push(new THREE.Vector3(0.45,2.55,0));

        points.push(new THREE.Vector3(0.48,2.6,0));
        points.push(new THREE.Vector3(0.51,2.65,0));
        points.push(new THREE.Vector3(0.54,2.7,0));
        points.push(new THREE.Vector3(0.57,2.75,0));

        points.push(new THREE.Vector3(0.6,2.8,0));
        points.push(new THREE.Vector3(0.8,2.8,0));
        points.push(new THREE.Vector3(0.8,3,0));
        points.push(new THREE.Vector3(0.0001,3,0));
    }
    update()
    {
    }
}

export { GoodPotion };
