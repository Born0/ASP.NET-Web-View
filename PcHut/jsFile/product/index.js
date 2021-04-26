$(document).ready(function () {
    alert("hello");
    $.ajax({
        url: "http://localhost:3817/api/product",
        //method: "GET",
        complete: function (xmlHttp, status){
            if(xmlHttp.status == 200){
                var str = '';//empty variable
                var data = xmlHttp.responseJSON;//parsing the JSON format

                for(var i = 0; i < data.length; i++){
                    str+= "<tr>"+
                        "<td>"+data[i].ProductName+"</td>"+
                        "<td>"+data[i].Price+"</td>"+
                        "<td>"+data[i].Quantity+"</td>"+
                        "<td>"+data[i].Status+"</td>"+
                        "<td><input type='button' onclick='changeStatus("+data[i].ProductId+")' value='Change Status'></td>"+
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
