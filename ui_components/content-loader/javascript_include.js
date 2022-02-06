document.write("<script language=javascript src='/ui_components/common_function.js'></script>")
class content_loader {
    constructor(parsed_json) {
        this.content_window_obj = document.getElementById("content-screen");
        this.loading_grid_obj = document.getElementById("loading-grid");
        this.organization_name_obj = document.getElementById("loading-orgName");
        this.loading_status = document.getElementById("loading-status");

        this.organization_name_obj.innerHTML = parsed_json.organization;

        this.loading_text_show_keyframe = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 },
                                        { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }];
        this.loading_text_fade_keyframe = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 },
                                        { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 },
                                        { opacity: 1 },{ opacity: 1 },{ opacity: 1 },{ opacity: 1 },
                                        { opacity: 1 },{ opacity: 1 },{ opacity: 1 },{ opacity: 1 },
                                        { opacity: 1 },{ opacity: 1 },{ opacity: 1 },{ opacity: 1 },
                                        { opacity: 1 },{ opacity: 1 },{ opacity: 1 },{ opacity: 1 },
                                        { opacity: 1 },{ opacity: 0 }, { opacity: 1 }, { opacity: 0 },
                                        { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 },];

        let _this_ref = this;
        this._update_grid();
        window.addEventListener('resize',function (){
            _this_ref._update_grid();
        });
        window.addEventListener('orientationchange',function (){
            _this_ref._update_grid();
        });
        document.addEventListener('loadContentRequest',function (event){
            _this_ref.load_content(event);
        });
        window.addEventListener('error',function (e) {
            _this_ref.catch_error(e);
        }, true);
    }

    load_content(event){
        let _this_ref = this;
        let htmlParser = new HTML_parser(event.detail.src);
        htmlParser.onload = function () {
            setTimeout(function (){
                for (let i = 0; i < document.head.childNodes.length; i++) {
                    if(document.head.childNodes[i].nodeName==="LINK"&& document.head.childNodes[i].type ==="text/css"){
                        if(!document.head.childNodes[i].href.includes("/ui_components/css_include.css")) {
                            document.head.removeChild(document.head.childNodes[i]);
                        }
                    }
                }
                for (let i = 0; i < htmlParser.css.length; i++) {
                    if(!htmlParser.css[i].href.includes("/ui_components/css_include.css")) { // exclude universal css
                        document.head.appendChild(htmlParser.css[i]);
                    }
                }
            },400);
            setTimeout(function (){
                _this_ref.loading_status.checked = false;
                let innerHTML = null;
                for(let i = 0; i < htmlParser.body.childNodes.length; i++) {
                    if (htmlParser.body.childNodes[i].id === "content-screen"){
                        innerHTML = htmlParser.body.childNodes[i].innerHTML;
                    }
                }
                _this_ref.content_window_obj.innerHTML = innerHTML;
                window.history.pushState(event.detail,  event.detail.title, "#"+event.detail.title)
            },1000);
        };
        htmlParser.onerror = function (e) {
            _this_ref.catch_error(e, event);
        }
        if(document.documentElement.style.getPropertyValue('--loading-text').includes("ERROR")){
            document.getElementById('loading-textBox').animate(
                this.loading_text_fade_keyframe , {
                    fill: "auto",
                    easing: 'ease-in-out',
                    duration: 1500
                });
            console.log('play animation');
        }
        document.documentElement.style.setProperty("--loading-text",'"LOADING"');
        document.documentElement.style.setProperty("--loading-color", "var(--rm-yellow-darken)");
        document.documentElement.style.setProperty("--loading-grid-color",'var(--loading-grid-dark)');
    }

    catch_error(e, event){
        document.getElementById('loading-textBox').animate(
            this.loading_text_show_keyframe , {
                fill: "auto",
                easing: 'ease-in-out',
                duration: 500
            });
        document.documentElement.style.setProperty("--loading-text",'"ERROR:'+e+'"');
        document.documentElement.style.setProperty("--loading-color", "rgb(100,0,0)");
        document.documentElement.style.setProperty("--loading-grid-color",'var(--loading-grid-red)');
        window.history.pushState(event.detail,  event.detail.title, "#404");
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
            this._generate_grid();
        }
        if(new_horz_half_line_count !== this.horz_half_line_count){
            this.horz_half_line_count = height/2/this.grid_size - 0.5;
            this._generate_grid();
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
    _generate_grid(){
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