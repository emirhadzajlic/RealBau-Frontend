const uploadForm = document.getElementById("newKunde");

uploadForm.addEventListener('submit', function(e) {
  document.getElementById("alert").innerHTML="";
  document.getElementById("search-loader").classList.add("active");
  e.preventDefault()

  let file = document.getElementById("myfile").files[0]
//   console.log(file)

  let formData = new FormData()
   formData.append('file', file)
//    console.log(formData);

   fetch(/*"https://realbauback.herokuapp.com/excelData"*/'http://localhost:8080/excelData', {
      method: 'POST',
      headers:{
        'authorization':getCookie("token"),
      },
      body: formData
   })
   .then(e => e.json())
   .then(data => {
    document.getElementById("search-loader").classList.remove("active");
     if(data.error){
      document.getElementById("alert").style.color="red"
      document.getElementById("alert").innerHTML=data.error;
     } else {
      document.getElementById("alert").style.color="green"
      document.getElementById("alert").innerHTML="Uspjesno unijeti podaci!"
     }
   })
})