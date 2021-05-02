$(document).ready(function () {
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var product_distributed_id = url.searchParams.get('distributedProductId');
    var branch_name = url.searchParams.get('branchName');
    var quantity = url.searchParams.get('quantity');
    var product_id = url.searchParams.get('productId');
    var branch_id = url.searchParams.get('branchId');
    var status = url.searchParams.get('status');
    $("#showDistributedBranchName").html("<strong>"+branch_name+"</strong>");
    $("#showDistributedProductQuantity").html("<input type='text' value='"+quantity+"' id='distributedProductQuantityUpdateText' name='distributedProductQuantityUpdateText'>");
    $("#distributedBranchQuantityUpdateBtn").html("<button onclick='editBranchProductQuantity("+product_distributed_id+", "+product_id+", "+branch_id+", "+status+")'>Update</button>");

})

function editBranchProductQuantity(product_distributed_id, product_id, branch_id, status) {
    var product_quantity = $("#distributedProductQuantityUpdateText").val();
    var parse_product_quantity = parseInt(product_quantity);
    $("#editQuantityBranchForm").validate({
        rules: {
            distributedProductQuantityUpdateText: {
                required: true,
                min: 0
            }
        },
        message: {
            required: "Quantity Required",
            min: "At Least Zero and No Alphabet"
        },
        submitHandler: function (formUpdateProdQuantity) {
            $.ajax({
                url: "http://localhost:3817/api/distributedProducts/"+product_distributed_id,
                method: "PUT",
                data: {
                    //"productId": $("#updateProductName").val(), //get data which is in the text field
                    //"brandId": document.getElementById("brandListForProductUpdate"),
                    //"categoryId": document.getElementById("categoryListForProductUpdate"),
                    "productId": product_id,
                    "branchId": branch_id,
                    "quantity": $("#distributedProductQuantityUpdateText").val(),
                    "status": status
                },
                complete: function (xmlHttp, status) {
                    //alert("here it is");
                    if(xmlHttp.status == 200){
                        alert("Successfully Updated");
                        window.location.replace("../distributedProduct/index.html?productId="+product_id);
                    }
                    else {
                        alert(xmlHttp.status + ": " + xmlHttp.statusText + "\nFailed To Update");
                    }
                }
            })
        }
    }).valid();

}