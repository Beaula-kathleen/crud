//      ****************************************************************************************
//      *   Name of the challenge: CRUD.                                                       *
//      *   Challange .No : 17                                                                 *
//      *   Developed by: Beaula VHI tech                                                      *
//      *   Programmed by: Beaula                                                              *
//      *   Maintenance history:Beaula. Ticket no:                                             *
//      ****************************************************************************************

let dateInput = document.getElementById("dateInput");                                  //getting date as an input
dateInput.max = new Date().toISOString().split("T")[0];                                //setting the current date as max in date field
let organization = document.getElementById("organization");                            //getting organization as an input
let female = document.getElementById("female");                                        //getting genderSelection input if female is selected
let male = document.getElementById("male");                                            //getting genderSelection input if male is selected
let firstName = document.getElementById("firstName");                                  //getting the first name as an input
let lastNames = document.getElementById("lastNames");                                  //getting the last name as an input
let emailAddress = document.getElementById("emailAddress");                            //getting the emailAddress as an input
let cityInput = document.getElementById("cityInput");                                  //getting the city as an input
let permanentRescidence = document.getElementById("permanentRescidence");              //getting the permanentRescidence as an input
let communicationRescidence = document.getElementById("communicationRescidence");      //getting the communicationRescidence as an input
let mobile = document.getElementById("mobile");                                        //getting the mobile as an input
let pincode = document.getElementById("pincode");                                      //getting the pincode as an input
let imageInput=document.getElementById('imageInput');                                  //getting the imageInput as an input
let update=document.getElementById("update")                                           //input form the button update
let register=document.getElementById("register");                                      //input form the button register
let checkedValue=document.getElementById("checkedValue")                               //input from the checkbox checkedValue
let countryInputs;                                                                     //intiaizing the country datas
let state = document.getElementById("state");                                          //getting inputs from state  field
let country = document.getElementById("country");                                      // getting inputs from country
let incorrectForm=document.getElementById("incorrectForm");                            //invalid email type
let storedData;                                                                        // storing the object from the local storage                     
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;                      //mail formate validation
let genderSelection = document.getElementById("genderSelection");                      //gender input field
incorrectForm.style.display="none"
update.style.display="none"
const requiredField = [dateInput,country,organization,lastNames,mobile,firstName,emailAddress,cityInput,communicationRescidence,pincode,imageInput,permanentRescidence];
// reqired fields

country.addEventListener("change",(element) =>{                                        //on changing the country input
  stateOptions(element.target.value);})
function stateOptions(element){state.value=''
    let selectedState =countryInputs.filter(countryInputs => countryInputs.name === element);
    selectedState[0].states.forEach((element)=>{
    let newOption = document.createElement('option');
    newOption.value =element.name ;
    newOption.text = element.name;
    state.appendChild(newOption); 
    })
  }

fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates.json")
.then((response) => response.json())
.then((countryDetails) => {
countryInputs=countryDetails
let country=document.getElementById("country")
countryDetails.forEach((element)=>{
let newOption = document.createElement('option'); 
newOption.value = element.name;
newOption.text = element.name;
country.appendChild(newOption);
})
});

function emailCheck(){                                                        //Email validation
  if(emailAddress.value.match(mailformat)){
    incorrectForm.style.display="none";register.style.pointerEvents="auto"
  }
  else{incorrectForm.style.display="inline-block";
  register.style.pointerEvents="none"
  }
}

displayTable()
function displayTable() {                                                    //Table creation 
  if(localStorage.length != 0){
  let table = `<table>
  <th>FirstName</th>
  <th>Country</th>
  <th>Organization</th>
  <th>Email Id</th>
  <th>mobile</th>
  <th>Edit</th>
  <th>Delete</th>
  <tr>
`;
  for (let item = 0; item < localStorage.length; item++) {
    let uniqueValue = localStorage.key(item);
    let storedData = JSON.parse(localStorage.getItem(uniqueValue));
    table += `<tr>
      <td>${JSON.stringify(storedData.firstName)}</td>
      <td>${JSON.stringify(storedData.country)}</td>
      <td>${JSON.stringify(storedData.organization)}</td>
      <td>${JSON.stringify(storedData.emailAddress)}</td>
      <td>${JSON.stringify(storedData.mobile)}</td>
      <td> <img src="image/edit.png" alt="" height='18' width='18' id=${uniqueValue} onclick= "editingField(id)" class="change"></td>
      <td><img src="image/delete1.png" alt="" height='18' width='18' id=${uniqueValue} onclick= "removingField(id)" class="change"></td>
      </tr>`;
  }
  table += "</table>";
  document.getElementById("datass").innerHTML = table;}
}
function removingField(uniqueValue) {                                            //Deleting datas
  window.localStorage.removeItem(uniqueValue);
  window.location.reload();
}
function fieldCheck(){                                                           //Input field validation
  let hasData = true;
  requiredField.forEach((element) => {
    if (element.value === "" || element.value === null ||(element.id === "imageInput" && imageInput.src.length === 0)) {
      document.getElementById((element.id)+'Invalid').style.visibility="visible";
      hasData = false;
    }
    else{document.getElementById((element.id)+'Invalid').style.visibility="hidden";}
    if(hasData){
      if(mobile.value.length < 10){
        alert("Enter 10 digits in mobile number");
        register.style.pointerEvents="none"
        update.style.pointerEvents="none";
        hasData =false;
      }
      else{
        register.style.pointerEvents="auto"
        update.style.pointerEvents="auto";
      }
    }
  });
  return (hasData)
}
function editingField(uniqueValue) {                                         //Editing datas
  register.style.display="none"; 
  update.style.display="inline-block"
  let editchange=document.getElementsByClassName("change");
    for(let input=0;input < editchange.length;input++){
      editchange[input].style.pointerEvents="none";}
  storedData = JSON.parse(localStorage.getItem(uniqueValue));
  if(storedData.checkedValue === "active"){                                 //Check box validation
      checkedValue.checked = true;
      combineAddress();
  }
  if(storedData.genderSelection === "female"){                              //radio button validation
    female.checked=true
  }
  
  requiredField.forEach((element) => {                                      //Displaying the selected objects datas
    let requiredElement=document.getElementById(element.id)
    requiredElement.value = storedData[element.id];
    if(element.id === "imageInput"){
      imageInput.setAttribute("src", `${storedData[element.id]}`);
    }
  });
  stateOptions(storedData.country);
  state.value= storedData.state;
  fieldCheck();

  update.addEventListener("click", () => {                                  // saving the updated data
    let validationCheck=fieldCheck();
    if (validationCheck) { 
      for(let input=0;input < editchange.length;input++){
        editchange[input].style.pointerEvents="auto";}
   let detail=true;
if(uniqueValue != mobile.value){                                            //Checking the duplicate entry
      for(let input=0;input<localStorage.length;input++){
        if(localStorage.key(input) === mobile.value){alert("Duplicate entry");detail=false;break;}}
    }
if(detail){
  register.style.display="inline-block"
  update.style.display="none";
    requiredField.forEach((element) => {
      storedData[element.id] = element.value;
      storedData[state.id]=state.value
        localStorage.setItem(mobile.value,JSON.stringify({dateInput: dateInput.value,country: country.value,organization: organization.value,lastNames: lastNames.value,mobile: mobile.value,firstName: firstName.value,emailAddress: emailAddress.value,cityInput: cityInput.value,communicationRescidence: communicationRescidence.value,pincode: pincode.value,state: state.value,imageInput:imageInput.src,genderSelection: genderSelection.value,permanentRescidence:permanentRescidence.value,checkedValue:checkedValue.value}));
        if(uniqueValue != mobile.value){
          window.localStorage.removeItem(uniqueValue);
        }
    window.location.reload();
    });}
  }
  }); 
}
genderSelection.value = "male";
function genderValue() {                                                      
  if (female.checked === true) {
    genderSelection.value = female.value;
  } else {
    genderSelection.value = male.value;
  }
}
function registeringInputs() {                                           //Registering inputs
let validationCheck=fieldCheck();
  if (validationCheck) 
  {let detail=true;
    for(let input=0;input<localStorage.length;input++){
    if(localStorage.key(input)===mobile.value){alert("Duplicate entry");
    detail=false;
    break;}
  }if(detail){
    localStorage.setItem(mobile.value,JSON.stringify({dateInput: dateInput.value,country: country.value,organization: organization.value,lastNames: lastNames.value,mobile: mobile.value,firstName: firstName.value,emailAddress: emailAddress.value,cityInput: cityInput.value,communicationRescidence: communicationRescidence.value,pincode: pincode.value,state: state.value,imageInput:imageInput.src,genderSelection: genderSelection.value,permanentRescidence:permanentRescidence.value,checkedValue:checkedValue.value}));
    window.location.reload();
  }
}
} 
function clearArea(index) {                                               // clering the helper texts
  requiredField.filter(element =>{
    if(element.id === index){
     document.getElementById((element.id)+'Invalid').style.visibility="hidden";
  }   
    else if(index ==="uploadImage"){
      imageInputInvalid.style.visibility="hidden";
    }
    else if (index === "mobile" && mobile.value.length === 10){
      register.style.pointerEvents="auto"
      update.style.pointerEvents="auto";
    }
  })
  if(index==="pincode" && pincode.value.length === 1 && pincode.value != 6){
    alert("The first number must be 6");
    register.style.pointerEvents="none"
    update.style.pointerEvents="none";
  }
  else{
    register.style.pointerEvents="auto"
    update.style.pointerEvents="auto";
  }
}
function combineAddress() {                                                     //combining address
  if (checkedValue.checked === true) { 
    clearArea("permanentRescidence")
    permanentRescidence.disabled = true;
    permanentRescidence.value = communicationRescidence.value;
    checkedValue.value="active";
  } else {
    permanentRescidence.disabled = false;
    checkedValue.value="disable";
  }
}
function reset(){                                                              //restting the function 
  window.location.reload();
}
let fileInput = document.getElementById('myFile');
fileInput.addEventListener('change', () => {                                  //for reading the image
let file = fileInput.files[0];
if (!'image/png'.includes(file.type) && !'image/gif'.includes(file.type) && !'image/jpeg'.includes(file.type)) {
alert('Only PNG, GIF, and JPEG images are allowed.');
fileInput.value = '';
}
else{
  const reader = new FileReader();
  reader.addEventListener("load", () => {
  uploadedImage = reader.result;
  imageInput.setAttribute("src", `${uploadedImage}`);
  });
  reader.readAsDataURL(file);
  }
  });




























  // let imageInputInvalid=document.getElementById('imageInputInvalid');
// let countryInvalid = document.getElementById("countryInvalid");
// let lastNamesInvalid = document.getElementById("lastNamesInvalid");
// let organizationInvalid = document.getElementById("organizationInvalid");
// let dateInputInvalid = document.getElementById("dateInputInvalid");
// let mobileInvalid = document.getElementById("mobileInvalid");
// let firstNameInvalid = document.getElementById("firstNameInvalid");
// let emailAddressInvalid = document.getElementById("emailAddressInvalid");
// let cityInputInvalid = document.getElementById("cityInputInvalid");
// let communicationRescidenceInvalid = document.getElementById("communicationRescidenceInvalid");
// let pincodeInvalid = document.getElementById("pincodeInvalid");
// let permanentRescidenceInvalid=document.getElementById("permanentRescidenceInvalid");