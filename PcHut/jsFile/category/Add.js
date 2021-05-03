function Add(){

  $.ajax({
    url: "http://localhost:3817/api/categories",
    method: "POST",
    headers: "Content-Type:application/json",
    data:{
      "name": document.getElementById("name").value
    },
    complete: function(xmlHttp,status){
      if(xmlHttp.status==201){
        alert(xmlHttp.status + "Category Added");
      }
      else {
        alert(xmlHttp.status);
      }
    }
  })
}
