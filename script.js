const clc = document.querySelector("button");// add button
const ul = document.querySelector("ul");// todo-list
const inp = document.querySelector("input");// input field

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    ul.querySelectorAll("li").forEach(li => {
        tasks.push(li.firstChild.textContent); // only store the task text, not the delete button
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach(task => {
            const Item = document.createElement("li");
            Item.textContent = task;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                ul.removeChild(Item);
                saveTasks(); // Save after deleting
            };
            
            Item.appendChild(deleteButton);
            ul.appendChild(Item);
        });
    }
}

// Add new task to the list and save to local storage
function add() {
    const task = inp.value.trim();
    if (task !== "") {
        const Item = document.createElement("li");
        Item.textContent = task;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            ul.removeChild(Item);
            saveTasks(); // Save after deleting
        };
        
        Item.appendChild(deleteButton);
        ul.appendChild(Item);
        
        inp.value = "";
        saveTasks(); // Save after adding a new task
    }
}

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

clc.addEventListener("click", add);

inp.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        add();
    }
});