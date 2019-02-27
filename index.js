var config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  /*
  Tenemos que conectar las etapas del juego con nuestras funciones!
  */
  scene: {
    preload: cargarAntesDeEmpezar,
    create: inicializarJuego
  },
  pixelArt: true,
};

/********** VARIABLES *************/

var plataformas;
var trofeo;
var enemigos;
var premios;
var personaje;

/********** FIN DE VARIABLES *************/


/*
La función cargarAntesDeEmpezar() nos permite precargar imágenes / sonidos / textos para que el juego comience sin fallas. La conectamos al juego en la sección de config (arriba)
*/ 
function cargarAntesDeEmpezar() {
  // la primer palabra es el nombre clave de la imagen, la segunda la ubicación del archivo real, no tienen por qué coincidir
  this.load.image('plataforma', 'assets/pisos/plataforma1.png');
  this.load.image('plataforma2', 'assets/pisos/plataforma2.png');
  this.load.image('plataforma4', 'assets/pisos/plataforma4.png');
  this.load.image('piso', 'assets/pisos/piso.png');
  this.load.image('premio', 'assets/estrella.png');
  this.load.image('trofeo', 'assets/trofeo.png');
  this.load.image('enemigo', 'assets/malo.png');
  this.load.image('personaje', 'assets/personaje.png');
}

/*
La función inicializarJuego() nos permite inicializar los elementos del juego
*/
function inicializarJuego() {
  
  /********** CREACION DE FONDO *************/
  
  var fondo = this.add.graphics();
  fondo.fillGradientStyle(0x8787FF, 0x8787FF, 0xFFFFFF, 0xFFFFFF, 1, 1);
  fondo.fillRect(0, 0, config.width, config.height);
  
  /********** FIN CREACION DE FONDO *************/

  /********** CREACION DE PLATAFORMAS *************/
  
  /*
  Un staticGroup() contiene elementos que no van a seguir las leyes de la física como la gravedad.
  */
  plataformas = this.physics.add.staticGroup(); // probá poniendo group() en vez de staticGroup()!
  /*
  Parecido a this.add.image() o this.add.rectangle()
  Todo staticGroup permite usar su función create() que necesita 3 ingredientes:
    - x, y, 'nombre clave de la imagen' (como la definimos en preload)
  */
  plataformas.create(290, 355, 'plataforma'); 
  plataformas.create(293, 131, 'plataforma2');
  plataformas.create(73, 207,  'plataforma2');
  plataformas.create(180, 425, 'plataforma4');
  plataformas.create(68, 512, 'plataforma2');
  plataformas.create(182, 630, 'piso');
  
  /********** FIN DE CREACION DE PLATAFORMAS *************/
  
  /********** CREACION DE TROFEO *************/
  
  trofeo = this.physics.add.image(300, 80, 'trofeo');
  trofeo.setScale(0.5);
  this.physics.add.collider(trofeo, plataformas);
  
  /********** FIN DE CREACION DE TROFEO *************/

  /********** CREACION DE PREMIOS *************/
  
  premios = this.physics.add.group();  
  premios.create(40, 160, 'premio');
  this.physics.add.collider(premios, plataformas);
  
  /********** FIN DE CREACION DE PREMIOS *************/
  
  /********** CREACION DE ENEMIGOS *************/
  
  enemigos = this.physics.add.group(); 
  enemigos.create(271, 327, 'enemigo').setScale(2.2);
  this.physics.add.collider(enemigos, plataformas);
  
  /********** FIN DE CREACION DE ENEMIGOS *************/
  
  /********** CREACION DE PERSONAJE *************/
  
  personaje = this.physics.add.image(255, 500, 'personaje');
  this.physics.add.collider(personaje, plataformas);
  
  /********** FIN DE CREACION DE PERSONAJE *************/
  
}

new Phaser.Game(config);