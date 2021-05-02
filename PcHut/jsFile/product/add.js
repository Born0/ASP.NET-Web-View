$(document).ready(function () {
    //alert("add Product");
    $("#addProdName").html("<input id='addProdNameText' name='addProdNameText' class='w3-input'>");
    $("#addProdDetails").html("<input id='addProdDetailsText' name='addProdDetailsText' class='w3-input'>");
    $("#addProdSpecial").html("<input id='addProdSpecialText' name='addProdSpecialText' class='w3-input'>");
    $("#addProdWarranty").html("<input id='addProdWarrantyText' name='addProdWarrantyText' class='w3-input'>");
    $("#addProdPrice").html("<input id='addProdPriceText' class='w3-input' name='addProdPriceText'>");
    /*$("#addProdQuantity").html("<input id='addProdQuantityText'>");
    $("#addBranch").html("<input id='addProdBranchText'>");*/

    $.ajax({
        url: "http://localhost:3817/api/brands",
        async: false,
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str1 = "";
                var data = xmlHttp.responseJSON;

                for (var i = 0; i < data.length; i++){
                    str1+= "<option class='w3-bar-item w3-button' value='"+data[i].BrandId+"'>"+data[i].Name+"</option>";
                }
            }
            else {
                alert(xmlHttp.status + ": " + xmlHttp.statusText+ "\nFor Brand List");
            }

            $("#addBrandList").html(str1);
        },
    })

    $.ajax({
        url: "http://localhost:3817/api/categories",

        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str2 = "";
                var data = xmlHttp.responseJSON;

                for (var i = 0; i < data.length; i++){
                    str2+= "<option class='w3-bar-item w3-button' value='"+data[i].CategoryId+"'>"+data[i].Name+"</option>";
                }
            }
            else {
                alert(xmlHttp.status + ": " + xmlHttp.statusText +"\nFor Category List");
            }

            $("#addCategoryList").html(str2);

            $("#productAddBtn").html("<button onclick='addProduct()'>Add</button>")
        }
    })
})

function addProduct(){
    //alert("Product Added");
    var product_name = document.getElementById("addProdNameText").value;
    var details = document.getElementById("addProdDetailsText").value;
    var special = document.getElementById("addProdSpecialText").value;
    var warranty = document.getElementById("addProdWarrantyText").value;
    var price = document.getElementById("addProdPriceText").value;
    //var quantity = document.getElementById("addProdQuantityText").value;
    var category_name = document.getElementById("addCategoryList").value;
    //alert("vlkdv");
    var cat_id = document.getElementById("addCategoryList").value;
    var brand_id = document.getElementById("addBrandList").value;
    var prod_status = 1;


    $("#form").validate({
        rules: {
            addProdNameText: {
                required: true
            },
            addProdDetailsText: {
                required: true
            },
            addProdSpecialText: {
                required: true
            },
            addProdWarrantyText: {
                required: true,
                //digits: true,
                //range: [0, 9999999]
                min: 0
            },
            addProdPriceText: {
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
            addProdDetailsText: {
                required: "Details Required"
            },
            addProdSpecialText: {
                required: "Special Required"
            },
            addProdWarrantyText: {
                required: "Warranty Required",
                //digits: "Only Digits allowed and Value Cannot be Negative",
                //range: "Must be at least 1"
                min: "Must be at least 0 and Digits only",
            },
            addProdPriceText: {
                required: "Price Required",
                //digits: "Only Digits allowed and Value Cannot be Zero",
                //range: "Must be at least 1"
                min: "Must be at least 1 and Digits only",
            }
        },
        submitHandler: function(form1) {
            $.ajax({
                url: "http://localhost:3817/api/products",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    "productName": $("#addProdNameText").val(), //get data which is in the text field
                    "details": $("#addProdDetailsText").val(),
                    "special": $("#addProdSpecialText").val(),
                    "warranty": $("#addProdWarrantyText").val(),
                    "price": $("#addProdPriceText").val(), //get data which is in the text field
                    "categoryId": cat_id, //get data which is in the text field
                    //"quantity": quantity,
                    "brandId": brand_id,
                    "status": prod_status
                },
                complete: function (xmlHttp, status) {
                    //alert("here it is");
                    if(xmlHttp.status == 201){
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nSuccessfully Added");
                        window.location.replace("index.html");
                    }
                    else {
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nFailed To Add");
                    }
                }
            })
        }
    }).valid();
}
