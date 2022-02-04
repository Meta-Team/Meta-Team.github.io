class nav_controller{
    constructor() {
        this.nav_obj = document.getElementById("navigation-bar");
        this.content_obj = document.getElementById("content-window");
        let _this_ref = this;
        this.content_obj.addEventListener("scroll", function () {
            if(_this_ref.content_obj.scrollTop > 0.5*_this_ref.content_obj.clientHeight) {
                _this_ref.nav_obj.classList.add("scroll-down");
            } else{
                _this_ref.nav_obj.classList.remove("scroll-down");
            }
        });
    }
}