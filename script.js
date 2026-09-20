let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Save Tasks */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add Task */
function addTask() {

    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const date = document.getElementById("date").value;

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
    renderTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";
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

    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    if (!taskList || !completedList) return;

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${task.subject}</strong> - ${task.topic}
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

/* Statistics */
function updateStats(completed) {

    const total = tasks.length;
    const pending = total - completed;

    let progress = 0;

    if (total > 0) {
        progress = Math.round((completed / total) * 100);
    }

    const totalTasks = document.getElementById("totalTasks");
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");
    const progressPercent = document.getElementById("progressPercent");

    if (totalTasks) totalTasks.textContent = total;
    if (pendingTasks) pendingTasks.textContent = pending;
    if (completedTasks) completedTasks.textContent = completed;
    if (progressPercent) progressPercent.textContent = progress + "%";
}

/* Progress Bar */
function updateProgressBar() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");

    if (bar) {
        bar.style.width = percent + "%";
    }

    if (text) {
        text.innerText = percent + "%";
    }
}

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

/* Quiz */

/* AI Assistant */
function solveDoubt() {

    const doubt =
        document.getElementById("doubtInput")
        .value
        .toLowerCase();

    const result =
        document.getElementById("doubtResult");

    if (!result) return;

    if (doubt.includes("html")) {

        result.innerHTML =
            "HTML stands for HyperText Markup Language. It is used to create web pages.";

    } else if (doubt.includes("css")) {

        result.innerHTML =
            "CSS stands for Cascading Style Sheets. It is used for styling web pages.";

    } else if (doubt.includes("javascript")) {

        result.innerHTML =
            "JavaScript is used to make websites interactive.";

    } else if (
        doubt.includes("hi") ||
        doubt.includes("hello")
    ) {

        result.innerHTML =
            "Hello 👋 How can I help you with your studies today?";

    } else {

        result.innerHTML =
            "I understand your question. More AI features can be added later.";
    }
}
function generateQuiz() {

    const subject =
    document.getElementById("quizSubject")
    .value
    .toLowerCase();

    const quizResult =
    document.getElementById("quizResult");

    if(subject === ""){

        quizResult.innerHTML =
        "Please enter a subject";

        return;
    }

    if(subject === "tamil"){

        quizResult.innerHTML = `
        <h3>Tamil Quiz</h3>

        <p>1. தமிழ் மொழி எதற்காக பயன்படுகிறது?</p>

        <input type="radio" name="q1" value="a"> தொடர்பாடல்<br>
        <input type="radio" name="q1" value="b"> கணக்கு<br>
        <input type="radio" name="q1" value="c"> வேதியல்<br>
        <input type="radio" name="q1" value="d"> இயற்பியல்<br><br>

        <p>2. திருக்குறளை எழுதியவர்?</p>

        <input type="radio" name="q2" value="a"> பாரதி<br>
        <input type="radio" name="q2" value="b"> திருவள்ளுவர்<br>
        <input type="radio" name="q2" value="c"> கம்பர்<br>
        <input type="radio" name="q2" value="d"> அவ்வையார்<br><br>

        <button onclick="checkTamilQuiz()">
        Submit Quiz
        </button>

        <div id="quizScore"></div>
        `;

    }

    else if(subject === "english"){

        quizResult.innerHTML = `
        <h3>English Quiz</h3>

        <p>1. What is a noun?</p>

        <input type="radio" name="q1" value="a"> Person Place Thing<br>
        <input type="radio" name="q1" value="b"> Action Word<br>
        <input type="radio" name="q1" value="c"> Adjective<br>
        <input type="radio" name="q1" value="d"> Pronoun<br><br>

        <p>2. Which is a verb?</p>

        <input type="radio" name="q2" value="a"> Run<br>
        <input type="radio" name="q2" value="b"> Table<br>
        <input type="radio" name="q2" value="c"> Chair<br>
        <input type="radio" name="q2" value="d"> School<br><br>

        <button onclick="checkEnglishQuiz()">
        Submit Quiz
        </button>

        <div id="quizScore"></div>
        `;
    }
else if(subject === "maths"){

    quizResult.innerHTML = `
    <h3>Maths Quiz</h3>

    <p>1. 5 + 5 = ?</p>

    <input type="radio" name="q1" value="a"> 10<br>
    <input type="radio" name="q1" value="b"> 15<br>
    <input type="radio" name="q1" value="c"> 20<br>
    <input type="radio" name="q1" value="d"> 25<br><br>

    <p>2. 10 × 2 = ?</p>

    <input type="radio" name="q2" value="a"> 15<br>
    <input type="radio" name="q2" value="b"> 20<br>
    <input type="radio" name="q2" value="c"> 25<br>
    <input type="radio" name="q2" value="d"> 30<br><br>

    <button onclick="checkMathsQuiz()">
    Submit Quiz
    </button>

    <div id="quizScore"></div>
    `;
}

else if(subject === "science"){

    quizResult.innerHTML = `
    <h3>Science Quiz</h3>

    <p>1. Plants prepare food by?</p>

    <input type="radio" name="q1" value="a"> Photosynthesis<br>
    <input type="radio" name="q1" value="b"> Respiration<br>
    <input type="radio" name="q1" value="c"> Digestion<br>
    <input type="radio" name="q1" value="d"> Evaporation<br><br>

    <p>2. Water formula is?</p>

    <input type="radio" name="q2" value="a"> CO2<br>
    <input type="radio" name="q2" value="b"> O2<br>
    <input type="radio" name="q2" value="c"> H2O<br>
    <input type="radio" name="q2" value="d"> N2<br><br>

    <button onclick="checkScienceQuiz()">
    Submit Quiz
    </button>

    <div id="quizScore"></div>
    `;
}

    else{

        quizResult.innerHTML =
        "<h3>Subject Not Added Yet</h3>";
    }
}


/* Date */
function updateTodayDate() {

    const today = new Date();

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
        document.getElementById("todayDate");

    if (dateElement) {
        dateElement.innerText = formattedDate;
    }
}

/* Daily Quote */
const quotes = [
    "Success starts with self-discipline.",
    "Small progress is still progress.",
    "Study hard today, shine tomorrow.",
    "Dream big and work hard.",
    "Consistency beats motivation."
];

function loadQuote() {

    const randomIndex =
        Math.floor(Math.random() * quotes.length);

    const quoteElement =
        document.getElementById("dailyQuote");

    if (quoteElement) {
        quoteElement.innerText =
            quotes[randomIndex];
    }
}

/* Welcome User */
function loadStudentName() {

    const studentName =
        localStorage.getItem("studentName");

    const welcome =
        document.getElementById("welcomeUser");

    if (studentName && welcome) {
        welcome.innerHTML =
            "👋 Welcome, " + studentName;
    }
}

/* Page Load */
window.onload = function () {

    renderTasks();
    renderExams();

    updateTodayDate();
    loadQuote();
    loadStudentName();

};
   

/* Exams */

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
        <strong>${exam.name}</strong>
        <br>
        📅 ${exam.date}
        <br><br>
        <button onclick="deleteExam(${index})">
        Delete
        </button>
        `;

        examList.appendChild(li);

    });

}
function checkTamilQuiz(){

    let score = 0;

    const q1 =
    document.querySelector('input[name="q1"]:checked');

    const q2 =
    document.querySelector('input[name="q2"]:checked');

    if(q1 && q1.value === "a") score++;

    if(q2 && q2.value === "b") score++;

    document.getElementById("quizScore").innerHTML =
    "🎉 Score : " + score + "/2";
}

function checkEnglishQuiz(){

    let score = 0;

    const q1 =
    document.querySelector('input[name="q1"]:checked');

    const q2 =
    document.querySelector('input[name="q2"]:checked');

    if(q1 && q1.value === "a") score++;

    if(q2 && q2.value === "a") score++;

    document.getElementById("quizScore").innerHTML =
    "🎉 Score : " + score + "/2";
}function checkMathsQuiz(){

    let score = 0;

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if(q1 && q1.value === "a") score++;
    if(q2 && q2.value === "b") score++;

    document.getElementById("quizScore").innerHTML =
    "🎉 Score : " + score + "/2";
}

function checkScienceQuiz(){

    let score = 0;

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if(q1 && q1.value === "a") score++;
    if(q2 && q2.value === "c") score++;

    document.getElementById("quizScore").innerHTML =
    "🎉 Score : " + score + "/2";
}