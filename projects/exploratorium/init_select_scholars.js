/**
 * Created by rostam on 24.03.17.
 */
function init_select_scholars(onom, jsonFile) {
    // var names = {};
    // onom.forEach(function (on) {
    //     names[on['item']] = 0;
    // });
    //
    // console.log("1 " + Object.keys(names).length);
    // var select = d3.select('#people');
    // var options = select
    //     .selectAll('option')
    //     .data(Object.keys(names)).enter()
    //     .append('option')
    //     .text(function (d) { return d; });
    var select = d3.select('#people');
    var options = select
        .selectAll('option')
        .data(Object.keys(jsonFile)).enter()
        .append('option')
        .text(function (d) { return d; });
    return select;
}