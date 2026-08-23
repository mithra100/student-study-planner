function completeTask(btn) {
    let li = btn.parentElement;

    li.innerHTML = li.innerText.replace("Pending", "Completed");

    document.getElementById("completedList").appendChild(li);

    updateCounters();
}

function deleteTask(btn) {
    btn.parentElement.remove();

    updateCounters();
}

function addTask() {
    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let date = document.getElementById("date").value;

    if (subject === "" || topic === "" || date === "") {
        alert("Fill all fields");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML =
        subject + " - " + topic + " - Pending " +
        "<button onclick='completeTask(this)'>✅ Complete</button>" +
        "<button onclick='deleteTask(this)'>🗑️ Delete</button>";

    document.getElementById("taskList").appendChild(li);

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    updateCounters();
}

function updateCounters() {
    let total =
        document.querySelectorAll("#taskList li").length +
        document.querySelectorAll("#completedList li").length;

    let completed =
        document.querySelectorAll("#completedList li").length;

    let pending =
        document.querySelectorAll("#taskList li").length;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;
}

updateCounters();