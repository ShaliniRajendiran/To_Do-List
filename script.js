document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task;
            listItem.appendChild(taskSpan);

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => editTask(index));
            listItem.appendChild(editBtn);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            listItem.appendChild(deleteBtn);

            todoList.appendChild(listItem);
        });
    }

    // Add new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            todoInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Edit task
    function editTask(index) {
        const newTask = prompt('Edit your task:', tasks[index]);
        if (newTask !== null) {
            tasks[index] = newTask.trim();
            saveTasks();
            renderTasks();
        }
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
