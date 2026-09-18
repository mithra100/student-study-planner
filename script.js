// ==========================================
// STUDENT SMART PLANNER
// JavaScript
// ==========================================


// ==========================================
// DARK MODE
// ==========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}


// ==========================================
// AI STUDY ASSISTANT
// ==========================================

function askAI() {

    const question =
        document.getElementById("aiQuestion").value.trim();

    const result =
        document.getElementById("aiHelpResult");


    if (question === "") {

        result.innerHTML = `
            <div class="exam-card">
                <h3>⚠️ Please enter a question</h3>
                <p>Type your study question first.</p>
            </div>
        `;

        return;
    }


    // Simple frontend response
    result.innerHTML = `
        <div class="exam-card">

            <h3>🤖 AI Assistant</h3>

            <p>
                <strong>Your Question:</strong>
                ${question}
            </p>

            <p>
                📚 Let's understand this topic step by step.
                Keep practicing and learning!
            </p>

        </div>
    `;

}


// ==========================================
// DOUBT SOLVER
// ==========================================

function solveDoubt() {

    const doubt =
        document.getElementById("doubtInput").value.trim();

    const result =
        document.getElementById("doubtResult");


    if (doubt === "") {

        result.innerHTML = `
            <div class="exam-card">
                <h3>⚠️ Enter your doubt</h3>
                <p>Please type something first.</p>
            </div>
        `;

        return;
    }


    result.innerHTML = `
        <div class="exam-card">

            <h3>💡 Doubt Received</h3>

            <p>
                <strong>Your Doubt:</strong>
                ${doubt}
            </p>

            <p>
                🧑‍🎓 Your doubt has been received.
                Let's learn the concept step by step.
            </p>

        </div>
    `;

}


// ==========================================
// ADD STUDY GOAL
// ==========================================

function addGoal() {

    const input =
        document.getElementById("goalInput");

    const list =
        document.getElementById("goalList");

    const count =
        document.getElementById("goalCount");


    const goal =
        input.value.trim();


    if (goal === "") {

        alert("Please enter a study goal.");

        return;
    }


    const li =
        document.createElement("li");


    li.innerHTML = `
        🎯 ${goal}
        <button
            onclick="this.parentElement.remove(); updateGoalCount();"
            style="float:right; padding:6px 10px;">
            ✕
        </button>
    `;


    list.appendChild(li);

    input.value = "";


    updateGoalCount();

}


// ==========================================
// UPDATE GOAL COUNT
// ==========================================

function updateGoalCount() {

    const list =
        document.getElementById("goalList");

    const count =
        document.getElementById("goalCount");


    count.textContent =
        list.children.length;

}


// ==========================================
// QUIZ
// ==========================================

function checkQuiz() {

    const answer =
        document.getElementById("quizAnswer")
        .value
        .trim()
        .toLowerCase();


    const result =
        document.getElementById("quizResult");


    if (answer === "") {

        result.innerHTML = `
            <div class="exam-card">
                <h3>⚠️ Enter your answer</h3>
            </div>
        `;

        return;
    }


    if (
        answer === "html" ||
        answer === "hypertext markup language"
    ) {

        result.innerHTML = `
            <div class="exam-card">

                <h3>🎉 Correct Answer!</h3>

                <p>
                    HTML is used to create the structure
                    of a webpage.
                </p>

            </div>
        `;

    } else {

        result.innerHTML = `
            <div class="exam-card">

                <h3>❌ Try Again</h3>

                <p>
                    The correct answer is
                    <strong>HTML</strong>.
                </p>

            </div>
        `;

    }

}


// ==========================================
// PAGE LOADED
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "🎓 Student Smart Planner loaded successfully!"
        );

        updateGoalCount();

    }
);
// ==========================================
// SUBJECT SELECTION
// ==========================================

function selectSubject() {

    const subject =
        document.getElementById("subjectSelect").value;

    const result =
        document.getElementById("subjectResult");

    if (subject === "") {

        result.innerHTML = `
            <div class="exam-card">
                <h3>⚠️ Select a Subject</h3>
                <p>Please choose a subject before starting.</p>
            </div>
        `;

        return;
    }

    const subjectName =
        document.getElementById("subjectSelect")
        .options[
            document.getElementById("subjectSelect").selectedIndex
        ].text;

    result.innerHTML = `
        <div class="exam-card">
            <h3>🎉 ${subjectName} Selected</h3>
            <p>Your practice session is ready.</p>
        </div>
    `;

}
// CREATE EXAM

function createExam() {

    let examName = document.getElementById("examName").value;
    let examSubject = document.getElementById("examSubject").value;
    let examDate = document.getElementById("examDate").value;
    let examTime = document.getElementById("examTime").value;
    let examMarks = document.getElementById("examMarks").value;

    if (
        examName === "" ||
        examSubject === "" ||
        examDate === "" ||
        examTime === "" ||
        examMarks === ""
    ) {
        document.getElementById("examResult").innerHTML =
            "<p>Please fill all exam details.</p>";
        return;
    }

    document.getElementById("examResult").innerHTML = `
        <div class="exam-card">
            <h3>📚 ${examName}</h3>
            <p><b>Subject:</b> ${examSubject}</p>
            <p><b>Date:</b> ${examDate}</p>
            <p><b>Time:</b> ${examTime}</p>
            <p><b>Total Marks:</b> ${examMarks}</p>
            <p>✅ Exam Created Successfully!</p>
        </div>
    `;
}
// ADD QUESTION PATTERN

function addQuestionPattern() {

    let type = document.getElementById("questionType").value;
    let marks = document.getElementById("questionMarks").value;

    if (type === "" || marks === "") {
        document.getElementById("questionPatternResult").innerHTML =
            "<p>Please select question type and marks.</p>";
        return;
    }

    let typeName = "";

    if (type === "mcq") {
        typeName = "MCQ - Multiple Choice";
    }
    else if (type === "short") {
        typeName = "Short Answer";
    }
    else if (type === "long") {
        typeName = "Long Answer";
    }

    document.getElementById("questionPatternResult").innerHTML = `
        <div class="exam-card">
            <h3>Question Added ✅</h3>
            <p><b>Type:</b> ${typeName}</p>
            <p><b>Marks:</b> ${marks}</p>
        </div>
    `;
}
// ADD QUESTIONS

let questions = [];

function addQuestion() {

    let questionText = document.getElementById("questionText").value;

    if (questionText === "") {
        alert("Please enter a question.");
        return;
    }

    questions.push(questionText);

    displayQuestions();

    document.getElementById("questionText").value = "";
}

function displayQuestions() {

    let questionList = document.getElementById("questionList");

    questionList.innerHTML = "";

    questions.forEach(function(question, index) {

        questionList.innerHTML += `
            <div class="exam-card">
                <h3>Question ${index + 1}</h3>
                <p>${question}</p>
            </div>
        `;

    });
}
// ADD MCQ

let mcqQuestions = [];

function addMCQ() {

    let question = document.getElementById("questionText").value;
    let optionA = document.getElementById("optionA").value;
    let optionB = document.getElementById("optionB").value;
    let optionC = document.getElementById("optionC").value;
    let optionD = document.getElementById("optionD").value;
    let correct = document.getElementById("correctAnswer").value;

    if (
        question === "" ||
        optionA === "" ||
        optionB === "" ||
        optionC === "" ||
        optionD === "" ||
        correct === ""
    ) {
        alert("Please fill all question details.");
        return;
    }

    mcqQuestions.push({
        question: question,
        A: optionA,
        B: optionB,
        C: optionC,
        D: optionD,
        correct: correct
    });

    displayMCQ();

    document.getElementById("questionText").value = "";
    document.getElementById("optionA").value = "";
    document.getElementById("optionB").value = "";
    document.getElementById("optionC").value = "";
    document.getElementById("optionD").value = "";
    document.getElementById("correctAnswer").value = "";
}


function displayMCQ() {

    let list = document.getElementById("mcqList");

    list.innerHTML = "";

    mcqQuestions.forEach(function(q, index) {

        list.innerHTML += `
            <div class="exam-card">

                <h3>Question ${index + 1}</h3>

                <p>${q.question}</p>

                <p>A) ${q.A}</p>
                <p>B) ${q.B}</p>
                <p>C) ${q.C}</p>
                <p>D) ${q.D}</p>

                <p>✅ Correct Answer: Option ${q.correct}</p>

            </div>
        `;

    });
}
// CHOOSE QUESTION TYPE

function chooseQuestionType() {

    let type = document.getElementById("examQuestionType").value;
    let marks = document.getElementById("examQuestionMarks").value;

    let result = document.getElementById("questionTypeResult");

    if (type === "" || marks === "") {
        result.innerHTML = "<p>Please select question type and marks.</p>";
        return;
    }

    let typeName = "";

    if (type === "mcq") {
        typeName = "MCQ";
    }
    else if (type === "short") {
        typeName = "Short Answer";
    }
    else if (type === "long") {
        typeName = "Long Answer";
    }

    result.innerHTML = `
        <div class="exam-card">
            <h3>✅ Question Type Selected</h3>
            <p><b>Type:</b> ${typeName}</p>
            <p><b>Marks:</b> ${marks}</p>
        </div>
    `;
}
// SHOW MCQ OPTIONS

document.getElementById("examQuestionType").addEventListener("change", function () {

    let mcqOptions = document.getElementById("mcqOptions");

    if (this.value === "mcq") {
        mcqOptions.style.display = "block";
    } else {
        mcqOptions.style.display = "none";
    }

});