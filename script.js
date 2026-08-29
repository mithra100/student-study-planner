function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li, #completedList li").forEach(li => {
        tasks.push({
            html: li.innerHTML,
            completed: li.parentElement.id === "completedList"
        });
    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}


function completeTask(btn) {

    let li = btn.parentElement;

    li.innerHTML = li.innerHTML.replace("Pending", "Completed");

    document.getElementById("completedList").appendChild(li);

    saveTasks();
    updateCounters();
}


function deleteTask(btn) {

    btn.parentElement.remove();

    saveTasks();
    updateCounters();
}


function addTask() {

    let subject =
        document.getElementById("subject").value.trim();

    let topic =
        document.getElementById("topic").value.trim();

    let date =
        document.getElementById("date").value;


    if (subject === "" || topic === "" || date === "") {

        alert("Please enter Subject, Topic and Date");

        return;
    }


    let li = document.createElement("li");


    li.innerHTML = `
        <strong>${subject}</strong> - ${topic}
        <span> | ${date} | Pending </span>

        <button onclick="completeTask(this)">
            Complete
        </button>

        <button onclick="deleteTask(this)">
            Delete
        </button>
    `;


    document.getElementById("taskList").appendChild(li);


    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("date").value = "";


    saveTasks();
    updateCounters();
}


function updateCounters() {

    let total =
        document.querySelectorAll("#taskList li").length +
        document.querySelectorAll("#completedList li").length;


    let completed =
        document.querySelectorAll("#completedList li").length;


    let pending =
        document.querySelectorAll("#taskList li").length;


    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("pendingTasks").innerText = pending;
}


function loadTasks() {

    let savedTasks =
        JSON.parse(localStorage.getItem("studyTasks")) || [];


    let taskList =
        document.getElementById("taskList");


    let completedList =
        document.getElementById("completedList");


    taskList.innerHTML = "";

    completedList.innerHTML = "";


    savedTasks.forEach(task => {

        let li = document.createElement("li");

        li.innerHTML = task.html;


        if (task.completed) {

            completedList.appendChild(li);

        } else {

            taskList.appendChild(li);
        }

    });


    updateCounters();
}


window.onload = function () {

    loadTasks();

};


/* =========================
   AI STUDY PLAN
========================= */

function generateStudyPlan() {

    let subject =
        document.getElementById("aiSubject").value.trim();


    let topic =
        document.getElementById("aiTopic").value.trim();


    let result =
        document.getElementById("aiResult");


    if (subject === "" || topic === "") {

        result.innerHTML =
            "⚠️ Please enter Subject and Study Topic.";

        return;
    }


    result.innerHTML = `

        <div class="quiz-card">

            <h3>📚 AI Study Plan</h3>

            <p>
                <strong>Subject:</strong> ${subject}
            </p>

            <p>
                <strong>Topic:</strong> ${topic}
            </p>

            <ol>

                <li>
                    📖 Read and understand the basic concepts.
                </li>

                <li>
                    📝 Make short notes.
                </li>

                <li>
                    ✏️ Practice important questions.
                </li>

                <li>
                    🔄 Revise the topic.
                </li>

                <li>
                    ✅ Take a small self-test.
                </li>

            </ol>

        </div>

    `;
}


/* =========================
   QUIZ / ASSESSMENT
========================= */

let currentAssessment = [];


function generateQuiz() {

    let subject =
        document.getElementById("quizSubject").value.trim();


    let topic =
        document.getElementById("quizTopic").value.trim();


    let result =
        document.getElementById("quizResult");


    if (subject === "" || topic === "") {

        result.innerHTML =
            "⚠️ Please enter Subject and Study Topic.";

        return;
    }


    let questions =
        getQuestions(subject, topic);


    currentAssessment = questions;


    let html = `

        <div class="quiz-card">

            <h2>🧠 ${subject} Assessment</h2>

            <p>
                <strong>Topic:</strong> ${topic}
            </p>

            <p>
                <strong>Total Questions:</strong> 25
                &nbsp; | &nbsp;
                <strong>Total Marks:</strong> 25
            </p>

            <hr>

    `;


    questions.forEach(function(q, index) {

        html += `

            <div class="question">

                <h3>
                    ${index + 1}. ${q.question}
                </h3>


                <label>

                    <input
                        type="radio"
                        name="question${index}"
                        value="A"
                    >

                    A. ${q.options.A}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="question${index}"
                        value="B"
                    >

                    B. ${q.options.B}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="question${index}"
                        value="C"
                    >

                    C. ${q.options.C}

                </label>

                <br>


                <label>

                    <input
                        type="radio"
                        name="question${index}"
                        value="D"
                    >

                    D. ${q.options.D}

                </label>

            </div>

            <hr>

        `;
    });


    html += `

            <button onclick="submitAssessment()">
                ✅ Submit Assessment
            </button>


            <div id="assessmentResult"></div>

        </div>

    `;


    result.innerHTML = html;
}


function getQuestions(subject, topic) {

    subject = subject.toLowerCase();

    let questions = [];


    /* ENGLISH */

    if (subject.includes("english")) {

        questions = [

            {
                question: "What is a noun?",
                options: {
                    A: "Action word",
                    B: "Name of a person, place or thing",
                    C: "Describing word",
                    D: "Joining word"
                },
                answer: "B"
            },

            {
                question: "Which word is a verb?",
                options: {
                    A: "Run",
                    B: "Beautiful",
                    C: "Book",
                    D: "Quick"
                },
                answer: "A"
            },

            {
                question: "Choose the correct article: ___ apple.",
                options: {
                    A: "A",
                    B: "An",
                    C: "The",
                    D: "No article"
                },
                answer: "B"
            },

            {
                question: 'What is the plural of "child"?',
                options: {
                    A: "Childs",
                    B: "Childes",
                    C: "Children",
                    D: "Childrens"
                },
                answer: "C"
            },

            {
                question: "Which word is an adjective?",
                options: {
                    A: "Beautiful",
                    B: "Run",
                    C: "School",
                    D: "Slowly"
                },
                answer: "A"
            }

        ];
    }


    /* MATHS */

    else if (
        subject.includes("math") ||
        subject.includes("maths")
    ) {

        questions = [

            {
                question: "What is 5 + 5?",
                options: {
                    A: "8",
                    B: "9",
                    C: "10",
                    D: "11"
                },
                answer: "C"
            },

            {
                question: "What is 10 × 2?",
                options: {
                    A: "12",
                    B: "20",
                    C: "22",
                    D: "25"
                },
                answer: "B"
            },

            {
                question: "What is 20 ÷ 4?",
                options: {
                    A: "4",
                    B: "5",
                    C: "6",
                    D: "8"
                },
                answer: "B"
            },

            {
                question: "What is 15 - 7?",
                options: {
                    A: "6",
                    B: "7",
                    C: "8",
                    D: "9"
                },
                answer: "C"
            },

            {
                question: "What is 3²?",
                options: {
                    A: "6",
                    B: "8",
                    C: "9",
                    D: "12"
                },
                answer: "C"
            }

        ];
    }


    /* PHYSICS */

    else if (subject.includes("physics")) {

        questions = [

            {
                question: "What is the SI unit of force?",
                options: {
                    A: "Joule",
                    B: "Newton",
                    C: "Watt",
                    D: "Pascal"
                },
                answer: "B"
            },

            {
                question: "What is the SI unit of energy?",
                options: {
                    A: "Joule",
                    B: "Newton",
                    C: "Watt",
                    D: "Volt"
                },
                answer: "A"
            },

            {
                question: "Speed is calculated as:",
                options: {
                    A: "Time ÷ Distance",
                    B: "Distance ÷ Time",
                    C: "Distance × Time",
                    D: "Mass × Time"
                },
                answer: "B"
            },

            {
                question: "Which device measures temperature?",
                options: {
                    A: "Barometer",
                    B: "Thermometer",
                    C: "Ammeter",
                    D: "Voltmeter"
                },
                answer: "B"
            },

            {
                question: "What is the SI unit of power?",
                options: {
                    A: "Watt",
                    B: "Joule",
                    C: "Newton",
                    D: "Ohm"
                },
                answer: "A"
            }

        ];
    }


    /* BOTANY */

    else if (subject.includes("botany")) {

        questions = [

            {
                question: "Which part of a plant absorbs water?",
                options: {
                    A: "Flower",
                    B: "Root",
                    C: "Fruit",
                    D: "Leaf"
                },
                answer: "B"
            },

            {
                question: "Where does photosynthesis mainly occur?",
                options: {
                    A: "Root",
                    B: "Stem",
                    C: "Leaf",
                    D: "Flower"
                },
                answer: "C"
            },

            {
                question: "Which pigment helps in photosynthesis?",
                options: {
                    A: "Haemoglobin",
                    B: "Chlorophyll",
                    C: "Melanin",
                    D: "Keratin"
                },
                answer: "B"
            },

            {
                question: "Which part produces seeds in flowering plants?",
                options: {
                    A: "Flower",
                    B: "Root",
                    C: "Stem",
                    D: "Leaf"
                },
                answer: "A"
            },

            {
                question: "Plants prepare food by:",
                options: {
                    A: "Respiration",
                    B: "Photosynthesis",
                    C: "Digestion",
                    D: "Excretion"
                },
                answer: "B"
            }

        ];
    }


    /* ZOOLOGY */

    else if (subject.includes("zoology")) {

        questions = [

            {
                question: "Which organ pumps blood?",
                options: {
                    A: "Lungs",
                    B: "Heart",
                    C: "Kidney",
                    D: "Brain"
                },
                answer: "B"
            },

            {
                question: "Which organ is mainly responsible for breathing?",
                options: {
                    A: "Heart",
                    B: "Liver",
                    C: "Lungs",
                    D: "Kidney"
                },
                answer: "C"
            },

            {
                question: "Which is the largest organ of the human body?",
                options: {
                    A: "Heart",
                    B: "Skin",
                    C: "Brain",
                    D: "Liver"
                },
                answer: "B"
            },

            {
                question: "Which blood cells fight infections?",
                options: {
                    A: "Red blood cells",
                    B: "White blood cells",
                    C: "Platelets",
                    D: "Plasma"
                },
                answer: "B"
            },

            {
                question: "Which organ filters waste from blood?",
                options: {
                    A: "Kidney",
                    B: "Heart",
                    C: "Lungs",
                    D: "Stomach"
                },
                answer: "A"
            }

        ];
    }


    /* SCIENCE */

    else if (subject.includes("science")) {

        questions = [

            {
                question: "Which planet is known as the Red Planet?",
                options: {
                    A: "Earth",
                    B: "Mars",
                    C: "Venus",
                    D: "Jupiter"
                },
                answer: "B"
            },

            {
                question: "What gas do humans need for respiration?",
                options: {
                    A: "Oxygen",
                    B: "Carbon dioxide",
                    C: "Nitrogen",
                    D: "Hydrogen"
                },
                answer: "A"
            },

            {
                question: "Water freezes at:",
                options: {
                    A: "0°C",
                    B: "10°C",
                    C: "50°C",
                    D: "100°C"
                },
                answer: "A"
            },

            {
                question: "Which is a source of renewable energy?",
                options: {
                    A: "Coal",
                    B: "Petrol",
                    C: "Solar energy",
                    D: "Diesel"
                },
                answer: "C"
            },

            {
                question: "Which organ helps humans to think?",
                options: {
                    A: "Heart",
                    B: "Brain",
                    C: "Liver",
                    D: "Kidney"
                },
                answer: "B"
            }

        ];
    }


    /* TAMIL */

    else if (subject.includes("tamil")) {

        questions = [

            {
                question: "தமிழ் மொழியின் முதல் எழுத்து எது?",
                options: {
                    A: "அ",
                    B: "ஆ",
                    C: "இ",
                    D: "ஈ"
                },
                answer: "A"
            },

            {
                question: "தமிழில் உயிரெழுத்துக்கள் எத்தனை?",
                options: {
                    A: "10",
                    B: "12",
                    C: "18",
                    D: "216"
                },
                answer: "B"
            },

            {
                question: "தமிழில் மெய்யெழுத்துக்கள் எத்தனை?",
                options: {
                    A: "12",
                    B: "18",
                    C: "20",
                    D: "30"
                },
                answer: "B"
            },

            {
                question: "திருக்குறளை இயற்றியவர் யார்?",
                options: {
                    A: "கம்பர்",
                    B: "திருவள்ளுவர்",
                    C: "இளங்கோவடிகள்",
                    D: "அவ்வையார்"
                },
                answer: "B"
            },

            {
                question: "தமிழ் எந்த வகை மொழியாகும்?",
                options: {
                    A: "திராவிட மொழி",
                    B: "ஜெர்மானிய மொழி",
                    C: "ரோமானிய மொழி",
                    D: "சீன மொழி"
                },
                answer: "A"
            }

        ];
    }


    /* GENERAL FALLBACK */

    else {

        questions = [

            {
                question: `What is the main purpose of studying ${topic}?`,
                options: {
                    A: "To understand concepts",
                    B: "To avoid learning",
                    C: "To waste time",
                    D: "None"
                },
                answer: "A"
            },

            {
                question: `What should a student do first when learning ${topic}?`,
                options: {
                    A: "Understand the basics",
                    B: "Skip the topic",
                    C: "Stop studying",
                    D: "Ignore examples"
                },
                answer: "A"
            },

            {
                question: `Which method helps remember ${topic}?`,
                options: {
                    A: "Revision",
                    B: "Ignoring",
                    C: "Skipping",
                    D: "Sleeping only"
                },
                answer: "A"
            },

            {
                question: `What improves knowledge of ${topic}?`,
                options: {
                    A: "Practice",
                    B: "Avoiding questions",
                    C: "Skipping revision",
                    D: "No study"
                },
                answer: "A"
            },

            {
                question: `What is important while studying ${topic}?`,
                options: {
                    A: "Understanding concepts",
                    B: "Memorizing without understanding",
                    C: "Ignoring doubts",
                    D: "Skipping practice"
                },
                answer: "A"
            }

        ];
    }


    /* MAKE 25 QUESTIONS */

    let finalQuestions = [];


    for (let i = 0; i < 25; i++) {

        finalQuestions.push(
            questions[i % questions.length]
        );

    }


    return finalQuestions;
}


/* =========================
   SUBMIT ASSESSMENT
========================= */

function submitAssessment() {

    let score = 0;


    