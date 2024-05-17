import * as THREE from '../libs/three.module.js'

class Circuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        var material = new THREE.MeshNormalMaterial()

        //CREAMOS EL TUBO
        
        this.pts = [
            new THREE.Vector3(5,0,2.5),
            new THREE.Vector3(10,5,0),
            new THREE.Vector3(7.5,7.5,-1.25),
            new THREE.Vector3(10,10,0),
            new THREE.Vector3(5,12.5,1.25),
            new THREE.Vector3(0,10,0),
            new THREE.Vector3(2.5,7.5,-1.25),
            new THREE.Vector3(0,5,0),
            new THREE.Vector3(5,0,0),
            new THREE.Vector3(10,-5,0),
            new THREE.Vector3(12.5,-7.5,0),
            new THREE.Vector3(10,-10,-1.25),
            new THREE.Vector3(7.5,-7.5,0),
            new THREE.Vector3(5,-6.25,0),
            new THREE.Vector3(2.5,-7.5,0),
            new THREE.Vector3(0,-10,-1.25),
            new THREE.Vector3(-2.5,-7.5,0),
            new THREE.Vector3(0,-5,0),
        ];

        var path = new THREE.CatmullRomCurve3 (this.pts, true)

        var resolucion = 200;
        var radio = 0.5;
        var segmentoCirculo = 20;

        var geometriaTubo = new THREE.TubeGeometry(path, resolucion, radio, segmentoCirculo, true);

        //geometriaTubo.rotateZ(45*Math.PI/180);

        var geometriaTubo_MESH = new THREE.Mesh(geometriaTubo, material);

        //geometriaTubo_MESH.scale.set(20,20,20);
        //geometriaTubo_MESH.rotateX(90*Math.PI/180);
        this.add(geometriaTubo_MESH);
                
    }

    getRuta()
    {
        return this.pts;
    }

    update()
    {
    }
}

export { Circuito };
