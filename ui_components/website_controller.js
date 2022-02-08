class website_controller{
    constructor(url) {
        this.url = url;

        this.loading_status = document.getElementById("loading-status");
        this.link_panel_status = document.getElementById("nav-panel-status");

        let json_request = new XMLHttpRequest();
        let _this_ref = this;

        json_request.open("get",this.url);
        json_request.send(null);
        json_request.onload = function () {
            if (json_request.status === 200){
                let parsed_json = JSON.parse(json_request.responseText);
                nav_controller.init(parsed_json);
                content_loader.init(parsed_json);
                document.title = parsed_json.title;
                let current_sub_page_index = 0;
                for (let i = 0; i < parsed_json.links.length; i++) {
                    if (window.location.href.indexOf(parsed_json.links[i].title)!==-1) {
                        current_sub_page_index = i;
                        _this_ref.loading_status.checked = true;
                        _this_ref.link_panel_status.checked = false;
                        let event = new CustomEvent("loadContentRequest",{detail:parsed_json.links[current_sub_page_index]});
                        document.dispatchEvent(event);
                    } else if(window.location.href.includes("#404")){
                        _this_ref.loading_status.checked = true;
                        content_loader.catch_error("404");
                    } else {
                        let event = new CustomEvent("loadContentRequest",{detail:parsed_json.links[0]});
                        document.dispatchEvent(event);
                    }
                }

            }
        }
    }
}