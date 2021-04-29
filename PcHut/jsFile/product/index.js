$(document).ready(function () {
    //alert("hello");
    var categoriesData = [];
    var brandsData = [];
    var brand_id = [];
    var category_id = [];
    var status_message = [];
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
                                category_id[i] = data1.CategoryId;
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
                                brand_id[i] = dataForBrands.BrandId;
                            }
                        }
                    })
                    if(data[i].Status == 1){
                        status_message[i] = "Active"
                    }
                    else {
                        status_message[i] = "Inactive";
                    }
                    str+= "<tr>"+
                        "<td>"+data[i].ProductName+"</td>"+
                        "<td>"+categoriesData[i]+"</td>"+
                        "<td>"+brandsData[i]+"</td>"+
                        "<td>"+data[i].Price+"</td>"+
                        /*"<td>"+data[i].Quantity+"</td>"+*/
                        "<td>"+data[i].Special+"</td>"+
                        "<td>"+data[i].Details+"</td>"+
                        "<td>"+data[i].Warranty+"</td>"+
                        "<td>"+status_message[i]+"</td>"+
                        "<td><input type='button' onclick='changeStatus("+data[i].ProductId+")' value='Change Status'></td>"+
                        "<td><input type='button' onclick='checkProductQuantityByBranch("+data[i].ProductId+")' value='Check Inventory'></td>"+
                        "<td><input type='button' onclick='updateProduct("+data[i].ProductId+", \""+data[i].ProductName+"\", \""+category_id[i]+"\", \""+brand_id[i]+"\", "+data[i].Price+", \""+data[i].Special+"\", \""+data[i].Warranty+"\", \""+data[i].Details+"\")' value='Edit'></td>"+
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
                alert("Status Changed");
                window.location.replace("index.html");
            }
            else {
                alert("Error Occurs in Status Changes");
            }
        }
    })
}

function updateProduct(product_id, product_name, category_id, brand_id, price, special, warranty, details) {
    window.location.href = "../product/edit.html?productId="+product_id+"&productName="+product_name+"&categoryId="+category_id+"&brandId="+brand_id+"&price="+price+"&special="+special+"&warranty="+warranty+"&details="+details;
}

function checkProductQuantityByBranch(product_id) {
    window.location.href = "../distributedProduct/index.html?productId="+product_id;
}
