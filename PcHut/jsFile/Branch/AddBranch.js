

    function AddBranch(){
      alert("ADD from JS 2");
      $.ajax({
        url: "http://localhost:3817/api/branches",
        method: "POST",
        headers: "Content-Type:application/json",
        data:{
          "name": document.getElementById("branchName").val(),
           
          "address": document.getElementById("branchAddress").val()
        },
        complete: function(xmlHttp,status){
          if(xmlHttp.status==201){
            alert(xmlHttp.status + "Branch Added");
          }
          else {
            alert(xmlHttp.status);
          }
        }
      })
    }
