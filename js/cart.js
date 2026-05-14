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


const user = readCookie('user');
if (!user || !user.token) {
    alert('Must be logged in to see cart');
    window.location.href='login.html';
} 

updateCartCount();

const cart = readCookie('cart');
const cartItems = document.getElementById('cart-items');
let subtotal = 0;

// cart empty = display empty msg
if (cart.length==0) {
    cartItems.innerHTML= '<p> Cart is empty </p>';
} else {
    cart.forEach((item, index) => {
        subtotal += item.price;
        cartItems.innerHTML += `
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-text">
                        <h3>${item.name}</h3>
                        <h3>$${item.price}</h3>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>    
                    </div>
                </div>                
        `;
    });
}


function removeItem(index) {
    const cart = readCookie('cart');
    cart.splice(index, 1);
    saveCookie('cart',cart);
    location.reload();
}

function updateCartCount(){
    const cart = readCookie('cart');
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}



document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`; // toFixed always makes it a decimal