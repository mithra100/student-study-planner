
    
/* =====================
   TASK SYSTEM
===================== */

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

/* Save Tasks */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

/* Add Task */

function addTask(){

    const subject =
    document.getElementById(
        "subject"
    ).value.trim();

    const topic =
    document.getElementById(
        "topic"
    ).value.trim();

    const date =
    document.getElementById(
        "date"
    ).value;

    if(
        subject === "" ||
        topic === ""
    ){

        alert(
        "Please Enter Subject and Topic"
        );

        return;
    }

    tasks.push({

        subject:subject,
        topic:topic,
        date:date,
        completed:false

    });

    saveTasks();

    renderTasks();

    document.getElementById(
        "subject"
    ).value = "";

    document.getElementById(
        "topic"
    ).value = "";

    document.getElementById(
        "date"
    ).value = "";

}

/* Complete Task */

function completeTask(index){

    tasks[index].completed =
    true;

    saveTasks();

    renderTasks();

}

/* Delete Task */

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

/* Render Tasks */

function renderTasks(){

    const taskList =
    document.getElementById(
        "taskList"
    );

    const completedList =
    document.getElementById(
        "completedList"
    );

    if(
        !taskList ||
        !completedList
    ) return;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let completed = 0;

    tasks.forEach(
    (task,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `
        <strong>
        ${task.subject}
        </strong>

        - ${task.topic}

        <br>

        📅 ${task.date || "No Date"}

        <br><br>
        `;

        if(task.completed){

            completed++;

            li.innerHTML += `
            <button
            onclick="deleteTask(${index})">

            Delete

            </button>
            `;

            completedList
            .appendChild(li);

        }

        else{

            li.innerHTML += `
            <button
            onclick="completeTask(${index})">

            Complete

            </button>

            <button
            onclick="deleteTask(${index})">

            Delete

            </button>
            `;

            taskList
            .appendChild(li);

        }

    });

    updateStats(
        completed
    );

    updateProgressBar();

}
/* =====================
   STATISTICS
===================== */

function updateStats(completed){

    const total =
    tasks.length;

    const pending =
    total - completed;

    let progress = 0;

    if(total > 0){

        progress =
        Math.round(
        (completed / total) * 100
        );

    }

    const totalTasks =
    document.getElementById(
        "totalTasks"
    );

    const pendingTasks =
    document.getElementById(
        "pendingTasks"
    );

    const completedTasks =
    document.getElementById(
        "completedTasks"
    );

    const progressPercent =
    document.getElementById(
        "progressPercent"
    );

    if(totalTasks)
    totalTasks.textContent =
    total;

    if(pendingTasks)
    pendingTasks.textContent =
    pending;

    if(completedTasks)
    completedTasks.textContent =
    completed;

    if(progressPercent)
    progressPercent.textContent =
    progress + "%";

}

/* =====================
   PROGRESS BAR
===================== */

function updateProgressBar(){

    const total =
    tasks.length;

    const completed =
    tasks.filter(
    task =>
    task.completed
    ).length;

    let percent = 0;

    if(total > 0){

        percent =
        Math.round(
        (completed / total) * 100
        );

    }

    const bar =
    document.getElementById(
        "progressBar"
    );

    const text =
    document.getElementById(
        "progressText"
    );

    if(bar){

        bar.style.width =
        percent + "%";

    }

    if(text){

        text.innerHTML =
        percent + "%";

    }

}

/* =====================
   DARK MODE
===================== */

function toggleDarkMode(){

    document.body.classList
    .toggle("dark-mode");

    if(
        document.body
        .classList
        .contains("dark-mode")
    ){

        localStorage.setItem(
            "darkMode",
            "on"
        );

    }

    else{

        localStorage.setItem(
            "darkMode",
            "off"
        );

    }

}

/* =====================
   TODAY DATE
===================== */

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
    });

    const dateElement =
    document.getElementById(
        "todayDate"
    );

    if(dateElement){

        dateElement.innerHTML =
        formattedDate;

    }

}

/* =====================
   DAILY QUOTES
===================== */

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
    Math.random()
    * quotes.length
    );

    const quoteElement =
    document.getElementById(
        "dailyQuote"
    );

    if(quoteElement){

        quoteElement.innerHTML =
        quotes[randomIndex];

    }

}

/* =====================
   STUDENT NAME
===================== */

function loadStudentName(){

    const studentName =
    localStorage.getItem(
        "studentName"
    );

    const welcome =
    document.getElementById(
        "welcomeUser"
    );

    if(
        studentName &&
        welcome
    ){

        welcome.innerHTML =
        "👋 Welcome, " +
        studentName;

    }

}
/* =====================
   AI ASSISTANT
===================== */

function solveDoubt(){

    const doubt =
    document.getElementById(
        "doubtInput"
    ).value.toLowerCase();

    const result =
    document.getElementById(
        "doubtResult"
    );

    if(!result) return;

    if(doubt.includes("html")){

        result.innerHTML =
        "HTML stands for HyperText Markup Language. It is used to create web pages.";

    }

    else if(doubt.includes("css")){

        result.innerHTML =
        "CSS stands for Cascading Style Sheets. It is used for styling web pages.";

    }

    else if(doubt.includes("javascript")){

        result.innerHTML =
        "JavaScript is used to make websites interactive.";

    }

    else if(
        doubt.includes("hi") ||
        doubt.includes("hello")
    ){

        result.innerHTML =
        "Hello 👋 How can I help you today?";

    }

    else{

        result.innerHTML =
        "I understand your question. More AI features can be added later.";

    }

}

/* =====================
   QUIZ
===================== */

function generateQuiz(){

    const subject =
    document.getElementById(
        "quizSubject"
    ).value.toLowerCase();

    const quizResult =
    document.getElementById(
        "quizResult"
    );

    if(subject === ""){

        quizResult.innerHTML =
        "Please enter a subject";

        return;

    }

    quizResult.innerHTML =
    "<h3>Quiz for " +
    subject +
    "</h3><p>Quiz module ready.</p>";

}

/* =====================
   EXAMS
===================== */

let exams =
JSON.parse(
localStorage.getItem("exams")
) || [];

function saveExams(){

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );

}

function addExam(){

    const examName =
    document.getElementById(
        "examName"
    ).value;

    const examDate =
    document.getElementById(
        "examDate"
    ).value;

    if(
        examName === "" ||
        examDate === ""
    ){

        alert(
        "Enter Exam Name and Date"
        );

        return;

    }

    exams.push({

        name:examName,
        date:examDate

    });

    saveExams();

    renderExams();

    document.getElementById(
        "examName"
    ).value = "";

    document.getElementById(
        "examDate"
    ).value = "";

}

function deleteExam(index){

    exams.splice(index,1);

    saveExams();

    renderExams();

}

function renderExams(){

    const examList =
    document.getElementById(
        "examList"
    );

    if(!examList) return;

    examList.innerHTML = "";

    exams.forEach(
    (exam,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `
        <strong>
        ${exam.name}
        </strong>

        <br>

        📅 ${exam.date}

        <br><br>

        <button
        onclick="deleteExam(${index})">

        Delete

        </button>
        `;

        examList.appendChild(li);

    });

}

/* =====================
   PAGE LOAD
===================== */

window.onload = function(){

    if(
        localStorage.getItem(
        "darkMode"
        ) === "on"
    ){

        document.body
        .classList
        .add("dark-mode");

    }

    renderTasks();
    renderExams();

    updateTodayDate();
    loadQuote();
    loadStudentName();

};