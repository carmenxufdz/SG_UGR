import * as THREE from '../../libs/three.module.js'

class GoodPotion extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();

        var glasspoints = [];

        this.createGlass(glasspoints);

        var glassmaterial = new THREE.MeshPhysicalMaterial( { color: 0xffff00 } ); // amarillo

        var crystal = new THREE.Mesh(new THREE.LatheGeometry(glasspoints,3),glassmaterial);
    
        this.add(crystal)
    }

    createGlass(points)
    {
        points.push(new THREE.Vector3(0.0001,-3,0));
        
        points.push(new THREE.Vector3(1.5,0,0));

        points.push(new THREE.Vector3(0.0001,3,0));
    }
    update()
    {
    }
}

export { GoodPotion };
