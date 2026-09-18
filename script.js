// ===============================
// STUDENT STUDY PLANNER
// ===============================


// Get saved tasks
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// ===============================
// DISPLAY TASKS
// ===============================

function displayTasks() {

    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let pending = 0;
    let completed = 0;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {

            completed++;

            li.innerHTML = `
                <strong>📚 ${task.subject}</strong><br>
                ${task.topic}<br>
                📅 ${task.date}
            `;

            completedList.appendChild(li);

        } else {

            pending++;

            li.innerHTML = `
                <strong>📚 ${task.subject}</strong><br>
                ${task.topic}<br>
                📅 ${task.date}
                <br><br>

                <button onclick="completeTask(${index})">
                    ✅ Complete
                </button>

                <button onclick="deleteTask(${index})">
                    🗑️ Delete
                </button>
            `;

            taskList.appendChild(li);
        }

    });


    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;

let progress = 0;

if (tasks.length > 0) {
    progress = Math.round((completed / tasks.length) * 100);
}

document.getElementById("progressPercent").textContent =
    progress + "%";
}

// ===============================
// ADD TASK
// ===============================

function addTask() {

    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const date = document.getElementById("date").value;

    if (subject === "" || topic === "" || date === "") {

        alert("Please fill all task details.");

        return;
    }


    const newTask = {

        subject: subject,
        topic: topic,
        date: date,
        completed: false

    };


    tasks.push(newTask);

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );


    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";


    displayTasks();
}


// ===============================
// COMPLETE TASK
// ===============================

function completeTask(index) {

    tasks[index].completed = true;

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}


// ===============================
// DELETE TASK
// ===============================

function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}


// ===============================
// PRACTICE QUIZ
// ===============================

function generateQuiz() {

    const subject =
        document.getElementById("quizSubject").value.trim();

    const topic =
        document.getElementById("quizTopic").value.trim();

    const result =
        document.getElementById("quizResult");


    if (subject === "" || topic === "") {

        result.innerHTML =
            "<p>Please enter subject and topic.</p>";

        return;
    }


    result.innerHTML = `

        <div class="exam-card">

            <h3>🧠 Quiz Ready!</h3>

            <p>
                Subject: <strong>${subject}</strong>
            </p>

            <p>
                Topic: <strong>${topic}</strong>
            </p>

            <p>
                Your quiz questions will appear here.
            </p>

        </div>

    `;
}


// ===============================
// AI STUDY ASSISTANT
// ===============================

function generateAIHelp() {

    const subject =
        document.getElementById("aiSubject").value.trim();

    const topic =
        document.getElementById("aiTopic").value.trim();

    const result =
        document.getElementById("aiHelpResult");


    if (subject === "" || topic === "") {

        result.innerHTML =
            "<p>Please enter subject and topic.</p>";

        return;
    }


    result.innerHTML = `

        <div class="exam-card">

            <h3>🤖 AI Study Assistant</h3>

            <p>
                You are studying
                <strong>${subject}</strong>
                - <strong>${topic}</strong>.
            </p>

            <p>
                📖 Start by understanding the basic concepts,
                then practice with examples and questions.
            </p>

        </div>

    `;
}


// ===============================
// AI DOUBT SOLVER
// ===============================

function solveDoubt() {

    const doubt =
        document.getElementById("doubtInput").value.trim();

    const result =
        document.getElementById("doubtResult");


    if (doubt === "") {

        result.innerHTML =
            "<p>Please type your doubt.</p>";

        return;
    }


    result.innerHTML = `

        <div class="exam-card">

            <h3>💡 Doubt Received</h3>

            <p>
                Your question:
                <strong>${doubt}</strong>
            </p>

            <p>
                📚 Think about the basic concept first
                and try to break the question into smaller parts.
            </p>

        </div>

    `;
}


// ===============================
// LOAD DATA WHEN PAGE OPENS
// ===============================

displayTasks();