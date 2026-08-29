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
function generateQuiz() {
    let subject = document.getElementById("quizSubject").value.trim();
    let topic = document.getElementById("quizTopic").value.trim();
    let result = document.getElementById("quizResult");

    if (subject === "" || topic === "") {
        result.innerHTML = "⚠️ Please enter Subject and Study Topic.";
        return;
    }

    result.innerHTML = `
        <h3>🧠 Practice Questions</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Topic:</strong> ${topic}</p>

        <ol>
            <li>What is the basic concept of ${topic}?</li>
            <li>Explain ${topic} in your own words.</li>
            <li>Write one important example of ${topic}.</li>
            <li>What are the key points to remember?</li>
            <li>Try one practice problem related to ${topic}.</li>
        </ol>

        <p>🎯 Good luck with your practice!</p>
    `;
}

function generateAIHelp() {
    let subject = document.getElementById("aiSubject").value.trim();
    let topic = document.getElementById("aiTopic").value.trim();

    if (subject === "" || topic === "") {
        alert("Please enter Subject and Study Topic");
        return;
    }

    document.getElementById("aiHelpResult").innerHTML = `
        <div class="quiz-card">
            <h2>🤖 AI Study Help</h2>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Topic:</strong> ${topic}</p>

            <ol>
                <li>📚 Understand the basic concepts of ${topic}.</li>
                <li>📝 Make short notes for ${topic}.</li>
                <li>🔍 Learn important examples.</li>
                <li>🧠 Revise the key points.</li>
                <li>✅ Practice questions related to ${topic}.</li>
            </ol>

            <p>🎯 Keep learning and practice regularly!</p>
        </div>
    `;
}
function solveDoubt() {

    let doubt =
    document.getElementById("doubtInput").value;

    let result =
    document.getElementById("doubtResult");

    if(doubt.trim() === ""){
        result.innerHTML =
        "⚠️ Please enter your doubt.";
        return;
    }

    result.innerHTML = `
    <div class="quiz-card">
        <h3>🤖 AI Answer</h3>
        <p>
        Your question:
        <b>${doubt}</b>
        </p>

        <p>
        This is a demo AI answer.
        In future we can connect
        real AI API for accurate answers.
        </p>
    </div>
    `;
}