let username = document.querySelector("#username")
let userpassword = document.querySelector("#userpassword")
let email = document.querySelector("#email")

let registerbtn = document.querySelector("#signup")
registerbtn.addEventListener("click", function(e){
    e.preventDefault()
    if (username.value ===""|| userpassword ==="" || email.value ===""){
        alert("please fill data")
    }else{
        localStorage.setItem("username",username.value);
        localStorage.setItem("userpassword",userpassword.value);
        localStorage.setItem("email",email.value);
        setTimeout(() => {
            window.location ="login.html"
        },1500)
    }

})