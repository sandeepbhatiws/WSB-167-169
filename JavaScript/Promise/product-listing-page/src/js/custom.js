const fetchProducts = async() => {
    var output = await fetch('https://dummyjson.com/products');
    output = await output.json();
    displayProducts(output.products);
}

fetchProducts();

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productData = ''; // Clear existing products

    products.forEach(product => {
        productData += `
            <article class="product-item">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button>Add to Cart</button>
            </article>
        `;
    });

    productList.innerHTML = productData;
}