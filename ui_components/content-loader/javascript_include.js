class content_loader {
    constructor(parsed_json) {
        this.content_window_obj = document.getElementById("content-screen");
        this.loading_grid_obj = document.getElementById("loading-grid");
        this.organization_name_obj = document.getElementById("loading-orgName");

        this.organization_name_obj.innerHTML = parsed_json.organization;

        let _this_ref = this;
        this._update_grid();
        window.addEventListener('resize',function (){
            _this_ref._update_grid();
        })
    }

    /**
     * @brief Update the grid background in loading view.
     */
    _update_grid() {
        this._property = getComputedStyle(this.content_window_obj);
        let width = parseFloat(this._property.width.replace("px",""));
        let height = parseFloat(this._property.height.replace("px",""))
        this.grid_size = ((width/8 > height/5) ? width/8: height/5);
        let new_vert_half_line_count = width/2/this.grid_size-0.5;
        let new_horz_half_line_count = height/2/this.grid_size - 0.5;
        if(new_vert_half_line_count !== this.vert_half_line_count){
            this.vert_half_line_count = width/2/this.grid_size-0.5;
            this.generate_grid();
        }
        if(new_horz_half_line_count !== this.horz_half_line_count){
            this.horz_half_line_count = height/2/this.grid_size - 0.5;
            this.generate_grid();
        }
        document.documentElement.style.setProperty("--loading-grid-index-offset-vert",this.vert_half_line_count);
        document.documentElement.style.setProperty("--loading-grid-index-offset-horz",this.horz_half_line_count);
        document.documentElement.style.setProperty("--loading-grid-active-size",this.grid_size+"px");
        document.documentElement.style.setProperty("--loading-grid-idle-size",this.grid_size*2+"px");
    }

    /**
     * @brief Generate grid background in loading view
     * @detain Removes all children in #grid-bg element and regenerate lines.
     */
    generate_grid(){
        while (this.loading_grid_obj.childNodes.length>0){
            this.loading_grid_obj.removeChild(this.loading_grid_obj.lastChild);
        }
        for (let i = -Math.floor(this.vert_half_line_count); i <= 0; i++){
            let left_line = document.createElement("vert-line");
            left_line.setAttribute('style', "--index: ("+String(i-0.5)+")");
            let right_line = document.createElement("vert-line");
            right_line.setAttribute('style', "--index: ("+String(-i+0.5)+")");
            this.loading_grid_obj.appendChild(left_line);
            this.loading_grid_obj.appendChild(right_line);
        }
        for (let i = -Math.floor(this.horz_half_line_count); i <= 0; i++) {
            let top_line = document.createElement("horz-line");
            top_line.setAttribute('style', "--index: ("+String(i-0.5)+")");
            let bottom_line = document.createElement("horz-line");
            bottom_line.setAttribute('style', "--index: ("+String(-i+0.5)+")");
            this.loading_grid_obj.appendChild(top_line);
            this.loading_grid_obj.appendChild(bottom_line);
        }
        document.documentElement.style.setProperty("--loading-grid-active-size",this.grid_size+"px");
    }
}