$(document).ready(function () {
    alert("add Product");
    $("#addProdName").html("<input id='addProdNameText'>");
    $("#addProdDetails").html("<input id='addProdDetailsText'>");
    $("#addProdSpecial").html("<input id='addProdSpecialText'>");
    $("#addProdWarranty").html("<input id='addProdWarrantyText'>");
    $("#addProdPrice").html("<input id='addProdPriceText'>");
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
                    str1+= "<option value='"+data[i].BrandId+"'>"+data[i].Name+"</option>";
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
                    str2+= "<option value='"+data[i].CategoryId+"'>"+data[i].Name+"</option>";
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
    alert("Product Added");
    var product_name = document.getElementById("addProdNameText").value;
    var details = document.getElementById("addProdDetailsText").value;
    var special = document.getElementById("addProdSpecialText").value;
    var warranty = document.getElementById("addProdWarrantyText").value;
    var price = document.getElementById("addProdPriceText").value;
    //var quantity = document.getElementById("addProdQuantityText").value;
    var category_name = document.getElementById("addCategoryList").value;
    alert("vlkdv");
    var cat_id = document.getElementById("addCategoryList").value;
    var brand_id = document.getElementById("addBrandList").value;
    //var branch_id = document.getElementById("addProdBranchText").value;
    //var category_Id = cat_id.value;
    //alert("hijfisd");

    $.ajax({
        url: "http://localhost:3817/api/products",
        method: "POST",
        headers: "Content-Type:application/json",
        data: {
            "productName": product_name, //get data which is in the text field
            "details": details,
            "special": special,
            "warranty": warranty,
            "price": price, //get data which is in the text field
            "categoryId": cat_id, //get data which is in the text field
            //"quantity": quantity,
            "brandId": brand_id,
            //"branchId": branch_id
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
