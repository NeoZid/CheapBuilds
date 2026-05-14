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

fetch('./data/products.json')
    .then(response => response.json())
    .then(products => {
        const params = new URLSearchParams(window.location.search); // this extracts the url from the query we did from product-list
        const id = Number(params.get('id')); // we put the extracted id into const id -- > number method parses string into int
        const product = products.find(p => p.id == id); // matches productid from json to extracted product
        
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `Product Price: $${product.price}`;
        document.getElementById('product-sku').textContent = `Product SKU: ${product.sku}`;
        document.getElementById('product-availability').textContent = `Availability: ${product.availability}`;
        document.getElementById('product-description').textContent = `Description: ${product.description}`;
        document.getElementById('product-specs').innerHTML = `
            <h1>Product Specs</h1>
            <p>CPU: ${product.specs.cpu}</p>
            <p>GPU: ${product.specs.gpu}</p>
            <p>RAM: ${product.specs.ram}</p>
            <p>Storage: ${product.specs.storage}</p>
            <p>OS: ${product.specs.os}</p>
        `;


        document.getElementById('add-to-cart').addEventListener('click', () => {
            const cart = readCookie('cart');
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            })

            saveCookie('cart',cart);
            alert('Product added to Cart!');
        });
    });

fetch('./data/reviews.json')
    .then(response => response.json())
    .then(reviews => {
        const params = new URLSearchParams(window.location.search);
        const id = Number(params.get('id'));
        const productReviews = reviews.filter(r => r.productId == id);
        productReviews.forEach(review => {
            document.getElementById('reviews-list').innerHTML += `
                <div class="review-card">
                    <h3>${review.author} — ${review.rating}/5</h3>
                    <p><strong>${review.title}</strong></p>
                    <p>${review.body}</p>
                    <p>${review.date}</p>
            </div>
        `;
        });
        
    });