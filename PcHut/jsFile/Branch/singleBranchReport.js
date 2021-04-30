$(document).ready(function () {
    //the following variable will be assigned the whole url string
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var branch_id = url.searchParams.get('branchId');

    $.ajax({
        url: "http://localhost:3817/api/branches/salesReportByBranch/"+branch_id,
        method: "GET",
        async: false,
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str= "";
                var data = xmlHttp.responseJSON;

                for(var i = 0; i < data.length; i++){
                    str+="<button onclick='branchSalesMonthly("+branch_id+", \""+data[i].label+"\")'>"+data[i].label+"</button>"
                }
                $("div").html(str);
            }
            else {
                alert("Noting Found");
            }
        }
    })
    var dps = [];

    var chart = new CanvasJS.Chart("chartLineForBranch", {
        animationEnabled: true,
        title: {
            text: "Yearly Sales"
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

    $.getJSON("http://localhost:3817/api/branches/salesReportByBranch/"+branch_id, function(data) {
        chart.data[0].set("dataPoints", data);
    });
})

function branchSalesMonthly(branch_id, year) {
    window.location.href = "monthlyBranchSales.html?branchId="+branch_id+"&year="+year;
}