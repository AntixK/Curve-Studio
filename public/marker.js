class Marker
{
  constructor()
  {
    this.x = 30 + random(WIDTH-50)
    this.y = 30 + random(HEIGHT-50)
    this.dimension = 2;
    this.xOffset = 0;
    this.yOffset = 0;
    this.boxSize = 15;
    this.overBox = false;
    this.scale_pts(control_pts_scale);
  }

  check_in_circle()
  {
    if (
      (mouseX )/zoom - panx > this.x - this.boxSize &&
      (mouseX )/zoom - panx < this.x + this.boxSize &&
      (mouseY)/zoom - pany> this.y - this.boxSize &&
      (mouseY)/zoom - pany< this.y + this.boxSize
    )
    {
      this.overBox = true;
      this.boxSize = 20;
      return true;
    }
    
    this.overBox= false;
    return false;
  }

  scale_pts(scale)
  {
    this.x *= scale;
    this.y *= scale;
  }
}