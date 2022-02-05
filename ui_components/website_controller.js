class website_controller{
    constructor(url) {
        this.url = url;
        let json_request = new XMLHttpRequest();
        json_request.open("get",this.url);
        json_request.send(null);
        json_request.onload = function () {
            if (json_request.status === 200){
                let parsed_json = JSON.parse(json_request.responseText);
                let NavController = new nav_controller(parsed_json);
                document.title = parsed_json.title;
                let ContentLoader = new content_loader(parsed_json);
            }
        }
    }
}