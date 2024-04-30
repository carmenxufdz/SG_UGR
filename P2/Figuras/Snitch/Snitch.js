import * as THREE from '../../libs/three.module.js'

class Snitch extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        
    }

    createShape(shape)
    {
        shape.moveTo(-0.2,2,0);
        shape.lineTo(-1,-1,0);
        shape.lineTo(0.1,-0.3,0);
        shape.lineTo(0.2,-2,0);
        shape.lineTo(1,1,0);
        shape.lineTo(-0.1,0.3,0);
    }
    update()
    {
    }
}

export { Rayo };
