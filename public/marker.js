class Marker
{
  constructor()
  {
    this.x =random(width)+100
    this.y = random(height)+100
    this.xOffset = 0;
    this.yOffset = 0;
    this.boxSize = 15;
    this.overBox = false;  
  }

  check_in_circle()
  {
    if (
      mouseX > this.x - this.boxSize &&
      mouseX < this.x + this.boxSize &&
      mouseY > this.y - this.boxSize &&
      mouseY < this.y + this.boxSize
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