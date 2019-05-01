class TextField
{
    constructor(posx, posy, index)
    {        
        this.textfield_x = createInput('','Number'); 
        this.textfield_x.attribute('step', '1.00');       
        this.textfield_x.style('width','70px');
        this.textfield_x.style('height','20px');
        this.textfield_x.style('font-family', num_font.font.names.postScriptName["en"]);
        this.textfield_x.parent('content');
        this.textfield_x.position(posx, posy);
        this.textfield_x.input(update_control_pts);

        this.textfield_y = createInput('','Number');
        this.textfield_y.attribute('step', '1.00');
        this.textfield_y.style('width','70px');
        this.textfield_y.style('height','20px');
        this.textfield_y.style('font-family', num_font.font.names.postScriptName["en"]);
        this.textfield_y.parent('content');
        this.textfield_y.position(posx+80, posy);
        this.textfield_y.input(update_control_pts);

        this.textfield_w = createInput('','Number');
        this.textfield_w.attribute('step', '0.01');
        this.textfield_w.attribute('min', '0.0');
        this.textfield_w.attribute('max', '1.0');
        this.textfield_w.style('width','70px');
        this.textfield_w.style('height','20px');
        this.textfield_w.style('font-family', num_font.font.names.postScriptName["en"]);
        this.textfield_w.parent('content');
        this.textfield_w.position(posx+160, posy);
        this.textfield_w.input(update_control_pts);
        this.set_w_val(random(1).toFixed(2));

        this.pt_ind = createElement('p',"num");
        this.pt_ind.parent('content');
        this.pt_ind.style('font-size', '18px');
        this.pt_ind.style('font-family', font.font.names.postScriptName["en"]);
        this.pt_ind.style('color', 'white');    
        this.pt_ind.html(index);
        this.pt_ind.style('text-align', 'left');
        this.pt_ind.position(0,posy - 15);

        this.id = 0;
        this.coord = 0;
        this.val = 0;
    }

    set_id_coord(id,coord)
    {
        this.id = id;
        this.coord = coord;
    }

    get_val()
    {
        return [Number(this.textfield_x.value()),
                Number(this.textfield_y.value()),
                Number(this.textfield_w.value())];
    }

    set_val(valx, valy)
    {
        this.textfield_x.value(valx);
        this.textfield_y.value(valy);
    }

    set_w_val(valw)
    {
        this.textfield_w.value(valw);
        
    }

    get_w()
    {
        return this.textfield_w.value();
    }

    remove_field()
    {
        this.textfield_x.remove();
        this.textfield_y.remove();
        this.textfield_w.remove();
        this.pt_ind.remove();
    }

    highlight_ind()
    {
        this.pt_ind.style('color', '#FD971F');
    }

    dehighlight_ind()
    {
        this.pt_ind.style('color', 'white');
    }
}