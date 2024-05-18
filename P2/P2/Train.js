import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'
import { Circuito } from './Circuito.js';
class Train extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        this.path = []; // Initialize the path array

        // Create the path using the Circuito class
        const circuito = new Circuito(gui, titleGui);
        this.path = circuito.getRuta();
        
        this.createLocomotor();
        //this.createCamara();
        this.createBase();
        this.createRuedas();
        this.scale.set(0.01,0.01,0.01);
        

        // Create the CatmullRomCurve3 object
        this.curve = new THREE.CatmullRomCurve3(this.path);

        var tiempoDeRecorrido = 10000; // Initialize the animation speed (in milliseconds)
        this.segmentos = 100; // Initialize the number of segments
        this.binormales = this.curve.computeFrenetFrames(this.segmentos, true).binormals; // Initialize the binormals array      

        var origen = {t:0};
        var fin = {t:1};
      
      var animacion = new TWEEN.Tween(origen).to(fin, tiempoDeRecorrido).onUpdate(() =>{
        var posicion = this.curve.getPointAt(origen.t);
        posicion.z += 0.6;
        this.position.copy(posicion);
        var tangente = this.curve.getTangentAt(origen.t);
        var binormal = new THREE.Vector3(0, 0, 1);
        var normal = new THREE.Vector3().crossVectors(tangente, binormal).normalize();
        this.up.copy(normal);

        this.lookAt(posicion.clone().add(tangente));
        this.rotation.z -= Math.PI*90 / 180;
        this.rotation.y -= Math.PI*90 / 180;
        
      });
      animacion.start();
    }
    

    createLocomotor(){
      var material = new THREE.MeshNormalMaterial();

      /* LOCOMOTOR */
      var cylindergeom = new THREE.CylinderGeometry(5, 5, 17.5, 30);

      const cylinder = new THREE.Mesh(cylindergeom, material);
      cylinder.rotateZ(90*Math.PI/180); // Rot

      var cygeom = new THREE.CylinderGeometry(1.25, 1.25, 2.5, 30);

      const cy = new THREE.Mesh(cygeom, material);
      cy.position.set(-6,6,0);

      var locomotorCSG = new CSG();
      locomotorCSG.union([cylinder, cy]);

      const locomotor = locomotorCSG.toMesh();

      this.add(locomotor);
    }

    /*
    createCamara(){
        var material = new THREE.MeshNormalMaterial();
        /* CAMARA DEL TREN 
        var boxgeom = new THREE.BoxGeometry(10,12,10);

        const box = new THREE.Mesh(boxgeom, material);
        box.position.y = 3;
        box.position.x = 13.75;

        var soportegeom = new THREE.BoxGeometry(12,1,10);

        const soporte = new THREE.Mesh(soportegeom, material);
        soporte.position.y = -3.5;
        soporte.position.x = 13.75;

        const soporte2 = soporte.clone();
        soporte2.position.y = 8.5;
        soporte2.position.x = 13.75;

        var techogeom = new THREE.CylinderGeometry(4, 7, 2.5, 4);

        const techo = new THREE.Mesh(techogeom, material);
        techo.rotateY(45*Math.PI/180);
        techo.position.set(13.75, 10.25,0);

        var camaraCSG = new CSG();
        camaraCSG.union([box, soporte, soporte2, techo]);

        const camara = camaraCSG.toMesh();

        this.add(camara);
    }
    */

    createBase(){
      var textureLoader = new THREE.TextureLoader();
      var acero = textureLoader.load('../../imgs/acero.jpg');

      const aceromaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color of the wheel
        roughness: 0.5, // Add some roughness to give it a worn look
        metalness: 0.2, // Add some metalness to give it a slight shine
        map: acero,
        normalMap: acero, // Use the same texture as a normal map
        roughnessMap: acero, // Use the same texture as a roughness map

        aoMapIntensity: 0.5,
        envMapIntensity: 0.5
      });
        
      var boxinfgeom = new THREE.BoxGeometry(29, 2.5 , 2.5);

      const boxinf = new THREE.Mesh(boxinfgeom, aceromaterial);
      boxinf.position.set(4.25, -5, 3.75);

      const boxinf2 = boxinf.clone();
      boxinf2.position.set(4.25, -5, -3.75);

      var boxsoportgeom = new THREE.BoxGeometry(1.5,1.5,10);
      const boxsoport = new THREE.Mesh(boxsoportgeom, aceromaterial);
      boxsoport.position.set(-9, -5, 0);
      const boxsoport2 = boxsoport.clone();
      boxsoport2.position.set(17, -5, 0);

      var baseCSG = new CSG();
      baseCSG.union([boxinf, boxinf2, boxsoport, boxsoport2]);

      const base = baseCSG.toMesh();

      this.add(base);


    }

    createRuedas(){
      var textureLoader = new THREE.TextureLoader();
      var acero = textureLoader.load('../../imgs/acero.jpg');

      const aceromaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color of the wheel
        roughness: 0.5, // Add some roughness to give it a worn look
        metalness: 0.2, // Add some metalness to give it a slight shine
        map: acero,
        normalMap: acero, // Use the same texture as a normal map
        roughnessMap: acero, // Use the same texture as a roughness map

        aoMapIntensity: 0.5,
        envMapIntensity: 0.5
      });

       var ruedaGgeom = new THREE.CylinderGeometry(3,3,1, 30);

      const ruedaG1 = new THREE.Mesh(ruedaGgeom, aceromaterial);
      ruedaG1.rotateX(90*Math.PI/180);
      ruedaG1.position.set(14, -5, 5.5);
      
      const ruedaG2 = ruedaG1.clone();
      ruedaG2.position.set(14, -5, -5.5);
      
      const ruedaG3 = ruedaG1.clone();
      ruedaG3.position.set(7, -5, 5.5);
      
      const ruedaG4 = ruedaG1.clone();
      ruedaG4.position.set(7, -5, -5.5);
      
      var ruedaPgeom = new THREE.CylinderGeometry(2,2,1, 30);
      
              const ruedaP1 = new THREE.Mesh(ruedaPgeom, aceromaterial);
              ruedaP1.rotateX(90*Math.PI/180);
              ruedaP1.position.set(-5, -6, 5.5);
      
              const ruedaP2 = ruedaP1.clone();
              ruedaP2.position.set(-5, -6, -5.5);
      
              var ruedasCSG = new CSG();
              ruedasCSG.union([ruedaG1,ruedaG2, ruedaG3, ruedaG4, ruedaP1, ruedaP2]);
      
              const ruedas = ruedasCSG.toMesh();
      

              this.add(ruedas);

    }

    update() {
      TWEEN.update();
    }
}

export { Train };
