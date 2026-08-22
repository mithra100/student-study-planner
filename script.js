document.querySelector("button").addEventListener("click", function() {
    alert("Task Added Successfully!");
});

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
});

function updateClock(){
    const now = new Date();
    document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();
}

setInterval(updateClock,1000);
updateClock();