var control_points = [];
let locked = false;
var v1;
var N = 4;
var bg_colour;
var pt_colour;
var line_color;
var curve_colour;
var curr_marker;
var text_colour;
let font;
var sensativity = 0.001;
var zoom = 1.00;
var curve = [];
//var bspline = require('b-spline');

// function preload() {
//   font = loadFont('D:/p5/p5/empty-example/assets/VarelaRound-Regular.otf');
// }

function setup() {
  bg_colour = color(48, 48, 50);
  text_colour = color(255,255,255);
  pt_colour = color(244, 122, 158);
  line_color = color(141, 205, 193);
  curve_colour = color(250, 163, 0);

  for(let i =0; i<N; ++i)
  {
    control_points.push(new Marker());
  }
  
  curr_marker = new Marker();
  createCanvas(720, 400);

  rectMode(RADIUS);
  noStroke();
}

function draw_lines()
{
  stroke(line_color,alpha=0.0);
  strokeWeight(3);
  for(let i =1; i < control_points.length; ++i)
  {
    line(control_points[i-1].x, control_points[i-1].y, control_points[i].x, control_points[i].y);
  }
}

function draw_Catmull_Rom()
{
  strokeWeight(3.5);
  stroke(curve_colour);
  noFill();
  beginShape();
  for(let i =0; i<control_points.length; ++i)
  {
    curveVertex(control_points[i].x, control_points[i].y);
  }

  endShape();
}

function draw() 
{
  background(bg_colour);

  scale(zoom);
  draw_lines();
  for(let i =0; i < control_points.length; ++i)
  {

    noStroke();
    fill(pt_colour);
    circle(control_points[i].x, control_points[i].y, control_points[i].boxSize);

    //textFont(font);
    textSize(12);
    fill(text_colour);
    text("("+(control_points[i].x).toFixed() + ","+(control_points[i].y).toFixed()+")", control_points[i].x-10, control_points[i].y-20);
  }
  draw_Catmull_Rom();


}

function mousePressed() 
{
  for(let i =0; i < control_points.length; ++i)
  {      
    if (control_points[i].check_in_circle()) 
    { 
      curr_marker = control_points[i];
      locked = true;
      break;
      //fill(244, 122, 158);
    }
    else
    {
      locked = false;
    }
  }
  curr_marker.xOffset = mouseX - curr_marker.x;
  curr_marker.yOffset = mouseY - curr_marker.y;   
  
}

function mouseDragged() 
{
  if (locked) {    
    curr_marker.x = mouseX - curr_marker.xOffset;
    curr_marker.y = mouseY - curr_marker.yOffset;
  }
}

function mouseReleased() 
{
  locked = false;
  curr_marker.boxSize = 15;
}

function doubleClicked() {
  control_points.push(new Marker());
  control_points[control_points.length - 1].x = mouseX;
  control_points[control_points.length - 1].y = mouseY;

}

// function mouseWheel(event) {
//   zoom += sensativity * event.delta;
//   zoom = constrain(zoom, zMin, zMax);
//   //uncomment to block page scrolling
//   return false;
// }