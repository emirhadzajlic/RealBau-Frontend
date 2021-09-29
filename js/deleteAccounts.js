function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
let selectedAcc;
function promptDelete(e){
  document.querySelector("#my-modal").classList.add("active");
  selectedAcc = e;
}

function continueDelete(){
  document.querySelector("#my-modal").classList.remove("active");
  deleteUser(selectedAcc);
}

function cancelDelete(){
  document.querySelector("#my-modal").classList.remove("active");
}

function deleteUser(e){
    let email = e.parentElement.parentElement.children[2].innerHTML;
    var dataToSend = {email}
    // console.log(dataToSend);
    fetch(/*"https://realbauback.herokuapp.com/deleteUser"*/"http://localhost:8080/deleteUser", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization':getCookie("token")
        },
        body: JSON.stringify(dataToSend)
    })
    .then(e => e.json())
    .then(data => {
        if(data.error){

        }else{
            e.parentElement.parentElement.remove()
        }
    })
}

fetch(/*"https://realbauback.herokuapp.com/allAccounts"*/"http://localhost:8080/allAccounts", {
    method: "POST",
    headers: {
        'authorization': getCookie("token"),
    }
})
.then(e => e.json())
.then(data => {
    let tableText = "";
      data.forEach((user) => {
        tableText += "<tr>";
        for (const column in user){
            tableText += '<td>' + user[column] + "</td>"
        }
        tableText += '<td><i onclick="promptDelete(this)" style="cursor:pointer" class="fas fa-user-slash fa-lg delete-button"></i></td>';
      tableText += "</tr>";
    });
    document.getElementById("tablebodylol").innerHTML = tableText;
    document.querySelector("#main-loader").classList.remove("active");
})