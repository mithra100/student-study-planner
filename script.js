

    function completeTask(btn) {
    let li = btn.parentElement;
    li.innerHTML = li.innerText.replace("Pending", "Completed");
}

function addTask() {

    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let date = document.getElementById("date").value;

    if(subject === "" || topic === "" || date === ""){
        alert("Fill all fields");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML =
    subject + " - " + topic +
    " - Pending <button onclick='completeTask(this)'>✅ Complete</button>";

    document.getElementById("taskList").appendChild(li);

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";
}