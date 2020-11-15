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

s.preload = () => {
  data = s.loadJSON("assets/data2.json");
  virusModel = s.loadModel("assets/virus.obj", true);
  myFont = s.loadFont("assets/Helvetica.ttf");
  deutschland = s.loadImage("assets/deutschland.jpg");
};

function Virus(x, y, name, bev, infiziert, gestorben) {
    this.r = infiziert/bev;
    
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
  
 Virus.prototype.display = (x, y, r, name, bev, gestorben, model) => {
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
    
    if(highlight){
      s.push();
      s.textAlign(s.CENTER, s.CENTER);
      s.textFont(myFont);
      s.translate(0, 0, 10);
      s.fill(c, 0, 0);
      s.text(name, 0, r * 3000 + 5);
      s.pop();
    }
    s.translate(-x, -y);
  };
  
  
  Virus.prototype.movement = (x, y) => {
    var xspeed;
    var yspeed;
    var tempX = x;
    var tempY = y;
    var margin = 10;
    
    var nF = 80;
    
    if(highlight){
      xspeed = 0;
      yspeed = 0;
    } else {
      xspeed = random(-this.r*nF, this.r*nF);
      yspeed = random(-this.r*nF, this.r*nF);
    }
    
    tempX = constrain(this.x, this.startX-margin, this.startX+margin);
    tempY = constrain(this.y, this.startY-margin, this.startY+margin);
    
    this.x = tempX + xspeed;
    this.y = tempY + yspeed;
  };


s.setup = () => {
  s.createCanvas(600, 600, s.WEBGL);
  
  var index = 0;
  virus[index] = new Virus(-60, 170, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 1;
  virus[index] = new Virus(60, 150, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
   index = 2;
  virus[index] = new Virus(120, -100, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 3;
  virus[index] = new Virus(150, -50, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 4;
  virus[index] = new Virus(-60, -140, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 5;
  virus[index] = new Virus(-20, -160, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 6;
  virus[index] = new Virus(-65, 45, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 7;
  virus[index] = new Virus(90, -180, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 8;
  virus[index] = new Virus(-20, -90, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 9;
  virus[index] = new Virus(-120, -30, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 10;
  virus[index] = new Virus(-140, 80, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 11;
  virus[index] = new Virus(-150, 120, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 12;
  virus[index] = new Virus(130, 10, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 13;
  virus[index] = new Virus(50, -50, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 14;
  virus[index] = new Virus(-30, -210, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
  
  index = 15;
  virus[index] = new Virus(25, 20, data[index].Bundesland, data[index].Einwohner, data[index].Infektionen, data[index].Todesfälle);
};

s.draw = () => {
  s.background(200);
  
  let locX = s.mouseX - s.height / 2;
  let locY = s.mouseY - s.width / 2;

  s.ambientLight(100, 100, 100);
  s.pointLight(255, 255, 255, locX, locY, 100);
  
  for(let j = 0; j < virus.length; j++){
    virus[j].movement(virus[j].x, virus[j].y);
    virus[j].display(virus[j].x, virus[j].y, virus[j].r, virus[j].name, virus[j].bev, virus[j].gestorben, virus[j].model);
  }  
};

s.mousePressed = () => {
  highlight = true;
};

s.mouseReleased = () => {
  highlight = false;
};
    
};