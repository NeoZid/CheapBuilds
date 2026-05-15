let allProducts = [];

fetch('./data/products.json')
    .then(response => response.json())
    .then(products => {
        allProducts = products;

        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');
        const categoryParam = params.get('category');

        if (categoryParam) {
            document.getElementById('category-filter').value = categoryParam;
            applyFilters();
        } else if (query) {
            const searched = allProducts.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase())
            );
            renderProducts(searched);
        } else {
            renderProducts(allProducts);
        }
    });

function renderProducts(products) {
    const grid = document.getElementById('product-list-grid');
    grid.innerHTML = ''; // clear before re-rendering

    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <a href="./product-detail.html?id=${product.id}">View Product</a>
            </div>
        `;
    });
}

function applyFilters() {
    const sort = document.getElementById('sort-select').value;
    const category = document.getElementById('category-filter').value;
    const maxPrice = Number(document.getElementById('price-range').value);

    let filtered = allProducts.filter(p => {
        const matchCategory = category === '' || p.category === category;
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchPrice;
    });

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

    renderProducts(filtered);
}

// listen for changes
document.getElementById('sort-select').addEventListener('change', applyFilters);
document.getElementById('category-filter').addEventListener('change', applyFilters);
document.getElementById('price-range').addEventListener('input', () => {
    document.getElementById('price-label').textContent = `Max Price: $${document.getElementById('price-range').value}`;
    applyFilters();
});

