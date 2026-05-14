let cartSummary = document.getElementById("cartSummary");

let total = 0;

let cookies = document.cookie.split("; ");

let cartCookie = cookies.find(c => c.startsWith("cart="));

if(cartCookie){

    let cart = JSON.parse(cartCookie.split("=")[1]);

    for(let i = 0; i < cart.length; i++){

        cartSummary.innerHTML += "<p>" + cart[i].name + " - $" + cart[i].price + "</p>";

        total += cart[i].price;

    }

    cartSummary.innerHTML += "<h3>Total: $" + total.toFixed(2) + "</h3>";

}
document.getElementById("checkoutForm").addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let delivery = document.getElementById("delivery");
    let error = document.getElementById("error");

    name.style.border = "";
    email.style.border = "";
    phone.style.border = "";
    address.style.border = "";
    delivery.style.border = "";

    if(name.value == ""){
        name.style.border = "2px solid red";
    }

    if(email.value == ""){
        email.style.border = "2px solid red";
    }

    if(phone.value == "") {
        phone.style.border = "2px solid red";
    }

    if(address.value == ""){
        address.style.border = "2px solid red";
    }

    if(delivery.value == ""){
        delivery.style.border = "2px solid red";
    }

    if(name.value == "" || email.value == "" || phone.value == "" || address.value == "" || delivery.value == ""){

        error.innerHTML = "Please fill in all fields.";

    } else{

        error.innerHTML = "";

        alert("Order Submitted!");

        name.value = "";
        email.value = "";
        phone.value = "";
        address.value = "";
        delivery.value = "";

        document.location = "checkout-confirmation.html";

    }

});