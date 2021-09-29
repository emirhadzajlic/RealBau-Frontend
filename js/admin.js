// let url = "https://realbauback.herokuapp.com";
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


function search(){
  document.getElementById("search-loader").classList.add("active");
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
	    let tableText = "";
      data.forEach((user) => {
        tableText += "<tr>";
        for (const column in user){
          if(column.toLowerCase().indexOf('finish') > -1){
            if(user[column] == "DA"){
              tableText += "<td style='color:green'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
            } else {
              tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
            }

          } else {
            if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT" || column == "CITY") {
              tableText += '<td class="for-phone">' + user[column] + "</td>"
            } else if(column == "COMMENT" || column == "ORDERID"){
              tableText += '<td class="dont-show">' + user[column] + "</td>"
            } else if(column == "DP"){
              if(user[column] !== "") {
                tableText += `<td class="for-phone"><form action="#"><input onkeypress="importDp(event,this)" type="number" class="dpInput hasDp" value="${user[column]}"></from></td>`
              } else{
                tableText += `<td class="for-phone"><form action="#"><input onkeypress="importDp(event,this)" type="number" class="dpInput" value="${user[column]}"></from></td>`
              }
            }
            else {
              tableText += '<td>' + user[column] + "</td>"
            }
          }
        }
      
      /*if(user.HBFinish==='DA'){
        
      }else{
      }
      if(user.TIEFBAUFINISH==='DA'){
        tableText += "<td style='color:green'><span style='display:none'>DA</span><img src='../background/cor1.png'></td>";
      }else{
        tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;width:30px;heigth:30px' src='../background/iks3.png'></td>";
      }
      tableText += "<td>" + user.FIRSTNAME + "</td>";
      tableText += "<td>" + user.NAME + "</td>";
      // tableText += "<td>" + user.EMAIL + "</td>";
      tableText += "<td>" + user.PHONE + "</td>";
      tableText += "<td>" + user.CITY + "</td>";
      tableText += "<td>" + user.STREET + "</td>";
      tableText += "<td>" + user.HAUSNUMMER + "</td>";
      tableText += "<td>" + user.AREAPOP + "</td>";
      tableText += "<td>" + user.DP + "</td>";
      
      // tableText += "<td style='color:red'>" + user.HBFinish + "</td>";
      // tableText += "<td>" + user.TIEFBAUFINISH + "</td>";*/
      tableText += `<td class="for-phone"><button onclick="displayForm(this)" class="bttn"><img src="../background/editIcon.png"></button></td>`;
      tableText += "</tr>";
      // console.log(user);
    });

    document.getElementById("tablebodylol").innerHTML = tableText;
    topFunction();
    document.getElementById("search-loader").classList.remove("active");
    forPhone()
})
.catch(err => console.log(err))
}

var forPhone = function(){
  if (window.innerWidth<1200){
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
//         if(column.toLowerCase().indexOf('finish') > -1){
//           if(user[column] == "DA"){
//             tableText += "<td style='color:green'><span style='display:none'>DA</span><img class='yesIcon' src='../background/cor1.png'></td>";
//           } else {
//             tableText += "<td style='color:red'><span style='display:none'>NE</span><img style='opacity:0.8;' class='noIcon' src='../background/iks3.png'></td>";
//           }

//         } else {
//           if(column == "STREET" || column == "HAUSNUMMER" || column == "ZUSAT" || column == "CITY") {
//             tableText += '<td class="for-phone">' + user[column] + "</td>"
//           } else if(column == "COMMENT"){
//             tableText += '<td class="dont-show">' + user[column] + "</td>"
//           } else {
//             tableText += '<td>' + user[column] + "</td>"
//           }
//         }
//       }
//       tableText += "</tr>";
//     });

//     document.getElementById("tablebodylol").innerHTML = tableText;
//     document.getElementById("main-loader").classList.remove("active");
//     forPhone();
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

mybutton = document.getElementById("myBtn");

// When the user scrolls down 1300px from the top of the document, show the button
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (
//     document.body.scrollTop > 600 ||
//     document.documentElement.scrollTop > 600
//   ) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

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
    /*
    var tab_text="<table border='1px'><tr height='30px' width='100px' style='color:white;font-size:18px;' bgcolor='#87AFC6'>";
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


var idZaUnos;
function displayForm(e){
  // console.log(e.parentNode.parentNode.children[2].innerHTML)
  idZaUnos = e.parentNode.parentNode.children[0].innerHTML;
  document.getElementById("inpName").innerHTML=e.parentNode.parentNode.children[1].innerHTML+" "+e.parentNode.parentNode.children[2].innerHTML + " - "+ e.parentNode.parentNode.children[4].innerHTML + " - " +e.parentNode.parentNode.children[5].innerHTML + " " +e.parentNode.parentNode.children[6].innerHTML + " " +e.parentNode.parentNode.children[7].innerHTML + ", " +e.parentNode.parentNode.children[3].innerHTML;
  console.log(e.parentNode.parentNode.children)
  document.getElementById("manageDataCont").style.opacity="1";
  document.getElementById("manageDataCont").style.marginLeft="-200%";

  let dataToSend = {};
  dataToSend.ORDERID = e.parentNode.parentNode.children[0].innerHTML;

  fetch(/*"https://realbauback.herokuapp.com/getData"*/"http://localhost:8080/getData", {
  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
    'authorization':getCookie("token"),
  },
  body: JSON.stringify(dataToSend)
})
.then(e => e.json())
.then((data) => {
  // console.log(typeof data.HBVOM)
  if(data.HBVOM !== "undefined" && data.HBVOM !== ""){
    document.getElementById("hb_vom").value= data.HBVOM;
  }
  if(data.TFVOM !== "undefined" && data.TFVOM !== ""){
    document.getElementById("tfb_vom").value= data.TFVOM;
  }
  if(data.METER !== "undefined" && data.METER !== "" && data.METER!==0){
    document.getElementById("tfb_meter").value= data.METER;
  }
  if(data.FVOM !== "undefined" && data.FVOM !== ""){
    document.getElementById("faser_vom").value= data.FVOM;
  }
  if(data.MVOM !== "undefined" && data.MVOM !== ""){
    document.getElementById("montage_vom").value= data.MVOM;
  }
  if(data.AVOM !== "undefined" && data.AVOM !== ""){
    document.getElementById("akt_vom").value= data.AVOM;
  }
  if(data.VermessungVom !== "undefined" && data.VermessungVom !== ""){
    document.getElementById("ver_vom").value= data.VermessungVom;
  }
  if(data.HBTermin !== "undefined" && data.HBTermin !== ""){
    document.getElementById("hb_termin").value= data.HBTermin.substring(0,5);
    document.getElementById("hb_termin2").value= data.HBTermin.substring(6,11);
  }
  if(data.MTERMIN !== "undefined" && data.MTERMIN !== ""){
    document.getElementById("montage_termin").value= data.MTERMIN.substring(0,5);
    document.getElementById("montage_termin2").value= data.MTERMIN.substring(6,11);  
  }
  // console.log(data.AKTIVIRUNGTERMIN)
  if(data.AKTIVIRUNGTERMIN !== "undefined" && data.AKTIVIRUNGTERMIN !== ""){
    document.getElementById("akt_termin").value= data.AKTIVIRUNGTERMIN.substring(0,5);
    document.getElementById("akt_termin2").value= data.AKTIVIRUNGTERMIN.substring(6,11);
  }
  if(data.TICKETTERMIN !== "undefined" && data.TICKETTERMIN !== ""){
    document.getElementById("ticket_termin").value= data.TICKETTERMIN.substring(0,5);
    document.getElementById("ticket_termin2").value= data.TICKETTERMIN.substring(6,11);
  }
  // console.log(data.TICKETVOM)
  if(data.TICKETVOM !== "undefined" && data.TICKETVOM !== ""){
    document.getElementById("t_vom").value= data.TICKETVOM;
  }
  // console.log(data.HBDatum)
  //if(data.HBDatum.indexOf("1979") == -1 && data.HBDatum.indexOf("1980") == -1){
    if(data.HBDatum != ""){
    // console.log(data.HBDatum)
    // console.log((parseInt(data.HBDatum.substring(0,10)[9])+1).toString())
    // parseInt(data.HBDatum.substring(8,10))
    document.getElementById("hb_datum").value= data.HBDatum.substring(0,10);
  }
  if(data.HBCALLDATE != ""){
    document.getElementById("hb_call").value= data.HBCALLDATE.substring(0,10);
  }
  if(data.HAUSBDate != ""){
    document.getElementById("hb_finish_date").value= data.HAUSBDate.substring(0,10);
  }
  if(data.TIEFBAUDatum != ""){
    document.getElementById("tfb_datum").value= data.TIEFBAUDatum.substring(0,10);
  }
  if(data.FASERDatum != ""){
    document.getElementById("faser_datum").value= data.FASERDatum.substring(0,10);
  }
  if(data.MDATUM != ""){
    document.getElementById("montage_datum").value= data.MDATUM.substring(0,10);
  }
  if(data.CALLMDate != ""){
    document.getElementById("montage_call").value= data.CALLMDate.substring(0,10);
  }
  if(data.MONTAZEDATUM != ""){
    document.getElementById("m_finish_date").value= data.MONTAZEDATUM.substring(0,10);
  }
  if(data.ADATUM != ""){
    document.getElementById("akt_datum").value= data.ADATUM.substring(0,10);
  }
  if(data.AKTIVIRUNGDATUM != ""){
    document.getElementById("akt_finish_date").value= data.AKTIVIRUNGDATUM.substring(0,10);
  }
  if(data.VermessungDatum != ""){
    document.getElementById("ver_datum").value= data.VermessungDatum.substring(0,10);
  }
  if(data.TDatum != ""){
    document.getElementById("ticket_datum").value= data.TDatum.substring(0,10);
  }
  if(data.TICKETDATUM != ""){
    document.getElementById("t_finish_date").value= data.TICKETDATUM.substring(0,10);
  }
  if(data.TCALLDATE != ""){
    document.getElementById("t_call_date").value= data.TCALLDATE.substring(0,10);
  }
  if(data.ServisPaket !== "undefined" && data.ServisPaket !== ""){
    document.getElementById("service_paket").value = data.ServisPaket;
  }
  
  


    // console.log(data.HBDatum.substring(0,10))
   
  // if(data.HBDatum!==''){
  //   document.getElementById("hb_datum").value=data.HBDatum;
  //   document.getElementById("hb_datum").disabled= true
  // }
  // if(data.HBCALLDATE!==''){
  //   document.getElementById("hb_call").value=data.HBCALLDATE;
  //   document.getElementById("hb_call").disabled= true
  // }
  // if(data.HBTermin!==''){
  //   document.getElementById("hb_termin").value=data.HBTermin;
  //   document.getElementById("hb_termin").disabled= true
  // }
  
})
.catch(err => console.log(err))
}
function removeInp(){
  document.getElementById("manageDataCont").style.opacity="0";
  document.getElementById("manageDataCont").style.marginLeft="0%";

    document.getElementById("hb_vom").value= '';
    document.getElementById("hb_termin").value= "";
    document.getElementById("hb_termin2").value= "";
    document.getElementById("tfb_vom").value= '';
    document.getElementById("tfb_meter").value= "";
    document.getElementById("faser_vom").value= '';
    document.getElementById("montage_vom").value= '';
    document.getElementById("akt_vom").value= '';
    document.getElementById("t_vom").value= '';
    document.getElementById("ver_vom").value= '';
    document.getElementById("hb_datum").value='';
    document.getElementById("hb_call").value='';
    document.getElementById("hb_finish_date").value='';
    document.getElementById("tfb_datum").value='';
    document.getElementById("faser_datum").value='';
    document.getElementById("montage_datum").value='';
    document.getElementById("montage_termin2").value= "";
    document.getElementById("montage_termin").value= "";
    document.getElementById("montage_call").value='';
    document.getElementById("m_finish_date").value='';
    document.getElementById("akt_datum").value='';
    document.getElementById("akt_termin").value= "";
    document.getElementById("akt_termin").value= "";
    document.getElementById("akt_finish_date").value='';
    document.getElementById("ver_datum").value='';
    document.getElementById("ticket_datum").value='';
    document.getElementById("t_finish_date").value='';
    document.getElementById("t_call_date").value='';
    document.getElementById("service_paket").value = '';
    document.getElementById("ticket_termin").value= "";
    document.getElementById("ticket_termin2").value= "";
    document.getElementById("comment").value= "";
  // if(document.getElementById("hb_datum").value!==''){
  //   document.getElementById("hb_datum").value='';
  //   document.getElementById("hb_datum").disabled= false
  // }
  // if(document.getElementById("hb_call").value!==''){
  //   document.getElementById("hb_call").value='';
  //   document.getElementById("hb_call").disabled= false
  // }
  // if(document.getElementById("hb_termin").value!==''){
  //   document.getElementById("hb_termin").value='';
  //   document.getElementById("hb_termin").disabled= false
  // }
}

function updateData(){
  document.getElementById("manageDataCont").style.marginLeft="200%";
  let dataToSend = {};
  console.log(idZaUnos)
  dataToSend.ORDERID = idZaUnos;
  dataToSend.FIRSTNAME = document.getElementById("inpName").innerHTML.split(" ")[0];
  dataToSend.NAME = document.getElementById("inpName").innerHTML.split(" ")[1];
  
  // console.log(document.getElementById("hb_finish_date").value.length)
  if(document.getElementById("hb_finish_date").value.length===10){
    dataToSend.HBFinish = "DA";
  }
  if(document.getElementById("tfb_datum").value.length===10){
    dataToSend.TIEFBAUFINISH = "DA";
  }
  if(document.getElementById("faser_datum").value.length===10){
    dataToSend.FFINISH = "DA";
  }
  if(document.getElementById("m_finish_date").value.length===10){
    dataToSend.MFINISH = "DA";
  }
  if(document.getElementById("akt_finish_date").value.length===10){
    dataToSend.AKTIVIRUNGFINISH = "DA";
  }
  if(document.getElementById("ver_datum").value.length===10){
    dataToSend.VermessungFinish = "DA";
  }

  let date =new Date();
  let time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  dataToSend.HBTermin = document.getElementById("hb_termin").value+"-"+document.getElementById("hb_termin2").value;
  dataToSend.HBDatum =document.getElementById("hb_datum").value;
  // console.log(dataToSend.HBDatum)
  // dataToSend.HBTermin = document.getElementById("hb_termin").value;
  dataToSend.HAUSBDate =document.getElementById("hb_finish_date").value;
  // dataToSend.HBFinish = document.getElementById("hb_finish").value;
  dataToSend.HBVOM = document.getElementById("hb_vom").value;
  dataToSend.HBCALLDATE =document.getElementById("hb_call").value;
  dataToSend.TIEFBAUDatum =document.getElementById("tfb_datum").value;
  // dataToSend.TIEFBAUFINISH = document.getElementById("tfb_finish").value;
  dataToSend.METER = document.getElementById("tfb_meter").value;
  dataToSend.TFVOM = document.getElementById("tfb_vom").value;
  dataToSend.FASERDatum =document.getElementById("faser_datum").value;
  // dataToSend.FFINISH = document.getElementById("faser_finish").value;
  dataToSend.FVOM = document.getElementById("faser_vom").value;
  dataToSend.MDATUM =document.getElementById("montage_datum").value;
  dataToSend.MTERMIN = document.getElementById("montage_termin").value+"-"+document.getElementById("montage_termin2").value;
  dataToSend.CAllMDate =document.getElementById("montage_call").value;
  dataToSend.MONTAZEDATUM =document.getElementById("m_finish_date").value;
  // dataToSend.MFINISH = document.getElementById("montage_finish").value;
  dataToSend.MVOM = document.getElementById("montage_vom").value;
  dataToSend.ADATUM =document.getElementById("akt_datum").value;
  dataToSend.AKTIVIRUNGTERMIN = document.getElementById("akt_termin").value+"-"+document.getElementById("akt_termin2").value;
  // dataToSend.AKTIVIRUNGFINISH = document.getElementById("akt_finish").value;
  dataToSend.AVOM = document.getElementById("akt_vom").value;
  dataToSend.AKTIVIRUNGDATUM =document.getElementById("akt_finish_date").value;
  dataToSend.VermessungDatum =document.getElementById("ver_datum").value;
  // dataToSend.VermessungFinish = document.getElementById("ver_finish").value;
  dataToSend.VermessungVom = document.getElementById("ver_vom").value;
  dataToSend.TICKETDATUM =document.getElementById("ticket_datum").value;
  dataToSend.TICKETTERMIN = document.getElementById("ticket_termin").value+"-"+document.getElementById("ticket_termin2").value;
  dataToSend.TDatum =document.getElementById("t_call_date").value;
  dataToSend.TICKETVOM = document.getElementById("t_vom").value;
  // dataToSend.TICKETFINISH = document.getElementById("ticket_finish").value;
  dataToSend.ServisPaket = document.getElementById("service_paket").value;
  dataToSend.COMMENT = document.getElementById("comment").value;

  for(let field in dataToSend){
    if(dataToSend[field] != ""){
      dataToSend.COMMENT =`${date.getDate()}/${date.getMonth()}/${date.getYear()} ` + time + ": " + document.getElementById("comment").value;
    }
    if(field.toLowerCase().indexOf("datum") > -1 || field.toLowerCase().indexOf("date") > -1) {
      if(dataToSend[field] !== ""){
        dataToSend[field] = dataToSend[field] + time
      }
    }
  }
  
  fetch(/*"https://realbauback.herokuapp.com/updateData"*/"http://localhost:8080/updateData", {
	  method: 'POST',
	  headers:{
      'Content-Type': 'application/json',
      'authorization':getCookie("token"),
    },
	  body: JSON.stringify(dataToSend)
  })
  .then(
    idZaUnos = "",
    document.getElementById("hb_datum").value = "",
    document.getElementById("hb_termin").value = "",
    // document.getElementById("hb_finish").value = "",
    document.getElementById("hb_finish_date").value = "",
    document.getElementById("hb_vom").value = "",
    document.getElementById("hb_call").value = "",
    document.getElementById("tfb_datum").value = "",
    // document.getElementById("tfb_finish").value = "",
    document.getElementById("tfb_meter").value = "",
    document.getElementById("tfb_vom").value = "",
    document.getElementById("faser_datum").value = "",
    // document.getElementById("faser_finish").value = "",
    document.getElementById("faser_vom").value = "",
    document.getElementById("montage_datum").value = "",
    document.getElementById("montage_termin").value = "",
    document.getElementById("montage_call").value = "",
    document.getElementById("m_finish_date").value = "",
    // document.getElementById("montage_finish").value = "",
    document.getElementById("montage_vom").value = "",
    document.getElementById("akt_datum").value = "",
    document.getElementById("akt_termin").value = "",
    // document.getElementById("akt_finish").value = "",
    document.getElementById("akt_finish_date").value = "",
    document.getElementById("akt_vom").value = "",
    document.getElementById("ver_datum").value = "",
    // document.getElementById("ver_finish").value = "",
    document.getElementById("ver_vom").value = "",
    document.getElementById("ticket_datum").value = "",
    document.getElementById("ticket_termin").value = "",
    document.getElementById("t_call_date").value = "",
    document.getElementById("t_vom").value = "",
    // document.getElementById("ticket_finish").value = "",
    document.getElementById("service_paket").value = "",
    document.getElementById("comment").value = "",
  )
  .catch(err => console.log(err))
}


function importDp(e, node){
  if(e.keyCode === 13) {
      e.preventDefault()
      // node.parentNode.parentNode.parentNode.children[0].innerHTML
      let dataToSend = {};

      dataToSend.ORDERID = node.parentNode.parentNode.children[0].innerHTML;
      if(dataToSend.ORDERID.includes("input")===true) dataToSend.ORDERID = node.parentNode.parentNode.parentNode.children[0].innerHTML;

      dataToSend.DP = node.value;
      // console.log(dataToSend)
      
      fetch("http://localhost:8080/updateDP", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'authorization':getCookie("token"),
        },
        body: JSON.stringify(dataToSend)
      })
      .then(
        // node.style.background="grey"
        node.classList.add("hasDp"),
        node.blur()
      )
      .catch(err => console.log(err))

    }
  }