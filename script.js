// ================================
// STUDENT SMART PLANNER
// JAVASCRIPT
// ================================


// -------------------------------
// DARK MODE
// -------------------------------

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}


// -------------------------------
// AI ASSISTANT
// -------------------------------

function askAI() {

    let question = document.getElementById("aiQuestion").value.trim();
    let result = document.getElementById("aiHelpResult");

    if (question === "") {

        result.innerHTML =
            "<p>Please enter your question.</p>";

        return;
    }

    result.innerHTML = `
        <div class="exam-card">
            <h3>🤖 AI Assistant</h3>
            <p>
                Your question: <b>${question}</b>
            </p>
            <p>
                This is a demo response. Real AI connection
                can be added later.
            </p>
        </div>
    `;
}


// -------------------------------
// DOUBT SOLVER
// -------------------------------

function solveDoubt() {

    let doubt = document.getElementById("doubtInput").value.trim();
    let result = document.getElementById("doubtResult");

    if (doubt === "") {

        result.innerHTML =
            "<p>Please enter your doubt.</p>";

        return;
    }

    result.innerHTML = `
        <div class="exam-card">
            <h3>💡 Doubt Explanation</h3>
            <p>
                You asked: <b>${doubt}</b>
            </p>
            <p>
                This is a demo explanation.
                Real AI can answer this doubt later.
            </p>
        </div>
    `;
}


// -------------------------------
// GOALS
// -------------------------------

let goals = [];


function addGoal() {

    let input = document.getElementById("goalInput");
    let goal = input.value.trim();

    if (goal === "") {

        alert("Please enter a goal.");

        return;
    }

    goals.push(goal);

    input.value = "";

    displayGoals();

    updateGoalCount();
}


function displayGoals() {

    let list = document.getElementById("goalList");

    list.innerHTML = "";

    goals.forEach(function(goal, index) {

        list.innerHTML += `
            <li>
                🎯 ${goal}
                <button onclick="deleteGoal(${index})">
                    Delete
                </button>
            </li>
        `;

    });
}


function deleteGoal(index) {

    goals.splice(index, 1);

    displayGoals();

    updateGoalCount();
}


function updateGoalCount() {

    document.getElementById("goalCount").textContent =
        goals.length;

}


// -------------------------------
// CREATE EXAM
// -------------------------------

let exams = [];


function createExam() {

    let name =
        document.getElementById("examName").value.trim();

    let subject =
        document.getElementById("examSubject").value.trim();

    let date =
        document.getElementById("examDate").value;

    let time =
        document.getElementById("examTime").value;

    let marks =
        document.getElementById("examMarks").value;

    let result =
        document.getElementById("examResult");


    if (
        name === "" ||
        subject === "" ||
        date === "" ||
        time === "" ||
        marks === ""
    ) {

        result.innerHTML =
            "<p>Please fill all exam details.</p>";

        return;
    }


    let exam = {

        name: name,
        subject: subject,
        date: date,
        time: time,
        marks: Number(marks),

        questions: []

    };


    exams.push(exam);


    result.innerHTML = `
        <div class="exam-card">

            <h3>✅ Exam Created</h3>

            <p>
                <b>Exam:</b> ${name}
            </p>

            <p>
                <b>Subject:</b> ${subject}
            </p>

            <p>
                <b>Date:</b> ${date}
            </p>

            <p>
                <b>Time:</b> ${time}
            </p>

            <p>
                <b>Total Marks:</b> ${marks}
            </p>

            <p>
                🎉 Your exam is ready for questions.
            </p>

        </div>
    `;


    document.getElementById("examCount").textContent =
        exams.length;

}


// -------------------------------
// SHOW / HIDE MCQ OPTIONS
// -------------------------------

document.addEventListener("DOMContentLoaded", function () {

    let questionType =
        document.getElementById("examQuestionType");

    let mcqOptions =
        document.getElementById("mcqOptions");


    if (questionType && mcqOptions) {

        questionType.addEventListener(
            "change",
            function () {

                if (this.value === "mcq") {

                    mcqOptions.style.display = "block";

                }
                else {

                    mcqOptions.style.display = "none";

                }

            }
        );

    }

});


// -------------------------------
// EXAM QUESTIONS
// -------------------------------

let examQuestions = [];


function addExamQuestion() {

    let type =
        document.getElementById("examQuestionType").value;

    let marks =
        document.getElementById("examQuestionMarks").value;

    let question =
        document.getElementById("examQuestionText").value.trim();


    if (
        type === "" ||
        marks === "" ||
        question === ""
    ) {

        alert("Please select type, marks and enter question.");

        return;
    }


    // ---------------------------
    // MCQ
    // ---------------------------

    if (type === "mcq") {

        let optionA =
            document.getElementById("mcqOptionA").value.trim();

        let optionB =
            document.getElementById("mcqOptionB").value.trim();

        let optionC =
            document.getElementById("mcqOptionC").value.trim();

        let optionD =
            document.getElementById("mcqOptionD").value.trim();

        let correct =
            document.getElementById("correctOption").value;


        if (
            optionA === "" ||
            optionB === "" ||
            optionC === "" ||
            optionD === "" ||
            correct === ""
        ) {

            alert("Please fill all MCQ options and select the correct answer.");

            return;
        }


        examQuestions.push({

            type: "MCQ",

            marks: Number(marks),

            question: question,

            optionA: optionA,

            optionB: optionB,

            optionC: optionC,

            optionD: optionD,

            correct: correct

        });

    }


    // ---------------------------
    // SHORT ANSWER
    // ---------------------------

    else if (type === "short") {

        examQuestions.push({

            type: "Short Answer",

            marks: Number(marks),

            question: question

        });

    }


    // ---------------------------
    // LONG ANSWER
    // ---------------------------

    else if (type === "long") {

        examQuestions.push({

            type: "Long Answer",

            marks: Number(marks),

            question: question

        });

    }


    displayExamQuestions();


    // Clear question

    document.getElementById("examQuestionText").value = "";

    document.getElementById("mcqOptionA").value = "";

    document.getElementById("mcqOptionB").value = "";

    document.getElementById("mcqOptionC").value = "";

    document.getElementById("mcqOptionD").value = "";

    document.getElementById("correctOption").value = "";

}


// -------------------------------
// DISPLAY QUESTIONS
// -------------------------------

function displayExamQuestions() {

    let list =
        document.getElementById("examQuestionList");


    list.innerHTML = "";


    examQuestions.forEach(function(q, index) {

        let html = `

            <div class="exam-card">

                <h3>
                    Question ${index + 1}
                </h3>

                <p>
                    <b>Type:</b> ${q.type}
                </p>

                <p>
                    <b>Marks:</b> ${q.marks}
                </p>

                <p>
                    <b>Question:</b> ${q.question}
                </p>

        `;


        if (q.type === "MCQ") {

            html += `

                <p>A) ${q.optionA}</p>

                <p>B) ${q.optionB}</p>

                <p>C) ${q.optionC}</p>

                <p>D) ${q.optionD}</p>

                <p>
                    ✅ Correct Answer:
                    Option ${q.correct}
                </p>

            `;

        }


        html += `

            </div>

        `;


        list.innerHTML += html;

    });

}


// -------------------------------
// STUDENT LEVEL
// -------------------------------

function selectLevel() {

    let level =
        document.getElementById("levelSelect").value;

    let result =
        document.getElementById("levelResult");


    if (level === "") {

        result.innerHTML =
            "<p>Please select your learning level.</p>";

        return;
    }


    let levelName = "";


    if (level === "school") {

        levelName = "🏫 School Student";

    }
    else if (level === "college") {

        levelName = "🎓 College Student";

    }
    else {

        levelName = "📚 Other Learning";

    }


    result.innerHTML = `

        <div class="exam-card">

            <h3>✅ Level Selected</h3>

            <p>
                ${levelName}
            </p>

        </div>

    `;

}


// -------------------------------
// SUBJECT
// -------------------------------

let subjects = [];


function addSubject() {

    let input =
        document.getElementById("subjectInput");

    let subject =
        input.value.trim();


    let result =
        document.getElementById("subjectResult");


    if (subject === "") {

        result.innerHTML =
            "<p>Please enter a subject.</p>";

        return;
    }


    subjects.push(subject);


    input.value = "";


    result.innerHTML = `

        <div class="exam-card">

            <h3>📚 Subject Added</h3>

            <p>
                ${subject}
            </p>

        </div>

    `;


    document.getElementById("subjectCount").textContent =
        subjects.length;

}


// -------------------------------
// QUICK QUIZ
// -------------------------------

function checkQuiz() {

    let answer =
        document.getElementById("quizAnswer").value
        .trim()
        .toLowerCase();


    let result =
        document.getElementById("quizResult");


    if (answer === "") {

        result.innerHTML =
            "<p>Please enter your answer.</p>";

        return;
    }


    if (
        answer === "html" ||
        answer === "hypertext markup language"
    ) {

        result.innerHTML = `
            <div class="exam-card">
                <h3>🎉 Correct!</h3>
                <p>The answer is HTML.</p>
            </div>
        `;

    }
    else {

        result.innerHTML = `
            <div class="exam-card">
                <h3>❌ Incorrect</h3>
                <p>The correct answer is HTML.</p>
            </div>
        `;

    }

}