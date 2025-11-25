// ====== عرض اسم المستخدم أو Sign In / Sign Up ======
let userdata = document.querySelector("#user")
let userinfo = document.querySelector("#user_info")
let link = document.querySelector("#link")
let cartBadge = document.querySelector("#cart_count")
let cartDropdown = document.querySelector("#cart_dropdown")
let cartIcon = document.querySelector("#cart_icon")

if(localStorage.getItem("username")){
    link.style.display = "none"
    userinfo.style.display = "flex"
    userdata.innerText = localStorage.getItem("username")
}

// Log Out
document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("username")
    window.location = "index.html"
})

// جلب الكارت من localStorage
let cartContainer = document.querySelector("#cart_container")
let cart = JSON.parse(localStorage.getItem("cart")) || []

// تحديث عداد الكارت
function updateCartBadge() {
    cartBadge.innerText = cart.length
}
updateCartBadge()

// تحديث محتوى الـ dropdown للكارت
function updateCartDropdown() {
    if(cart.length === 0){
        cartDropdown.innerHTML = "<p>Your cart is empty</p>"
    } else {
        cartDropdown.innerHTML = cart.map(p => `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>${p.title}</span>
                <span>${p.price}</span>
            </div>
        `).join("")
    }
}
updateCartDropdown()

cartIcon.addEventListener("click", () => {
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block"
})

// حساب السعر الكلي
function updateTotal(){
    let total = cart.reduce((sum, product) => {
        let priceNum = parseFloat(product.price.replace(/[^0-9.]/g,''))
        return sum + priceNum
    }, 0)
    document.querySelector("#total_price").innerText = `Total Price: $${total}`
}

// عرض الكارت
function renderCart(){
    cartContainer.innerHTML = "";
    if(cart.length === 0){
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach(product => {
            let div = document.createElement("div");
            div.classList.add("col-md-4");
            div.innerHTML = `
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="" width="400" height="350">
                    <div class="card-body">
                        <h2>${product.title}</h2>
                        <p>${product.price}</p>
                        <button class="btn btn-danger remove_btn">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(div);

            div.querySelector(".remove_btn").addEventListener("click", () => {
                cart = cart.filter(p => p.title !== product.title);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });
    }

    updateCartBadge();
    updateCartDropdown();
    updateTotal();
}
