var INITIAL_NUM_PTS = 5;
var N = INITIAL_NUM_PTS;
var MAX_NUM_PTS = 15;
var curr_marker;
var control_points = [];
var curve_points;
var curve_choice = 'Catmull Rom Spline';
var degree = 2;
var degree_slider;
let clamped_box;
var clamped_curve = true;
var control_pts_scale = 1.0;

var curve_dict = {
  'Catmull Rom Spline': 0,
  'Bezier': 1,
  'NURBS': 2,
};

//UI
var WIDTH = 720;
var HEIGHT = 480;
var canvas;

var bg_colour;
var pt_colour;
var line_color;
var curve_colour;
var text_colour;

let font;
let button_font;
let num_font;

let NUM_X = WIDTH+20;
let NUM_Y = 155;

var mouse_pos;


//Interactivity
let locked = false;
var export_button;
var import_button;
var reset_button;

var sensativity = 0.001;
var zoom = 1.00;
var zoom_slider;
var zoom_text;
var zoom_reset_button;

var pan_lock =false;
let panx = 0;
let pany = 0;
let pan_offset_x = 0;
let pan_offset_y = 0;
let pan_reset_button;

var tab_handle = 0;

var tab_content;

//Data fields
let x_text;
let y_text;
let w_text;
let degree_text;
let x_mark;
var curr_point_id = 0;
var text_field_array = []
var text_offset_x = 25;
var text_offset_y = 0;


// JSON files
let json_file = {};
let in_json_file;
var file_handle;

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

  zoom_slider = select('#zoomslider');
  zoom_slider.position(10, HEIGHT + 22);
  zoom_slider.input(update_zoom);


  curr_marker = new Marker();
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("sketchHolder");
  canvas.mousePressed(click_point);
  canvas.mouseReleased(release_point);
  canvas.doubleClicked(create_point);
  canvas.mouseWheel(scroll_zoom);
  

  tab_content = select("#myDIV");
  tab_content.position(NUM_X, NUM_Y);

  x_text = createP("X");
  x_text.position(NUM_X + 30 + text_offset_x,NUM_Y-50+text_offset_y);
  x_text.style('font-size', '20px');
  x_text.style('font-family', button_font.font.names.postScriptName["en"]);
  x_text.style('color', 'white');

  y_text = createP("Y");
  y_text.position(NUM_X +115 + text_offset_x,NUM_Y-50 + text_offset_y);
  y_text.style('font-size', '20px');
  y_text.style('font-family', button_font.font.names.postScriptName["en"]);
  y_text.style('color', 'white');

  w_text = createP("W");
  w_text.position(NUM_X +195 + text_offset_x,NUM_Y-50 + text_offset_y);
  w_text.style('font-size', '20px');
  w_text.style('font-family', button_font.font.names.postScriptName["en"]);
  w_text.style('color', 'white');
  
  mouse_pos = createP("");
  mouse_pos.position(WIDTH - 125- text_offset_x,HEIGHT + text_offset_y);
  mouse_pos.style('font-size', '18px');
  mouse_pos.style('font-family', num_font.font.names.postScriptName["en"]);
  mouse_pos.style('color', 'white');

  x_mark = createElement('p','\u2718');
  x_mark.parent("content");
  x_mark.style('font-family', button_font.font.names.postScriptName["en"]);
  x_mark.style('color','white');
  x_mark.style('font-weight', 'bold');
  x_mark.mouseOver(highlight_x_mark);
  x_mark.mouseOut(dehighlight_x_mark);
  x_mark.mouseClicked(delete_point);
  
  degree_text = createP("Degree");
  degree_text.position(NUM_X -10 + text_offset_x, NUM_Y-85);
  degree_text.style('font-size', '20px');
  degree_text.style('font-family', button_font.font.names.postScriptName["en"]);
  degree_text.style('color', 'white');

  degree_slider =select("#degreeslider"); 
  //degree_slider.parent("container");
  degree_slider.style('width','70px');
  degree_slider.style('text-align','center');
  degree_slider.attribute('min', '1');
  degree_slider.attribute('max',(INITIAL_NUM_PTS -1).toString());
  degree_slider.position(NUM_X + 90, NUM_Y - 65);
  degree_slider.changed(update_degree);

  let clamp_text = createP("Clamp");
  clamp_text.position(NUM_X +190 + text_offset_x, NUM_Y-85);
  clamp_text.style('font-size', '20px');
  clamp_text.style('font-family', button_font.font.names.postScriptName["en"]);
  clamp_text.style('color', 'white');

  clamped_box = select("#clampedbox");
  clamped_box.style('font-size', '20px');
  clamped_box.style('font-family', button_font.font.names.postScriptName["en"]);
  clamped_box.style('color', 'white');
  clamped_box.position(NUM_X + 180, NUM_Y - 68);
  clamped_box.changed(set_clamped);
  update_clamped_box(); 

  reset_canvas(false);

  rectMode(RADIUS);
  noStroke();

  zoom_reset_button = new Button("\u2315", 135,HEIGHT+5, 
                                    height='45px', width='45px',
                                    font_size='30px',bgc='transparent',radius='30%');
  zoom_reset_button.mousePressed(zoom_reset);

  pan_reset_button = new Button("\u2610", 165,HEIGHT+5, 
                                    height='45px', width='45px',
                                    font_size='30px',bgc='transparent',radius='30%');
  pan_reset_button.mousePressed(pan_reset);
  
  export_button = select("#exportjson");
  export_button.position(WIDTH+150,HEIGHT-50);
  export_button.mousePressed(export_json);

  import_button = select("#importjson");
  import_button.position(WIDTH+20,HEIGHT-50);
  import_button.mousePressed(import_json);

  reset_button = select("#reset");
  reset_button.position(WIDTH+20,HEIGHT-120);
  reset_button.mousePressed(reset_canvas);

  translate(WIDTH/2, HEIGHT/2);  

}

let angle = 0;
function draw() 
{
  background(bg_colour);
  scale(zoom);
  
  translate(panx, pany);
  //rotateY(angle);
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
  
  draw_curve()
  create_grid(); 
  update_mouse_pos();
  angle += 0.02;
}

function export_json()
{
  json_file.curve_type = curve_choice;
  let control_array = [];
  let weights = [];
  for(let i=0; i<control_points.length;++i)
  {
    let arr = [control_points[i].x, control_points[i].y]
    control_array.push(arr);
    weights[i] = text_field_array[i].get_w();
  }
  json_file.control_points = control_array;
  json_file.weights = weights;
  json_file.clamped = clamped_curve;
  json_file.degree = degree;
  saveJSON(json_file, json_file.curve_type+".json");
}

function import_json()
{
  file_handle = document.getElementById('my-file').click();
  file_handle = document.querySelector('input[type="file"]');
  file_handle.addEventListener('change', function(e){
    const reader = new FileReader(); 
    reader.onload = function(){      
      in_json_file = JSON.parse(reader.result);

      curve_choice = in_json_file.curve_type;

      // handle tab
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) { 
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      tablinks[curve_dict[curve_choice]].className += " active";

      let pts = in_json_file.control_points;
      let weights = in_json_file.weights;

      zoom = 1.0;
      zoom_slider.value(zoom*100); 
      panx = 0;
      pany = 0;
      control_pts_scale = 1.0;

      while(N > 0)
      {
        delete_point();
      }
    
      control_points = [];
      text_field_array = [];
           
      N = pts.length;
      
      let k = 0;   

      for(let i = 0;i<pts.length;++i)
      {
        control_points.push(new Marker());
        control_points[i].x = pts[i][0];
        control_points[i].y = pts[i][1];
        
        text_field_array.push(new TextField(text_offset_x, i*40 + text_offset_y, i+1));
        text_field_array[k].set_id_coord(i,0);
        text_field_array[k].set_val(control_points[i].x.toFixed(2),control_points[i].y.toFixed(2));
        text_field_array[k].set_w_val(weights[i]);

        k++;
      }      

      x_mark.position(240 + text_offset_x,(- 12)+(N-1)*40 + text_offset_y);
      x_mark.html('\u2718');

      //clamped_curve = in_json_file.clamped;
      degree = in_json_file.degree;
      update_degree_slider();
      if(in_json_file.clamped && !clamped_curve)
        update_clamped_box();
    }
    reader.readAsText(file_handle.files[0]);
  }, false);   
  
}

function reset_canvas(flag = true)
{
  zoom = 1.0;
  zoom_slider.value(zoom*100); 
  panx = 0;
  pany = 0;
  control_pts_scale = 1.0;
  clamped_curve = true;
  if(flag)
  {
    while(N > 0)
    {
      delete_point();
    }
  }

  control_points = []
  text_field_array = []
  
  let k = 0;
  N = INITIAL_NUM_PTS;
  for(let i =0; i<N; ++i)
  {
    control_points.push(new Marker());

    text_field_array.push(new TextField(text_offset_x, i*40 + text_offset_y, i+1));
    text_field_array[k].set_id_coord(i,0);
    text_field_array[k].set_val(control_points[i].x.toFixed(2),control_points[i].y.toFixed(2));
    k++;
       
  }
  x_mark.position(240+text_offset_x,( -12)+(N-1)*40 + text_offset_y);
  x_mark.html('\u2718');
  
  noStroke();

  degree =2;
  update_degree_slider();

  update_clamped_box(); 

}

function update_control_pts()
{
  for(let k =0; k<text_field_array.length; ++k)
  {
    let temp = text_field_array[k].get_val();
    control_points[text_field_array[k].id].x = temp[0];
    control_points[text_field_array[k].id].y = temp[1];
  }
}

function update_text_field()
{

  for(let i =0; i<N; ++i)
  { 
    text_field_array[i].set_val(control_points[i].x.toFixed(2),control_points[i].y.toFixed(2));   
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
  for(let x=-panx; x<(WIDTH)/zoom - panx; x+= w)
  {
    line(x,-(HEIGHT)/zoom- pany, x,(HEIGHT)/zoom- pany);
  }

  for(let x=-pany; x<(HEIGHT)/zoom- pany; x+= w)
  {
    line(-(WIDTH)/zoom - panx,x, (WIDTH )/zoom- panx,x);
  }
}

function zoom_reset()
{
  zoom = 1.0;
  zoom_slider.value(zoom*100);
}

function pan_reset()
{
  panx = 0;
  pany = 0;
}

function opentab(evt, curve_name) {
  // var i, tabcontent, tablinks;
  // tabcontent = document.getElementsByClassName("tabcontent");
  // for (i = 0; i < tabcontent.length; i++) {
  //   tabcontent[i].style.display = "none";
  // }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  evt.currentTarget.className += " active";
  curve_choice = curve_name;
}

function update_degree()
{ 
  console.log("am here!");
  degree = Number(degree_slider.value());
}

function set_clamped()
{

  //document.getElementById('clampedbox').click();
  clamped_curve = !clamped_curve;
}

function update_degree_slider()
{
  degree_slider.value(degree);
}

function update_clamped_box()
{
  document.getElementById('clampedbox').click();
  
}