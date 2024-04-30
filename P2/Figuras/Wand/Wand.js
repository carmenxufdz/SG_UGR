import * as THREE from '../../libs/three.module.js'

class Wand extends THREE.Object3D {
    constructor(gui, titleGui)
    {
        super();

        var shape = new THREE.Shape();
        this.createShape(shape);

        this.settings = {
            steps: 0, // — int. Number of points used for subdividing segments along the depth of the extruded spline
            depth: 0, // — float. Depth to extrude the shape
        };

        var geometry = new THREE.ExtrudeGeometry(shape, this.settings);
        var material = new THREE.MeshPhysicalMaterial( { color: 0xffff00 } ); // amarillo

        this.Wand = new THREE.Mesh(geometry, material);

        this.add( this.Wand );

        this.Wand.rotateZ(-30*Math.PI/180);
    }

    createShape(shape)
    {
        shape.moveTo(0, 1);      
        shape.lineTo(0.294, 0.809);  
        shape.lineTo(0.588, 0.809);  
        shape.lineTO(,-0.309)  
        shape.lineTo(0.951, -0.309);         
        shape.lineTo(-0.951, -0.309);        
        shape.lineTo(-0.588, 0.809);         
    }
    update()
    {
    }
}

export { Wand };
