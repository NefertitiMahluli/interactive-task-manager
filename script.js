"use strict";
/*    TaskAway Task Manager - Final Project
      WEB115 - Web Markup and Scripting
      Author: Nefertiti Mahluli-Forde
      Date:   Apr 27 2026
*/

// Keeps track of the next task ID
let idCounter = 1;

// Stores all tasks
let tasks = [];

// Gets the task form
const taskForm = document.getElementById('taskform');

// Handles form submission
taskForm.addEventListener('submit', function(event) {
    // Stops the page from refreshing when the form is submitted
    event.preventDefault();

    // Gets the current input values
    const taskName = document.getElementById('taskname').value;
    const taskPriority = document.getElementById('taskpriority').value;
    const isImportant = document.getElementById('taskimportant').checked;

    // Creates a new task object
    const newTask = {
        id: idCounter++, // Uses the current ID, then increases it by 1
        name: taskName,
        priority: taskPriority,
        isImportant: isImportant,
        isCompleted: false, // New tasks start as incomplete
        date: new Date().toLocaleDateString() // Saves today's date
    };

    // Adds the new task to the 'tasks' array
    tasks.push(newTask);

    // Logs the tasks as a JSON string
    console.log(JSON.stringify(tasks, null, 4));

    // Resets the form fields
    taskForm.reset();

    // displayTasks function Displays tasks on the page
    displayTasks();
});

    // Displays all tasks on the page
    function displayTasks() {
    // Gets the task list container
    const taskManager = document.getElementById('taskmanager');

    // Stores the HTML for all task cards
    let htmlContent = '';

    // Loops through each task
    tasks.forEach(function(task) {

        // Checks the box if the task is completed
        let checkedAttribute = '';
        if (task.isCompleted === true) {
            checkedAttribute = 'checked';
        }

        // Builds the HTML for one task card
        htmlContent += `
            <div class="taskcard" id="task${task.id}">
                <div class="taskdetails">
                    <h3>${task.name}</h3>
                    <p><strong>Priority:</strong> <span id="priority${task.id}">${task.priority}</span></p>
                    <p><strong>Added:</strong> ${task.date}</p>
                </div>
                <div class="taskactions">
                    <label>
                        <input type="checkbox" onchange="toggleComplete(${task.id})" ${checkedAttribute}> Completed
                    </label>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
    });

    // Adds the task cards to the page
    taskManager.innerHTML = htmlContent;

    // Applies styles to important and completed tasks
    tasks.forEach(function(task) {
        // Gets the current task card
        const taskCard = document.getElementById(`task${task.id}`);

        // Gets the task title and details
        const taskTitle = taskCard.querySelector('h3');
        const taskDetails = taskCard.querySelectorAll('p');
        const priorityText = document.getElementById(`priority${task.id}`);

        // Highlights important tasks in red
        if (task.isImportant === true) {
            taskCard.style.backgroundColor = '#fff5f5';
            taskCard.style.borderLeft = '5px solid #fc8181';
        }

        // Adds a strikethrough to completed tasks
        if (task.isCompleted === true) {
            taskTitle.style.textDecoration = 'line-through';
            taskTitle.style.color = '#a0aec0';

            taskDetails.forEach(function(detail) {
                detail.style.textDecoration = 'line-through';
                detail.style.color = '#a0aec0';
            });
        }

        // Changes the priority color
        if (task.priority === 'High') {
          priorityText.style.color = '#e58c8c';
          priorityText.style.fontWeight = '600';
        } else if (task.priority === 'Medium') {
          priorityText.style.color = '#d9b86a';
          priorityText.style.fontWeight = '600';
        } else if (task.priority === 'Low') {
          priorityText.style.color = '#7fbf9f';
          priorityText.style.fontWeight = '600';
      }

    });
}

// Deletes a task from the array
function deleteTask(id) {
    // Keeps only the tasks that do not match the selected ID
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    // Logs the tasks as a JSON string
    console.log(JSON.stringify(tasks, null, 4));

    // Displays the updated list of tasks on the page 
    displayTasks();
}

// Toggles a task's completed status (complete or incomplete)
function toggleComplete(id) {
    // Loops through each task
    tasks.forEach(function(task) {
        // Finds the matching task
        if (task.id === id) {
            // Switches the completed value
            task.isCompleted = !task.isCompleted;
        }
    });

    // Logs the list of updated tasks as a JSON string
    console.log(JSON.stringify(tasks, null, 4));

    // Displays the updated list of tasks on the page
    displayTasks();
}
