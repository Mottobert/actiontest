export default function sketch(s) {

var data;
var virus = [];
var virusModel;
var myFont;
var highlight = false;
var virus2;
var cols = 4;
var rows = 4;
var deutschland;

// Läd die verschiedenen Assets in das Skript    
s.preload = () => {
  data = s.loadJSON("assets/data2.json");
  virusModel = s.loadModel("assets/virus.obj", true);
  myFont = s.loadFont("assets/Helvetica.ttf");
  deutschland = s.loadImage("assets/deutschland.jpg");
};

// Erstellt ein Virus-Objekt    
function Virus(x, y, name, bev, infiziert, gestorben) {
    this.r = infiziert/bev; //Radius
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.model = virusModel;
    this.name = name;
    this.bev = bev;
    this.infiziert = infiziert;
    this.gestorben = gestorben;
  }

 // Zeichnet das Virus-Modell, lässt es drehen, gibt ihm seine Farbe und zeigt bei geklickter Maus den Namen des Bundeslandes an
 Virus.prototype.display = (x, y, r, name, bev, gestorben, model, infiziert) => {
    s.translate(x, y);
    
    s.push();
    s.scale(r * 25);
    s.rotateX(s.frameCount * r);
    s.rotateY(s.frameCount * r);
    
    var c = s.map(gestorben/bev, 0, 0.0002, 255, 40);
    s.ambientMaterial(c, 0, 0);
    s.noStroke();
    s.model(model);
    s.pop();
    
    // Wenn mit der Maus in das Canvas geklickt wird, werden die Namen der Bundesländer angezeigt
    if(highlight){
      s.push();
      s.textAlign(s.CENTER, s.CENTER);
      s.textFont(myFont);
      s.textSize(10);
      s.translate(0, 0, 10);
      s.fill(c, 0, 0);
      s.text(name, 0, r * 3000 + 5);
      s.text(infiziert, -20, r * 3000 + 15);
      s.text(gestorben, 20, r * 3000 + 15);
      s.pop();
    }
    s.translate(-x, -y);
  };
  
  // Lässt das Virus-Objekt leicht hin und her wackeln
  Virus.prototype.movement = (x, y, startX, startY, r) => {
    var xspeed;
    var yspeed;
    var tempX = x;
    var tempY = y;
    var margin = 10; //Bereich links, rechts, oben und unten in dem es sich bewegen darf
    
    var nF = 80;
    
    // Wenn die Maus geklickt wird, wird die Bewegung gestoppt  
    if(highlight){
      xspeed = 0;
      yspeed = 0;
    } else {
      xspeed = s.random(-r*nF, r*nF);
      yspeed = s.random(-r*nF, r*nF);
    }
    
    // Bewegung wird auf + und - margin begrenzt  
    tempX = s.constrain(x, startX-margin, startX+margin);
    tempY = s.constrain(y, startY-margin, startY+margin);
    
    x = tempX + xspeed;
    y = tempY + yspeed;
      
      return [x,y];
  };


s.setup = () => {
  s.createCanvas(800, 800, s.WEBGL);
  
  // Die verschiedenen Virus-Objekt werden mithilfe der data2.json Datei erstellt und mit deren Inhalt befüllt 
  // Da jedes Virus-Objekt, auf der Karte in dem jeweiligen Bundesland liegen soll, werden die Objekte manuell mit den richtigen Koordinaten versehen 
    
  for(let i = 0; i < data.length; i++){
      virus[index] = new Virus(data[i].x, data[i].y, data[i].Bundesland, data[i].Einwohner, data[i].Infektionen, data[i].Todesfälle);
  }
    
  //var index = 0;
  //virus[index] = new Virus(-60, 170, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 1;
  //virus[index] = new Virus(70, 160, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 2;
  //virus[index] = new Virus(130, -130, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 3;
  //virus[index] = new Virus(150, -50, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 4;
  //virus[index] = new Virus(-90, -140, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 5;
  //virus[index] = new Virus(-20, -160, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 6;
  //virus[index] = new Virus(-55, 30, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 7;
  //virus[index] = new Virus(90, -190, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 8;
  //virus[index] = new Virus(-20, -90, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 9;
  //virus[index] = new Virus(-130, -30, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 10;
  //virus[index] = new Virus(-130, 50, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 11;
  //virus[index] = new Virus(-150, 120, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 12;
  //virus[index] = new Virus(130, 10, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 13;
  //virus[index] = new Virus(50, -50, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 14;
  //virus[index] = new Virus(-40, -230, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  //
  //index = 15;
  //virus[index] = new Virus(25, 20, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
};

s.draw = () => {
  s.background(255);
    
  // Dei Karte im Hintergrund wird geladen und wird nach hinten geschoben, damit die Virus-Objekte nicht in dem Bild stecken    
  s.translate(0, 0, -150);
  s.image(deutschland, -450, -450, 900, 900);
  s.translate(0, 0, 150);
    
  // Der Text für die Legende wird erstellt   
  s.textAlign(s.LEFT, s.CENTER);
  s.textFont(myFont);
  s.fill(0);
  s.textSize(16);
  s.text("Virusgöße: Infektionen in Abhängikeit zur Bevölkerung", -350, 340);
  s.text("Farbe: Verstorbene in Abhängikeit zur Bevölkerung", -350, 360);
  s.text("Linke Zahl: Infizierte", -350, 380);
  s.text("Rechte Zahl: Verstorbene", -150, 380);

  // Ein Ambient Licht wird zur allgemeinen Aufhellung verwendet und zusätzlich gibt es ein Punktlicht, welches sein Position in Abhängigkeit zur Maus verändert
  let locX = s.mouseX - s.height / 2;
  let locY = s.mouseY - s.width / 2;
    
  s.ambientLight(100, 100, 100);
  s.pointLight(255, 255, 255, locX, locY, 100);
  
  // Der Inhalt des Canvas wird noch einmal anders skaliert    
  s.push();
  s.scale(1.25);    
    
  // Die verschiedenen Virus-Objekte werden bewegt und anschließend gezeichnet    
  for(let j = 0; j < virus.length; j++){
    let temp = virus[j].movement(virus[j].x, virus[j].y, virus[j].startX, virus[j].startY, virus[j].r);
    virus[j].x = temp[0];
    virus[j].y = temp[1];
    
    virus[j].display(virus[j].x, virus[j].y, virus[j].r, virus[j].name, virus[j].bev, virus[j].gestorben, virus[j].model, virus[j].infiziert);
  }  
};
    
  s.pop();    

// Wenn die Maus geklickt wird    
s.mousePressed = () => {
  highlight = true;
};

// Wenn die Maus losgelassen wird    
s.mouseReleased = () => {
  highlight = false;
};
    
};