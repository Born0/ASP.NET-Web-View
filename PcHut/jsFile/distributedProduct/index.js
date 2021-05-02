$(document).ready(function () {
    //the following variable will be assigned the whole url string
    var urlString = window.location;
    //creating a url type object. this object will help us get the data from the url string that we have passed in the url
    var url = new URL(urlString);
    var product_id_url = url.searchParams.get('productId');//get the productId value from the query string

    var productData = [];
    var branchData = [];
    var branch_id = [];
    var product_id = [];
    var status_message = [];
    $("#addProductToANewBranchBtn").html("<button onclick='addProductToANewBranch("+product_id_url+")'>Add Product to New Branch</button>")

    $.ajax({
        url: "http://localhost:3817/api/distributedProducts/"+product_id_url,
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = "";
                var data = xmlHttp.responseJSON;
                for (var i = 0; i < data.length; i++) {

                    $.ajax({
                        url: "http://localhost:3817/api/branches/" + data[i].BranchId,
                        method: "GET",
                        async: false,
                        data: {
                            "branchId": data[i].BranchId
                        },
                        complete: function (xmlHttp, status) {
                            if (xmlHttp.status == 200) {
                                var data1 = xmlHttp.responseJSON;
                                branchData[i] = data1.Name;
                                branch_id[i] = data1.BranchId;
                            }
                        }
                    })

                    //Condition to give a status message
                    if(data[i].Quantity == 0){
                        status_message[i] = "Out of Stock";
                    }
                    else{
                        if(data[i].Status == 1){
                            status_message[i] = "Active";
                        }
                        else {
                            status_message[i] = "Inactive";
                        }
                    }

                    //Check the Main Product Status
                    $.ajax({
                        url: "http://localhost:3817/api/products/" + product_id_url,
                        method: "GET",
                        async: false,
                        complete: function (xmlHttp, status) {
                            if (xmlHttp.status == 200) {
                                var data3 = xmlHttp.responseJSON;
                                if(data3.Status == 0){
                                    status_message[i] = "Inactive By Product";
                                }
                            } else {
                                alert("Error Occurs in Status Changes");
                            }
                        }
                    })

                    str+= "<tr>"+
                        "<td>"+branchData[i]+"</td>"+
                        "<td id='"+data[i].DistributedProductId+"'>"+"<strong>"+data[i].Quantity+"</strong>"+"</td>"+
                        "<td>"+status_message[i]+"</td>"+
                        "<td><button onclick='updateQuantity("+data[i].DistributedProductId+",\""+branchData[i]+"\", "+data[i].Quantity+", "+product_id_url+", "+data[i].BranchId+", "+data[i].Status+")'>Edit Quantity</button></td>"+
                        "<td><button onclick='changeProductBranchStatusInBranch("+data[i].Status+", "+data[i].DistributedProductId+", "+product_id_url+", "+data[i].Quantity+", \""+status_message[i]+"\")'>Change Status</button></td>"+
                        //"<td><button onclick=''>Change Status</button></td>"+
                        "</tr>";

                    $("tbody").html(str);
                }
            }
        }
    })
})

function changeProductBranchStatusInBranch(status, distributed_product_id, product_id, product_quantity, status_message){

    //Rules for Status message for an individual Branch Product
    //1. If the Main Product Status is Inactive then the products for Particular branch Status will be "Inactive By Product"
    //and if we want to change the Status of the particular Product Branch then the status will remain the same.
    //2. If Main Product Status is Active and the Branch Product Status is Inactive and then we change the status,
    // then it will be Active; Vice Versa
    //3.If the Main Product Status is Active but the Branch for the particular Product Stock Quantity is 0 then,
    // if the change the status the status will be changed
    if(status_message == "Inactive By Product"){
        alert("This Product is Inactive.");
        window.location.replace("index.html?productId="+product_id);
    }
    if(product_quantity == 0){
        alert("No Stock left. Cannot Change Status!");
        window.location.replace("index.html?productId="+product_id);
    }
    else if(product_quantity > 0){
        $.ajax({
            url: "http://localhost:3817/api/distributedProducts/changeProductStatusInBranch/" + distributed_product_id,
            method: "PUT",
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    alert("Status Changed Successfully");
                    window.location.replace("index.html?productId=" + product_id);
                } else {
                    alert("Error Occurs in Status Changes");
                }
            }
        })
    }
}

function updateQuantity(distributed_Product_Id, branchName, quantity, productId, branchId, status) {
    window.location.href = "editQuantity.html?distributedProductId="+distributed_Product_Id+"&branchName="+branchName+"&quantity="+quantity+"&productId="+productId+"&branchId="+branchId+"&status="+status;
}

function addProductToANewBranch(product_id) {
    window.location.href = "add.html?productId="+product_id;
}