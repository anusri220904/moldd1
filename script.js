const products = {
    affordable: [
        { name: "Lite Stand V1", price: 299, img: "https://via.placeholder.com/400?text=Lite+V1" },
        { name: "Eco Desktop Mount", price: 199, img: "https://via.placeholder.com/400?text=Eco+Mount" },
        { name: "Stealth Wall Hook", price: 120, img: "https://via.placeholder.com/400?text=Stealth+Hook" },
        { name: "Basic Resin Base", price: 250, img: "https://via.placeholder.com/400?text=Resin+Base" },
        { name: "Compact Travel Stand", price: 220, img: "https://via.placeholder.com/400?text=Travel+Stand" }
    ],
    premium: [
        { name: "Titanium Finish Stand", price: 899, img: "https://via.placeholder.com/400?text=Titanium+Pro" },
        { name: "Carbon Fiber Edition", price: 1250, img: "https://via.placeholder.com/400?text=Carbon+Pro" },
        { name: "Aura LED Stand", price: 990, img: "https://via.placeholder.com/400?text=LED+Pro" },
        { name: "The Commander Stand", price: 2100, img: "https://via.placeholder.com/400?text=Commander+Pro" },
        { name: "Marble Infused Pillar", price: 1600, img: "https://via.placeholder.com/400?text=Marble+Pro" }
    ],
    anime: [
        { name: "Katana Desk Mount", price: 450, img: "https://via.placeholder.com/400?text=Anime+Mount" },
        { name: "Mecha Keyring Set", price: 150, img: "https://via.placeholder.com/400?text=Mecha+Key" },
        { name: "Cyberpunk Wall Art", price: 550, img: "https://via.placeholder.com/400?text=Cyber+Art" },
        { name: "Shonen Figure Stand", price: 300, img: "https://via.placeholder.com/400?text=Figure+Stand" },
        { name: "Iconic Mask Charm", price: 120, img: "https://via.placeholder.com/400?text=Mask+Charm" }
    ]
};

let cart = [];

function showPage(pageId) {
    document.getElementById('home-page').style.display = (pageId === 'home') ? 'block' : 'none';
    document.getElementById('category-page').style.display = (pageId !== 'home' && pageId !== 'cart') ? 'block' : 'none';
    document.getElementById('cart-page').style.display = (pageId === 'cart') ? 'block' : 'none';
    if (pageId !== 'home' && pageId !== 'cart') loadCategory(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadCategory(id) {
    const titleMap = { affordable: "Affordable Stands", premium: "Premium Stands", anime: "Anime & Keyrings" };
    document.getElementById('category-title').innerText = titleMap[id];
    const list = document.getElementById('product-list');
    list.innerHTML = products[id].map((p, index) => `
        <div class="product-card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="buy-btn" onclick="addToCart('${id}', ${index})" style="width:100%; cursor:pointer; background:#000; color:#fff; border:none; padding:10px;">ADD TO CART</button>
        </div>
    `).join('');
}

function addToCart(cat, index) {
    cart.push(products[cat][index]);
    document.getElementById('cart-count').innerText = cart.length;
    alert("Added to cart!");
}

function showCart() {
    showPage('cart');
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        updateTotal();
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>
    `).join('');
    updateTotal();
}

function updateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const isCOD = document.querySelector('input[name="payment"]:checked').value === 'cod';
    const total = isCOD ? subtotal + 100 : subtotal;
    document.getElementById('final-total').innerText = total;
}

function sendToWhatsApp() {
    if (cart.length === 0) return alert("Your cart is empty!");
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const total = document.getElementById('final-total').innerText;
    let message = `*MOLDD ORDER*%0A`;
    cart.forEach((item, i) => message += `${i+1}. ${item.name} (₹${item.price})%0A`);
    message += `%0A*Payment:* ${payment.toUpperCase()}%0A*Total:* ₹${total}`;
    window.open(`https://wa.me/9336222830?text=${message}`, '_blank');
}
