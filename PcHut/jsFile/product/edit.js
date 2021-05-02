$(document).ready(function () {
    //the following variable will be assigned the whole url string
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var product_id = url.searchParams.get('productId');//get the productId value from the query string
    var product_name = url.searchParams.get('productName');
    var brand_id = url.searchParams.get('brandId');
    var category_id = url.searchParams.get('categoryId');
    var details = url.searchParams.get('details');
    var product_price = url.searchParams.get('price');
    var special = url.searchParams.get('special');
    var warranty = url.searchParams.get('warranty');
    var status = url.searchParams.get('status');

    var parse_warranty = parseFloat(warranty);
    var parse_price = parseFloat(product_price);

    $("#editProductName").html("<input type='text' id='updateProductName' value='"+product_name+"' name='updateProductName'>");

    $.ajax({
        url: "http://localhost:3817/api/categories",
        async: false,
        complete: function (xmlHttp, status) {
            if(xmlHttp.status == 200){
                var str = '';//empty variable
                var data = xmlHttp.responseJSON;
                //alert(xmlHttp.status + ": " + xmlHttp.statusText);
                for (var i = 0; i < data.length; i++){
                    if(data[i].CategoryId == category_id){
                        str+= "<option id='"+data[i].CategoryId+"' selected value='"+data[i].CategoryId+"'>"+data[i].Name+"</option>";
                    }
                    else {
                        str+= "<option value='"+data[i].CategoryId+"'>"+data[i].Name+"</option>";
                    }
                }

                $("#categoryListForProductUpdate").html(str);
            }
            else {
                alert(xmlHttp.status + ": " + xmlHttp.statusText);
            }
        }
    })

    $.ajax({
        url: "http://localhost:3817/api/brands",
        async: false,
        complete: function (xmlHttp, status) {
            if(xmlHttp.status == 200){
                var str1 = '';//empty variable
                var data1 = xmlHttp.responseJSON;
                //alert(xmlHttp.status + ": " + xmlHttp.statusText);
                for (var i = 0; i < data1.length; i++){
                    if(data1[i].BrandId == brand_id){
                        str1+= "<option id='"+data1[i].BrandId+"' selected value='"+data1[i].BrandId+"'>"+data1[i].Name+"</option>";
                    }
                    else {
                        str1+= "<option value='"+data1[i].BrandId+"'>"+data1[i].Name+"</option>";
                    }
                }

                $("#brandListForProductUpdate").html(str1);
            }
            else {
                alert(xmlHttp.status + ": " + xmlHttp.statusText);
            }
        }
    })

    //$("#editProductBrand").html("<input type='text' id='updateProductBrand' value='"+brand_id+"'>");
    //$("#editProductCategory").html("<input type='text' id='updateProductCategory' value='"+category_id+"'>");
    $("#editProductDetails").html("<input type='text' id='updateProductDetails' value='"+details+"' name='updateProductDetails'>");
    $("#editProductSpecial").html("<input type='text' id='updateProductSpecial' value='"+special+"' name='updateProductSpecial'>");
    $("#editProductWarranty").html("<input type='text' id='updateProductWarranty' value='"+warranty+"' name='updateProductWarranty'>");
    $("#editProductPrice").html("<input type='text' id='updateProductPrice' value='"+product_price+"' name='updateProductPrice'>");
    /*$("#editProductPic").html("<input type='file' id='updateProductPic' name='updateProductPic'>");*/
    $("#productUpdateBtn").html("<button onclick='editProduct("+product_id+", "+status+")'>Edit</button>")
})

function editProduct(prod_id, status) {
    var cat_id = document.getElementById("categoryListForProductUpdate");
    var category_Id = cat_id.value;
    var brId = document.getElementById("brandListForProductUpdate");
    var brand_id = brId.value;
    var warranty = $("#updateProductWarranty").val();
    //var price = $("#updateProductPrice").val();

    $("#editProductForm").validate({
        rules: {
            updateProductName: {
                required: true
            },
            updateProductDetails: {
                required: true
            },
            updateProductSpecial: {
                required: true
            },
            updateProductWarranty: {
                required: true,
                //digits: true,
                //range: [0, 9999999]
                min: 0
            },
            updateProductPrice: {
                required: true,
                //digits: true,
                //range: [1, 9999999]
                min: 1
            }
        },
        messages: {
            addProdNameText: {
                required: "Name Required!"
            },
            updateProductDetails: {
                required: "Details Required"
            },
            updateProductSpecial: {
                required: "Special Required"
            },
            updateProductWarranty: {
                required: "Warranty Required",
                //digits: "Only Digits allowed and Value Cannot be Negative",
                //range: "Must be at least 0"
                min: "Must be at least 0 and Digits only",
            },
            updateProductPrice: {
                required: "Price Required",
                //digits: "Only Digits allowed and Value Cannot be Zero",
                //range: "Must be at least 1"
                min: "Must be at least 1 and Digits only",
            }
        },
        submitHandler: function(form) {

            $.ajax({
                url: "http://localhost:3817/api/products/"+prod_id,
                method: "PUT",
                data: {
                    "productName": $("#updateProductName").val(), //get data which is in the text field
                    //"brandId": document.getElementById("brandListForProductUpdate"),
                    //"categoryId": document.getElementById("categoryListForProductUpdate"),
                    "brandId": brand_id,
                    "categoryId": category_Id,
                    "details": $("#updateProductDetails").val(),
                    "special": $("#updateProductSpecial").val(),
                    "warranty": $("#updateProductWarranty").val(),
                    "price": $("#updateProductPrice").val(), //get data which is in the text field
                    "status": status
                },
                complete: function (xmlHttp, status) {
                    //alert("here it is");
                    if(xmlHttp.status == 200){
                        alert("Successfully Updated");
                        window.location.replace("../product/index.html");
                    }
                    else {
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nFailed To Update");
                    }
                }
            })
        }
    }).valid();
}