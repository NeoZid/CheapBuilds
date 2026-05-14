function saveCookie(name, value) {
    document.cookie = `${name}=${JSON.stringify(value)}; path=/`; 
    // stores the cookies 'key' as the name, value is the cart array, 
    // gets translated into a string so the cookie can read it,
    // path makes it so the cookie is available on every page

}

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

const cart = readCookie('cart');
const cartItems = document.getElementById('cart-items');
let subtotal = 0;

// cart empty = display empty msg
if (cart.length==0) {
    cartItems.innerHTML= '<p> Cart is empty </p>';
} else {
    cart.forEach(item => {
        subtotal += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="{item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button>Remove</button>
            </div>
        `;
    });
}


document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`; // toFixed always makes it a decimal