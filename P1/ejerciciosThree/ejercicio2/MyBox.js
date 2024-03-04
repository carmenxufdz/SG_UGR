import * as THREE from '../libs/three.module.js'

class MyBox extends THREE.Object3D{
    constructor(gui, titleGui)
    {
        super();

        this.createGUI(gui, titleGui);

        var boxGeom = new THREE.BoxGeometry(1,1,1);
        var boxMat = new THREE.MeshNormalMaterial();

        var box = new THREE.Mesh(boxGeom,boxMat);
        this.add(box);
    }

    createGUI(gui, titleGui)
    {

    }

    update()
    {
        
    }
}