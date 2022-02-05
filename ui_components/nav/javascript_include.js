class nav_controller{
    constructor(parsed_json) {
        this.nav_obj = document.getElementById("navigation-bar");
        this.content_obj = document.getElementById("content-screen");
        this.menu_panel_obj = document.getElementById("nav-menuPanel");
        this.logo_panel_obj = document.getElementById("nav-logoPanel");
        this.loading_status = document.getElementById("loading-status");
        this.link_panel_status = document.getElementById("nav-panel-status");

        let _this_ref = this;

        // Init Event Listener
        this.content_obj.addEventListener("scroll", function () {
            if(_this_ref.content_obj.scrollTop > 0.25*_this_ref.content_obj.clientHeight) {
                _this_ref.nav_obj.classList.add("scroll-down");
            } else{
                _this_ref.nav_obj.classList.remove("scroll-down");
            }
        });

        // Init UI
        for ( let i = 0; i < parsed_json.links.length; i++) {
            this.make_btn(parsed_json.links[i]);
        }
        this.logo_panel_obj.style.backgroundImage = "url('" + parsed_json.logo + "')";
    }

    /**
     * @brief   Create a link button for navigation bar panel
     * @var     json_link_obj an object under "link" category of website-config.json. Contains "title" and "src".
     */
    make_btn(json_link_obj) {
        let _this_ref = this;
        let btn = document.createElement("div");
        btn.classList.add("menu-items");
        btn.innerText = json_link_obj.title;
        btn.onclick = function () {
            _this_ref.loading_status.checked = true;
            _this_ref.link_panel_status.checked = false;
            let event = new CustomEvent("loadContentRequest",{detail:json_link_obj});
            document.dispatchEvent(event);
        }
        this.menu_panel_obj.appendChild(btn);
    }
}