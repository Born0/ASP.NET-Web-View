$(document).ready(function () {
    var dps = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Number of Products For Category"
        },
        data: [{
            type: "column",
            //startAngle: 240,
            legendMarkerColor: "grey",
            yValueFormatString: "##0.00\" \"",
            indexLabel: "{label} {y}",
            dataPoints: dps
        }]
    });

    var chart2 = new CanvasJS.Chart("chartPieDiagram", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Pie Diagram"
        },

        data: [{
            type: "pie",
            indexLabelFontSize: 18,
            radius: 180,
            startAngle: 240,
            legendMarkerColor: "grey",
            indexLabel: "{label} - {y}",
            yValueFormatString: "###0.0\"\"",
            //click: explodePie,
            dataPoints: dps
        }]
    });

    chart.render();
    chart2.render();

    $.getJSON("http://localhost:3817/api/categories/categoryProductAmountChart", function(data) {
        chart.data[0].set("dataPoints", data);
        chart2.data[0].set("dataPoints", data);
    });
})