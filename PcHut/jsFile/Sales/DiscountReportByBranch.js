$(document).ready(function () {
    var data1_name = "";
    var data1_value = "";
    var data2_name = "";
    var data2_value = "";
  

    var dps = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Discount Report"
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

    $.getJSON("http://localhost:3817/api/invoices/DiscountReport", function(data) {
        chart.data[0].set("dataPoints", data);
    });
})
