
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Save Tasks */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add Task */
function addTask() {

    const subject =
        document.getElementById("subject").value.trim();

    const topic =
        document.getElementById("topic").value.trim();

    const date =
        document.getElementById("date").value;

    if (!subject || !topic) {

        alert("Please enter Subject and Topic");
        return;
    }

    tasks.push({
        subject: subject,
        topic: topic,
        date: date,
        completed: false
    });

    saveTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    renderTasks();
}

/* Complete Task */
function completeTask(index) {

    tasks[index].completed = true;

    saveTasks();

    renderTasks();
}

/* Delete Task */
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

/* Render Tasks */
function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    const completedList =
        document.getElementById("completedList");

    if (!taskList || !completedList) return;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <strong>${task.subject}</strong>
            - ${task.topic}
            <br>
            📅 ${task.date || "No Date"}
            <br><br>
        `;

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
    updateProgressBar();
}

/* Stats */
function updateStats(completed) {

    const total = tasks.length;
    const pending = total - completed;

    let progress = 0;

    if (total > 0) {

        progress =
            Math.round(
                (completed / total) * 100
            );
    }

    const totalTasks =
        document.getElementById("totalTasks");

    const pendingTasks =
        document.getElementById("pendingTasks");

    const completedTasks =
        document.getElementById("completedTasks");

    const progressPercent =
        document.getElementById("progressPercent");

    if (totalTasks)
        totalTasks.textContent = total;

    if (pendingTasks)
        pendingTasks.textContent = pending;

    if (completedTasks)
        completedTasks.textContent = completed;

    if (progressPercent)
        progressPercent.textContent =
            progress + "%";
}

/* Progress Bar */
function updateProgressBar() {

    const total = tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    let percent = 0;

    if (total > 0) {

        percent =
            Math.round(
                (completed / total) * 100
            );
    }

    const bar =
        document.getElementById("progressBar");

    const text =
        document.getElementById("progressText");

    if (bar)
        bar.style.width =
            percent + "%";

    if (text)
        text.innerText =
            percent + "%";
}

/* Dark Mode */
function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );
}

/* Quiz */
function generateQuiz() {

    const subject =
        document.getElementById(
            "quizSubject"
        ).value;

    const quizResult =
        document.getElementById(
            "quizResult"
        );

    if (!quizResult) return;

    if (!subject) {

        quizResult.innerHTML =
            "Enter a subject first.";

        return;
    }

    quizResult.innerHTML = `
        <p><strong>${subject}</strong> Quiz</p>
        <p>1. What is the basic concept of ${subject}?</p>
    `;
}

/* AI Assistant */
function solveDoubt() {

    const doubt =
        document.getElementById(
            "doubtInput"
        ).value.toLowerCase();

    const result =
        document.getElementById(
            "doubtResult"
        );

    if (!result) return;

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
            "I understand your question. AI feature can be expanded later.";
    }
}

/* Date */
function updateTodayDate() {

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    const dateElement =
        document.getElementById(
            "todayDate"
        );

    if (dateElement) {

        dateElement.innerText =
            formattedDate;
    }
}

/* Quotes */
const quotes = [

    "Success starts with self-discipline.",
    "Small progress is still progress.",
    "Study hard today, shine tomorrow.",
    "Dream big and work hard.",
    "Consistency beats motivation."

];

function loadQuote() {

    const randomIndex =
        Math.floor(
            Math.random() * quotes.length
        );

    const quoteElement =
        document.getElementById(
            "dailyQuote"
        );

    if (quoteElement) {

        quoteElement.innerText =
            quotes[randomIndex];
    }
}

/* Welcome User */
function loadStudentName() {

    const studentName =
        localStorage.getItem(
            "studentName"
        );

    const welcome =
        document.getElementById(
            "welcomeUser"
        );

    if (
        studentName &&
        welcome
    ) {

        welcome.innerHTML =
            "👋 Welcome, " +
            studentName;
    }
}

/* Page Load */
window.onload = function () {

    renderTasks();

    updateTodayDate();

    loadQuote();

    loadStudentName();

};
/* Mobile Fix */

@media (max-width:768px){

    .dashboard-header{
        flex-direction:column;
        text-align:center;
        gap:20px;
    }

    .header-left{
        flex-direction:column;
    }

    .header-right{
        width:100%;
        justify-content:center;
    }

    .student-badge{
        font-size:14px;
        padding:10px 15px;
    }

    .welcome-banner h2{
        font-size:32px;
    }

}
/* Quick Actions */

.quick-actions{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;
    margin-bottom:25px;
}

.action-card{
    background:white;
    padding:25px;
    border-radius:20px;
    text-align:center;
    box-shadow:0 8px 20px rgba(0,0,0,0.08);
    cursor:pointer;
    transition:0.3s;
}

.action-card:hover{
    transform:translateY(-5px);
}

.action-card span{
    font-size:40px;
    display:block;
    margin-bottom:10px;
}

.action-card h3{
    color:#4f46e5;
    font-size:18px;
}

/* Dark Mode Support */

.dark-mode .action-card{
    background:#1f2937;
    color:white;
}

.dark-mode .action-card h3{
    color:#a78bfa;
}