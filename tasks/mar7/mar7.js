function showLogin(){

registerBox.classList.add("hidden")
loginBox.classList.remove("hidden")
title.innerText="Login"

}

/* SHOW REGISTER */

function showRegister(){

loginBox.classList.add("hidden")
registerBox.classList.remove("hidden")
title.innerText="Register"

}


/* REGISTER */

function register(){

let user=regUser.value
let pass=regPass.value

if(user==="" || pass===""){
regMsg.innerText="Fill all fields"
return
}

localStorage.setItem("user",JSON.stringify({
username:user,
password:pass
}))

regMsg.innerText="Registration Successful"

}


/* LOGIN */

function login(){

let user=loginUser.value
let pass=loginPass.value

let storedUser=JSON.parse(localStorage.getItem("user"))

if(user===storedUser.username && pass===storedUser.password){

loginMsg.innerText="Login Successful"

}else{

loginMsg.innerText="Invalid Username or Password"

}

}