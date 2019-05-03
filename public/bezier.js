function bezier_spline(t, p) {
  var order = p.length - 1; // curve order is number of control point - 1
  var d = p[0].length;      // control point dimensionality

  // create a source vector array copy that will be
  // used to store intermediate results
//   var v = p.map(function(point) {
//     return point.slice();
//   });

    var v = [];

    for (var i = 0; i < p.length; i++)
    {   
        v[i] = [];
        v[i][0] = p[i].x;
        v[i][1] = p[i].y;
    }
  
  // for each order reduce the control point array by updating
  // each control point with its linear interpolation to the next
  for(var i=order; i>0; i--) {
    for(var j=0; j<order; j++) {
      // interpolate each component
        v[j].x = (1 - t) * v[j].x + t * v[j+1].x;
        v[j].y = (1 - t) * v[j].y + t * v[j+1].y;

    }
  }

  return v[0];
}