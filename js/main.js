// let url = "https://realbauback.herokuapp.com" 

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

let userId = 1;

// let url = "http://localhost:8080/proba";

// console.log("loading");

var forPhone = function(){
  if (window.innerWidth<1000){
     document.querySelectorAll("th, td").forEach(e => {
          if(!e.classList.contains("for-phone")){
              e.style.display = "none";
          }
     })
  } else {
      document.querySelectorAll("th, td").forEach(e => {
          if(!e.classList.contains("for-phone")){
              e.style.display = "";
          }
     })
  }
};


window.addEventListener("resize", forPhone);

function search(){
  document.querySelector("#search-loader").classList.add("active");
	let dataToSend = {};
	dataToSend.FIRSTNAME = document.querySelector('input[name="FirstName"]').value;
  dataToSend.NAME = document.querySelector('input[name="Surname"]').value;
  dataToSend.CO_ID = document.querySelector('input[name="CoId"]').value;
  dataToSend.CITY = document.querySelector('input[name="City"]').value;
  dataToSend.STREET = document.querySelector('input[name="Street"]').value;
  dataToSend.HAUSNUMMER = document.querySelector('input[name="number"]').value;
  dataToSend.DP = document.querySelector('input[name="DpNo"]').value;
  // dataToSend.STATUS = document.querySelector('input[name="Status"]').value;
  dataToSend.PHONE = document.querySelector('input[name="Tel"]').value;
  dataToSend.AREAPOP = document.querySelector('input[name="AreaPop"]').value;
  dataToSend.TZIP = document.querySelector('input[name="Tzip"]').value;
  dataToSend.EMAIL = document.querySelector('input[name="Email"]').value;
  dataToSend.HBVOM = document.querySelector('input[name="HbVom"]').value;
  dataToSend.TFVOM = document.querySelector('input[name="TfbVom"]').value;
  dataToSend.FVOM = document.querySelector('input[name="FazaVom"]').value;
  dataToSend.DPGVom = document.querySelector('input[name="DpgVom"]').value;
  dataToSend.POPVom = document.querySelector('input[name="PopVom"]').value;
  dataToSend.MVOM = document.querySelector('input[name="MVom"]').value;
  dataToSend.AVOM = document.querySelector('input[name="AVom"]').value;

  
  if(document.getElementById('tfb_finish_yes').checked || document.getElementById('tfb_finish_no').checked) {
    dataToSend.TIEFBAUFINISH = document.querySelector('input[name="tfbfinish"]:checked').value;
  }
  if(document.getElementById('hb_finish_yes').checked || document.getElementById('hb_finish_no').checked) {
    dataToSend.HBFinish = document.querySelector('input[name="hbfinish"]:checked').value
  }
  if(document.getElementById('dp_finish_yes').checked || document.getElementById('dp_finish_no').checked) {
    dataToSend.DPFinish = document.querySelector('input[name="dpfinish"]:checked').value;
  }
  if(document.getElementById('pop_finish_yes').checked || document.getElementById('pop_finish_no').checked) {
    dataToSend.POPFinish = document.querySelector('input[name="popfinish"]:checked').value;
  }
  if(document.getElementById('faza_finish_yes').checked || document.getElementById('faza_finish_no').checked) {
    dataToSend.FFINISH = document.querySelector('input[name="fazafinish"]:checked').value;
  }
  if(document.getElementById('m_finish_yes').checked || document.getElementById('m_finish_no').checked) {
    dataToSend.MFINISH = document.querySelector('input[name="mfinish"]:checked').value;
  }
  if(document.getElementById('akt_finish_yes').checked || document.getElementById('akt_finish_no').checked) {
    dataToSend.AKTIVIRUNGFINISH = document.querySelector('input[name="aktfinish"]:checked').value;
  }
  if(document.getElementById('ver_finish_yes').checked || document.getElementById('ver_finish_no').checked) {
    dataToSend.VermessungFinish = document.querySelector('input[name="verfinish"]:checked').value;
  }
  
  fetch(/*"https://realbauback.herokuapp.com/proba"*/"http://localhost:8080/proba", {
	  method: 'POST',
	  headers: {
		  'Content-Type': 'application/json',
      'authorization': getCookie("token")
	  },
	  body: JSON.stringify(dataToSend)
    }).then(e => e.json())
    .then(data => {
      // console.log(data)
	    let tableText = "";
      data.forEach((user) => {
        tableText += "<tr>";
        for (const column in user){
          if(column.toLowerCase().indexOf("datum") > -1){
            user[column]=user[column].split("");
            user[column].length = 10;
            user[column] = user[column].join("");
            if(user[column].indexOf("1979") > -1 || user[column].indexOf("1980") > -1){
              user[column] = ""
            }
          }
          if(column.toLowerCase().indexOf('finish') > -1){
            if(user[column] == "DA"){
              tableText += "<td style='color:green' class='for-phone'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
            } else {
              tableText += "<td style='color:red' class='for-phone'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
            }
  
          } else {
            if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT") {
              tableText += '<td class="for-phone">' + user[column] + "</td>"
            } else if(column.indexOf("DATUM") > -1 || column.indexOf("TERMIN") > -1){
              tableText += '<td class="dont-show">' + user[column] + "</td>"
            }
            else {
              tableText += '<td>' + user[column] + "</td>"
            }
          }
        }
      tableText += "</tr>";
    });
    
    document.getElementById("tablebodylol").innerHTML = tableText;
    topFunction();
    document.querySelector("#search-loader").classList.remove("active");
    forPhone();
})
.catch(err => console.log(err))
}



let url2 = "http://localhost:8080/tableAll";

// fetch("http://localhost:8080/tableAll",{
//   method:"POST",
//   headers:{
//     'authorization':getCookie("token")
//   }
// })
// .then(e => e.json())
//   .then((response) => {
//     let tableText = "";
//     response.forEach((user) => {
//       tableText += "<tr>";
//       for (const column in user){
//         if(column.toLowerCase().indexOf("datum") > -1){
//           user[column]=user[column].split("");
//           user[column].length = 10;
//           user[column] = user[column].join("");
//           if(user[column].indexOf("1979") > -1 || user[column].indexOf("1980") > -1){
//             user[column] = ""
//           }
//         }
//         if(column.toLowerCase().indexOf('finish') > -1){
//           if(user[column] == "DA"){
//             tableText += "<td style='color:green' class='for-phone'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
//           } else {
//             tableText += "<td style='color:red' class='for-phone'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
//           }

//         } else {
//           if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT") {
//             tableText += '<td class="for-phone">' + user[column] + "</td>"
//           } else {
//             tableText += '<td>' + user[column] + "</td>"
//           }
//         }
//       }
//       /*if(user.HBFinish==='DA'){
//         tableText += "<td style='color:green'><span style='display:none'>DA</span><img src='../background/cor1.png'></td>";
//       }else{
//         tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8; width:30px;heigth:30px' src='../background/iks3.png'></td>";
//       }
//       if(user.TIEFBAUFINISH==='DA'){
//         tableText += "<td style='color:green'><span style='display:none'>DA</span><img src='../background/cor1.png'></td>";
//       }else{
//         tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;width:30px;heigth:30px' src='../background/iks3.png'></td>";
//       }
//       tableText += "<td>" + user.FIRSTNAME + "</td>";
//       tableText += "<td>" + user.NAME + "</td>";
//       // tableText += "<td>" + user.EMAIL + "</td>";
//       tableText += "<td>" + user.PHONE + "</td>";
//       tableText += "<td>" + user.CITY + "</td>";
//       tableText += "<td>" + user.STREET + "</td>";
//       tableText += "<td>" + user.HAUSNUMMER + "</td>";
//       tableText += "<td>" + user.AREAPOP + "</td>";
//       tableText += "<td>" + user.DP + "</td>";
      
//       // tableText += "<td id='dada'>" + user.HBFinish + "</td>";
//       // tableText += "<td>" + user.TIEFBAUFINISH + "</td>";*/
//       tableText += "</tr>";
//       // console.log(user);
//     });
//     document.getElementById("tablebodylol").innerHTML = tableText;
//     document.querySelector("#main-loader").classList.remove("active");
//     forPhone();
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

mybutton = document.getElementById("myBtn");

// When the user scrolls down 1300px from the top of the document, show the button


// if(document.querySelectorAll('td').value==='NE'){
//   document.querySelectorAll('td').style.color='red';
// }

// When the user clicks on the button, scroll to the top of the table
function topFunction() {
  document.querySelector("#tblStocks").scrollIntoView(false);
  document.body.scroll = 20
}

function exportData() {
  var table = document.getElementById("tblStocks");

  var rows = [];

  for (var i = 0, row; (row = table.rows[i]); i++) {
    column1 = row.cells[0].innerText;
    column2 = row.cells[1].innerText;
    column3 = row.cells[2].innerText;
    column4 = row.cells[3].innerText;
    column5 = row.cells[4].innerText;
    column6 = row.cells[5].innerText;
    column7 = row.cells[6].innerText;
    column8 = row.cells[7].innerText;
    column9 = row.cells[8].innerText;
    column10 = row.cells[9].innerText;

    rows.push([column1, column2, column3, column4, column5, column6, column7, column8, column9, column10]);
  }
  csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach(function (rowArray) {
    row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "vermessung.csv");
  document.body.appendChild(link);

  link.click();
}

function fnExcelReport()
{
  let dataToSend = {};
	dataToSend.FIRSTNAME = document.querySelector('input[name="FirstName"]').value;
  dataToSend.NAME = document.querySelector('input[name="Surname"]').value;
  dataToSend.CO_ID = document.querySelector('input[name="CoId"]').value;
  dataToSend.CITY = document.querySelector('input[name="City"]').value;
  dataToSend.STREET = document.querySelector('input[name="Street"]').value;
  dataToSend.HAUSNUMMER = document.querySelector('input[name="number"]').value;
  dataToSend.DP = document.querySelector('input[name="DpNo"]').value;
  // dataToSend.STATUS = document.querySelector('input[name="Status"]').value;
  dataToSend.PHONE = document.querySelector('input[name="Tel"]').value;
  dataToSend.AREAPOP = document.querySelector('input[name="AreaPop"]').value;
  dataToSend.TZIP = document.querySelector('input[name="Tzip"]').value;
  dataToSend.EMAIL = document.querySelector('input[name="Email"]').value;
  dataToSend.HBVOM = document.querySelector('input[name="HbVom"]').value;
  dataToSend.TFVOM = document.querySelector('input[name="TfbVom"]').value;
  dataToSend.FVOM = document.querySelector('input[name="FazaVom"]').value;
  dataToSend.DPGVom = document.querySelector('input[name="DpgVom"]').value;
  dataToSend.POPVom = document.querySelector('input[name="PopVom"]').value;
  dataToSend.MVOM = document.querySelector('input[name="MVom"]').value;
  dataToSend.AVOM = document.querySelector('input[name="AVom"]').value;

  
  if(document.getElementById('tfb_finish_yes').checked || document.getElementById('tfb_finish_no').checked) {
    dataToSend.TIEFBAUFINISH = document.querySelector('input[name="tfbfinish"]:checked').value;
  }
  if(document.getElementById('hb_finish_yes').checked || document.getElementById('hb_finish_no').checked) {
    dataToSend.HBFinish = document.querySelector('input[name="hbfinish"]:checked').value
  }
  if(document.getElementById('dp_finish_yes').checked || document.getElementById('dp_finish_no').checked) {
    dataToSend.DPFinish = document.querySelector('input[name="dpfinish"]:checked').value;
  }
  if(document.getElementById('pop_finish_yes').checked || document.getElementById('pop_finish_no').checked) {
    dataToSend.POPFinish = document.querySelector('input[name="popfinish"]:checked').value;
  }
  if(document.getElementById('faza_finish_yes').checked || document.getElementById('faza_finish_no').checked) {
    dataToSend.FFINISH = document.querySelector('input[name="fazafinish"]:checked').value;
  }
  if(document.getElementById('m_finish_yes').checked || document.getElementById('m_finish_no').checked) {
    dataToSend.MFINISH = document.querySelector('input[name="mfinish"]:checked').value;
  }
  if(document.getElementById('akt_finish_yes').checked || document.getElementById('akt_finish_no').checked) {
    dataToSend.AKTIVIRUNGFINISH = document.querySelector('input[name="aktfinish"]:checked').value;
  }
  if(document.getElementById('ver_finish_yes').checked || document.getElementById('ver_finish_no').checked) {
    dataToSend.VermessungFinish = document.querySelector('input[name="verfinish"]:checked').value;
  }
  console.log(dataToSend)
  fetch(/*"https://realbauback.herokuapp.com/downloadExcel"*/"http://localhost:8080/downloadExcel", {
    method:"POST",
    headers: {
      'authorization': getCookie("token"),
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataToSend)
  })
  .then(e => e.blob())
  .then(e => {
    const link = URL.createObjectURL(e);
    window.location.href = link;
  })

  /*var tab_text="<table border='1px'><tr height='30px' width='100px' style='color:white;font-size:18px;' bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('tblStocks'); // id of table

    for(j = 0; j < tab.rows.length; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, ""); 
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    // var ua = window.navigator.userAgent;
    // var msie = ua.indexOf("MSIE "); 

    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    // {
    //     txtArea1.document.open("txt/html","replace");
    //     txtArea1.document.write(tab_text);
    //     txtArea1.document.close();
    //     txtArea1.focus(); 
    //     sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    // }   
        sa = window.location.assign('data:application/vnd.ms-excel; charset=utf-8,' + encodeURIComponent(tab_text));

    return (sa);*/
}
let i=0;
let moreOptionsButton = document.querySelector("#options-button").parentElement;
function displayMoreFilters(){
    
    if(i%2===0) {
      document.getElementById("options-button").classList.add("rotate")
      document.getElementById("moreInputs").classList.add("more-inputs-active");
    }
    else {
      document.getElementById("options-button").classList.remove("rotate")
      document.getElementById("moreInputs").classList.remove("more-inputs-active");
    }
    i++;
} 


moreOptionsButton.addEventListener('mouseover', function(e){
  moreOptionsButton.firstElementChild.classList.remove("black");
})
moreOptionsButton.addEventListener('mouseout', function(e){
  moreOptionsButton.firstElementChild.classList.add("black");
})