class Marker
{
  constructor()
  {
    this.x = 30 + random(WIDTH-50)
    this.y = 30 + random(HEIGHT-50)
    this.xOffset = 0;
    this.yOffset = 0;
    this.boxSize = 15;
    this.overBox = false;  
  }

  check_in_circle()
  {
    if (
      mouseX/zoom > this.x - this.boxSize &&
      mouseX/zoom < this.x + this.boxSize &&
      mouseY/zoom > this.y - this.boxSize &&
      mouseY/zoom < this.y + this.boxSize
    )
    {
      this.overBox = true;
      this.boxSize = 20;
      return true;
    }
    
    this.overBox= false;
    return false;
  }
}