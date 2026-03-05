let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function taskAction(action, index = null){

    switch(action){

        case "add":
            let text = document.getElementById("taskInput").value;
            let date = document.getElementById("taskDate").value;
            let time = document.getElementById("taskTime").value;

            if(text === "") return;

            tasks.push({
                text: text,
                date: date,
                time: time,
                done: false
            });

            clearInputs();
            break;


        case "toggle":
            tasks[index].done = !tasks[index].done;
            break;


        case "delete":
            tasks.splice(index,1);
            break;


        case "edit":
            let task = tasks[index];

            document.getElementById("taskInput").value = task.text;
            document.getElementById("taskDate").value = task.date;
            document.getElementById("taskTime").value = task.time;

            editIndex = index;
            document.getElementById("updateBtn").style.display = "block";
            return;


        case "update":
            let newText = document.getElementById("taskInput").value;
            let newDate = document.getElementById("taskDate").value;
            let newTime = document.getElementById("taskTime").value;

            tasks[editIndex] = {
                text: newText,
                date: newDate,
                time: newTime,
                done: false
            };

            document.getElementById("updateBtn").style.display = "none";
            clearInputs();
            break;

    }

    saveTasks();
    displayTasks();
}

function displayTasks(){

    let list = document.getElementById("taskList");
    list.innerHTML="";

    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        if(task.done) li.classList.add("completed");

        li.innerHTML = `
        <b>${task.text}</b><br>
        <small>${task.date} ${task.time}</small>

        <div class="actions">
            <button class="done" onclick="taskAction('toggle',${index})">Done</button>
            <button class="edit" onclick="taskAction('edit',${index})">Edit</button>
            <button class="delete" onclick="taskAction('delete',${index})">Delete</button>
        </div>
        `;

        list.appendChild(li);
    });
}

function clearInputs(){
    document.getElementById("taskInput").value="";
    document.getElementById("taskDate").value="";
    document.getElementById("taskTime").value="";
}

displayTasks();