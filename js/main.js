// fetch dynamically gets the data from the json file

fetch('./data/products.json')
    .then(response => response.json())
    .then(products => {
        const featured = products.filter(product => product.featured == true)
        const grid = document.getElementById('featured-grid');
        featured.forEach(product => {
            grid.innerHTML += ` 
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <a href="./product-detail.html?id=${product.id}">View Product</a>
                </div>
                `;
        })
        // use backticks `` since it allows multiline strings and ${} string interpolation
        // ?id : starts a query string, to pass the data through the url
        
    })