$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3817/api/branches/topBranchDetails",
        method: "GET",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var data = xmlHttp.responseJSON;

                $("#showBranchName").html("<strong>"+data.Name+"</strong>");
                $("#showBranchAddress").html("<strong>"+data.Address+"</strong>");
                $("#showBranchTotalSalesAmount").html("<strong>"+data.TotalSalesAmount+"</strong>");
            }
            else {
                alert("No Brand Details Found");
            }
        }
    })
})