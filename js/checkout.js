function readCookie(name) {
    // we put the cookies into a variable by splitting ; = we get an array of cookies doing so 
    const cookies = document.cookie.split('; ');

    // find the cookies that starts with "cart="
    const found = cookies.find(c => c.startsWith(name + '='));

    if (found) {
        const value = found.split('=')[1]; // split the data, becomes key=value pair again
        return JSON.parse(value); // we parse and read the cookie
    } else {
        return [];
    }
}


const user = readCookie('user');
if (!user || !user.token) {
    alert('Must be logged in to see cart');
    window.location.href='login.html';
} 

let cartSummary = document.getElementById("cartSummary");

let total = 0;

let cookies = document.cookie.split("; ");

let cartCookie = cookies.find(c => c.startsWith("cart="));
let cart = [];

if(cartCookie){

     cart = JSON.parse(cartCookie.substring(cartCookie.indexOf('=') + 1));


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
document.getElementById("checkoutForm").addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let delivery = document.getElementById("delivery");
    let error = document.getElementById("error");
   
    if(cart.length == 0){

    error.innerHTML = "Your cart is empty.";

    return;

}

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