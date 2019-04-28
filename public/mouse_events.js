function click_point() 
{
  for(let i =0; i < control_points.length; ++i)
  {      
    if (control_points[i].check_in_circle()) 
    { 
      curr_marker = control_points[i];
      locked = true;
      pan_lock=false;
      curr_point_id = i;
      point_num[i].style('color', '#FD971F');
      curr_marker.xOffset = mouseX - curr_marker.x;
      curr_marker.yOffset = mouseY - curr_marker.y;     
      break;
      //fill(244, 122, 158);
    }
    else
    {
      locked = false;
      pan_lock = true;
    }
  }
  
  
}

function mouseDragged() 
{
  if (locked) {    
    curr_marker.x = mouseX - curr_marker.xOffset;
    curr_marker.y = mouseY - curr_marker.yOffset;
    update_text_field();
  }

}

function release_point() 
{
  locked = false;
  pan_lock = false;
  curr_marker.boxSize = 15;
  point_num[curr_point_id].style('color', 'white');  
}

function create_point() 
{
  if(N < 6)
  {
    // create new control points and text field
    control_points.push(new Marker());
    N += 1;
    control_points[control_points.length - 1].x = mouseX;
    control_points[control_points.length - 1].y = mouseY;

    point_num.push(createElement('p',"num"));
    point_num[N-1].style('font-size', '18px');
    point_num[N-1].style('font-family', font.font.names.postScriptName["en"]);
    point_num[N-1].style('color', 'white');    
    point_num[N-1].html(N);
    point_num[N-1].style('text-align', 'left');
    point_num[N-1].position(NUM_X - 20,(NUM_Y - 15)+(N-1)*40);

    text_field_array.push(new TextField(NUM_X, NUM_Y+(N-1)*40));
    k = text_field_array.length-1;
    text_field_array[k].set_id_coord(N-1,0);
    text_field_array[k].set_val(control_points[N-1].x.toFixed(2));    
    
    text_field_array.push(new TextField(NUM_X+80, NUM_Y+(N-1)*40));
    k = text_field_array.length-1;
    text_field_array[k].set_id_coord(N-1,1);
    text_field_array[k].set_val(control_points[N-1].y.toFixed(2));

    x_mark.position(NUM_X + 160,(NUM_Y - 12)+(N-1)*40);
    if(x_mark.html() == "")
    {
      x_mark.html('\u2718');
    }   

  }

}

function delete_point()
{
  k = text_field_array.length-1;
  text_field_array[k].remove_field();
  text_field_array.pop();

  text_field_array[k-1].remove_field();
  text_field_array.pop();

  point_num[N-1].html('');
  point_num.pop();
  control_points.pop();
  N -= 1;
  if(N >1)
  { 
    x_mark.position(NUM_X + 160,(NUM_Y - 12)+(N-1)*40);
  }
  else
  {
    x_mark.html('');
  }
}

function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, 0.05, 5.0);
  zoom_slider.value(zoom*100);
  //uncomment to block page scrolling
  return false;
}

function highlight_x_mark()
{
  x_mark.style('color','orange');
}

function dehighlight_x_mark()
{
  x_mark.style('color','white');
}