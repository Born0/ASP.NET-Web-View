$(document).ready(function () {
    //the following variable will be assigned the whole url string
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var branch_id = url.searchParams.get('branchId');
    var year = url.searchParams.get('year');

    var dps = [];

    var chart = new CanvasJS.Chart("chartLineForBranch", {
        animationEnabled: true,
        title: {
            text: "Monthly Sales"
        },
        data: [{
            type: "line",
            legendMarkerColor: "grey",
            yValueFormatString: "##0.00\" \"",
            indexLabel: "{label} {y}",
            dataPoints: dps
        }]
    });

    chart.render();

    $.getJSON("http://localhost:3817/api/branches/singleBranchMonthlySales/"+branch_id+"/"+year, function(data) {
        chart.data[0].set("dataPoints", data);
    });
})