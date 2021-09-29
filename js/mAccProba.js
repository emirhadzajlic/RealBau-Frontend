// let url = "https://realbauback.herokuapp.com";

const menuBtn = document.querySelector(".menu-btn");

const menu = document.querySelector(".menu");

const menuNav = document.querySelector(".menu-nav");

const navItems = document.querySelectorAll(".nav-item");

// Set the initial state of the menu
let showMenu = false;

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

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");

    navItems.forEach((item) => item.classList.add("show"));
    
    // Reset the menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");

    navItems.forEach((item) => item.classList.remove("show"));

    // Reset the menu state
    showMenu = false;
  }
}

function manageAcc(){
  let dataToSend = {};
  dataToSend.email = document.querySelector('#femail').value;
  dataToSend.password = document.querySelector('#fpass').value;
  dataToSend.newPassword = document.querySelector('#npass').value;
  dataToSend.newPasswordCheck = document.querySelector("#npassc").value;
  document.getElementById('pomocni').style.color = 'red';
  for (let property in dataToSend){
    if(dataToSend[property] == "") {
      document.getElementById("pomocni").innerHTML = "Popunite polja!";
      return
    } 
  }
  if(dataToSend.newPassword.length<8){
    document.getElementById('pomocni').innerText = 'Sifra mora sadrzati najmanje 8 karaktera!';
    return
  } else if(dataToSend.newPassword !== dataToSend.newPasswordCheck){
    document.getElementById('pomocni').innerText = 'Sifre se ne poklapaju!';
    return
  }
  document.getElementById("manage-acc-loader").classList.add("active"),
  fetch(/*"https://realbauback.herokuapp.com/manage"*/"http://localhost:8080/manage",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers: { 
          'authorization': getCookie("token"),
          'content-type': 'application/json' } 
    })
    .then(e => e.json())
    .then(data => {
      document.getElementById("manage-acc-loader").classList.remove("active");
      // console.log(data)
      if(data.error){
        document.getElementById('pomocni').innerText = data.error;
      } else {
        document.getElementById('pomocni').style.color = 'green';
        document.getElementById('pomocni').innerText = data.info;
        document.getElementById("fpass").value="";
        document.getElementById("npass").value="";
        document.getElementById("npassc").value="";
      }
      
    })
}

function addAcc(){
  
  let dataToSend = [];
  dataToSend[0] = document.querySelector('input[name="FirstName"]').value;
  dataToSend[1] = document.querySelector('input[name="Surname"]').value;
  dataToSend[2] = document.querySelector('input[name="Email"]').value;
  dataToSend[3] = document.querySelector('select[name="Roll"]').value;
  dataToSend[4] = document.querySelector('input[name="Password"]').value;
  document.getElementById('pomocni').style.color = "red";
  for(let i = 0; i< dataToSend.length; i++){
    if(!dataToSend[i]){
      document.getElementById('pomocni').innerText = 'Greska pri dodavanjanaloga! Provjerite polja!';
      return;
    }
  }
  if(dataToSend[4].length<8){
    document.getElementById('pomocni').innerText = 'Sifra mora sadrzati najmanje 8 karaktera!';
    return
  }
  else if(dataToSend[4] !== document.querySelector('input[name="Password2"]').value){
    document.getElementById('pomocni').innerText = 'Sifre se ne poklapaju';
    return
  }
  document.querySelector("#add-acc-loader").classList.add("active");
  fetch(/*"https://realbauback.herokuapp.com/register"*/"http://localhost:8080/register",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers: { 
          'content-type': 'application/json',
          'authorization': getCookie("token")
      } 
    })
    .then(e => e.json())
    .then( data => {
      // console.log(data)
      document.querySelector("#add-acc-loader").classList.remove("active")
      if(data.error){
        document.getElementById('pomocni').innerText = data.error;
      } else {
        document.getElementById('pomocni').style.color = "green";
        document.getElementById('pomocni').innerText = data.info;
        document.getElementById("fname").value="";
        document.getElementById("surname").value="";
        document.getElementById("add-email").value="";
        document.getElementById("fpass").value="";
        document.getElementById("fpasss").value="";
      }
      
    })
}

// var a = document.getElementById("fname"),
//     b = document.getElementById("surname"),
//     c = document.getElementById("femail"),
//     d = document.getElementById("fstatus"),
//     f = document.getElementById("fpass"),
//     g = document.getElementById("fpasss");
//   a.addEventListener('keypress', function (e) {
//       if (e.key === 'Enter') {
//         b.focus()
//       }
//   });
//   b.addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//       c.focus()
//     }
// });
// c.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     f.focus()
//   }
// });
// f.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     g.focus()
//   }
// });
// g.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     document.getElementById("btn").click()
//   }
// });

fetch(/*"https://realbauback.herokuapp.com/email"*/"http://localhost:8080/email",{
  method:"GET",
  headers:{
    'authorization': getCookie("token"),
  }
})
.then(e => e.json())
.then(data => {
  if(document.querySelector("#femail")){
    document.querySelector("#femail").value = data.email
  } 
})