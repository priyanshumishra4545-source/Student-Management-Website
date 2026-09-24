// ========================================
// STUDENT DATA
// ========================================

let students = JSON.parse(localStorage.getItem("students")) || [];


// ========================================
// ELEMENTS
// ========================================

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");


// ========================================
// SAVE DATA
// ========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// ========================================
// ADD STUDENT
// ========================================

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const roll =
        document.getElementById("roll").value.trim();

    const marks =
        Number(document.getElementById("marks").value);


    // Check duplicate roll number

    const existingStudent = students.find(function(student) {

        return student.roll === roll;

    });


    if (existingStudent) {

        alert("This Roll Number already exists!");

        return;
    }


    const student = {

        name: name,
        roll: roll,
        marks: marks

    };


    students.push(student);

    saveStudents();

    displayStudents(students);

    studentForm.reset();
});


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(list) {

    studentTable.innerHTML = "";


    if (list.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="6">
                    No student records found.
                </td>
            </tr>
        `;

    }


    list.forEach(function(student) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>${student.marks}</td>

            <td>${getGrade(student.marks)}</td>

            <td>${getResult(student.marks)}</td>

            <td>

                <button onclick="editStudent('${student.roll}')">
                    Edit
                </button>

                <button
                    onclick="deleteStudent('${student.roll}')"
                    class="danger">
                    Delete
                </button>

            </td>

        `;


        studentTable.appendChild(row);

    });


    totalStudents.textContent =
        "Total Students: " + students.length;


    updateDashboard();
}


// ========================================
// GRADE
// ========================================

function getGrade(marks) {

    if (marks >= 90) {

        return "A+";

    }
    else if (marks >= 80) {

        return "A";

    }
    else if (marks >= 70) {

        return "B";

    }
    else if (marks >= 60) {

        return "C";

    }
    else if (marks >= 50) {

        return "D";

    }
    else {

        return "F";

    }
}


// ========================================
// PASS / FAIL
// ========================================

function getResult(marks) {

    if (marks >= 40) {

        return "Pass";

    }
    else {

        return "Fail";

    }
}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(roll) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");


    if (!confirmDelete) {

        return;

    }


    students = students.filter(function(student) {

        return student.roll !== roll;

    });


    saveStudents();

    displayStudents(students);
}


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(roll) {

    const student = students.find(function(student) {

        return student.roll === roll;

    });


    if (!student) {

        return;

    }


    const newName =
        prompt("Enter Student Name:", student.name);


    if (newName === null) {

        return;

    }


    const newMarks =
        prompt("Enter Marks:", student.marks);


    if (newMarks === null) {

        return;

    }


    const marks = Number(newMarks);


    if (marks < 0 || marks > 100 || isNaN(marks)) {

        alert("Please enter marks between 0 and 100.");

        return;

    }


    student.name = newName.trim();

    student.marks = marks;


    saveStudents();

    displayStudents(students);
}


// ========================================
// SEARCH STUDENT
// ========================================

function searchStudent() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const result = students.filter(function(student) {

        return student.name
            .toLowerCase()
            .includes(searchValue)

            ||

            student.roll
            .includes(searchValue);

    });


    displayStudents(result);
}


// ========================================
// SHOW ALL
// ========================================

function showAllStudents() {

    document.getElementById("searchInput").value = "";

    displayStudents(students);
}


// ========================================
// HIGHEST MARKS
// ========================================

function highestMarks() {

    if (students.length === 0) {

        alert("No students available!");

        return;

    }


    let highest = students[0];


    for (let i = 1; i < students.length; i++) {

        if (students[i].marks > highest.marks) {

            highest = students[i];

        }

    }


    alert(

        "Highest Marks\n\n" +

        "Name: " + highest.name +

        "\nRoll No: " + highest.roll +

        "\nMarks: " + highest.marks +

        "\nGrade: " + getGrade(highest.marks)

    );
}


// ========================================
// LOWEST MARKS
// ========================================

function lowestMarks() {

    if (students.length === 0) {

        alert("No students available!");

        return;

    }


    let lowest = students[0];


    for (let i = 1; i < students.length; i++) {

        if (students[i].marks < lowest.marks) {

            lowest = students[i];

        }

    }


    alert(

        "Lowest Marks\n\n" +

        "Name: " + lowest.name +

        "\nRoll No: " + lowest.roll +

        "\nMarks: " + lowest.marks +

        "\nGrade: " + getGrade(lowest.marks)

    );
}


// ========================================
// AVERAGE MARKS
// ========================================

function averageMarks() {

    if (students.length === 0) {

        alert("No students available!");

        return;

    }


    let sum = 0;


    for (let i = 0; i < students.length; i++) {

        sum =
            sum + students[i].marks;

    }


    const average =
        sum / students.length;


    alert(
        "Average Marks: " +
        average.toFixed(2)
    );
}


// ========================================
// BUBBLE SORT
// ========================================

function sortStudents() {

    for (
        let i = 0;
        i < students.length - 1;
        i++
    ) {

        for (
            let j = 0;
            j < students.length - i - 1;
            j++
        ) {

            if (
                students[j].marks <
                students[j + 1].marks
            ) {

                let temp =
                    students[j];

                students[j] =
                    students[j + 1];

                students[j + 1] =
                    temp;

            }

        }

    }


    saveStudents();

    displayStudents(students);
}


// ========================================
// CLEAR ALL STUDENTS
// ========================================

function clearAllStudents() {

    if (students.length === 0) {

        alert("No student records available.");

        return;

    }


    const confirmClear =
        confirm(
            "Are you sure you want to delete ALL student records?"
        );


    if (!confirmClear) {

        return;

    }


    students = [];

    saveStudents();

    displayStudents(students);
}


// ========================================
// DASHBOARD
// ========================================

function updateDashboard() {

    const total =
        students.length;


    let sum = 0;

    let highest = 0;

    let passed = 0;

    let failed = 0;


    for (
        let i = 0;
        i < students.length;
        i++
    ) {

        sum =
            sum + students[i].marks;


        if (
            students[i].marks >
            highest
        ) {

            highest =
                students[i].marks;

        }


        if (
            students[i].marks >= 40
        ) {

            passed++;

        }
        else {

            failed++;

        }

    }


    let average = 0;


    if (total > 0) {

        average =
            sum / total;

    }


    document.getElementById(
        "dashboardTotal"
    ).textContent = total;


    document.getElementById(
        "dashboardAverage"
    ).textContent =
        average.toFixed(2);


    document.getElementById(
        "dashboardHighest"
    ).textContent = highest;


    document.getElementById(
        "dashboardPassed"
    ).textContent = passed;


    document.getElementById(
        "dashboardFailed"
    ).textContent = failed;
}


// ========================================
// LOAD DATA WHEN WEBSITE OPENS
// ========================================

displayStudents(students);