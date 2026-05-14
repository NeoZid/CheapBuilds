let cartSummary = document.getElementById("cartSummary");

let total = 0;

let cookies = document.cookie.split("; ");

let cartCookie = cookies.find(c => c.startsWith("cart="));

let cart = [];

if(cartCookie){

    cart = JSON.parse(cartCookie.split("=")[1]);

}

if(cart.length == 0){

    cartSummary.innerHTML = "<p>Your cart is empty.</p>";

}

else{

    for(let i = 0; i < cart.length; i++){

        cartSummary.innerHTML += "<p>" + cart[i].name + " - $" + cart[i].price + "</p>";

        total += cart[i].price;

    }

    cartSummary.innerHTML += "<h3>Total: $" + total.toFixed(2) + "</h3>";

}

let confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", function(){


    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("Order Confirmed!");

    document.location = "index.html";

});