class Button
{
    constructor(name, posx, posy)
    {
        this.button = createButton(name);
        this.button.parent("sketchHolder");
        this.button.position(posx,posy);
        
        this.button.style('width', '120px');
        this.button.style('height', '60px');
        this.button.style('font-size', '20px');
        this.button.style('border-radius', '1%');
        this.button.style('background-color', '#0a3242');
        this.button.style('color', 'white');
        this.button.style('border','none');
        this.button.style('font-family', button_font.font.names.postScriptName["en"]);
        //this.button.style('font-weight', 'bold');
        this.button.style('font-variant', 'small-caps');
        this.button.mouseOver(this.button_hover);
    }

    button_hover()
    {   
        //console.log(this.hover);
        this.hover=true;
    }

    mousePressed(func)
    {
        this.button.mousePressed(func);

    }
}