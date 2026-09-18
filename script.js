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