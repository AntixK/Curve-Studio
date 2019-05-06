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
      curr_marker.xOffset = mouseX/zoom - curr_marker.x;
      curr_marker.yOffset = mouseY/zoom - curr_marker.y;    
      break;
      //fill(244, 122, 158);
    }
    else
    {
      locked = false;
      pan_lock = true;

      pan_offset_x = mouseX/zoom - panx;
      pan_offset_y = mouseY/zoom - pany;
    }
  } 
  
}

function mouseDragged() 
{
  if (locked)
  {    
    if (keyIsPressed === true && keyCode == SHIFT)
    {
      stroke(line_color, 0.8);
      strokeWeight(3);
      line(curr_marker.x, curr_marker.y, mouseX/zoom- panx, mouseY/zoom- pany);
      let val = constrain(0.005*dist(curr_marker.x, curr_marker.y, mouseX/zoom- panx, mouseY/zoom- pany), 0, 1);
      text_field_array[curr_point_id].set_w_val(val);
    }
    else
    {
      curr_marker.x = mouseX/zoom - curr_marker.xOffset;
      curr_marker.y = mouseY/zoom - curr_marker.yOffset;
      update_text_field();
    }
  }

  else if((mouseX)/zoom - panx < WIDTH -panx && (mouseY )/zoom - pany < HEIGHT -pany)
  { 
    panx = (mouseX/zoom - pan_offset_x);
    pany = (mouseY/zoom - pan_offset_y);    
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
  if(N < MAX_NUM_PTS)
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
  
    degree_slider.attribute('max',(N -1).toString());
  }

}

function delete_point()
{
  let  k = text_field_array.length-1;
  text_field_array[k].remove_field();
  text_field_array.pop();

  control_points.pop();

  N -= 1;

  if(N >1 && curve_choice =='Catmull Rom Spline')
  { 
    x_mark.position(240+text_offset_x,( - 12)+(N-1)*40+text_offset_y);
  }
  else if(N >2 && curve_choice !='Catmull Rom Spline')
  { 
    x_mark.position(240+text_offset_x,( - 12)+(N-1)*40+text_offset_y);
  }
  else
  {
    x_mark.html('');
  }

  if(degree > N-1)
  {
    degree--;
    degree_slider.value(degree);
  }
  degree_slider.attribute('max',(N -1).toString());
}

function scroll_zoom(event) {

  if (keyIsPressed === true && keyCode == CONTROL)
  { 
    let change = 1+Math.abs(event.deltaY * 0.0005)
    //control_pts_scale += event.deltaY * 0.0005;    
    console.log(control_pts_scale, Math.sign(event.deltaY * 0.0005));
    if(control_pts_scale+event.deltaY * 0.0005 < -0.1 || 
       control_pts_scale+event.deltaY * 0.0005 > 4)
      change = 1;
    else
      control_pts_scale += event.deltaY * 0.0005;  
  
    for(let i=0; i< control_points.length;++i)
    { 
      if(Math.sign(event.deltaY * 0.0005) >= 0)
        control_points[i].scale_pts(1/change);
      else
      control_points[i].scale_pts(change);
    }
    update_text_field();
  
    //control_pts_scale = constrain(control_pts_scale, 0.5,1.5);
  }
  else
  {
    zoom += sensativity * event.deltaY;
    
    if(zoom >= 0.5 && zoom < 3.0 )
    { 
      panx -= (mouseX/zoom)*(sensativity *event.deltaY);
      pany -= (mouseY/zoom)*(sensativity *event.deltaY);
    }
    zoom = constrain(zoom, 0.5, 3.0);
    zoom_slider.value(zoom*100);

    //uncomment to block page scrolling
    return false;
  }
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
  if((mouseX)/zoom < WIDTH/zoom && (mouseY )/zoom < HEIGHT/zoom)
  {
    mouse_pos.html("("+ ((mouseX)/zoom - panx).toFixed(2) + ","+ ((mouseY )/zoom - pany).toFixed(2) +")");
  }
  
}