/* =====================
   TASK STORAGE
===================== */

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

let exams =
JSON.parse(
localStorage.getItem("exams")
) || [];


/* =====================
   SAVE TASKS
===================== */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* =====================
   ADD TASK
===================== */

function addTask(){

    const subject =
    document.getElementById("subject").value.trim();

    const topic =
    document.getElementById("topic").value.trim();

    const date =
    document.getElementById("date").value;

    const priority =
    document.getElementById("priority").value;

    if(subject === "" || topic === ""){

        alert("Enter Subject and Topic");

        return;
    }

    tasks.push({

        subject: subject,
        topic: topic,
        date: date,
        priority: priority,
        completed: false

    });

    saveTasks();

    renderTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "Medium";

}


/* =====================
   COMPLETE TASK
===================== */

function completeTask(index){

    tasks[index].completed = true;

    saveTasks();

    renderTasks();

}


/* =====================
   DELETE TASK
===================== */

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}


/* =====================
   TASK DATE STATUS
===================== */

function getTaskStatus(date){

    if(!date){

        return "📅 No Date";

    }

    const today =
    new Date();

    today.setHours(0,0,0,0);

    const taskDate =
    new Date(date + "T00:00:00");

    taskDate.setHours(0,0,0,0);

    const difference =
    Math.round(
    (taskDate - today)
    / (1000 * 60 * 60 * 24)
    );

    if(difference < 0){

        return "🔴 Overdue";

    }

    if(difference === 0){

        return "🟠 Due Today";

    }

    if(difference === 1){

        return "🟡 Due Tomorrow";

    }

    return "🟢 Upcoming";

}


/* =====================
   RENDER TASKS
===================== */


function renderTasks(){

    const taskList =
    document.getElementById("taskList");

    const completedList =
    document.getElementById("completedList");

    if(!taskList || !completedList) return;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task,index)=>{

        const li =
        document.createElement("li");

        const status =
        getTaskStatus(task.date);

        const priority =
        task.priority || "Medium";

        let priorityText = "";

        if(priority === "High"){
            priorityText = "🔴 High Priority";
        }
        else if(priority === "Low"){
            priorityText = "🟢 Low Priority";
        }
        else{
            priorityText = "🟡 Medium Priority";
        }

        li.innerHTML = `
        <strong>${task.subject}</strong>
        <br>
        ${task.topic}
        <br>
        📅 ${task.date || "No Date"}
        <br>
        <strong>${status}</strong>
        <br>
        <strong>${priorityText}</strong>
        <br><br>
        `;

        if(task.completed){

            completed++;

            li.innerHTML += `
            <button onclick="deleteTask(${index})">
            Delete
            </button>
            `;

            completedList.appendChild(li);

        }else{

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
    updateDailyProgress();

}
function searchTasks(){

    const searchInput =
    document.getElementById("taskSearch");

    const taskList =
    document.getElementById("taskList");

    if(!searchInput || !taskList) return;

    const searchText =
    searchInput.value.toLowerCase().trim();

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const subject =
        task.subject.toLowerCase();

        const topic =
        task.topic.toLowerCase();

        if(
            subject.includes(searchText) ||
            topic.includes(searchText)
        ){

            const li =
            document.createElement("li");

            const status =
            getTaskStatus(task.date);

            const priority =
            task.priority || "Medium";

            let priorityText = "";

            if(priority === "High"){
                priorityText = "🔴 High Priority";
            }
            else if(priority === "Low"){
                priorityText = "🟢 Low Priority";
            }
            else{
                priorityText = "🟡 Medium Priority";
            }

            li.innerHTML = `
            <strong>${task.subject}</strong>
            <br>
            ${task.topic}
            <br>
            📅 ${task.date || "No Date"}
            <br>
            <strong>${status}</strong>
            <br>
            <strong>${priorityText}</strong>
            <br><br>

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

}

/* =====================
   UPDATE STATS
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

    document.getElementById(
    "totalTasks"
    ).textContent = total;

    document.getElementById(
    "pendingTasks"
    ).textContent = pending;

    document.getElementById(
    "completedTasks"
    ).textContent = completed;

    document.getElementById(
    "progressPercent"
    ).textContent =
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
    task => task.completed
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
   STUDY STREAK
===================== */

function updateStudyStreak(){

    const today =
    new Date().toDateString();

    const lastStudyDate =
    localStorage.getItem(
    "lastStudyDate"
    );

    let streak =
    Number(
    localStorage.getItem(
    "studyStreak"
    )
    ) || 0;

    if(lastStudyDate !== today){

        if(lastStudyDate){

            const lastDate =
            new Date(lastStudyDate);

            const todayDate =
            new Date();

            const difference =
            Math.floor(
            (todayDate - lastDate)
            / (1000 * 60 * 60 * 24)
            );

            if(difference === 1){

                streak++;

            }else if(difference > 1){

                streak = 1;

            }

        }else{

            streak = 1;

        }

        localStorage.setItem(
        "studyStreak",
        streak
        );

        localStorage.setItem(
        "lastStudyDate",
        today
        );

    }

    const streakElement =
    document.getElementById(
    "streakCount"
    );

    if(streakElement){

        streakElement.textContent =
        streak;

    }

}


/* =====================
   DAILY PROGRESS
===================== */

function updateDailyProgress(){

    const total =
    tasks.length;

    const completed =
    tasks.filter(
    task => task.completed
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
    "dailyProgressBar"
    );

    const text =
    document.getElementById(
    "dailyProgressText"
    );

    if(bar){

        bar.style.width =
        percent + "%";

    }

    if(text){

        text.textContent =
        percent + "% Completed";

    }

}


/* =====================
   DARK MODE
===================== */

function toggleDarkMode(){

    document.body.classList
    .toggle("dark-mode");

    if(
    document.body.classList
    .contains("dark-mode")
    ){

        localStorage.setItem(
        "darkMode",
        "on"
        );

    }else{

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
   EXAMS
===================== */

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

        name: examName,
        date: examDate

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
    document.getElementById("examList");

    if(!examList) return;

    examList.innerHTML = "";

    exams.forEach((exam,index)=>{

        let status = "";

        if(!exam.date){

            status = "📅 No Date";

        }else{

            const today = new Date();
            today.setHours(0,0,0,0);

            const examDate =
            new Date(exam.date + "T00:00:00");
            examDate.setHours(0,0,0,0);

            const difference =
            Math.round(
                (examDate - today)
                / (1000 * 60 * 60 * 24)
            );

            if(difference < 0){
                status = "✅ Completed";
            }
            else if(difference === 0){
                status = "🟠 Exam Today";
            }
            else if(difference === 1){
                status = "🟡 Exam Tomorrow";
            }
            else{
                status = "🟢 Upcoming";
            }
        }

        const li =
        document.createElement("li");

        li.innerHTML = `
        <strong>${exam.name}</strong>
        <br>
        📅 ${exam.date || "No Date"}
        <br>
        <strong>${status}</strong>
        <br><br>

        <button onclick="deleteExam(${index})">
        Delete
        </button>
        `;

        examList.appendChild(li);

    });

}

/* =====================
   NOTES
===================== */

function saveNotes(){

    const notes =
    document.getElementById(
    "notes"
    ).value;

    localStorage.setItem(
    "studentNotes",
    notes
    );

    alert(
    "Notes Saved Successfully"
    );

}

function loadNotes(){

    const savedNotes =
    localStorage.getItem(
    "studentNotes"
    );

    const notesBox =
    document.getElementById(
    "notes"
    );

    if(
    savedNotes &&
    notesBox
    ){

        notesBox.value =
        savedNotes;

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
        "HTML is used to create web pages.";

    }

    else if(doubt.includes("css")){

        result.innerHTML =
        "CSS is used for styling web pages.";

    }

    else if(doubt.includes("javascript")){

        result.innerHTML =
        "JavaScript makes websites interactive.";

    }

    else{

        result.innerHTML =
        "AI Assistant is working successfully.";

    }

}


/* =====================
   QUIZ
===================== */

function generateQuiz(){

    const quizResult =
    document.getElementById(
    "quizResult"
    );

    if(quizResult){

        quizResult.innerHTML =
        "Quiz Module Ready ✅";

    }

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

    loadStudentName();
    loadQuote();
    updateTodayDate();
    loadNotes();

    updateStudyStreak();
    updateDailyProgress();

}; 