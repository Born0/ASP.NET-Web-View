$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3817/api/branches/branchReportSales",
        method: "GET",

        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str= "";
                var data = xmlHttp.responseJSON;

                for(var i = 0; i < data.length; i++){
                    str+= "<tr>"+
                        "<td>"+data[i].BranchName+"</td>"+
                        "<td>"+data[i].TotalSalesAmount+"</td>"+
                        "<td><button onclick='individualBranchReport("+data[i].Id+")'>Check Report</button></td>"+
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

function individualBranchReport(branch_id) {
    window.location.href = "../Branch/singleBranchReport.html?branchId="+branch_id;
}