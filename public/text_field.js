class TextField
{
    constructor(posx, posy)
    {        
        this.textfield = createInput('','Number');
        this.textfield.style('width','70px');
        this.textfield.style('height','20px');
        this.textfield.style('font-family', num_font.font.names.postScriptName["en"]);
        this.textfield.parent('content');
        this.textfield.position(posx, posy);
        this.textfield.changed(update_control_pts);
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
        return Number(this.textfield.value());
    }

    set_val(val)
    {
        this.textfield.value(val);
    }

    remove_field()
    {
        this.textfield.style('opacity','0');
    }
}