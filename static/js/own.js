
$(document).ready(function() {
   dinamicResponsive();
});

$(window).resize(function() {
   dinamicResponsive();
});

function dinamicResponsive(){
    if (window.matchMedia("(min-width: 768px)").matches) {
        /* Small devices (tablets, 768px and up) */
        switchToHorizontalGroupButtons();
    } else if (window.matchMedia("(min-width: 992px)").matches){
        /* Medium devices (desktops, 992px and up) */
        switchToHorizontalGroupButtons();
    } else if (window.matchMedia("(min-width: 1200px)").matches){
        /* Large devices (large desktops, 1200px and up) */
        switchToHorizontalGroupButtons();
    }else{/* Extra small devices (phones, less than 768px) */
        switchToVerticalGroupButtons();
    }
}

function switchToVerticalGroupButtons(){
    $btns = $(".btn-group.btn-group-responsive");
    $btns.addClass("btn-group-vertical").removeClass("btn-group");
}

function switchToHorizontalGroupButtons(){
    $btns = $(".btn-group-vertical.btn-group-responsive");
    $btns.addClass("btn-group").removeClass("btn-group-vertical");
}