function Add(){

  $.ajax({
    url: "http://localhost:3817/api/brands",
    method: "POST",
    headers: "Content-Type:application/json",
    data:{
      "name": document.getElementById("name").value,

      "vendor_name": document.getElementById("vendor").value
    },
    complete: function(xmlHttp,status){
      if(xmlHttp.status==201){
        alert(xmlHttp.status + " Vendor Added");
      }
      else {
        alert(xmlHttp.status);
      }
    }
  })
}
