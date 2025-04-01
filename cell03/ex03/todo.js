document.getElementById('new').onclick = () => {
    let msg = prompt("Enter your task:");
    if (msg) {
        createTask(msg);
        saveTasks();
    }
};


function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)};path=/`;
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    console.log(cookies);
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

function saveTasks() {
    let tasks = [];
    let taskElements = document.querySelectorAll(".task");
    for (let i = taskElements.length - 1; i >= 0; i--) {
        tasks.push(taskElements[i].textContent);
    }
    setCookie("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = getCookie("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        for (let i = 0; i < tasks.length; i++) {
            createTask(tasks[i]);
        }
    }
}

function createTask(text) {
    let div = document.createElement("div");
    div.className = "task";
    div.textContent = text;

    div.style.backgroundColor = 'lightgray';
    div.style.textAlign = "center";
    div.style.padding = "20px";
    div.style.margin = "10px";

    div.onclick = () => {
        if (confirm("Delete this task?")) {
            div.remove();
            saveTasks();
        }
    };
    document.getElementById("ft_list").prepend(div);
}

window.onload = loadTasks;