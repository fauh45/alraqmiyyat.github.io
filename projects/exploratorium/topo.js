/**
 * Created by rostam on 10.02.17.
 */
var radiusScaling = d3.scaleLog()
    .domain([1, 60])
    .range([2, 20]);

function init_topo(projection,topo,onom_temp_id_obj) {
    //console.log(topo);
    var topo_temp = topo.filter(function (t) {
        return onom_temp_id_obj[t['id']] == 0;
    });

    var topo_points2 = {};
    var topo_points_diff = {};
    var cnt1 = 0, cnt2 = 0;
    topo_temp.forEach(function (tote) {
        if (topo_points2[tote['item'] + "," + tote['lat'] + "," + tote['lon']] == undefined) {
            topo_points2[tote['item'] + "," + tote['lat'] + "," + tote['lon']] = 0;
            topo_points_diff[tote['item'] + "," + tote['lat'] + "," + tote['lon']] = 0;
        }
        topo_points2[tote['item'] + "," + tote['lat'] + "," + tote['lon']]++;

        if(tote['cat'].indexOf("onto") != -1) cnt1++;
        if(tote['cat'].indexOf("topo") != -1)
            topo_points_diff[tote['item'] + "," + tote['lat'] + "," + tote['lon']]++;
            //cnt2++;
    });

    //cnt2 > cnt1

    var topo_points = [];
    Object.keys(topo_points2).forEach(function (tp2) {
        var tmp = tp2.substr(tp2.indexOf(",") + 1);
        topo_points.push({
            'item': tp2.substr(0, tp2.indexOf(",")),
            'lat': tmp.substr(0, tp2.indexOf(",")),
            'lon': tp2.substr(tp2.lastIndexOf(",") + 1),
            'freq': topo_points2[tp2],
            'freq_diff': topo_points_diff[tp2]
        });
    });

    d3.selectAll(".test").remove();

    // buttons.append("text")
    //     .attr("x", width-100)
    //     .attr("y",100)
    //     .attr("text-anchor","middle")
    //     .text("+").style("font-size","20px");
    // buttons.append("text")
    //     .attr("x", width-100)
    //     .attr("y",120)
    //     .text("-").style("font-size","20px").style("background-color","white");

    topo_points.forEach(function (tp) {
        var proj_sel = projection([tp.lon, tp.lat]);
        var radius = radiusScaling(tp.freq);
        var g = d3.select("#topos").append("g");
        g.append("circle")
            .attr("cx", proj_sel[0])
            .attr("cy", proj_sel[1])
            .attr("r", radius)
            .attr("fill", "red")
            .attr("opacity","0.7")
            .attr("orig_r", radius).attr("class","test");

        var radius2 = radiusScaling(tp.freq_diff);
        g.append("circle")
            .attr("cx", proj_sel[0])
            .attr("cy", proj_sel[1])
            .attr("r", radius2)
            .attr("fill", "orange")
            .attr("opacity","0.7")
            .attr("orig_r", radius2).attr("class","test");
        //g.append("text").text(tp.freq+ "/" + tp.freq_diff).attr("x",proj_sel[0]).attr("y",proj_sel[1]);
    });
}