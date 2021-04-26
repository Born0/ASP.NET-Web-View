$(document).ready(function() {
  alert("Get all branch");
  $.ajax({
    url:"http://localhost:3817/api/branch",
    method:"GET",
    complete:function(xmlHttp,status){
      if(xmlHttp.status==200){
        var data=xmlHttp.responseJSON;
        var str='';
        for (var i = 0; i < data.length; i++) {
          str+="<tr>"+
                      "<td>"+data[i].Name+"</td>"+
                      "<td>"+data[i].BranchId+"</td>"+
                      "<td>"+data[i].Address+"</td>"+
                "</tr>"
        }
        $("tbody").html(str);
      }
      else {
        alert(xmlHttp.status);
      }
    }
  });
});
