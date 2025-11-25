// let userinfo = document.querySelector("#user_info")
// let userdata = document.querySelector("#user")

// let link = document.querySelector("#link")

// if(localStorage.getItem("username")){
//     link.remove()
//     userinfo.style.display = "block"
//     userdata.innerHTML = localStorage.getItem("username")
// }



// /////////////////////////////////////////////////////////////
// let allproducts = document.querySelector(".products")
// let products = document.querySelectorAll(".product_item")

// let button = document.querySelectorAll(".add_cart")
// function check(){
//     if(localStorage.getItem("username")){
//         window.location = "cartproducts.html"
//     } else{
//         window.location = "login.html"
//     }
// }
// button.forEach(btn => {
//     btn.addEventListener("click", check)
// })


// function addtocart(){
    
// }



let userinfo = document.querySelector("#user_info")
let userdata = document.querySelector("#user")
let link = document.querySelector("#link")
let cartBadge = document.querySelector(".badge")

// عرض اسم المستخدم لو موجود
if(localStorage.getItem("username")){
    link.style.display = "none"       // بدل remove()
    userinfo.style.display = "flex"    // بدل block عشان يبقى flex
    userdata.innerText = localStorage.getItem("username")  // بدل innerHTML
}


// قراءة المنتجات في الصفحة
let products = document.querySelectorAll(".product_item")
let buttons = document.querySelectorAll(".add_cart")

// جلب الكارت من localStorage أو انشاء جديد
let cart = JSON.parse(localStorage.getItem("cart")) || []

// تحديث عداد الكارت
function updateCartBadge() {
    cartBadge.innerText = cart.length
}
updateCartBadge()

buttons.forEach((btn, index) => {
    // تحديد المنتج بناءً على HTML
    let product = products[index]
    let title = product.querySelector("h2").innerText
    let price = product.querySelector("p").innerText
    let img = product.querySelector("img").src

    // تحديث نص الزرار لو المنتج موجود في الكارت
    if(cart.some(p => p.title === title)){
        btn.innerText = "Remove from Cart"
        btn.classList.remove("btn-primary")
        btn.classList.add("btn-danger")
    }

    btn.addEventListener("click", () => {
    if(!localStorage.getItem("username")){
        window.location = "login.html"
    } else {
        let productIndex = cart.findIndex(p => p.title === title)
        if(productIndex === -1){
            cart.push({title, price, img})
            btn.innerText = "Remove from Cart"
            btn.classList.remove("btn-primary")
            btn.classList.add("btn-danger")
        } else {
            cart.splice(productIndex, 1)
            btn.innerText = "Add to Cart"
            btn.classList.remove("btn-danger")
            btn.classList.add("btn-primary")
        }

        // تحديث localStorage فورًا
        localStorage.setItem("cart", JSON.stringify(cart))
        updateCartBadge()
        updateCartDropdown()
    }
})

})



let cartIcon = document.querySelector("#cart_icon")
let cartDropdown = document.querySelector("#cart_dropdown")

function updateCartDropdown() {
    if(cart.length === 0){
        cartDropdown.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cartDropdown.innerHTML = cart.map(p => `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>${p.title}</span>
                <span>${p.price}</span>
            </div>
        `).join("");

        // نضيف لينك لفتح صفحة الكارت كاملة
        cartDropdown.innerHTML += `
            <div style="text-align:center; margin-top:10px;">
                <a href="cartproducts.html" class="btn btn-primary btn-sm" id="view_full_cart">View Full Cart</a>
            </div>
        `;

        document.querySelector("#view_full_cart").addEventListener("click", (e) => {
            e.preventDefault(); // منع الانتقال الفوري
            localStorage.setItem("cart", JSON.stringify(cart)); // تأكيد حفظ الكارت
            window.location.href = "cartproducts.html"; // الانتقال للصفحة
        });

    }
}


cartIcon.addEventListener("click", () => {
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block"
})

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartBadge()
    updateCartDropdown()

}

// تشغيل أول مرة
updateCartDropdown()


// /////////////////////////////////////

let favoriteIcons = document.querySelectorAll(".favorite_icon")

favoriteIcons.forEach((icon, index) => {
    // استرجاع الحالة من localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    if(favorites.includes(index)){
        icon.classList.add("red")
    }

    icon.addEventListener("click", () => {
        icon.classList.toggle("red")

        // تحديث localStorage
        let favorites = JSON.parse(localStorage.getItem("favorites")) || []

        if(icon.classList.contains("red")){
            if(!favorites.includes(index)) favorites.push(index)
        } else {
            favorites = favorites.filter(i => i !== index)
        }

        localStorage.setItem("favorites", JSON.stringify(favorites))
    })
})



