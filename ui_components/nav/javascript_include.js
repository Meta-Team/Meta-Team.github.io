class nav_controller{
    static init(parsed_json) {
        nav_controller.nav_obj = document.getElementById("navigation-bar");
        nav_controller.content_obj = document.getElementById("content-screen");
        nav_controller.menu_panel_obj = document.getElementById("nav-menuPanel");
        nav_controller.logo_panel_obj = document.getElementById("nav-logoPanel");
        nav_controller.loading_status = document.getElementById("loading-status");
        nav_controller.link_panel_status = document.getElementById("nav-panel-status");

        // Init Event Listener
        nav_controller.content_obj.addEventListener("scroll", function(){nav_controller.scrollEventHandler()});

        // Init UI
        for ( let i = 0; i < parsed_json.links.length; i++) {
            nav_controller.make_btn(parsed_json.links[i]);
        }
        nav_controller.logo_panel_obj.style.backgroundImage = "url('" + parsed_json.logo + "')";
    }

    /**
     * @brief   Create a link button for navigation bar panel
     * @var     json_link_obj an object under "link" category of website-config.json. Contains "title" and "src".
     */
    static make_btn(json_link_obj) {
        let btn = document.createElement("div");
        btn.classList.add("menu-items");
        btn.innerText = json_link_obj.title;
        btn.onclick = function () {
            nav_controller.loading_status.checked = true;
            nav_controller.link_panel_status.checked = false;
            let event = new CustomEvent("loadContentRequest",{detail:json_link_obj});
            document.dispatchEvent(event);
        }
        this.menu_panel_obj.appendChild(btn);
    }

    /**
     * @brief Controls the navigation bar transparency in scroll.
     */
    static scrollEventHandler() {
        if(nav_controller.content_obj.scrollTop > 0.25*nav_controller.content_obj.clientHeight) {
            nav_controller.nav_obj.classList.add("scroll-down");
        } else{
            nav_controller.nav_obj.classList.remove("scroll-down");
        }
    }

}
