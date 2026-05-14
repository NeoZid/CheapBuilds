let cookies = document.cookie.split("; ");
let userCookie = cookies.find(c => c.startsWith("user="));

if(userCookie){

    let user = JSON.parse(userCookie.split("=")[1]);

    document.getElementById("currentEmail").innerHTML = user.email;

}

fetch("https://reqres.in/api/users/2", {

    headers: {
        "x-api-key": "free_user_3Djgl5yLWVGt09qL5z1QEcj2gky"
    }

})

.then(function(response){

    return response.json();

})

.then(function(result){

    let firstName = result.data.first_name;
    let lastName = result.data.last_name;

    document.getElementById("currentName").innerHTML =
    firstName + " " + lastName;

});

let saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function(){

    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");

    if(nameInput.value != ""){

        document.getElementById("currentName").innerHTML = nameInput.value;

        document.cookie = "profileName=" + nameInput.value;

        nameInput.value = "";

    }

    if(emailInput.value != ""){

        document.getElementById("currentEmail").innerHTML = emailInput.value;

        document.cookie = "profileEmail=" + emailInput.value;

        emailInput.value = "";

    }

    if(passwordInput.value != ""){

        document.cookie = "profilePassword=" + passwordInput.value;

        passwordInput.value = "";

    }

    alert("Profile Updated!");

});