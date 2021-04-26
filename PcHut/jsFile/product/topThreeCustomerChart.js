$(document).ready(function () {
    var data1_name = "";
    var data1_value = "";
    var data2_name = "";
    var data2_value = "";
    var data3_name = "";
    var data3_value = "";

    var dps = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Top 3 Customers"
        },
        data: [{
            type: "column",
            //startAngle: 240,
            legendMarkerColor: "grey",
            yValueFormatString: "##0.00\" Taka\"",
            indexLabel: "{label} {y}",
            dataPoints: dps
        }]
    });

    chart.render();

    $.getJSON("http://localhost:3817/api/customers/topThreeCustomerGraph", function(data) {
        chart.data[0].set("dataPoints", data);
    });
})