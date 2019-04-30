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

function draw_bspline()
{
  strokeWeight(3.5);
  stroke(curve_colour);
  noFill();
  
  curve_points = [];
  for(let i = 0; i<N; ++i)
  {
    curve_points[i] = [];
    curve_points[i][0] = control_points[i].x;
    curve_points[i][1] = control_points[i].y;

  } 

  beginShape();
  for(var t=0; t<1; t+=0.01) {
    var point = bspline(t, degree, points);
    vertex(point[0],point[1]);
  }
  endShape();

}
