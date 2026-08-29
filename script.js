let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {
    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const date = document.getElementById("date").value;

    if (subject === "" || topic === "" || date === "") {
        alert("Please enter Subject, Topic and Date.");
        return;
    }

    const task = {
        id: Date.now(),
        subject: subject,
        topic: topic,
        date: date,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    displayTasks();
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.completed = true;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);

    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    if (!taskList || !completedList) {
        return;
    }

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${escapeHTML(task.subject)}</strong>
            <br>
            ${escapeHTML(task.topic)}
            <br>
            <small>📅 ${escapeHTML(task.date)}</small>
            <br>
            ${
                task.completed
                ? `<span>✅ Completed</span>
                   <button onclick="deleteTask(${task.id})">🗑 Delete</button>`
                : `<button onclick="completeTask(${task.id})">✅ Complete</button>
                   <button onclick="deleteTask(${task.id})">🗑 Delete</button>`
            }
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });

    updateStatistics();
}

function updateStatistics() {
    const totalTasks = document.getElementById("totalTasks");
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    if (totalTasks) {
        totalTasks.textContent = total;
    }

    if (pendingTasks) {
        pendingTasks.textContent = pending;
    }

    if (completedTasks) {
        completedTasks.textContent = completed;
    }
}

function generateStudyPlan() {
    const subject = document.getElementById("aiSubject").value.trim();
    const topic = document.getElementById("aiTopic").value.trim();
    const result = document.getElementById("aiResult");

    if (subject === "" || topic === "") {
        alert("Please enter Subject and Study Topic.");
        return;
    }

    result.innerHTML = `
        <div class="ai-response">
            <h3>📚 Study Plan</h3>
            <p><strong>Subject:</strong> ${escapeHTML(subject)}</p>
            <p><strong>Topic:</strong> ${escapeHTML(topic)}</p>

            <ol>
                <li>📖 Read the basic concepts - 20 minutes</li>
                <li>📝 Make short notes - 15 minutes</li>
                <li>💡 Practice examples - 20 minutes</li>
                <li>🧠 Revise the topic - 10 minutes</li>
                <li>✅ Take a small self-test - 10 minutes</li>
            </ol>

            <p>🎯 Total recommended time: <strong>75 minutes</strong></p>
        </div>
    `;
}

function generateQuiz() {
    const subject = document.getElementById("quizSubject").value.trim();
    const topic = document.getElementById("quizTopic").value.trim();
    const result = document.getElementById("quizResult");

    if (subject === "" || topic === "") {
        alert("Please enter Subject and Study Topic.");
        return;
    }

    result.innerHTML = `
        <div class="quiz-box">
            <h3>🧠 Practice Quiz</h3>

            <p><strong>Subject:</strong> ${escapeHTML(subject)}</p>
            <p><strong>Topic:</strong> ${escapeHTML(topic)}</p>

            <p>1. What is the main concept of this topic?</p>

            <button onclick="showQuizMessage()">
                Show Practice Answer
            </button>
        </div>
    `;
}

function showQuizMessage() {
    alert("Practice the topic carefully and review your notes before checking the answer.");
}

function generateAIHelp() {
    const subject = document.getElementById("aiSubject").value.trim();
    const topic = document.getElementById("aiTopic").value.trim();
    const result = document.getElementById("aiHelpResult");

    if (subject === "" || topic === "") {
        alert("Please enter Subject and Study Topic.");
        return;
    }

    result.innerHTML = `
        <div class="ai-response">
            <h3>🤖 AI Study Assistant</h3>

            <p>
                Let's study <strong>${escapeHTML(topic)}</strong>
                from <strong>${escapeHTML(subject)}</strong>.
            </p>

            <p>💡 Start with the basic definition and understand the key concepts.</p>

            <p>📝 Then practice 3-5 examples related to this topic.</p>

            <p>🔄 Finally, revise the important points.</p>
        </div>
    `;
}

function solveDoubt() {
    const doubt = document.getElementById("doubtInput").value.trim();
    const result = document.getElementById("doubtResult");

    if (doubt === "") {
        alert("Please enter your doubt.");
        return;
    }

    result.innerHTML = `
        <div class="ai-response">
            <h3>🤖 Doubt Solver</h3>

            <p>
                Your doubt:
                <strong>${escapeHTML(doubt)}</strong>
            </p>

            <p>
                📖 First, identify the main concept involved in the question.
                Then break the problem into smaller steps and solve it one step
                at a time.
            </p>

            <p>
                💡 The real AI answer will be connected in the next step.
            </p>
        </div>
    `;
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
});
    