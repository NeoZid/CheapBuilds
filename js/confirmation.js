let cartSummary = document.getElementById("cartSummary");

let total = 0;

let cookies = document.cookie.split("; ");

let cartCookie = cookies.find(c => c.startsWith("cart="));

let cart = [];

if(cartCookie){

    cart = JSON.parse(cartCookie.substring(cartCookie.indexOf('=') + 1));

}

if(cart.length == 0){

    cartSummary.innerHTML = "<p>Your cart is empty.</p>";

}

else{

    for(let i = 0; i < cart.length; i++){

        cartSummary.innerHTML += "<p>" + cart[i].name + " - $" + cart[i].price + "</p>";

        total += cart[i].price;

    }

    const TAX_RATE = 0.15;
    const tax = total * TAX_RATE;
    const grandTotal = total + tax;
        cartSummary.innerHTML += `
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p>Tax (15%): $${tax.toFixed(2)}</p>
            <h3>Total: $${grandTotal.toFixed(2)}</h3>
    `;

}

let confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", function(){


    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("Order Confirmed!");

    document.location = "index.html";

});