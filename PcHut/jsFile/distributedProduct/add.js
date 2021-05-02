$(document).ready(function () {
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var product_id_url = url.searchParams.get('productId');

    $.ajax({
        url: "http://localhost:3817/api/branches/getBranchNotAssignedForProduct/"+product_id_url,
        async: false,
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str1 = "";
                var data = xmlHttp.responseJSON;

                for (var i = 0; i < data.length; i++){
                    str1+= "<option value='"+data[i].BranchId+"'>"+data[i].Name+"</option>";
                }
            }
            else {
                alert(xmlHttp.status + ": " + xmlHttp.statusText+ "\nFor Brand List");
            }

            $("#availableBranchList").html(str1);
            $("#addDistributedProductBtn").html("<button onclick='addDistributedProduct("+product_id_url+")'>Add</button>")
        },
    })
    $("#setQuantityForBranch").html("<input type='text' id='addedProductQuantityText' name='addedProductQuantityText'>");
})

function addDistributedProduct(product_id) {

    $("#addProductQuantityBranch").validate({
        rules: {
            addedProductQuantityText: {
                required: true,
                min: 0
            }
        },
        message: {
            addedProductQuantityText: {
                required: "Quantity Required",
                min: "At Least Zero and No Alphabet"
            }
        },
        submitHandler: function (formAddProdQuantity) {
            $.ajax({
                url: "http://localhost:3817/api/distributedProducts",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    "quantity": $("#addedProductQuantityText").val(), //get data which is in the text field
                    "productId": product_id,
                    "branchId": document.getElementById("availableBranchList").value
                },
                complete: function (xmlHttp, status) {
                    //alert("here it is");
                    if (xmlHttp.status == 201) {
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nSuccessfully Added");
                        window.location.replace("index.html?productId=" + product_id);
                    } else {
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nFailed To Add");
                    }
                }
            })
        }
    }).valid();
}