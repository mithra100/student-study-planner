/* =========================================
   STUDENT SMART PLANNER
   MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   DATA
   ========================================= */

const STORAGE_KEY = "studentSmartPlannerData";


let data = {
    goals: [],
    exams: [],
    subjects: [],
    questions: [],
    streak: 0,
    quizScore: 0
};


/* =========================================
   LOAD DATA
   ========================================= */

function loadData() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

        try {

            const parsed = JSON.parse(saved);

            data = {
                ...data,
                ...parsed
            };

        } catch (error) {

            console.log("Could not load saved data.");

        }
    }
}


/* =========================================
   SAVE DATA
   ========================================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =========================================
   HTML ESCAPE
   ========================================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   PAGE NAVIGATION
   ========================================= */

const pageNames = {

    dashboard: "Dashboard",
    goals: "Goals",
    exams: "Exams",
    subjects: "Subjects",
    quiz: "Quick Quiz",
    ai: "AI Assistant"

};


function showPage(page) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(section => {

        section.style.display = "none";

    });


    const selectedPage =
        document.getElementById(page + "Page");


    if (selectedPage) {

        selectedPage.style.display = "block";

    }


    document.querySelectorAll("[data-page]").forEach(link => {

        link.classList.remove("active");

        if (link.dataset.page === page) {
            link.classList.add("active");
        }

    });


    const title =
        document.getElementById("pageTitle");

    if (title) {

        title.textContent =
            pageNames[page] || "Student Smart Planner";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   NAVIGATION EVENTS
   ========================================= */

document.querySelectorAll("[data-page]").forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        showPage(this.dataset.page);

    });

});


/* =========================================
   DATE
   ========================================= */

function updateDate() {

    const element =
        document.getElementById("todayDate");

    if (!element) return;


    const now = new Date();


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };


    element.textContent =
        now.toLocaleDateString(
            "en-US",
            options
        );

}


/* =========================================
   STATS
   ========================================= */

function updateStats() {

    const subjectCount =
        document.getElementById("subjectCount");

    const goalCount =
        document.getElementById("goalCount");

    const examCount =
        document.getElementById("examCount");

    const streakCount =
        document.getElementById("streakCount");

    const sidebarStreak =
        document.getElementById("sidebarStreak");


    if (subjectCount) {

        subjectCount.textContent =
            data.subjects.length;

    }


    if (goalCount) {

        goalCount.textContent =
            data.goals.length;

    }


    if (examCount) {

        examCount.textContent =
            data.exams.length;

    }


    if (streakCount) {

        streakCount.textContent =
            data.streak;

    }


    if (sidebarStreak) {

        sidebarStreak.textContent =
            data.streak;

    }

}


/* =========================================
   GOALS
   ========================================= */

const goalForm =
    document.getElementById("goalForm");


if (goalForm) {

    goalForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById("goalInput");

            const priority =
                document.getElementById("goalPriority");


            const title =
                input.value.trim();


            if (!title) return;


            const goal = {

                id: Date.now(),

                title: title,

                priority: priority.value,

                completed: false,

                createdAt:
                    new Date().toISOString()

            };


            data.goals.push(goal);


            saveData();

            input.value = "";

            renderAll();

        }
    );

}


/* =========================================
   TOGGLE GOAL
   ========================================= */

function toggleGoal(id) {

    const goal =
        data.goals.find(item => item.id === id);


    if (!goal) return;


    goal.completed =
        !goal.completed;


    saveData();

    renderAll();

}


/* =========================================
   DELETE GOAL
   ========================================= */

function deleteGoal(id) {

    data.goals =
        data.goals.filter(
            item => item.id !== id
        );


    saveData();

    renderAll();

}


/* =========================================
   RENDER GOALS
   ========================================= */

function renderGoals() {

    const container =
        document.getElementById("goalsList");

    const dashboard =
        document.getElementById("dashboardGoals");

    const progressText =
        document.getElementById("goalProgressText");


    if (!container) return;


    if (data.goals.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
                color:#64748b;
            ">
                🎯 No goals yet.<br>
                Create your first study goal above.
            </div>
        `;

    } else {

        container.innerHTML =
            data.goals.map(goal => {

                const priorityClass =
                    goal.priority === "High"
                        ? "🔴"
                        : goal.priority === "Medium"
                            ? "🟡"
                            : "🟢";


                return `

                    <div class="goal-item">

                        <input
                            type="checkbox"
                            ${goal.completed ? "checked" : ""}
                            onchange="toggleGoal(${goal.id})"
                        >

                        <div style="flex:1;">

                            <span
                                style="
                                    font-weight:600;
                                    ${goal.completed
                                        ? "text-decoration:line-through;"
                                        : ""}
                                "
                            >
                                ${escapeHTML(goal.title)}
                            </span>

                            <div style="
                                font-size:11px;
                                color:#64748b;
                                margin-top:2px;
                            ">
                                ${priorityClass}
                                ${escapeHTML(goal.priority)} priority
                            </div>

                        </div>

                        <button
                            onclick="deleteGoal(${goal.id})"
                            style="
                                background:rgba(239,68,68,.1);
                                color:#f87171;
                                box-shadow:none;
                                padding:8px 10px;
                            "
                        >
                            Delete
                        </button>

                    </div>

                `;

            }).join("");

    }


    const completed =
        data.goals.filter(
            goal => goal.completed
        ).length;


    if (progressText) {

        progressText.textContent =
            `${completed} / ${data.goals.length}`;

    }


    if (dashboard) {

        if (data.goals.length === 0) {

            dashboard.innerHTML = `
                <div style="
                    text-align:center;
                    padding:25px 10px;
                    color:#64748b;
                ">
                    No goals added yet.<br>
                    Create your first study goal.
                </div>
            `;

        } else {

            const latest =
                data.goals.slice(-5).reverse();


            dashboard.innerHTML =
                latest.map(goal => {

                    return `

                        <div class="goal-item">

                            <input
                                type="checkbox"
                                ${goal.completed ? "checked" : ""}
                                onchange="toggleGoal(${goal.id})"
                            >

                            <div style="flex:1;">

                                <span style="
                                    font-weight:600;
                                    ${goal.completed
                                        ? "text-decoration:line-through;opacity:.5;"
                                        : ""}
                                ">
                                    ${escapeHTML(goal.title)}
                                </span>

                            </div>

                        </div>

                    `;

                }).join("");

        }

    }


    updateProgress();

}


/* =========================================
   PROGRESS
   ========================================= */

function updateProgress() {

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");


    if (!progressBar || !progressText) return;


    if (data.goals.length === 0) {

        progressBar.style.width = "0%";

        progressText.textContent = "0%";

        return;

    }


    const completed =
        data.goals.filter(
            goal => goal.completed
        ).length;


    const percentage =
        Math.round(
            (completed / data.goals.length) * 100
        );


    progressBar.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${percentage}%`;

}


/* =========================================
   EXAMS
   ========================================= */

const examForm =
    document.getElementById("examForm");


if (examForm) {

    examForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("examName")
                    .value.trim();


            const date =
                document
                    .getElementById("examDate")
                    .value;


            const time =
                document
                    .getElementById("examTime")
                    .value;


            const subject =
                document
                    .getElementById("examSubject")
                    .value.trim();


            if (!name || !date) return;


            data.exams.push({

                id: Date.now(),

                name: name,

                date: date,

                time: time,

                subject: subject

            });


            saveData();

            examForm.reset();

            renderAll();

        }
    );

}


/* =========================================
   DELETE EXAM
   ========================================= */

function deleteExam(id) {

    data.exams =
        data.exams.filter(
            exam => exam.id !== id
        );


    saveData();

    renderAll();

}


/* =========================================
   FORMAT DATE
   ========================================= */

function formatDate(dateString) {

    if (!dateString) return "";


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   RENDER EXAMS
   ========================================= */

function renderExams() {

    const container =
        document.getElementById("examsList");

    const dashboard =
        document.getElementById("dashboardExams");


    if (!container) return;


    const sorted =
        [...data.exams].sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );


    if (sorted.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
                color:#64748b;
            ">
                📅 No exams added yet.
            </div>
        `;

    } else {

        container.innerHTML =
            sorted.map(exam => {

                return `

                    <div class="exam-card">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            gap:12px;
                        ">

                            <div>

                                <div style="
                                    font-size:16px;
                                    font-weight:700;
                                ">
                                    ${escapeHTML(exam.name)}
                                </div>

                                <div style="
                                    color:#94a3b8;
                                    font-size:12px;
                                    margin-top:4px;
                                ">
                                    ${escapeHTML(
                                        exam.subject || "General"
                                    )}
                                </div>

                            </div>

                            <button
                                onclick="deleteExam(${exam.id})"
                                style="
                                    background:rgba(239,68,68,.1);
                                    color:#f87171;
                                    box-shadow:none;
                                    padding:7px 9px;
                                "
                            >
                                Delete
                            </button>

                        </div>

                        <div style="
                            display:flex;
                            gap:15px;
                            flex-wrap:wrap;
                            margin-top:13px;
                            color:#cbd5e1;
                            font-size:12px;
                        ">

                            <span>
                                📅 ${formatDate(exam.date)}
                            </span>

                            ${
                                exam.time
                                ? `<span>⏰ ${escapeHTML(exam.time)}</span>`
                                : ""
                            }

                        </div>

                    </div>

                `;

            }).join("");

    }


    if (dashboard) {

        const upcoming =
            sorted.slice(0, 3);


        if (upcoming.length === 0) {

            dashboard.innerHTML = `
                <div style="
                    text-align:center;
                    padding:25px 10px;
                    color:#64748b;
                ">
                    No upcoming exams.
                </div>
            `;

        } else {

            dashboard.innerHTML =
                upcoming.map(exam => {

                    return `

                        <div class="exam-card">

                            <div style="
                                font-weight:700;
                            ">
                                ${escapeHTML(exam.name)}
                            </div>

                            <div style="
                                color:#94a3b8;
                                font-size:12px;
                                margin-top:5px;
                            ">
                                📅 ${formatDate(exam.date)}
                            </div>

                        </div>

                    `;

                }).join("");

        }

    }

}


/* =========================================
   SUBJECTS
   ========================================= */

const subjectForm =
    document.getElementById("subjectForm");


if (subjectForm) {

    subjectForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById("subjectInput");


            const name =
                input.value.trim();


            if (!name) return;


            data.subjects.push({

                id: Date.now(),

                name: name

            });


            saveData();

            input.value = "";

            renderAll();

        }
    );

}


/* =========================================
   DELETE SUBJECT
   ========================================= */

function deleteSubject(id) {

    data.subjects =
        data.subjects.filter(
            subject =>
                subject.id !== id
        );


    saveData();

    renderAll();

}


/* =========================================
   RENDER SUBJECTS
   ========================================= */

function renderSubjects() {

    const container =
        document.getElementById("subjectsList");


    if (!container) return;


    if (data.subjects.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:30px;
                color:#64748b;
            ">
                📚 No subjects added yet.
            </div>
        `;

        return;

    }


    container.innerHTML =
        data.subjects.map(
            (subject, index) => {

                const percentage =
                    35 + ((index * 17) % 60);


                return `

                    <div class="card" style="
                        padding:18px;
                        background:rgba(15,23,42,.6);
                    ">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                        ">

                            <div style="
                                font-weight:700;
                            ">
                                📚 ${escapeHTML(subject.name)}
                            </div>

                            <button
                                onclick="deleteSubject(${subject.id})"
                                style="
 