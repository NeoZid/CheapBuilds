

let saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function(){

    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");

    let currentName = document.getElementById("currentName");
    let currentEmail = document.getElementById("currentEmail");

    if(nameInput.value != ""){
        currentName.innerHTML = nameInput.value;
        document.cookie = "profileName=" + nameInput.value;
        nameInput.value = "";
    }

    if(emailInput.value != ""){
        currentEmail.innerHTML = emailInput.value;
        document.cookie = "profileEmail=" + emailInput.value;
        emailInput.value = "";
    }

    if(passwordInput.value != ""){
        document.cookie = "profilePassword=" + passwordInput.value;
        passwordInput.value = "";
    }

    alert("Profile Updated!");

});