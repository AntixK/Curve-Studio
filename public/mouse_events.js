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
      text_field_array[i].highlight_ind();
      curr_marker.xOffset = mouseX - curr_marker.x;
      curr_marker.yOffset = mouseY - curr_marker.y;     
      break;
      //fill(244, 122, 158);
    }
    else
    {
      locked = false;
      pan_lock = true;

      pan_offset_x = panx;
      pan_offset_y = pany;
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

  else if((mouseX)/zoom - panx < WIDTH -panx && (mouseY )/zoom - pany < HEIGHT -pany)
  { 
    panx = (mouseX/zoom - pan_offset_x - WIDTH/2*zoom);
    pany = (mouseY/zoom - pan_offset_y - HEIGHT/2*zoom);    
  }

}

function release_point() 
{
  locked = false;
  pan_lock = false;
  curr_marker.boxSize = 15;
  text_field_array[curr_point_id].dehighlight_ind();
}

function create_point() 
{
  if(N < 10)
  {
    // create new control points and text field
    control_points.push(new Marker());
    N += 1;
    control_points[control_points.length - 1].x = mouseX/zoom - panx;
    control_points[control_points.length - 1].y = mouseY/zoom - pany;
    
    text_field_array.push(new TextField(text_offset_x, (N-1)*40 + text_offset_y, N));
    k = text_field_array.length-1;
    text_field_array[k].set_id_coord(N-1,0);
    text_field_array[k].set_val(control_points[N-1].x.toFixed(2),control_points[N-1].y.toFixed(2));

    x_mark.position( 240+text_offset_x,(- 12)+(N-1)*40+text_offset_y);
    if(x_mark.html() == "")
    {
      x_mark.html('\u2718');
    }   

  }

}

function delete_point()
{
  let  k = text_field_array.length-1;
  text_field_array[k].remove_field();
  text_field_array.pop();

  control_points.pop();

  N -= 1;
  if(N >1)
  { 
    x_mark.position(240+text_offset_x,( - 12)+(N-1)*40+text_offset_y);
  }
  else
  {
    x_mark.html('');
  }
}

function scroll_zoom(event) {
  zoom += sensativity * event.deltaY;
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

function myFunction() {
  var elmnt = document.getElementById("myDIV");
  //var x = elmnt.scrollLeft;
  //var y = elmnt.scrollTop;
  //document.getElementById ("demo").innerHTML = "Horizontally: " + x + "px<br>Vertically: " + y + "px";
}

function update_mouse_pos()
{
  if((mouseX)/zoom - panx < WIDTH -panx && (mouseY )/zoom - pany < HEIGHT -pany)
  {
    mouse_pos.html("("+ ((mouseX)/zoom - panx).toFixed(2) + ","+ ((mouseY )/zoom - pany).toFixed(2) +")");
  }
  
}