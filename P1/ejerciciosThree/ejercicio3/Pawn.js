import * as THREE from '../libs/three.module.js'

class Pawn extends THREE.Object3D{
    constructor(gui,titleGui)
    {
        super();

        this.createGUI(gui,titleGui);

        var points = [];

        this.createPawn(points);

        // Para crear una línea visible, como en el vídeo
        var material_linea = new THREE.MeshLambertMaterial({color: 0x00ffff});
        
        var lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints (points);
        var line = new THREE.Line (lineGeometry,material_linea);

        
        line.position.y+=1.5; //Lo ponemos como en el vídeo

        this.add(line)
        
        var boxMat = new THREE.MeshNormalMaterial();

        var latheObject = new THREE.Mesh (new THREE.LatheGeometry (points, 3), boxMat);

        latheObject.position.y+=1.5;
        latheObject.position.x+=5;
        // Y añadirlo como hijo del Object3D (el this)
        this.add (latheObject);
    }

    createPawn(points)
    {
        // Construido de abajo hacia arriba
        points.push (new THREE.Vector3(0.0001,-1.5,0));
        points.push (new THREE.Vector3(1.0,-1.5,0));
        points.push (new THREE.Vector3(1.0,-1.1,0));
        points.push (new THREE.Vector3(0.5,-0.7,0));
        points.push (new THREE.Vector3(0.4,-0.4,0));
        points.push (new THREE.Vector3(0.4,0.5,0));
        points.push (new THREE.Vector3(0.5,0.6,0));
        points.push (new THREE.Vector3(0.3,0.6,0));
        points.push (new THREE.Vector3(0.5,0.8,0));
        points.push (new THREE.Vector3(0.55,1.0,0));
        points.push (new THREE.Vector3(0.5,1.2,0));
        points.push (new THREE.Vector3(0.35,1.35,0));
        points.push (new THREE.Vector3(0.15,1.5,0));
        points.push (new THREE.Vector3(0.0001,1.5,0));
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja iniciales
        this.guiControls = {
        segments : 3.0,
        angle : 10.0
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'segments', 3.0, 15.0, 1.0).name ('Resolución : ').listen().onChange( (v) => {
            
            var points = [];
            
            this.createPawn(points);

            this.children[1].geometry.dispose();
            this.children[1].geometry = new THREE.LatheGeometry (points, v, 0, (Math.PI*2)*(this.guiControls.angle/10));
        });
        folder.add (this.guiControls, 'angle', 1.0, 10.0, 1.0).name ('Ángulo : ').listen().onChange( (v) => {
            
            var points = [];
            
            this.createPawn(points);

            this.children[1].geometry.dispose();
            this.children[1].geometry = new THREE.LatheGeometry (points, this.guiControls.segments, 0, (Math.PI*2)*(v/10));
        });
        
    }
    
    update () {

    }

}

export { Pawn };