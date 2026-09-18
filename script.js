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
// PRACTICE QUIZ
// ===============================

function generateQuiz() {

    const subject =
        document.getElementById("quizSubject").value.trim();

    const result =
        document.getElementById("quizResult");

    if (subject === "") {

        result.innerHTML =
            "<p>Please enter subject.</p>";

        return;
    }

    result.innerHTML = `
    <div class="exam-card">

        <h3>${subject} Exam</h3>

        <p><b>Q1.</b> What does HTML stand for?</p>

        <button onclick="checkAnswer(true)">
            Hyper Text Markup Language
        </button><br><br>

        <button onclick="checkAnswer(false)">
            High Text Machine Language
        </button><br><br>

        <button onclick="checkAnswer(false)">
            Home Tool Markup Language
        </button><br><br>

        <button onclick="checkAnswer(false)">
            Hyper Tool Markup Language
        </button>

        <div id="quizScore"></div>

    </div>
    `;
}

function checkAnswer(correct) {

    const score =
        document.getElementById("quizScore");

    if (correct) {

        score.innerHTML = `
            <h3>✅ Correct</h3>
            <p>Marks : 100</p>
            <p>Result : PASS</p>
        `;

    } else {

        score.innerHTML = `
            <h3>❌ Wrong</h3>
            <p>Marks : 0</p>
            <p>Result : FAIL</p>
        `;
    }
} 