/**
 * Created by rostam on 15.03.17.
 */
var proj = init_map();
load_csv_data(function (onom, topo, year, geoNW, netwo, rawData, jsonFile) {
    //val = 'البغدادي'
    var val = 'الواعظ';
    //val = 'المالكي'
    //var onom_temp_id=[],
    //var year_temp=[],topo_temp=[];
    d3.select("#freqFilter").property("value", 3);

    d3.select("#freqFilter").on("input", function() {
        d3.select("#freqFilter-value").text(+this.value);
        d3.select("#freqFilter").property("value", +this.value);
    });

    var onom_item_id = {};
    onom.forEach(function (on) {
        if (onom_item_id[on['item']] == undefined)
            onom_item_id[on['item']] = {};
        onom_item_id[on['item']][on['id']] = 0;
    });

    var onom_temp_id_obj = {};

    function onchange() {
        var val = d3.select('select').property('value');
        d3.select("#scholar_name").html("Patterns of " + val);
        onom_temp_id_obj = onom_item_id[val];
        prepare_dual_axis_diagram(year, onom_temp_id_obj);
        init_topo(proj, topo, onom_temp_id_obj);
        generate_network_data(geoNW,netwo,rawData,onom_temp_id_obj,3);
    }
    init_select_scholars(onom, jsonFile).on("change", onchange);
    onchange();

    function onchange_freq() {
        if(this.value == undefined)
            generate_network_data(geoNW,netwo,rawData,onom_temp_id_obj,3);
        else
            generate_network_data(geoNW,netwo,rawData,onom_temp_id_obj,this.value);
    }
    d3.select("#freqFilter").on("change",onchange_freq);

    return;

    // Boundaries for the Islamic world
    var latIW = [5, 45], lonIW = [-12, 83];
    // Boundaries for the Taʾrīḫ al-islām
    var latTI = [10, 48], lonTI = [-12, 75];
    // Boundaries to use
    var latLim = latTI, lonLim = lonTI;
    // Colors
    var waterCol = "grey90", landCol = "white";
});