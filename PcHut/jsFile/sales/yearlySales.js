$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3817/api/sales/yearlySalesReports",
        method: "GET",

        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str= "";
                var data = xmlHttp.responseJSON;

                for(var i = 0; i < data.length; i++){
                    str+= "<tr>"+
                        "<td>"+data[i].Id+"</td>"+
                        "<td>"+data[i].Column1+"</td>"+
                        "<td><button class='w3-btn w3-blue w3-border w3-round-large' onclick='monthlySalesReport("+data[i].Id+")'>Check Report</button></td>"+
                        "</tr>";
                }
                $("tbody").html(str);
            }
            else {
                alert("Noting Found");
            }
        }
    })
})

function monthlySalesReport(year) {
    window.location.href = "monthlySales.html?year="+year;
}