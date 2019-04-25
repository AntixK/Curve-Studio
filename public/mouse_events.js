function mousePressed() 
{
  for(let i =0; i < control_points.length; ++i)
  {      
    if (control_points[i].check_in_circle()) 
    { 
      curr_marker = control_points[i];
      locked = true;
      curr_point_id = i;
      point_num[i].style('color', '#FD971F');  
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
    update_text_field();
  }
}

function mouseReleased() 
{
  locked = false;
  curr_marker.boxSize = 15;
  point_num[curr_point_id].style('color', 'white');  
}

function doubleClicked() 
{
  if(set_in_canvas() && N < 6)
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
    
    text_field_array.push(new TextField(NUM_X+60, NUM_Y+(N-1)*40));
    k = text_field_array.length-1;
    text_field_array[k].set_id_coord(N-1,1);
    text_field_array[k].set_val(control_points[N-1].y.toFixed(2));

  }

}


function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, 0.05, 5.0);
  zoom_slider.value(zoom*100);
  //uncomment to block page scrolling
  return false;
}