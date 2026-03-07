function showLogin(){

registerBox.classList.add("hidden")
loginBox.classList.remove("hidden")
homeBox.classList.add("hidden")
title.innerText="Login"

}


/* SHOW REGISTER */

function showRegister(){

loginBox.classList.add("hidden")
registerBox.classList.remove("hidden")
homeBox.classList.add("hidden")
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

localStorage.setItem("loggedUser",user)

loginBox.classList.add("hidden")
homeBox.classList.remove("hidden")

welcome.innerText="Welcome "+user

}else{

loginMsg.innerText="Invalid Username or Password"

}

}


/* LOGOUT */

function logout(){

localStorage.removeItem("loggedUser")

homeBox.classList.add("hidden")
loginBox.classList.remove("hidden")

title.innerText="Login"

}