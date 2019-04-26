class Button
{
    constructor(name, posx, posy, height='60px', width='120px',font_size='20px',bgc='#0a3242',radius = '1%')
    {
        this.button = createButton(name);
        this.button.parent("sketchHolder");
        this.button.position(posx,posy);
        
        this.button.style('width', width);
        this.button.style('height', height);
        this.button.style('font-size', font_size);
        this.button.style('border-radius', radius);
        this.button.style('background-color', bgc);
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