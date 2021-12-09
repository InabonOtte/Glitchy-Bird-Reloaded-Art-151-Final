//concept; Capturing the disapointment felt on the moment of impact during a OG flappy bird game. Center your face to the camera and try your best!
console.log(
  "Game Rules: Its kinda like golf or a knife fight! You want the lowest score possible.Get a hit and a piece of your self is digitalized!                  Please Play & Enjoy <3"
);
//backdrop//img
let ded;
//
//rhythmic motion
let cx, cy;
let radius = 50;
let animatedX, animatedY;
let angle = 0.01;
let size = 1;
//
// vanity
let webcam;
// tetris var
var rects = [];
var numRects = 50;
var cir;
//
function preload(){
  ded = loadImage('ded.PNG');
}
function setup() {
  //rhythmic peram
  cx = width / 2;
  cy = height / 2;
  //
  colorMode(HSB);
  //
  createCanvas(1000, 1000);
  //pix
  webcam = createCapture(VIDEO);
  webcam.size(1000, 1000);
  webcam.hide();
  //
  for (i = 0; i < numRects; i++) {
    //tetris engine ish
    r = new rectObj(
      random(width),
      random(height),
      random(70, 300),
      random(20, 40)
    ); // generate a rectObj
    rects.push(r); //add it to the array.
    //
  }
  cir = new circleObj(size); // create a new circle object
  // here we let the angle that determines the sine and cos of our x,y
  // position be determined by the number of frames (reversed)

  //
  console.log(rects);
}

function draw() {
  background(ded,0,0);
  //
  animatedX=cx+cos(angle)*radius;
  animatedY=cy+sin(angle)*radius;
  //
  for (i = 0; i < numRects; i++) {
    //where the collision starts
    rects[i].disp();
    rects[i].collide(cir); //collide against the circle object
  }

  cir.disp(mouseX, mouseY); //passing the x,y pos in to the circle.
}

function rectObj(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color(random(255), random(255), random(255));
  this.hit = false;

  this.collide = function (obj) {
    this.hit = collideRectCircle(
      this.x,
      this.y,
      this.w,
      this.h,
      obj.x,
      obj.y,
      obj.dia
    ); //collide the player object into this rectobject.

    if (this.hit) {
      //think effect of impact
      console.log("Ouch! that Hurt!");
      rectMode(CENTER);
      image(webcam, 0, 0);
      let pixSize = 12;
      for (let x = 0; x < webcam.width; x += pixSize) {
        for (let y = 0; y < webcam.height; y += pixSize) {
          let c = get(x, y);
          let cBri = brightness(c);
          fill(cBri);
          circle(x, y, pixSize);
          //
        }
      } 
      this.color = color(0); //set this rectangle to be black if it gets hit
     
  }}

  this.disp = function () {
    noStroke();
    fill(this.color);
    this.x += 7.5; //move to the right!
    if (this.x > width) {
      //loop to the left!
      this.x = -this.w;
    }
    rect(this.x, this.y, this.w, this.h);
  };
}

function circleObj(dia) {
  this.dia = dia;
  this.color = color(random(255), random(200), random(255));
  this.x;
  this.y;

  this.disp = function (x, y) {
    this.x = x;
    this.y = y;
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, size, size);
     size=map(sin(angle),-1,1,50,100);
  //
  //size=sin(angle)*150;  ///in and out pop
  //
  angle=angle + 0.06;
  ///Speed
  }
}
