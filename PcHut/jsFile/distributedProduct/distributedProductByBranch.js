$(document).ready(function () {
    var branchData = [];
    var product_id = [];
    var product_name = [];
    var product_price = [];
    var product_details = [];
    var product_special = [];
    var product_warranty = [];
    var status_message = [];
    var branch_id = [];
    var brandsData = [];
    var categoriesData = [];


    $.ajax({
        url: "http://localhost:3817/api/distributedProducts",
        method: "GET",
        complete: function (xmlHttp, status) {
            if (xmlHttp.status == 200) {
                var str = "";
                var data = xmlHttp.responseJSON;
                for (var i = 0; i < data.length; i++) {
                    product_id[i] = data[i].ProductId;

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
                        url: "http://localhost:3817/api/products/"+data[i].ProductId, //+ product_id_url,
                        method: "GET",
                        async: false,
                        complete: function (xmlHttp, status) {
                            if (xmlHttp.status == 200) {
                                var data3 = xmlHttp.responseJSON;

                                product_name[i] = data3.ProductName;
                                product_price[i] = data3.Price;
                                product_details[i] = data3.Details;
                                product_special[i] = data3.Special;
                                product_warranty[i] = data3.Warranty;
                                categoriesData[i] = data3.CategoryId;
                                brandsData[i] = data3.BrandId;
                                if(data3.Status == 0){
                                    status_message[i] = "Inactive By Product";
                                }
                            } else {
                                alert("Error Occurs in Status Changes");
                            }
                        }
                    })

                    $.ajax({
                        url: "http://localhost:3817/api/brands/"+brandsData[i],
                        method: "GET",
                        async: false,
                        data: {
                            "brandId": brandsData[i]
                        },
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var dataForBrands = xmlHttp.responseJSON;
                                brandsData[i] = dataForBrands.Name;
                                //brand_id[i] = dataForBrands.BrandId;
                            }
                        }
                    })

                    $.ajax({
                        url: "http://localhost:3817/api/categories/"+categoriesData[i],
                        method: "GET",
                        async: false,
                        data: {
                            "categoryId": categoriesData[i]
                        },
                        complete: function (xmlHttp, status){
                            if(xmlHttp.status == 200){
                                var data4 = xmlHttp.responseJSON;
                                categoriesData[i] = data4.Name;
                            }
                        }
                    })

                    str+= "<tr>"+
                        "<td>"+branchData[i]+"</td>"+
                        "<td>"+product_name[i]+"</td>"+
                        "<td>"+product_price[i]+"</td>"+
                        "<td>"+product_details[i]+"</td>"+
                        "<td>"+product_special[i]+"</td>"+
                        "<td>"+product_warranty[i]+"</td>"+
                        "<td id='"+data[i].DistributedProductId+"'>"+"<strong>"+data[i].Quantity+"</strong>"+"</td>"+
                        "<td>"+categoriesData[i]+"</td>"+
                        "<td>"+branchData[i]+"</td>"+
                        "<td>"+status_message[i]+"</td>"+
                        "<td><button onclick='updateQuantity("+data[i].DistributedProductId+",\""+branchData[i]+"\", "+data[i].Quantity+", "+data[i].ProductId+", "+data[i].BranchId+", "+data[i].Status+")'>Edit Quantity</button></td>"+
                        "<td><button onclick='changeProductBranchStatusInBranch("+data[i].Status+", "+data[i].DistributedProductId+", "+data[i].ProductId+", "+data[i].Quantity+", \""+status_message[i]+"\")'>Change Status</button></td>"+
                        //"<td><button onclick=''>Change Status</button></td>"+
                        "</tr>";

                    $("tbody").html(str);
                }
            }
        }
    })
})

function updateQuantity(distributed_Product_Id, branchName, quantity, productId, branchId, status) {
    window.location.href = "editQuantity.html?distributedProductId="+distributed_Product_Id+"&branchName="+branchName+"&quantity="+quantity+"&productId="+productId+"&branchId="+branchId+"&status="+status;
}

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
        window.location.replace("distributedProductByBranch.html");
    }
    if(product_quantity == 0){
        alert("No Stock left. Cannot Change Status!");
        //window.location.replace("index.html?productId="+product_id);
    }
    else if(product_quantity > 0){
        $.ajax({
            url: "http://localhost:3817/api/distributedProducts/changeProductStatusInBranch/" + distributed_product_id,
            method: "PUT",
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    alert("Status Changed Successfully");
                    window.location.replace("distributedProductByBranch.html");
                } else {
                    alert("Error Occurs in Status Changes");
                }
            }
        })
    }
}