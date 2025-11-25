let username = document.querySelector("#username")
let userpassword = document.querySelector("#userpassword")

let loginbtn = document.querySelector("#signin")
let getusername = localStorage.getItem("username")
let getuserpassword = localStorage.getItem("userpassword")

loginbtn.addEventListener("click", function(e){
    e.preventDefault()
    if(username.value ===""||userpassword.value ===""){
        alert("please enter your data")
    } else{
        if(getusername && getusername.trim()=== username.value.trim() && getuserpassword && getuserpassword.trim() === userpassword.value){
            setTimeout (() =>{
                window.location = "index.html"
            },1500)
        } else {
            alert("invalid user name or password")
        }
    }
})

