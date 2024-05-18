
// Clases de la biblioteca
// import * as THREE from "three"

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto

import { Circuito } from './Circuito.js'
import { Train } from './Train.js'

import {Apple} from './Modelos/Apple.js'
import {BadMushroom} from './Modelos/BadMushroom.js'
import {BadPotion} from './Modelos/BadPotion.js'
import {Book} from './Modelos/Book.js'
import {Coin} from './Modelos/Coin.js'
import {GoodPotion} from './Modelos/GoodPotion.js'
import {Mushroom} from './Modelos/Mushroom.js'
import {Rayo} from './Modelos/Rayo.js'
import {Ring} from './Modelos/Ring.js'
import {Skull} from './Modelos/Skull.js'
import {Snitch} from './Modelos/Snitch.js'
import {Wand} from './Modelos/Wand.js'



class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    this.general = true; // variable global para cambiar de camara
    window.addEventListener('keydown', this.onKeyDown.bind(this), false);

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    this.derecha = false;
    this.izquierda = false;

    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCameraGeneral();
    
    
    // Por último creamos el modelo.

    this.circuito = new Circuito (this.gui, "Controles de la Figura");
    this.add (this.circuito);

    this.train = new Train(this.gui, "Controles del Tren");
    this.add(this.train);



    this.trenposicion = 0;

    this.createCameraTerceraPersona();

    this.createObjectsColisiones();
    this.objetosColisiones = [
      this.coin, this.mushroom, this.wand, this.ring, this.goodpotion,
      this.rayo, this.badmushroom, this.skull, this. apple, this.badpotion,
    ];

    for(let i = 0; i<this.objetosColisiones.length; i++)
      this.add(this.objetosColisiones[i]);

    this.createObjectsVoladores();
    this.objetosVoladores = [
      this.book0, this.book1, this.book2, this.book3, this.book4, this.book5,
      this.snitch,
    ]

    for(let i = 0; i<this.objetosVoladores.length; i++)
      this.add(this.objetosVoladores[i]);
    

  }

  createObjectsColisiones(){
    // OBJETOS BUENOS //
    this.coin = new Coin(this.gui, "Controles de la Figura");
    this.coin.position.set(30,10.25, 22.5);

    var boxCoin = new THREE.Box3();
    boxCoin.setFromObject(this.coin);

    this.mushroom = new Mushroom(this.gui, "Controles de la Figura");
    this.mushroom.position.set(110, 16, 50);

    var boxMushrrom = new THREE.Box3();
    boxMushrrom.setFromObject(this.mushroom);

    this.wand = new Wand(this.gui, "Controles de la Figura");
    this.wand.position.set(22, 10, -100);
    
    var boxWand = new THREE.Box3();
    boxWand.setFromObject(this.wand);

    this.ring = new Ring(this.gui, "Controles de la Figura");
    this.ring.position.set(20, 10, 140);
    
    var boxRing = new THREE.Box3();
    boxRing.setFromObject(this.ring);

    this.goodpotion = new GoodPotion(this.gui, "Controles de la Figura");
    this.goodpotion.position.set(20, 10.5, 80);
    
    var boxGoodpotion = new THREE.Box3();
    boxGoodpotion.setFromObject(this.goodpotion);

    // OBJETOS MALOS //

    this.rayo = new Rayo(this.gui, "Controles de la Figura");
    this.rayo.position.set(127,10.25, -120);
    
    var boxRayo = new THREE.Box3();
    boxRayo.setFromObject(this.rayo);
    
    this.badmushroom = new BadMushroom(this.gui, "Controles de la Figura");
    this.badmushroom.position.set(85,10, -20);

    var boxBadmushroom = new THREE.Box3();
    boxBadmushroom.setFromObject(this.badmushroom);

    this.skull = new Skull(this.gui, "Controles de la Figura");
    this.skull.position.set(-5,9.5, -40);

    var boxSkull = new THREE.Box3();
    boxSkull.setFromObject(this.skull);

    this.apple = new Apple(this.gui, "Controles de la Figura");
    this.apple.position.set(90,10, 140);

    var boaxApple = new THREE.Box3();
    boaxApple.setFromObject(this.apple);

    this.badpotion = new BadPotion(this.gui, "Controles de la Figura");
    this.badpotion.position.set(55,10.5, -90);

    var boxBadpotion = new THREE.Box3();
    boxBadpotion.setFromObject(this.badpotion);
  }

  createObjectsVoladores(){

    this.book0 = new Book(this.gui, "Controles de la Figura")
    this.book0.position.set(12, 12, 15);

    this.book1 = new Book(this.gui, "Controles de la Figura")
    this.book1.position.set(50, 15,140);

    this.book2 = new Book(this.gui, "Controles de la Figura")
    this.book2.position.set(-10, 11, -35);

    this.book3 = new Book(this.gui, "Controles de la Figura")
    this.book3.position.set(100, 25, 30);

    this.book4 = new Book(this.gui, "Controles de la Figura")
    this.book4.position.set(140, 14, -60);

    this.book5 = new Book(this.gui, "Controles de la Figura")
    this.book5.position.set(45, 13, -110);

    this.snitch = new Snitch(this.gui, "Controles de la Figura");
  }

  onKeyDown = function (event){

    if(event.keyCode == 65){ // A
      this.izquierda = true;
    }
    if(event.keyCode == 68){ // D
      this.derecha = true;
    }
  }

  onKeyUp = function (event){
    if(event.keyCode == 65){ // A
      this.izquierda = false;
    }
    if(event.keyCode == 68){ // D
      this.derecha = false;
    }
  }

  onKeyPress = function (event){
    if (event.keyCode === 32) { // 32 es el código de la tecla de la barra espaciadora
      this.general = !this.general;
    }
  }

  createCameraGeneral () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camerageneral = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    // También se indica dónde se coloca
    this.camerageneral.position.set (20, 10, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camerageneral.lookAt(look);
    this.add (this.camerageneral);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.camerageneralControl = new TrackballControls (this.camerageneral, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.camerageneralControl.rotateSpeed = 5;
    this.camerageneralControl.zoomSpeed = -2;
    this.camerageneralControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.camerageneralControl.target = look;
  }

  createCameraTerceraPersona () { //camara subjetiva

    this.cameratren = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

    this.train.add (this.cameratren);
    this.cameratren.position.set(0,0.1,0);

    var puntoDeMiraRelativo = new THREE.Vector3 (0,0,5);

    var target = new THREE.Vector3();
    this.cameratren.getWorldPosition(target);
    target.add(puntoDeMiraRelativo);

    this.cameratren.lookAt(target);
  }
  
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (0.5,0.02,0.5);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshStandardMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.01;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 10.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 0.35,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 200, 10)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLight = new THREE.SpotLight( 0xffffff );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 2, 3, 1 );
    this.add (this.pointLight);
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    if (this.general == true)
      return this.camerageneral;
    else
      return this.cameratren;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    if (this.general == true){
      this.camerageneral.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camerageneral.updateProjectionMatrix();
    }
    else{
      this.cameratren.aspect = ratio;
      // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.cameratren.updateProjectionMatrix();
    }
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    if (this.general == true){
      var camara = this.camerageneral;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }
    else{
      var camara = this.cameratren;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }

    camara.updateProjectionMatrix();
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualiza la posición de la cámara según su controlador
    if (this.general == true)
      this.camerageneralControl.update();

    this.circuito.update();

    this.train.update();

    if(this.izquierda && this.trenposicion < 5){
      this.trenposicion +=0.1;
    }
    if(this.derecha &&  this.trenposicion > -5){
      this.trenposicion -=0.1;
    }

    this.train.translateX(this.trenposicion);

    
    for(let i = 0; i<this.objetosVoladores.length; i++)
      this.objetosVoladores[i].update();
    
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
  
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keyup", (event) => scene.onKeyUp(event)); 
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));  
  window.addEventListener ("keypress", (event) => scene.onKeyPress(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();

});
