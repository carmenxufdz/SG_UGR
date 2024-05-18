import * as THREE from '../../libs/three.module.js'

class Circuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        var material = new THREE.MeshNormalMaterial()

        //CREAMOS EL TUBO
        
        var pts = [
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

        var path = new THREE.CatmullRomCurve3 (pts, true)

        //definicion de  spline
        this.spline = new THREE.CatmullRomCurve3(pts)

        //dibujado de un spline
        // Se crea una geometría
        var geometryLine = new THREE. BufferGeometry ( ) ;

        geometryLine . setFromPoints ( this.spline.getPoints(100)) ;

        var material = new THREE.LineBasicMaterial({material, linewidth: 1});
        var visibleSpline = new THREE.Line (geometryLine, material);

        var resolucion = 200;
        var radio = 0.5;
        var segmentoCirculo = 20;

        var geometriaTubo = new THREE.TubeGeometry(path, resolucion, radio, segmentoCirculo, true);

        //geometriaTubo.rotateZ(45*Math.PI/180);

        var geometriaTubo_MESH = new THREE.Mesh(geometriaTubo, material);

        //this.add(geometriaTubo_MESH);
        this.add(visibleSpline);
                
    }

    createShape(shape)
    {
    
    }

    createGUI (gui,titleGui) {
        /*
        // Controles para el tamaño de la caja iniciales
        this.guiControls = {
            depth: 2,
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
            } 
            
            // Se crea una sección para los controles de la caja
            var folder = gui.addFolder (titleGui)
            // Estas lineas son las que añaden los componentes de la interfaz
            // Las tres cifras indican un valor mínimo, un máximo y el incremento
            // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        */
    }

    update()
    {
        this.segmentos = 100;
        this.binormales = this.spline.computeFrenetFrames (this.segmentos, true).binormales;

        var origen = {t : 0};
        var fin = {t : 1};
        var tiempoDeRecorrido = 4000;
/*
        var animacion = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
        var posicion = this.spline.getPointAt (origen.t);
        visibleSpline.position.copy (posicion);
        var tangente = this.spline.getTangentAt (origen.t);
        posicion.add (tangente);
        visibleSpline.up = this.binormales[Math.floor(origen.t * this.segmentos)];
        visibleSpline.lookAt (posicion);
*/
    }
}

export { Circuito };
