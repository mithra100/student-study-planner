function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li, #completedList li").forEach(li => {
        tasks.push({
            html: li.innerHTML,
            completed: li.parentElement.id === "completedList"
        });
    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}


function completeTask(btn) {
    let li = btn.parentElement;

    li.innerHTML = li.innerHTML.replace("Pending", "Completed");

    document.getElementById("completedList").appendChild(li);

    saveTasks();
    updateCounters();
}


function deleteTask(btn) {
    btn.parentElement.remove();

    saveTasks();
    updateCounters();
}


function addTask() {
    let subject = document.getElementById("subject").value.trim();
    let topic = document.getElementById("topic").value.trim();
    let date = document.getElementById("date").value;

    if (subject === "" || topic === "" || date === "") {
        alert("Please enter Subject, Topic and Date");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        <strong>${subject}</strong> - ${topic}
        <span> | ${date} </span>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    saveTasks();
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


function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    let taskList = document.getElementById("taskList");
    let completedList = document.getElementById("completedList");

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    savedTasks.forEach(task => {
        let li = document.createElement("li");

        li.innerHTML = task.html;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });

    updateCounters();
}


window.onload = function () {
    loadTasks();
};
function generateStudyPlan() {
    let subject = document.getElementById("aiSubject").value.trim();
    let topic = document.getElementById("aiTopic").value.trim();
    let result = document.getElementById("aiResult");

    if (subject === "" || topic === "") {
        result.innerHTML = "⚠️ Please enter Subject and Study Topic.";
        return;
    }

    result.innerHTML = `
        <h3>📚 AI Study Plan</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Topic:</strong> ${topic}</p>

        <ol>
            <li>📖 Read and understand the basic concepts.</li>
            <li>📝 Make short notes.</li>
            <li>✏️ Practice important questions.</li>
            <li>🔄 Revise the topic.</li>
            <li>✅ Take a small self-test.</li>
        </ol>
    `;
}