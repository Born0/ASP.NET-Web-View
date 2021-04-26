$(document).ready(function() {
    //alert("hello all BranchManager");
    $.ajax({
      url: "http://localhost:3817/api/branchManager",
      method:"GET",
      complete: function(xmlHttp,status){
        if(xmlHttp.status==200){
          var str='';
          var data= xmlHttp.responseJSON;

          for (var i = 0; i < data.length; i++) {
            str += "<tr>"+
                        "<td>"+data[i].Name+"</td>"+
                        "<td>"+data[i].Email+"</td>"+
                        "<td>"+data[i].Phone+"</td>"+
                        "<td>"+data[i].BranchId+"</td>"+
                    "</tr>";
          }
          $("tbody").html(str);
        }
        else {
          alert("No BranchManager");
        }

      }
    }); ////////////////////////


});
