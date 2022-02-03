class nav_controller{
    constructor() {
        this.nav_obj = document.getElementById("universal-navigator");
        this.content_obj = document.getElementById("content-window");
    }

    init() {
        let _thisRef = this;
        this.content_obj.addEventListener("scroll", function () {
            if(_thisRef.content_obj.scrollTop > 0.5*_thisRef.content_obj.clientHeight) {
                _thisRef.nav_obj.classList.add("scroll-down");
            } else{
                _thisRef.nav_obj.classList.remove("scroll-down");
            }
        });
    }
}