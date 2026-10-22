
/* =========================
   STUDENT OS - JAVASCRIPT
========================= */


/* =========================
   LOAD SAVED DATA
========================= */

function loadArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

let tasks = loadArray("tasks");
let exams = loadArray("exams");


/* =========================
   SAVE TASKS
========================= */

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/* =========================
   ADD TASK
========================= */

function addTask() {
    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const date = document.getElementById("date").value;
    const priorityElement = document.getElementById("priority");

    const priority = priorityElement
        ? priorityElement.value
        : "Medium";

    if (!subject || !topic) {
        alert("Please enter Subject Name and Study Topic.");
        return;
    }

    tasks.push({
        subject,
        topic,
        date,
        priority,
        completed: false
    });

    saveTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";

    if (priorityElement) {
        priorityElement.value = "Medium";
    }

    renderTasks();
}


/* =========================
   COMPLETE TASK
========================= */

function completeTask(index) {
    if (!tasks[index]) return;

    tasks[index].completed = true;

    saveTasks();
    renderTasks();
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(index) {
    if (!tasks[index]) return;

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}


/* =========================
   TASK DATE STATUS
========================= */

function getTaskStatus(date) {
    if (!date) return "📅 No Date";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(date + "T00:00:00");

    if (Number.isNaN(taskDate.getTime())) {
        return "📅 Invalid Date";
    }

    const difference = Math.round(
        (taskDate - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) return "🔴 Overdue";
    if (difference === 0) return "🟠 Due Today";
    if (difference === 1) return "🟡 Due Tomorrow";

    return "🟢 Upcoming";
}


/* =========================
   PRIORITY LABEL
========================= */

function getPriorityText(priority) {
    if (priority === "High") return "🔴 High Priority";
    if (priority === "Low") return "🟢 Low Priority";

    return "🟡 Medium Priority";
}


/* =========================
   RENDER TASKS
========================= */

function renderTasks() {
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    if (!taskList || !completedList) return;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = task.subject || "Untitled Task";

        const details = document.createElement("div");
        details.textContent =
            (task.topic || "") +
            " | 📅 " + (task.date || "No Date");

        const status = document.createElement("p");
        status.textContent = getTaskStatus(task.date);

        const priority = document.createElement("p");
        priority.textContent = getPriorityText(task.priority || "Medium");

        li.append(title, details, status, priority);

        if (task.completed) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.onclick = () => deleteTask(index);

            li.appendChild(deleteButton);
            completedList.appendChild(li);
        } else {
            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.type = "button";
            completeButton.onclick = () => completeTask(index);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.onclick = () => deleteTask(index);

            li.append(completeButton, deleteButton);
            taskList.appendChild(li);
        }
    });

    updateStats();
    updateProgressBar();
    updateDailyProgress();
    searchTasks();
}


/* =========================
   SEARCH TASKS
========================= */

function searchTasks() {
    const searchInput = document.getElementById("taskSearch");
    const taskList = document.getElementById("taskList");

    if (!searchInput || !taskList) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const items = taskList.querySelectorAll("li");

    items.forEach((item) => {
        const matches = item.textContent
            .toLowerCase()
            .includes(searchText);

        item.style.display = matches ? "" : "none";
    });
}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    const progress = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    const totalElement = document.getElementById("totalTasks");
    const pendingElement = document.getElementById("pendingTasks");
    const completedElement = document.getElementById("completedTasks");
    const progressElement = document.getElementById("progressPercent");

    if (totalElement) totalElement.textContent = total;
    if (pendingElement) pendingElement.textContent = pending;
    if (completedElement) completedElement.textContent = completed;

    if (progressElement) {
        progressElement.textContent = progress + "%";
    }
}


/* =========================
   OVERALL PROGRESS
========================= */

function updateProgressBar() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const percent = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");

    if (bar) bar.style.width = percent + "%";
    if (text) text.textContent = percent + "%";
}


/* =========================
   DAILY PROGRESS
========================= */

function updateDailyProgress() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTasks = tasks.filter(task => {
        if (!task.date) return false;

        const taskDate = new Date(task.date + "T00:00:00");

        return taskDate.getTime() === today.getTime();
    });

    const completedToday = todayTasks.filter(
        task => task.completed
    ).length;

    const percent = todayTasks.length > 0
        ? Math.round((completedToday / todayTasks.length) * 100)
        : 0;

    const bar = document.getElementById("dailyProgressBar");
    const text = document.getElementById("dailyProgressText");

    if (bar) bar.style.width = percent + "%";

    if (text) {
        text.textContent = percent + "% Completed";
    }
}


/* =========================
   STUDY STREAK
========================= */

function updateStudyStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayKey = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    const lastDate = localStorage.getItem("lastStudyDate");
    let streak = Number(localStorage.getItem("studyStreak")) || 0;

    if (lastDate !== todayKey) {
        if (lastDate) {
            const previousDate = new Date(lastDate + "T00:00:00");

            const difference = Math.round(
                (today - previousDate) / (1000 * 60 * 60 * 24)
            );

            if (difference === 1) {
                streak += 1;
            } else {
                streak = 1;
            }
        } else {
            streak = 1;
        }

        localStorage.setItem("studyStreak", String(streak));
        localStorage.setItem("lastStudyDate", todayKey);
    }

    const streakElement = document.getElementById("streakCount");

    if (streakElement) {
        streakElement.textContent = streak;
    }
}


/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDark ? "on" : "off");

    updateDarkModeButton();
}

function updateDarkModeButton() {
    const button = document.getElementById("darkModeBtn");

    if (!button) return;

    button.textContent = document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
}


/* =========================
   TODAY'S DATE
========================= */

function updateTodayDate() {
    const element = document.getElementById("todayDate");

    if (!element) return;

    element.textContent = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


/* =========================
   DAILY QUOTE
========================= */

const quotes = [
    "Success starts with self-discipline.",
    "Small progress is still progress.",
    "Study hard today, shine tomorrow.",
    "Dream big and work hard.",
    "Consistency beats motivation."
];

function loadQuote() {
    const element = document.getElementById("dailyQuote");

    if (!element) return;

    const index = Math.floor(Math.random() * quotes.length);

    element.textContent = quotes[index];
}


/* =========================
   STUDENT NAME
========================= */

function loadStudentName() {
    const studentName = localStorage.getItem("studentName");
    const welcome = document.getElementById("welcomeUser");

    if (studentName && welcome) {
        welcome.textContent = "👋 Welcome, " + studentName;
    }
}


/* =========================
   SAVE EXAMS
========================= */

function saveExams() {
    localStorage.setItem("exams", JSON.stringify(exams));
}


/* =========================
   ADD EXAM
========================= */

function addExam() {
    const name = document.getElementById("examName").value.trim();
    const date = document.getElementById("examDate").value;

    if (!name || !date) {
        alert("Please enter Exam Name and Exam Date.");
        return;
    }

    exams.push({ name, date });

    saveExams();
    renderExams();

    document.getElementById("examName").value = "";
    document.getElementById("examDate").value = "";
}


/* =========================
   DELETE EXAM
========================= */

function deleteExam(index) {
    if (index < 0 || index >= exams.length) return;

    exams.splice(index, 1);

    saveExams();
    renderExams();
}


/* =========================
   RENDER EXAMS
========================= */

function renderExams() {
    const examList = document.getElementById("examList");

    if (!examList) return;

    examList.innerHTML = "";

    exams.forEach((exam, index) => {
        const li = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = exam.name || "Untitled Exam";

        const dateText = document.createElement("p");
        dateText.textContent = "📅 " + (exam.date || "No Date");

        const status = document.createElement("p");

        if (!exam.date) {
            status.textContent = "📅 No Date";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const examDate = new Date(exam.date + "T00:00:00");

            const difference = Math.round(
                (examDate - today) / (1000 * 60 * 60 * 24)
            );

            if (difference < 0) {
                status.textContent = "✅ Date Passed";
            } else if (difference === 0) {
                status.textContent = "🟠 Exam Today";
            } else if (difference === 1) {
                status.textContent = "🟡 Exam Tomorrow";
            } else {
                status.textContent = "🟢 Upcoming";
            }
        }

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Delete";
        button.onclick = () => deleteExam(index);

        li.append(title, dateText, status, button);
        examList.appendChild(li);
    });
}


/* =========================
   SAVE AND LOAD NOTES
========================= */

function saveNotes() {
    const notes = document.getElementById("notes");

    if (!notes) return;

    localStorage.setItem("studentNotes", notes.value);

    alert("Notes Saved Successfully!");
}

function loadNotes() {
    const notes = document.getElementById("notes");

    if (!notes) return;

    notes.value = localStorage.getItem("studentNotes") || "";
}


/* =========================
   AI ASSISTANT
========================= */

function solveDoubt() {
    const input = document.getElementById("doubtInput");
    const result = document.getElementById("doubtResult");

    if (!input || !result) return;

    const doubt = input.value.toLowerCase().trim();

    if (!doubt) {
        result.textContent = "Please enter your question.";
        return;
    }

    if (doubt.includes("html")) {
        result.textContent =
            "HTML creates the structure of a web page.";
    } else if (doubt.includes("css")) {
        result.textContent =
            "CSS styles web pages with colors, layouts and fonts.";
    } else if (doubt.includes("javascript")) {
        result.textContent =
            "JavaScript adds interactive features to web pages.";
    } else if (doubt.includes("python")) {
        result.textContent =
            "Python is a programming language used in AI, data science and automation.";
    } else {
        result.textContent =
            "This is a basic demo assistant. It does not connect to a real AI service yet.";
    }
}


/* =========================
   QUIZ MODULE
========================= */

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language styles web pages?",
        options: [
            "HTML",
            "CSS",
            "SQL"
        ],
        answer: 1
    },
    {
        question: "Which language adds interactivity to web pages?",
        options: [
            "CSS",
            "JavaScript",
            "HTML"
        ],
        answer: 1
    }
];

function generateQuiz() {
    const result = document.getElementById("quizResult");

    if (!result) return;

    result.innerHTML = "";

    let score = 0;
    let answered = 0;

    const heading = document.createElement("h3");
    heading.textContent = "Practice Quiz";
    result.appendChild(heading);

    quizQuestions.forEach((item, index) => {
        const questionBox = document.createElement("div");
        questionBox.style.marginBottom = "20px";

        const question = document.createElement("p");
        question.textContent = (index + 1) + ". " + item.question;

        questionBox.appendChild(question);

        item.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.style.margin = "8px 0";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quizQuestion" + index;
            radio.value = optionIndex;
            radio.style.width = "auto";
            radio.style.marginRight = "8px";

            label.append(radio, document.createTextNode(option));
            questionBox.appendChild(label);
        });

        result.appendChild(questionBox);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit Quiz";

    submitButton.onclick = function () {
        score = 0;
        answered = 0;

        quizQuestions.forEach((item, index) => {
            const selected = document.querySelector(
                'input[name="quizQuestion' + index + '"]:checked'
            );

            if (selected) {
                answered++;

                if (Number(selected.value) === item.answer) {
                    score++;
                }
            }
        });

        if (answered < quizQuestions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let scoreText = document.getElementById("quizScore");

        if (!scoreText) {
            scoreText = document.createElement("p");
            scoreText.id = "quizScore";
            result.appendChild(scoreText);
        }

        scoreText.textContent =
            "Your Score: " + score + " / " + quizQuestions.length;
    };

    result.appendChild(submitButton);
}


/* =========================
   PAGE INITIALIZATION
========================= */

function initializeApp() {
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark-mode");
    }

    updateDarkModeButton();

    renderTasks();
    renderExams();

    loadStudentName();
    loadQuote();
    updateTodayDate();
    loadNotes();

    updateStudyStreak();
    updateDailyProgress();
    updateStats();
    updateProgressBar();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}