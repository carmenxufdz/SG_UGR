import * as THREE from '../libs/three.module.js'

class Circuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        var material = new THREE.MeshNormalMaterial()

        //CREAMOS EL TUBO
        
        this.pts = [
            new THREE.Vector3(60,30,0),
            new THREE.Vector3(90,15,30),
            new THREE.Vector3(120,0,60),
            new THREE.Vector3(86,0,86),
            new THREE.Vector3(120,0,120),
            new THREE.Vector3(60,0,150),
            new THREE.Vector3(0,0,120),
            new THREE.Vector3(30,0,86),
            new THREE.Vector3(0,0,60),
            new THREE.Vector3(60,0,0),
            new THREE.Vector3(120,0,-60),
            new THREE.Vector3(150,0,-86),
            new THREE.Vector3(120,0,-120),
            new THREE.Vector3(86,0,-86),
            new THREE.Vector3(0,0,-100),
            new THREE.Vector3(0,0,-30),
            new THREE.Vector3(30,15,-15),
            new THREE.Vector3(59,30,0),
        ];

        var path = new THREE.CatmullRomCurve3 (this.pts, true)

        var resolucion = 200;
        var radio = 10;
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
