
import * as THREE from 'three'

class Box extends THREE.Object3D{
    constructor(gui, titleGui){
        super();


        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        this.material = new THREE.MeshNormalMaterial({color: 0xCF0000});

        var tamano=0.1;
        
    }
}