//coordinates (x,y) of image reference for each section.
//Coordinates are in % relative to the image
var sectionsImageReference = {
                                Section2:[10,15],
                                Section3:[70,20]
                                }



$(document).ready(function() {
   dinamicResponsive();
   canvasLayers();
});

$(window).resize(function() {
   dinamicResponsive();
});

$(window).scroll(function() {
   checkSectionsVisibility();
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

function checkSectionsVisibility(){
    $sections = $("section");
    var top = $(window).scrollTop(); //reference
    for (i = 0; i < $sections.length; ++i) {
        $section = $sections[i];
        var topSection = $section.offsetTop;
        var diff = Math.abs(topSection-top);
        var h = $section.scrollHeight;
        var opacity = 0;
        if (diff < h){
            opacity = 1-diff/h;
        }
        $($section).css( "opacity", opacity );
    }
}

function canvasLayers(){
    //$("section").children("canvas").css();

    $sections = $("section");
    for (i = 0; i < $sections.length; ++i) {
        $section = $($sections[i]);
        var canvas = $section.find("canvas");
        if (canvas.length == 0) continue;
        canvas=canvas[0];                       //get DOM element
        var w=canvas.innerWidth,h=innerHeight;
        var ctx = canvas.getContext("2d");
        var id = $section.attr("id");
        var pos = sectionsImageReference[id];
        var x=pos[0]*w;
        var y=pos[1]*h;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.lineWidth=2;
        ctx.strokeStyle="blue";
        ctx.stroke();
    }

}