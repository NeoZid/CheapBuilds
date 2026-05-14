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