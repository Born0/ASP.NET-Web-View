$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3817/api/branchManagers/topSeller",
        method: "GET",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var data = xmlHttp.responseJSON;

                $("#showManagerName").html("<strong>"+data.Name+"</strong>");
                $("#showManagerEmail").html("<strong>"+data.Email+"</strong>");
                $("#showManagerPhone").html("<strong>"+data.Phone+"</strong>");
                $("#showManagerTotalAMount").html("<strong>"+data.SumAmount+"</strong>");
            }
            else {
                alert("No Manager Details Found");
            }
        }
    })
})