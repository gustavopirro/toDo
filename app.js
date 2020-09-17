let allTasks = [];
let taskId = 0;

let createTask = () => {
    if (isFieldEmpty('taskInput')) {
        let task = {
            Id: taskId,
            taskValue: document.getElementById('taskInput').value,
        }

        allTasks.push(task);
        taskId++;
        updateInterface(allTasks)

    } else {
        alert('Please add task in the input field');
    }
}

let updateTask = (taskId) => {
       document.getElementById(taskId).innerHTML = 
        `<input type="text" id="taskUpdate" placeholder="${allTasks[taskId].taskValue}">
        <button onclick="confirmTaskEdit(allTasks,${taskId})"><span class="material-icons">done</span></button>`;

}

let confirmTaskEdit = (array,taskId) =>{
    if(isFieldEmpty('taskUpdate')){
        array[taskId].taskValue = document.getElementById('taskUpdate').value;
    }
    updateInterface(allTasks)
}

let deleteTask = (taskId) => {
    allTasks.splice(taskId, 1);
    updateInterface(allTasks);
    console.log(allTasks)
}

let isFieldEmpty = (fieldId) => {
    let content = document.getElementById(fieldId).value;
    if (!content) {
        return false;
    }
    return true;
}

let createButtons = (taskId) => {
    let editButton = `<button class="button" onclick="updateTask(${taskId})"><span class="material-icons md-18">
    edit
    </span></button>`;
    let deleteButton = `<button class="button" onclick="deleteTask(${taskId})"><span class="material-icons md-18">
    clear</span></button>`;
    return { editButton, deleteButton };
}

let checkIfExists = (id, array) => {
    if (id === array[id].Id) {
        return true;
    } else {
        console.log('The id does not exists')
    };
}

let updateInterface = (taskArray) => {
    let toDo = document.getElementById('toDo');
    removeAllChildNodes(toDo);
    for (id = 0; id < taskArray.length; id++) {
        let listItem = document.createElement('LI');
        listItem.classList.add('listStyleRemover','flexButtons', 'underline')
        listItem.innerHTML = `<p class="toDoItem">${taskArray[id].taskValue}</p><div class="buttons">${createButtons(id).editButton}${createButtons(id).deleteButton}</div>`
        listItem.id = id;
        toDo.appendChild(listItem);
    }

}

let removeAllChildNodes = (parentNode) => {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}



