$(document).ready(function () {
    alert("hello");
    var categoriesData = [];
    var brandsData = [];
    $.ajax({
        url: "http://localhost:3817/api/products",
        //method: "GET",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str = '';//empty variable
                var data = xmlHttp.responseJSON;//parsing the JSON format

                for(var i = 0; i < data.length; i++){
                    //the following AJAX call is to retrieve Categories data
                    $.ajax({
                        url: "http://localhost:3817/api/categories/"+data[i].CategoryId,
                        method: "GET",
                        async: false,
                        data: {
                            "categoryId": data[i].CategoryId
                        },
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var data1 = xmlHttp.responseJSON;
                                categoriesData[i] = data1.Name;
                            }
                        }
                    })

                    //the following AJAX call is to retrieve Brands data
                    $.ajax({
                        url: "http://localhost:3817/api/brands/"+data[i].BrandId,
                        method: "GET",
                        async: false,
                        data: {
                            "brandId": data[i].BrandId
                        },
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var dataForBrands = xmlHttp.responseJSON;
                                brandsData[i] = dataForBrands.Name;
                            }
                        }
                    })
                    str+= "<tr>"+
                        "<td>"+data[i].ProductName+"</td>"+
                        "<td>"+categoriesData[i]+"</td>"+
                        "<td>"+brandsData[i]+"</td>"+
                        "<td>"+data[i].Price+"</td>"+
                        /*"<td>"+data[i].Quantity+"</td>"+*/
                        "<td>"+data[i].Special+"</td>"+
                        "<td>"+data[i].Warranty+"</td>"+
                        "<td>"+data[i].Status+"</td>"+
                        "<td><input type='button' onclick='changeStatus("+data[i].ProductId+")' value='Change Status'></td>"+
                        "<td><input type='button' onclick='changeStatus("+data[i].ProductId+")' value='Edit'></td>"+
                        "</tr>"
                }
                $("tbody").html(str);
            }
            else {
                alert("No Products");
            }
        }
    })
})

function changeStatus(product_id) {
    $.ajax({
        url: "http://localhost:3817/api/products/changeProductStatus/"+product_id+"/0",
        method: "PUT",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                alert("Status Changes");
            }
            else {
                alert("Error Occurs in Status Changes");
            }
        }
    })
}

function updateProduct(product_id) {

}
