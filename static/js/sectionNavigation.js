// extension: atach callback function to "scroll end" event
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

var lastScrollTop = 0;
$(window).scrollEnd(function(){
    navigatingBetweenSections=false;
}, 200);

var navigatingBetweenSections = false;
//navigate to next/prev section
function navToSection(next){
    if (navigatingBetweenSections) return; //already adjusting
    disableScroll();
    navigatingBetweenSections=true; //indicate adjust
    $sections = $("section");
    var top = $(window).scrollTop(); //reference
    for (i = 0; i < $sections.length; ++i) {
        $section = $sections[i];
        var topSection = $section.offsetTop;
        var diff = Math.abs(topSection-top);
        var h = $section.scrollHeight;
        var proximity = 0;
        if (diff < h){
            proximity = 1-diff/h;
        }
        if (proximity>0.5){//  nearest section
            var dest;
            if (next){// go to next section
                // console.log("go to next")
                dest= topSection+h;
            }else{ // go to previous section
                // console.log("go to prev")
                dest= topSection-h;
            }
            $("html, body").animate({
               scrollTop: dest
           }, 800,function () {
               //adjustSection();
               enableScroll();
           });
            break;
        }
    }
}
