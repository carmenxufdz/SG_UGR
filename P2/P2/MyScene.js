
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
    
    this.reloj = new THREE.Clock();

    // variable global para cambiar de camara
    this.general = true; 
    this.tercera= false;
    this.primera = false;

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    this.izquierda = false;
    this.derecha = false;

    this.trenrotacion = 0;

    this.puntosLibros = 50;
    this.puntosSnitch = 500;
    this.puntos = 0.0

    this.invencible = false;
    this.aumentoV = false;
    this.reduccionV = false;
    this.doblarPuntos = false;
    this.mitadPuntos = false;

    this.velocidad = 0.005;
    
    this.time;
    this.timeContador;
    
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

    this.boxTrain = new THREE.Box3();
    this.boxTrain.setFromObject(this.train);

    var boxTrainVisible = new THREE.Box3Helper(this.boxTrain, 0xffffff);
    this.add(boxTrainVisible);

    this.createCameraTerceraPersona();
    this.createCameraPrimeraPersona();

    this.createObjectsColisiones();

    this.createObjectsVoladores();
    
    this.objetosVoladores = [
      this.book0, this.book1, this.book2, this.book3, this.book4, 
      this.book5, this.book6, this.book7, this.book8,
      this.snitch,
    ]
    

  }

  createObjectsColisiones(){

    // OBJETOS BUENOS //
    
    this.coin0 = new Coin(this.gui, "Controles de la Figura");
    this.coin0.position.set(30,10.25, 22.5);
    this.add(this.coin0);

    this.boxCoin0 = new THREE.Box3();
    this.boxCoin0.setFromObject(this.coin0);

    //var boxCoin0Visible = new THREE.Box3Helper(this.boxCoin0, 0xffffff);
    //this.add(boxCoin0Visible);

    this.mushroom0 = new Mushroom(this.gui, "Controles de la Figura");
    this.mushroom0.position.set(110, 16, 50);
    this.add(this.mushroom0);

    this.boxMushrrom0 = new THREE.Box3();
    this.boxMushrrom0.setFromObject(this.mushroom0);

    //var boxMushroom0Visible = new THREE.Box3Helper(this.boxMushrrom0, 0xffffff);
    //this.add(boxMushroom0Visible);

    this.wand0 = new Wand(this.gui, "Controles de la Figura");
    this.wand0.position.set(22, 10, -100);
    this.add(this.wand0);

    
    this.boxWand0 = new THREE.Box3();
    this.boxWand0.setFromObject(this.wand0);

    //var boxWand0Visible = new THREE.Box3Helper(this.boxWand0, 0xffffff);
    //this.add(boxWand0Visible);

    this.ring0 = new Ring(this.gui, "Controles de la Figura");
    this.ring0.position.set(20, -10, 140);
    this.ring0.rotateZ(180*Math.PI/180);
    this.add(this.ring0);

    
    this.boxRing0 = new THREE.Box3();
    this.boxRing0.setFromObject(this.ring0);

    //var boxRing0Visible = new THREE.Box3Helper(this.boxRing0, 0xffffff);
    //this.add(boxRing0Visible);

    this.goodpotion0 = new GoodPotion(this.gui, "Controles de la Figura");
    this.goodpotion0.position.set(20, -10.5, 80);
    this.goodpotion0.rotateZ(180*Math.PI/180);
    this.add(this.goodpotion0);

    
    this.boxGoodpotion0 = new THREE.Box3();
    this.boxGoodpotion0.setFromObject(this.goodpotion0);
    
    //var boxGoodpotion0Visible = new THREE.Box3Helper(this.boxGoodpotion0, 0xffffff);
    //this.add(boxGoodpotion0Visible);

    // OBJETOS MALOS //

    this.rayo0 = new Rayo(this.gui, "Controles de la Figura");
    this.rayo0.position.set(127,-10.25, -120);
    this.rayo0.rotateZ(180*Math.PI/180);
    this.add(this.rayo0);

    
    this.boxRayo0 = new THREE.Box3();
    this.boxRayo0.setFromObject(this.rayo0);
    
    //var boxRayo0Visible = new THREE.Box3Helper(this.boxRayo0, 0xffffff);
    //this.add(boxRayo0Visible);
    
    this.badmushroom0 = new BadMushroom(this.gui, "Controles de la Figura");
    this.badmushroom0.position.set(85,10, -20);
    this.add(this.badmushroom0);


    this.boxBadmushroom0 = new THREE.Box3();
    this.boxBadmushroom0.setFromObject(this.badmushroom0);
    
    //var boxBadmushroom0Visible = new THREE.Box3Helper(this.boxBadmushroom0, 0xffffff);
    //this.add(boxBadmushroom0Visible);

    this.skull0 = new Skull(this.gui, "Controles de la Figura");
    this.skull0.position.set(-5,9.5, -40);
    this.add(this.skull0);


    this.boxSkull0 = new THREE.Box3();
    this.boxSkull0.setFromObject(this.skull0);
    
    //var boxSkull0Visible = new THREE.Box3Helper(this.boxSkull0, 0xffffff);
    //this.add(boxSkull0Visible);

    this.apple0 = new Apple(this.gui, "Controles de la Figura");
    this.apple0.position.set(90,10, 140);
    this.add(this.apple0);


    this.boaxApple0 = new THREE.Box3();
    this.boaxApple0.setFromObject(this.apple0);
    
    //var boaxApple0Visible = new THREE.Box3Helper(this.boaxApple0, 0xffffff);
    //this.add(boaxApple0Visible);

    this.badpotion0 = new BadPotion(this.gui, "Controles de la Figura");
    this.badpotion0.position.set(55,-10.5, -90);
    this.badpotion0.rotateZ(180*Math.PI/180);
    this.add(this.badpotion0);


    this.boxBadpotion0 = new THREE.Box3();
    this.boxBadpotion0.setFromObject(this.badpotion0);
    
    //var boxBadpotion0Visible = new THREE.Box3Helper(this.boxBadpotion0, 0xffffff);
    //this.add(boxBadpotion0Visible);
  }

  createObjectsVoladores(){

    this.book0 = new Book(this.gui, "Controles de la Figura")
    this.book0.position.set(12, 12, 15);
    this.add(this.book0);

    this.book1 = new Book(this.gui, "Controles de la Figura") //primer libro
    this.book1.position.set(50, 15,140);
    this.add(this.book1);

    this.book2 = new Book(this.gui, "Controles de la Figura")
    this.book2.position.set(-10, -20, -35);
    this.book2.rotateZ(180*Math.PI/180);
    this.add(this.book2);

    this.book3 = new Book(this.gui, "Controles de la Figura")
    this.book3.position.set(100, 25, 30);
    this.add(this.book3);

    this.book4 = new Book(this.gui, "Controles de la Figura")
    this.book4.position.set(140, -15, -60);
    this.book4.rotateZ(180*Math.PI/180);
    this.add(this.book4);

    this.book5 = new Book(this.gui, "Controles de la Figura")
    this.book5.position.set(45, 13, -110);
    this.add(this.book5);

    this.book6 = new Book(this.gui, "Controles de la Figura")
    this.book6.position.set(70, -15, 80);
    this.book6.rotateZ(180*Math.PI/180);
    this.add(this.book6);

    this.book7 = new Book(this.gui, "Controles de la Figura")
    this.book7.position.set(140, 15, -120);
    this.add(this.book7);

    this.book8 = new Book(this.gui, "Controles de la Figura")
    this.book8.position.set(20, -17, 150);
    this.book8.rotateZ(180*Math.PI/180);
    this.add(this.book8);

    this.snitch = new Snitch(this.gui, "Controles de la Figura");
    this.add(this.snitch);

  }

  colisiones(){
    if(this.boxTrain.intersectsBox(this.boxCoin0) && !this.coin0.removed){
      this.coin0.removed = true;
      this.remove(this.boxCoin0);
      this.remove(this.coin0);

      this.time = Date.now();
      this.timeContador = Date.now() - this.time;
      this.aumentoV = true;
      this.train.velocidad += this.velocidad;
    }

    if(this.boxTrain.intersectsBox(this.boxMushrrom0) && !this.mushroom0.removed){
      this.mushroom0.removed = true;
      this.remove(this.boxMushrrom0);
      this.remove(this.mushroom0);
      this.train.velocidad += this.velocidad;
    }

    if(this.boxTrain.intersectsBox(this.boxWand0) && !this.wand0.removed){
      this.wand0.removed = true;
      this.invencible = true;
      this.time = Date.now();
      this.timeContador = Date.now() - this.time;

      this.remove(this.boxWand0);
      this.remove(this.wand0);
    }

    if(this.boxTrain.intersectsBox(this.boxRing0) && !this.ring0.removed){
      this.ring0.removed = true;
      this.remove(this.boxRing0);
      this.remove(this.ring0);
      this.puntos*=2;
    }

    if(this.boxTrain.intersectsBox(this.boxGoodpotion0) && !this.goodpotion0.removed){
      this.goodpotion0.removed = true;
      this.remove(this.boxGoodpotion0);
      this.remove(this.goodpotion0);

      this.time = Date.now();
      this.timeContador = Date.now() - this.time;
      this.doblarPuntos = true;
    }

    // OBJETOS MALOS

    if(!this.invencible){

      if(this.boxTrain.intersectsBox(this.boxRayo0) && !this.rayo0.removed){
        this.rayo0.removed = true;
        this.remove(this.boxRayo0);
        this.remove(this.rayo0);
          
        this.time = Date.now();
        this.timeContador = Date.now() - this.time;
        this.reduccionV = true;
        this.train.velocidad -= this.velocidad;
      }
  
      if(this.boxTrain.intersectsBox(this.boxBadmushroom0) && !this.badmushroom0.removed){
        this.badmushroom0.removed = true;
        this.remove(this.boxBadmushroom0);
        this.remove(this.badmushroom0);
        this.train.velocidad -= this.velocidad;
      }
  
      if(this.boxTrain.intersectsBox(this.boxSkull0) && !this.skull0.removed){
        this.skull0.removed = true;
        this.remove(this.boxSkull0);
        this.remove(this.skull0);
      }
  
      if(this.boxTrain.intersectsBox(this.boaxApple0) && !this.apple0.removed){
        this.apple0.removed = true;
        this.remove(this.boaxApple0);
        this.remove(this.apple0);
        this.puntos/=2;
      }
  
      if(this.boxTrain.intersectsBox(this.boxBadpotion0) && !this.badpotion0.removed){
        this.badpotion0.removed = true;
        this.remove(this.boxBadpotion0);
        this.remove(this.badpotion0);

          
        this.time = Date.now();
        this.timeContador = Date.now() - this.time;
        this.mitadPuntos = true;
      }
    }
  }

  onKeyDown = function (event){

    if(event.keyCode == 65){ // A
      this.izquierda = true;
    }
    if(event.keyCode == 68){ // D
      this.derecha = true;
    }
  }

  onKeyPress = function (event){
    if (event.keyCode === 32) { // 32 es el código de la tecla de la barra espaciadora
      if (this.general){
         this.general = !this.general;
         this.tercera  = !this.tercera;
      }
      else if (this.tercera){
        this.tercera = !this.tercera;
        this.primera  = !this.primera;
      }
      else if(this.primera){
        this.primera = !this.primera;
        this.general  = !this.general;
      }
    }
  }

  onDocumentMouseDown(event) {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // Reutilizamos esos objetos, evitamos construirlos en cada pulsación
    // Se obtiene la posición del clic

    // en coordenadas de dispositivo normalizado
    // - La esquina inferior izquierda tiene la coordenada (-1, -1)
    // - La esquina superior derecha tiene la coordenada (1, 1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    // Se actualiza un rayo que parte de la cámara (el ojo del usuario)
    // y que pasa por la posición donde se ha hecho clic
    this.raycaster.setFromCamera(this.mouse, this.cameratercerapers);

    // Hay que buscar qué objetos intersecan con el rayo
    // Es una operación costosa, solo se buscan intersecciones
    // con los objetos que interesan en cada momento
    // Las referencias de dichos objetos se guardan en un array
    // pickableObjects vector de objetos donde se van a buscar intersecciones con el rayo
    // pickedObjects vector donde se almacenan los Meshes intersecados por el rayo
    // ordenado desde el más cercano a la cámara hasta el más lejano
    
    var pickedObjects = this.raycaster.intersectObjects(this.objetosVoladores, true);

    // El parámetro true indica que se deben buscar intersecciones en los nodos del vector y sus descendientes
    if (pickedObjects.length > 0) { // hay algún Mesh clicado
      // Se puede referenciar el Mesh clicado
      var selectedObject = pickedObjects[0].object;

      // Mostrar por consola el objeto que se selecciona y el punto en el que se ha seleccionado
      console.log('Objeto seleccionado:', selectedObject);
      console.log('Punto de intersección:', pickedObjects[0].point);

      
      // Identificar cuál de los objetos de pickableObjects ha sido seleccionado MEDIANTE ID (NO FUNCIONA PORQ NO COINCIDEN)
      for (let i = 0; i < this.objetosVoladores.length; i++) {
        console.log('Comparando:', this.objetosVoladores[i], 'con', selectedObject);
        if (this.objetosVoladores[i].uuid === selectedObject.parent.uuid) {
            console.log('El objeto seleccionado es:', this.objetosVoladores[i]);
            // Eliminar el objeto seleccionado de la escena
            this.remove(this.objetosVoladores[i]);

            // PUNTOS LIBROS
            if(this.mitadPuntos){
              this.puntos += this.puntosLibros/2;
            }
            else if(this.doblarPuntos){
              this.puntos += this.puntosLibros*2;
            }
            else
              this.puntos += this.puntosLibros;
            // Eliminar el objeto de pickableObjects
            this.objetosVoladores.splice(i, 1);
            break;
        }
      }
    }
  }

  setMessagePoints(str) {
    document.getElementById("Points").innerHTML = "<h2>" + "Puntos: " + str + "</h2>";
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

    this.cameratercerapers = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000);

    this.train.add (this.cameratercerapers);
    this.cameratercerapers.position.set(0,125,-100);

    var puntoDeMiraRelativo = new THREE.Vector3 (0,0,2.5);

    var target = new THREE.Vector3();
    this.cameratercerapers.getWorldPosition(target);
    target.add(puntoDeMiraRelativo);

    this.cameratercerapers.lookAt(target);
  }

  
  createCameraPrimeraPersona () { //camara subjetiva

    this.cameratren = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000);

    this.train.add (this.cameratren);
    this.cameratren.position.set(0,110.1,0);

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
    else if (this.tercera == true)
      return this.cameratercerapers;
    else (this.primera == true)
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
    if (this.tercera == true){
      this.cameratercerapers.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.cameratercerapers.updateProjectionMatrix();
    }
    if (this.primera == true){
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
    if (this.tercera == true){
      var camara = this.cameratercerapers;
      var nuevaRatio = window.innerWidth / window.innerHeight;
      camara.aspect = nuevaRatio;
    }
    if (this.primera == true){
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

    
    for(let i = 0; i<this.objetosVoladores.length; i++)
      this.objetosVoladores[i].update();
    

    if(this.izquierda)
      this.trenrotacion -=0.1;

    if(this.derecha)
      this.trenrotacion +=0.1;

    this.train.rotateZ(this.trenrotacion);
    
    this.izquierda = false;
    this.derecha = false;

    this.boxTrain.setFromObject(this.train);

    this.colisiones();

    if(this.invencible && this.timeContador < 10000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.invencible = false;
    }
  
    if(this.mitadPuntos && this.timeContador < 10000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.mitadPuntos = false;
    }

    if(this.doblarPuntos && this.timeContador < 10000){
      this.timeContador = Date.now() - this.time;
    }
    else{
      this.doblarPuntos = false;
    }


    if(this.aumentoV && this.timeContador < 10000){
      this.timeContador = Date.now() - this.time;
    }
    else if(this.aumentoV && this.timeContador > 10000){
      this.aumentoV = false;
      this.train.velocidad -= this.velocidad;
    }


    if(this.reduccionV && this.timeContador < 10000){
      this.timeContador = Date.now() - this.time;
    }
    else if(this.reduccionV && this.timeContador > 10000){
      this.reduccionV = false;
      this.train.velocidad += this.velocidad;
    }

    this.setMessagePoints(this.puntos);
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
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));  
  window.addEventListener ("keypress", (event) => scene.onKeyPress(event));
  window.addEventListener ("mousedown", (event) => scene.onDocumentMouseDown(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();

});
