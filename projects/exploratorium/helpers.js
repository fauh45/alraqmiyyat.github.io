/**
 * Created by rostam on 3/12/17.
 */
function round_any_ceiling(num, accuracy) {
    return num + ( accuracy - num % accuracy);
}

function draw_d3_dual(xdata, xname, y1data, y1name, y2data, y2name, domElem) {

    d3.select("#" + domElem).selectAll("svg > *").remove();
    var svg = d3.select("#" + domElem).select("svg");

    var all_data = [];
    all_data.push({"x":0,"y1":0,"y2":0});
    for (var i = 0; i < xdata.length; i++) {
        all_data.push({"x": xdata[i], "y1": y1data[i], "y2": y2data[i]});
    }

// set the dimensions and margins of the graph
    var ww = d3.select("#" + domElem).style("width");//+svg.style("width");
    var hh = d3.select("#" + domElem).style("height");//+svg.style("height");
    var w = +ww.substr(0,ww.indexOf("px"));
    var h = +hh.substr(0,hh.indexOf("px"));
    var margin = {top: 20, right: 40, bottom: 50, left: 80},
        width =  w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

        svg
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + 20 + "," + margin.top + ")");
        svg.attr("transform", "translate(20,0)");

// set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);

// define the 1st line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y0(d.y1);
        });

// define the 2nd line
    var valueline2 = d3.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y1(d.y2);
        });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


    // // format the data
    // all_data.forEach(function (d) {
    //     d.x = +d.x;
    //     d.y1 = +d.y1;
    //     d.y2 = +d.y2;
    // });

    // Scale the range of the data
    x.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.x);
    })]);
    y0.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.y1);
    })]);
    y1.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.y2);
    })]);

    // Add the valueline path.
    svg.append("g").attr("id","holder").attr("transform","translate(30,0)");
    svg.select("#holder").append("path")
        .data([all_data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg.select("#holder").append("path")
        .data([all_data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2);
    //
    // AH = (CE − 622) × 33 ÷ 32
    // CE = AH + 622 − (AH ÷ 32)
    // Add the X Axis
    svg.select("#holder").append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(function(d) {
            var ce = parseInt(d + 622  - (d / 32));
            return d;
        }));

    svg.select("#holder").selectAll("text").html(function (d) {
        var dd = +d;
        var ce = parseInt(dd + 622  - (dd / 32));
        if(ce >= 1000)
            return "<tspan>"+dd + " AH</tspan><tspan dy='11px' dx='-44px'>" + ce + " CE</tspan>";

        return "<tspan>"+dd + " AH</tspan><tspan dy='11px' dx='-38px'>" + ce + " CE</tspan>";
    }).style("font-weight","bold");
    // svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
    //     .attr("transform","translate("+width/2+","+(height+margin.top+25)+")").text(xname);

    // Add the Y0 Axis
    svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
        .attr("transform","translate("+ -0 +","+ height/2 +")"+"rotate(-90)").text(y1name)
        .style("fill","steelblue");
    svg.select("#holder").append("g").attr("class", "axisSteelBlue")//.style("fill", "axisSteelBlue")
        .call(d3.axisLeft(y0)).append("text");

    // Add the Y1 Axis
    svg.select("#holder").append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));
    svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
        .attr("transform","translate("+ (width + 70) +","+ height/2 +")"+"rotate(-90)").text(y2name)
        .style("fill","red");

    svg.selectAll("text").style("font-family", "Georgia, serif");
}

function draw_graph(nodes, links, domElem) {
    var ww = d3.select("#" + domElem).style("width");//+svg.style("width");
    var hh = d3.select("#" + domElem).style("height");//+svg.style("height");
    var width = +ww.substr(0,ww.indexOf("px"));
    var height = +hh.substr(0,hh.indexOf("px"));
    d3.select("#" + domElem).selectAll("svg > *").remove();
    var svg = d3.select("#" + domElem).select("svg").attr("width", width).attr("height", height);
    //filterRE = "#CAT#(topo|onom|onto)"
    var type_color = {
        '#CAT#topo': 'blue',
        '#CAT#onom': 'orange',
        '#CAT#onto': 'lightgray'
    };

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.item;
        }))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));


    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", function (d) {
            return Math.sqrt(d.edge_freq / 10 + 1);
        });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", function (d) {
            return Math.sqrt(d.node_freq) + 6;
        })
        .attr("fill", function (d) {
            return type_color[d.type];//color(d.node_freq);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function (d) {
            return d.item;
        });

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);

    //simulation.force("link", d3.forceLink().distance(2));

    function ticked() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("cx", function (d) {
                return d.x = Math.max(15, Math.min(width - 15, d.x));
            })
            .attr("cy", function (d) {
                return d.y = Math.max(15, Math.min(height - 15, d.y));
            });
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function draw_d3_heatmap(domElem,data) {
    var ww = d3.select("#chart").style("width");//+svg.style("width");
    var hh = d3.select("#chart").style("height");//+svg.style("height");
    var w = +ww.substr(0,ww.indexOf("px"));
    var h = +hh.substr(0,hh.indexOf("px"));
    var margin = {top: 50, right: 0, bottom: 100, left: 30},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        gridSize = Math.floor(width / 85),
        legendElementWidth = gridSize * 2,
        buckets = 9,
        colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];

    var srcs = {};
    var tgts = {};
    var cnt1 = 0,cnt2 = 0;
    data.forEach(function (d) {
        if(srcs[d['src']] == undefined) {
            srcs[d['src']] = cnt1;
            cnt1++;
        }
        if(tgts[d['tgt']] == undefined) {
            tgts[d['tgt']] = cnt2;
            cnt2++;
        }
    });

    d3.select("#chart").selectAll("svg > *").remove();
    var svg = d3.select("#chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + 5 + ")");

    var dayLabels = svg.selectAll(".dayLabel")
        .data(Object.keys(tgts))
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", margin.left)
        .attr("y", function (d, i) {
            return height - (i * gridSize) + margin.bottom  - 10 - 10;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(0," + gridSize / 1.5 + ")")
        .attr("fill", "black").attr("font-size","12px").style("font-family", "Amiri");

    var left = margin.left + 10;

    var timeLabels = svg.selectAll(".timeLabel")
        .data(Object.keys(srcs))
        .enter().append("text")
        .text(function(d) { return d; })
        .attr("transform", function(d, i) {
            return "translate(" + ( i * gridSize + left) + ","+(height+margin.top+margin.bottom-10)+")"
                + "translate(" + gridSize / 2 + ", -30)rotate(-90)";
        })
        .style("text-anchor", "end")
        .attr("class", "black").attr("font-size","12px").style("font-family", "Amiri");

    // var timeLabels = svg.selectAll(".timeLabel")
    //     .data(Object.keys(srcs))
    //     .enter().append("text")
    //     .text(function (d) {
    //         return d;
    //     })
    //     .attr("x", function (d, i) {
    //         return i * gridSize;
    //     })
    //     .attr("y", 0)
    //     .attr("transform", function(d, i) {
    //         return "translate(" + ( i * gridSize) + ",0)"
    //             + "translate(" + gridSize / 2 + ", -6)rotate(-90)";
    //     } )
    //     .style("text-anchor", "middle")
    //     .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    //     .attr("fill", "gray");
    //
    // timeLabels.each(function (d,i) {
    //     var x = d3.select(this).attr("x");
    //     var y = d3.select(this).attr("y");
    //     d3.select(this)
    //         .attr("transform","translate("+x +"," + y +")"+"rotate(90)");
    //     });

    var colorScale = d3.scaleQuantile()
        .domain([0, buckets - 1, d3.max(data, function (d) {
            return d.freq;
        })])
        .range(colors);

    var cards = svg.selectAll(".hour").data(data);
        // , function (d) {
        //     //console.log(data);
        //     return d.target + ':' + d.source;
        // });

    // cards.append("title");
    cards.enter().append("rect")
        .attr("x", function (d) {
            return srcs[d.src] * gridSize;
        })
        .attr("y", function (d) {
            return height - tgts[d.tgt] * gridSize + margin.bottom - 10 - 10;
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        //.style("fill", colors[0])
        //.merge(cards)
        //.transition()
        //.duration(1000)
        .style("fill", function (d) {
            return colorScale(d.freq)
        }).attr("transform","translate("+left+",0)");
    // cards.select("title").text(function (d) {
    //     return d.freq
    // });

    cards.exit().remove();

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function (d) {
            return d;
        });

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", function (d, i) {
            return width - 40;
        })
        .attr("y", function(d,i){
            return legendElementWidth * i;
        })
        .attr("width", 20)
        .attr("height", legendElementWidth)
        .style("fill", function (d, i) {
            return colors[i];
        })//.attr("transform","translate("+600 + "," + margin.top + ")rotate(1)");

    // legend_g.append("text")
    //     .attr("class", "mono")
    //     .text(function (d) {
    //         return "≥ " + Math.round(d);
    //     })
    //     .attr("x", function (d, i) {
    //         return legendElementWidth * i;
    //     })
    //     .attr("y", height + gridSize);

    legend.exit().remove();
}
