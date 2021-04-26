$(document).ready(function () {
    var cat_id = "";
    var cat_name = "";
    var brand_name = "";
    var brand_id = "";
    $.ajax({
        url: "http://localhost:3817/api/products/topLaptopDetails",
        //method: "GET",
        //async: false,
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str = '';//empty variable
                var data = xmlHttp.responseJSON;//parsing the JSON format

                $("#showProdName").html("<strong>"+data.ProductName+"</strong>");
                $("#showProdPrice").html("<strong>"+data.Price+"</strong>");
                $("#showProdStatus").html("<strong>"+data.Status+"</strong>");
                //$("#showCategory").html("<strong>"+data.CategoryId+"</strong>");
                cat_id = data.CategoryId;
                brand_id = data.BrandId;

                getSingleCategory();
                function getSingleCategory(){
                    cat_id = data.CategoryId;
                    $.ajax({
                        url: "http://localhost:3817/api/categories/"+cat_id,
                        method: "GET",
                        data: {
                            "categoryId": cat_id
                        },
                        async: false,
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var data1 = xmlHttp.responseJSON;
                                cat_name = data1.Name;
                            }
                            else {
                                alert("Not Found");
                            }
                        }
                    })
                }

                $.when(getSingleCategory()).done(function () {
                    $("#showCategory").html("<strong>"+cat_name+"</strong>");
                })

                getSingleBrand()
                function getSingleBrand(){
                    brand_id = data.BrandId;
                    $.ajax({
                        url: "http://localhost:3817/api/brands/"+brand_id,
                        method: "GET",
                        data: {
                            "brandId": brand_id
                        },
                        async: false,
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var data2 = xmlHttp.responseJSON;
                                //$("#showCategory").html(data1.Name);
                                brand_name = data2.Name;
                            }
                            else {
                                alert("Brand Not Found");
                            }
                        }
                    })
                }

                $.when(getSingleBrand()).done(function () {
                    $("#showBrand").html("<strong>"+brand_name+"</strong>")
                })

                //$("#showBrand").html("<strong>"+data.BrandId+"</strong>");
                $("#showProdDetails").html("<strong>"+data.Details+"</strong>");
                $("#showProdSpecial").html("<strong>"+data.Special+"</strong>");
                $("#showProdWarranty").html("<strong>"+data.Warranty+"</strong>");

            }
            else {
                alert("No Products");
            }
        }
    })
})