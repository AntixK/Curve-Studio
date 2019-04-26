var N = 4;
var curr_marker;
var control_points = [];

//UI
var WIDTH = 720;
var HEIGHT = 420;
var canvas;

var bg_colour;
var pt_colour;
var line_color;
var curve_colour;
var text_colour;

var pan_lock =false;

let font;
let button_font;
let num_font;

let NUM_X = 760;
let NUM_Y = 60;
var sensativity = 0.001;
var zoom = 1.00;

//Interactivity
let locked = false;
var export_button;
var import_button;
var reset_button;
var zoom_slider;
var zoom_text;
var zoom_reset_button;
let panx = 0;
let pany = 0;
let pan_offset_x = 0;
let pan_offset_y = 0;

//Data fields
let x_text;
let y_text;
var point_num = [];
var curr_point_id = 0;
var text_field_array = []


// JSON files
let json_file = {};
let in_json_file = [];
//var bspline = require('b-spline');

function preload() {
  font = loadFont('assets/MontserratAlternates-SemiBold.otf');
  button_font = loadFont('assets/VarelaRound.otf');
  num_font = loadFont('assets/SourceCodePro-Light.otf')

}

function setup() {
  bg_colour = color(48, 48, 50);
  text_colour = color(255,255,255);
  pt_colour = color(244, 122, 158);
  line_color = color(141, 205, 193);
  curve_colour = color(250, 163, 0);

  zoom_slider = select('#zoomslider')
  zoom_slider.input(update_zoom);

  curr_marker = new Marker();
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("sketchHolder");
  canvas.mousePressed(click_point);
  canvas.mouseReleased(release_point);
  canvas.doubleClicked(create_point);

  x_text = createP("X");
  x_text.position(NUM_X + 20,15);
  x_text.style('font-size', '20px');
  x_text.style('font-family', num_font.font.names.postScriptName["en"]);
  x_text.style('color', 'white');

  y_text = createP("Y");
  y_text.position(NUM_X +75,15);
  y_text.style('font-size', '20px');
  y_text.style('font-family', num_font.font.names.postScriptName["en"]);
  y_text.style('color', 'white');

  reset_canvas();

  rectMode(RADIUS);
  noStroke();

  zoom_reset_button = new Button("\u2315", 175,HEIGHT+5, 
                                    height='45px', width='45px',
                                    font_size='35px',bgc='transparent',radius='30%');
  zoom_reset_button.mousePressed(zoom_reset);
  export_button = select("#exportjson");
  export_button.position(870,370);
  export_button.mousePressed(export_json);

  import_button = select("#importjson");
  import_button.position(740,370);
  import_button.mousePressed(import_json);

  reset_button = select("#reset");
  reset_button.position(740,300);
  reset_button.mousePressed(reset_canvas);

  // gg= createFileInput(import_json);
  // gg.class("mybutton");
  // gg.style('width', '120px');
  // gg.style('height', '60px');
  // gg.style('font-size', '20px');
  // gg.style('border-radius', '1%');
  // gg.style('background-color', '#0a3242');
  // gg.style('color', 'white');
  // gg.style('border','none');
  // gg.style('font-family', button_font.font.names.postScriptName["en"]);

  //translate(WIDTH/2, HEIGHT/2);
  

}


function draw_lines()
{
  stroke(line_color);
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

function set_in_canvas()
{
  if(
    mouseX > 0 && mouseX < WIDTH &&
    mouseY > 0 && mouseY < HEIGHT
  )
  { 
    return true;
  }
  else
  {
    return false;
  }
}

function draw() 
{
  background(bg_colour);

  scale(zoom);
  
  // if(pan_lock)
  // {
  //   pan_offset_x = mouseX - panx;
  //   pan_offset_y = mouseY - pany;
    
  // }
  // translate(-panx + pan_offset_x, -pany + pan_offset_y);

  draw_lines();
  for(let i =0; i < control_points.length; ++i)
  {

    noStroke();
    fill(pt_colour);
    circle(control_points[i].x, control_points[i].y, control_points[i].boxSize);

    textFont(font);
    textSize(15);
    fill(text_colour);
    text("("+(control_points[i].x).toFixed() + ","+(control_points[i].y).toFixed()+")", 
              control_points[i].x-10, control_points[i].y-20);
  }

  draw_Catmull_Rom();
  create_grid();
  

}

function export_json()
{
  json_file.curve_type = 'Catmull Rom Spline';
  let control_array = [];

  for(let i=0; i<control_points.length;++i)
  {
    let arr = [control_points[i].x, control_points[i].y]
    control_array.push(arr);
  }
  json_file.control_points = control_array;
  saveJSON(json_file, json_file.curve_type+".json");
}

function import_json()
{
  var file = document.getElementById('my-file').click();
  file = document.getElementById('my-file').files[0];

  console.log(file);
  //in_json_file = loadJSON();
  
  
}

function reset_canvas()
{
  zoom = 1.0;
  zoom_slider.value(zoom*100);
  control_points = []
  text_field_array = []
  let k = 0;
  //N = 4;
  for(let i =0; i<N; ++i)
  {
    control_points.push(new Marker());
    
    point_num.push(createElement('p'));
    point_num[i].style('font-size', '18px');
    point_num[i].style('font-family', font.font.names.postScriptName["en"]);
    point_num[i].style('color', 'white');    
    point_num[i].html(i+1);
    point_num[i].style('text-align', 'left');
    point_num[i].position(NUM_X - 20,(NUM_Y - 15)+i*40);

    for(let j = 0; j < 2; ++j)
    {
      text_field_array.push(new TextField(NUM_X + j*60, NUM_Y+i*40));
      text_field_array[k].set_id_coord(i,j);
      if(j==0)
      { 
        text_field_array[k].set_val(control_points[i].x.toFixed(2));
      }
      else
      {
        text_field_array[k].set_val(control_points[i].y.toFixed(2));
      }

      k++;
    }    
  }
  
  noStroke();
}

function update_control_pts()
{
  for(let k =0; k<text_field_array.length; ++k)
  {
    if(text_field_array[k].coord == 0)
    {
      control_points[text_field_array[k].id].x = text_field_array[k].get_val();
    }
    else
    {
      control_points[text_field_array[k].id].y = text_field_array[k].get_val();
    }
  }
}

function update_text_field()
{
  let k = 0;
  for(let i =0; i<N; ++i)
  {
    for(let j = 0; j < 2; ++j)
    {
      if(j==0)
      { 
        text_field_array[k].set_val(control_points[i].x.toFixed(2));
      }
      else
      {
        text_field_array[k].set_val(control_points[i].y.toFixed(2));
      }
      k++;
    }    
  }

}

function update_zoom()
{
  zoom = zoom_slider.value()/100.0;
}

function create_grid()
{
  let w = 20*zoom;
  stroke(255);
  strokeWeight(0.2);
  for(let x=0; x<WIDTH/zoom; x+= w)
  {
    line(x,0, x,HEIGHT/zoom);
    if(x < HEIGHT/zoom)
    {
      line(0,x, WIDTH/zoom,x);
    }
  }
}

function zoom_reset()
{
  zoom = 1.0;
  zoom_slider.value(zoom*100);
}