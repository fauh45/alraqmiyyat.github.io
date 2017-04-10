/**
 * Created by rostam on 10.02.17.
 */
<!-- map creation -->
var zoom;
// canvas resolution
function init_map() {
    var width = 900;
    var height = 600;

// var w = d3.select("#main-svg").style("width");
// var h = d3.select("#main-svg").style("height");
// var width = parseInt(w.substr(0, w.indexOf("px")));
// var height = parseInt(h.substr(0, h.indexOf("px")));
// var width = 960;
// var height = 500;
//
// var svg = d3.select("#main-svg")
//
// var projection = d3.geoMercator()
//     .scale(width / 2 / Math.PI)
//     //.scale(100)
//     .translate([width / 2, height / 2])
//
// var path = d3.geoPath()
//     .projection(projection);
//
// var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
// d3.json(url, function(err, geojson) {
//     svg.append("path")
//         .attr("d", path(geojson))
// });
//
// return;

    var center = [width / 2, height / 2];

// projection-settings for mercator
    var projection = d3.geoMercator()
    // where to center the map in degrees
        .center([35, 40])
        // zoomlevel
        .scale(700)
        // map-rotation
        .rotate([10, 0, 0]);

// defines "svg" as data type and "make canvas" command
    var svg = d3.select("#main-svg");
    d3.select("#container").style("background-color","lightgray");
    var land = d3.select("#land");
    var rivers = d3.select("#rivers");
    var lakes = d3.select("#lakes");

// defines "path" as return of geographic features
    var path1 = d3.geoPath().projection(projection);

// defines "path" as return of geographic features
    var path2 = d3.geoPath().projection(projection);

    var path = path1;

// load data and display the map on the canvas with country geometries
    d3.json("ne50m_land.json", function (error, topology) {
        land.selectAll("path")
            .data(topojson.object(topology, topology.objects.ne_50m_land).geometries)
            .enter().append("path").attr("d", path1).attr("fill","white").attr("stroke","darkgray").attr("stroke-width","3").style("border","solid");
    });

//trying to add rivers
    d3.json("ne50m_rivers.json", function (error, topology) {
        rivers.selectAll("path")
            .data(topojson.object(topology, topology.objects.rivers).geometries)
            .enter().append("path").attr("d", path2).attr("fill","none")
            .attr("stroke","lightgray").attr("stroke-width","1");
    });

    d3.json("ne_50m_lakes.geojson", function (error, state) {
        lakes.selectAll("path")
            .data(state.features)
            .enter().append("path").attr("d", path2).attr("fill","lightgray")
            .attr("stroke","gray").attr("stroke-width","1");
    });

    // svg.call(d3.zoom().on("zoom", function () {
    //     // svg.selectAll("g").attr("transform", "translate("
    //     //     + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")");
    //
    //     svg.attr("transform", "translate(" + d3.event.translate
    //         + ")" + " scale(" + d3.event.scale + ")");
    //     // svg.selectAll("g").selectAll("path")
    //     //     .attr("d", path.projection(projection));
    //     //
    //     // svg.selectAll("circle").attr("r", function (d) {
    //     //     return d3.select(this).attr("orig_r") / zoom.scale();
    //     // });
    // }));
    //

    zoom = d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform);
    }).scaleExtent([1,10]);;
    svg.call(zoom);

    var w = d3.select("#container").style("width");
    var width = +w.substr(0,w.indexOf("px"));

    var gsubtopo = d3.select("#legend");
    d3.range(10,110,20).forEach(function(i){
        gsubtopo.append("circle")
            .attr("r",radiusScaling(i))
            .attr("cx", width-300 + i*2)
            .attr("cy",50)
            .attr("fill","gray")
            .attr("opacity","0.7");
        gsubtopo.append("text")
            .attr("x", width-300 + i*2)
            .attr("y",30)
            .attr("text-anchor","middle")
            .text(i);
    });
    var buttons = gsubtopo.append("g");
    var ele = d3.select("#main-svg");
    var firsty = 360;
    add_rect_label('\uf067',width-100,firsty,function(){zoom.scaleBy(ele,1.2);},buttons);
    add_rect_label('\uf068',width-100,firsty+20,function(){zoom.scaleBy(ele,1/1.2);},buttons);
    add_rect_label('\uf062',width-100,firsty+40,function(){zoom.translateBy(ele,0,-10);},buttons);
    add_rect_label('\uf063',width-100,firsty+80,function(){zoom.translateBy(ele,0,10);},buttons);
    add_rect_label('\uf111',width-100,firsty+60,function(){ele.transition().duration(700).call(zoom.transform, d3.zoomIdentity);},buttons);
    add_rect_label('\uf061',width-80,firsty+60,function(){zoom.translateBy(ele,10,0);},buttons);
    add_rect_label('\uf060',width-120,firsty+60,function(){zoom.translateBy(ele,-10,0);},buttons);

    return projection;
}

function add_rect_label(text,x,y,onclick,buttons) {
    buttons.append("rect")
        .attr("x", x)
        .attr("y",y)
        .attr("width","20")
        .attr("height","20")
        .attr("fill","white")
        //.style("stroke","black")
        .on("click",function () {
            onclick();
        });
    buttons.append("text")
        .attr("text-anchor","middle")
        .attr("x",x+10)
        .attr("y",y+16)
        .text(text)
        //.text('\uf118')
        .attr('font-family', 'FontAwesome')
        //.style("font-weight","bold")
        .style("font-size","18px")
        .style("cursor", "default")
        .on("click",function () {
            onclick()
        });
}


function zoomreset() {
    zoom.translate([0, 0]);
    zoom.scale(1);
    svg.selectAll("g").transition().attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    svg.selectAll("g").selectAll("path")
        .attr("d", path.projection(projection))

    svg.selectAll("circle").attr("r", function (d) {
        return d3.select(this).attr("orig_r") / zoom.scale();
    });
}