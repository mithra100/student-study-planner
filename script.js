const darkModeBtn = document.getElementById("darkModeBtn");

if(darkModeBtn){
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

function addTask(){

    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let date = document.getElementById("date").value;

    if(subject=="" || topic=="" || date==""){
        alert("Fill all fields");
        return;
    }

    alert(
        "Subject: " + subject +
        "\nTopic: " + topic +
        "\nDate: " + date
    );
}