const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Login Function
function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user.trim() == "admin" && pass.trim() == "1234"){
        window.location.href = "dashboard.html";
    }else{
        document.getElementById("msg").innerHTML =
        "Invalid Username or Password";
    }
}