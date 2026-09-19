
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const date = document.getElementById("date").value;

    if (!subject || !topic) {
        alert("Please enter Subject and Topic");
        return;
    }

    tasks.push({
        subject,
        topic,
        date,
        completed: false
    });

    saveTasks();
    renderTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";
}

function completeTask(index) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {

    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>${task.subject}</strong> - ${task.topic}
            <br>
            📅 ${task.date || "No Date"}
            <br><br>`;

        if (task.completed) {

            completed++;

            li.innerHTML += `
                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            `;

            completedList.appendChild(li);

        } else {

            li.innerHTML += `
                <button onclick="completeTask(${index})">
                    Complete
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            `;

            taskList.appendChild(li);
        }
    });

    updateStats(completed);
}

function updateStats(completed) {

    const total = tasks.length;
    const pending = total - completed;

    let progress = 0;

    if (total > 0) {
        progress = Math.round((completed / total) * 100);
    }

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("progressPercent").textContent =
        progress + "%";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function generateQuiz() {

    const subject =
        document.getElementById("quizSubject").value;

    const quizResult =
        document.getElementById("quizResult");

    if (!subject) {
        quizResult.innerHTML =
            "Enter a subject first.";
        return;
    }

    quizResult.innerHTML =
        `
        <p><strong>${subject}</strong> Quiz</p>
        <p>1. What is the basic concept of ${subject}?</p>
        `;
}

function solveDoubt() {

    const doubt =
        document.getElementById("doubtInput")
        .value
        .toLowerCase();

    const result =
        document.getElementById("doubtResult");

    if (doubt.includes("html")) {

        result.innerHTML =
            "HTML stands for HyperText Markup Language. It is used to create web pages.";

    } else if (doubt.includes("css")) {

        result.innerHTML =
            "CSS stands for Cascading Style Sheets. It is used for styling web pages.";

    } else if (doubt.includes("javascript")) {

        result.innerHTML =
            "JavaScript is used to add interactivity to websites.";

    } else if (
        doubt.includes("hi") ||
        doubt.includes("hello")
    ) {

        result.innerHTML =
            "Hello 👋 How can I help you with your studies?";

    } else {

        result.innerHTML =
            "I understand your question. AI response feature can be expanded later.";
    }
}

renderTasks();
window.onload = function () {

    const studentName =
        localStorage.getItem("studentName");

    const welcome =
        document.getElementById("welcomeUser");

    if (studentName && welcome) {

        welcome.innerHTML =
            "👋 Welcome, " + studentName;

    }

};
function updateProgressBar(){

    const total =
        document.querySelectorAll(
            "#taskList li"
        ).length +
        document.querySelectorAll(
            "#completedList li"
        ).length;

    const completed =
        document.querySelectorAll(
            "#completedList li"
        ).length;

    let percent = 0;

    if(total > 0){

        percent =
            Math.round(
                (completed / total) * 100
            );

    }

    document.getElementById(
        "progressBar"
    ).style.width =
        percent + "%";

    document.getElementById(
        "progressText"
    ).innerText =
        percent + "%";

}
function updateTodayDate(){

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"short",
                year:"numeric"
            }
        );

    const dateElement =
        document.getElementById(
            "todayDate"
        );

    if(dateElement){

        dateElement.innerText =
            formattedDate;

    }

}

const quotes = [

    "Success starts with self-discipline.",

    "Small progress is still progress.",

    "Study hard today, shine tomorrow.",

    "Dream big and work hard.",

    "Consistency beats motivation."

];

function loadQuote(){

    const randomIndex =
        Math.floor(
            Math.random() * quotes.length
        );

    const quoteElement =
        document.getElementById(
            "dailyQuote"
        );

    if(quoteElement){

        quoteElement.innerText =
            quotes[randomIndex];

    }

}
const quotes = [

    "Success starts with self-discipline.",

    "Small progress is still progress.",

    "Study hard today, shine tomorrow.",

    "Dream big and work hard.",

    "Consistency beats motivation."

];

function loadQuote(){

    const randomIndex =
        Math.floor(
            Math.random() * quotes.length
        );

    const quoteElement =
        document.getElementById(
            "dailyQuote"
        );

    if(quoteElement){

        quoteElement.innerText =
            quotes[randomIndex];

    }

}