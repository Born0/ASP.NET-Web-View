$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3817/api/brands/topBrandDetails",
        method: "GET",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var data = xmlHttp.responseJSON;

                $("#showBrandName").html("<strong>"+data.Name+"</strong>");
                $("#showBrandId").html("<strong>"+data.BrandId+"</strong>");
                $("#showBrandVendor").html("<strong>"+data.Vendor_name+"</strong>");
            }
            else {
                alert("No Brand Details Found");
            }
        }
    })
})