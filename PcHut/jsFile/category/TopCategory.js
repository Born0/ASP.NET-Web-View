$(document).ready(function () {
    var dps = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Top Selling Category"
        },
        data: [{
            type: "column",
            //startAngle: 240,
            legendMarkerColor: "grey",
            //yValueFormatString: "##0.00\" \"",
            indexLabel: "{label} {y}",
            dataPoints: dps
        }]
    });

    chart.render();

    $.getJSON("http://localhost:3817/api/categories/TopCategoryGraph/2", function(data) {
        chart.data[0].set("dataPoints", data);
    });
})
