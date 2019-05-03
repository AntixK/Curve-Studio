function draw_lines()
{
  stroke(line_color);
  strokeWeight(3);
  drawingContext.setLineDash([15, 15]);
  for(let i =1; i < control_points.length; ++i)
  {
    line(control_points[i-1].x, control_points[i-1].y, control_points[i].x, control_points[i].y);
  }
  drawingContext.setLineDash([]);
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

function draw_nurbs()
{
  strokeWeight(3.5);
  stroke(curve_colour);
  noFill();
  
  let w = [];
  for(let i = 0; i<N; ++i)
  {
    w[i] = text_field_array[i].get_w();

  } 

  beginShape();
  for(var t=0; t<1; t+=0.01) {
    var point = nurbs(t, degree, control_points, w);
    vertex(point[0],point[1]);
  }
  endShape();

}

function draw_bezier()
{
  strokeWeight(3.5);
  stroke(curve_colour);
  noFill();

  beginShape();
  for(var t=0; t<1; t+=0.01) {
    var point = bezier_spline(t, control_points);
    vertex(point[0],point[1]);
  }
  endShape();

}

function draw_curve()
{
    switch(curve_choice) {
        case 'Catmull Rom Spline':
          draw_Catmull_Rom();
          break;
        case 'Bezier':
          draw_bezier();
          break;
        case 'NURBS':
          draw_nurbs();
          break;
        default:
          draw_Catmull_Rom();
      } 
}
