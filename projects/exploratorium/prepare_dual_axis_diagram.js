/**
 * Created by rostam on 24.03.17.
 */
function prepare_dual_axis_diagram(year,onom_temp_id_obj) {
    var periodStep = 20;
    var ah_low = 100000, ah_high = 0;
    var year_freq_all = {};
    year.forEach(function (y) {
        var num = parseInt(y['item']);
        y['item'] = num + (periodStep - num % periodStep);
        if (y['item'] > ah_high) ah_high = y['item'];
        if (y['item'] < ah_low) ah_low = y['item'];
        if (year_freq_all[y['item']] == undefined)
            year_freq_all[y['item']] = 0;
        year_freq_all[y['item']]++;
    });
    var periods = d3.range(ah_low, ah_high, periodStep);
    var xlabVarAH = d3.range(0, ah_high, 100);
    var xlabVarCE = [];
    xlabVarAH.forEach(function (x) {
        xlabVarCE.push((x - x / 33) + 622);
    });

    var year_freq = {};
    periods.forEach(function (p) {
        year_freq[p] = 0;
    });

    var year_temp = year.filter(function (y) {
        return onom_temp_id_obj[y['id']] == 0;
    });

    periods.forEach(function (p) {
        year_temp.forEach(function (yt) {
            if (yt['item'] == p) {
                year_freq[p]++;
            }
        })
    });
    var year_freq_percent = [];
    Object.keys(year_freq).forEach(function (yf) {
        year_freq_percent.push((year_freq[yf] / year_freq_all[yf]) * 100);
    });
    draw_d3_dual(periods, "Years According to the Islamic Lunar (hijrī) Calendar",
        Object.values(year_freq),
        "Absolute Frequencies", year_freq_percent, "Relative Frequencies (%)", "freqs");
}