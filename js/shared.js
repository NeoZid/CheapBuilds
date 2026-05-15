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
        const value = found.substring(found.indexOf('=') + 1); // split the data, becomes key=value pair again
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

const searchInput = document.getElementById('product-search');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (query.length < 2) {
        removeSuggestions();
        return;
    }

    fetch('./data/products.json')
        .then(r => r.json())
        .then(products => {
            const matches = products.filter(p => 
                p.name.toLowerCase().includes(query)
            ).slice(0, 5);
            showSuggestions(matches);
        });
});

function showSuggestions(products) {
    removeSuggestions();
    const box = document.createElement('div');
    box.id = 'suggestions-box';
    products.forEach(p => {
        const item = document.createElement('div');
        item.textContent = p.name;
        item.addEventListener('click', () => {
            window.location.href = `./product-detail.html?id=${p.id}`;
        });
        box.appendChild(item);
    });
    searchInput.parentElement.appendChild(box);
}

function removeSuggestions() {
    const existing = document.getElementById('suggestions-box');
    if (existing) existing.remove();
}