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

function updateCartCount(){
    const cart = readCookie('cart');
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

updateCartCount();