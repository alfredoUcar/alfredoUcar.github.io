
//coordinates (x,y) of image reference for each section.
//Coordinates are in % relative to the image
var sectionsImageReference = {
                                Section2:[10,25],
                                Section3:[25,60]
                                }


$(document).ready(function() {
   dinamicResponsive();
   //canvasLayers();
   $('[data-toggle="tooltip"]').tooltip();
   $("#contact").click(function(){
        disableScroll();        // deshabilita el scroll para que no se cierre el formulario
        $("#mailModal").modal();
    });
    $("#mailModal").on('hidden.bs.modal', function () {
            enableScroll();     // vuelve a habilitar el scroll una vez cerrado el formulario
    });
    document.onkeydown = keydown;
    //loadSkillsCharts();

});

$(window).resize(function() {
   dinamicResponsive();
   adjustSection();
   //canvasLayers();
});

$(window).scroll(function(e) {
   checkSectionsVisibility();
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
      navToSection(true);
   } else {
      // upscroll code
      navToSection(false);
   }
   lastScrollTop = st;
});

var charts=[];
function loadSkillsCharts(){
    //gráficas de habilidades
   $( "canvas.chart" ).each(function( index ) {
        var ctx = $(this).get(0).getContext("2d");
        var hab = habilities[index];
        if (hab.name == "Otros"){
            var myDoughnutChart = new Chart(ctx).DoughnutText(dataOthers, {
                percentageInnerCutout : 75,
                responsive: true,
                segmentStrokeWidth : 1,
                segmentStrokeColor : "#000",
                segmentShowStroke : false,
                tooltipTemplate: "<%if (label){%><%=label%> <%}%>",
                scaleFontSize: 12
            });
            charts.push(myDoughnutChart);
        }else{
            var data = dataModel;
            data[0].label = hab.name;
            data[0].value = hab.value;
            data[1].value = 100-hab.value;
            var myDoughnutChart = new Chart(ctx).DoughnutText(data, {
                segmentShowStroke : false,
                responsive: true,
                percentageInnerCutout : 75,
                showTooltips: false,
                scaleFontSize: 10
            });
            charts.push(myDoughnutChart);
        }
    });
};

function destroySkillsCharts(){
    for (var i = 0; i < charts.length; i++) {
        charts[i].destroy();
    }
}

function resizeSkillsCharts(){
    for (var i = 0; i < charts.length; i++) {
        charts[i].resize();
    }
}

function dinamicResponsive(){
    adjustSectionBody();
    adjustChartSize();
}

function switchToVerticalGroupButtons(){
    $btns = $(".btn-group.btn-group-responsive");
    $btns.addClass("btn-group-vertical").removeClass("btn-group");
}

function switchToHorizontalGroupButtons(){
    $btns = $(".btn-group-vertical.btn-group-responsive");
    $btns.addClass("btn-group").removeClass("btn-group-vertical");
}

function adjustSectionBody(){
    $(".section-header").each(function(index,sh){
        var h = $(sh).outerHeight(true);
        var ph = $(sh).parent().outerHeight();
        $(sh).siblings(".section-body").outerHeight(ph-h);
    });
}

function adjustChartSize(){
    var chartsContainers = $(".graphic");
    var parent = chartsContainers.parent();
    var h = parent.outerHeight(true);
    var w = parent.outerWidth(true);
    var size = 50;
    if (w > h){
        size=h/3;
    }else{
        size=w/3;
    }
    chartsContainers.each(function(index,chart){
//        $(chart).outerHeight(size);
//        $(chart).outerWidth(size);
        $(chart).css({"width":size,"height":size});
    });
    //resizeSkillsCharts();
}

function canvasLayers(){
    //$("section").children("canvas").css();

    $sections = $("section");
    for (i = 0; i < $sections.length; ++i) {
        $section = $($sections[i]);
        var canvas = $section.children("canvas");
        if (canvas.length == 0) continue;
        canvas=canvas[0];

        //set the internal size to match
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        var w=canvas.offsetWidth,h=canvas.offsetHeight;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, w, h);
        var id = $section.attr("id");
        var pos = sectionsImageReference[id];
        var x=pos[0]*w/100;
        var y=pos[1]*h/100;

        //circle reference
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        var icon = $section.find(".section-icon").find("span");
        icon = center(icon);

        //line to icon
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(icon.x,icon.y-$section.offset().top);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

}

function center(e){
    var offset = e.offset();
    var width = e.width();
    var height = e.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    return {x:centerX, y:centerY};
}


//extends doughnut chart
Chart.types.Doughnut.extend({
    // Passing in a name registers this chart in the Chart namespace in the same way
    name: "DoughnutText",
    draw: function() {
            Chart.types.Doughnut.prototype.draw.apply(this, arguments);
            this.chart.ctx.fillStyle = this.segments[0].fillColor;
            this.chart.ctx.textBaseline = 'middle';
            this.chart.ctx.textAlign="center";
            this.chart.ctx.font="bold "+this.options.scaleFontSize+"px "+this.options.scaleFontFamily;
            this.chart.ctx.fillText(this.segments[0].label, this.chart.width / 2, this.chart.height / 2, 0.73*this.chart.width);
        }
});

var dataModel = [
    {
        value: 50,
        color:"#0098ff",
        highlight: "#00b6ff",
        strokeColor: "0098ff",
        label: "Hability"
    },
    {
        value: 50,
        color: "rgba(29, 203, 21,0)",
        highlight: "rgba(29, 203, 21,0)",
        label: "padding"
    }
]

var dataOthers = [
    {
        value: 0,
        color:"#0098ff",
        label: "Otros"
    },
    {
        value: 5,
        color:"#bfff00",
        label: "Lisp"
    },
    {
        value: 5,
        color:"#80ff00",
        label: "Prolog"
    },
    {
        value: 8,
        color:"#00ff00",
        label: "Ada"
    },
    {
        value: 12,
        color:"#00ff80",
        label: "MQL4"
    },
    {
        value: 14,
        color:"#00bfff",
        label: "Lua"
    },
    {
        value: 25,
        color:"#007fff",
        label: "AJAX"
    },
    {
        value: 35,
        color:"#4000ff",
        label: "Bootstrap"
    },
    {
        value: 50,
        color:"#7f00ff",
        label: "MySQL"
    },
    {
        value: 50,
        color:"#bf00ff",
        label: "C"
    }
]

var habilities = [
    {name:"PHP",value:70},
    {name:"Python",value:60},
    {name:"Java",value:60},
    {name:"HTML5",value:75},
    {name:"CSS3",value:75},
    {name:"JavaScript",value:78},
    {name:"Git",value:65},
    {name:"PostgreSQL",value:55},
    {name:"Otros",value:100},
    ]
