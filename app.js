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

let editTask = (taskId) => {

            let input = document.createElement('input');
            input.id = 'taskUpdate';
            input.placeholder = allTasks[taskId].taskValue;

            
            let confirmEditButton = document.createElement('button');
            confirmEditButton.onclick = function(){confirmTaskEdit(allTasks,taskId);};

            let doneIcon = document.createElement('span');
            doneIcon.classList.add('material-icons','md-18');
            doneIcon.textContent = 'done';
            

            let task = document.getElementById(taskId);
            
            removeAllChildNodes(task);

            task.appendChild(input)
            task.appendChild(createButtons(taskId, 'done', function(){confirmTaskEdit(allTasks,taskId)}).button);
            
}

let confirmTaskEdit = (array, taskId) => {
    if (isFieldEmpty('taskUpdate')) {
        array[taskId].taskValue = document.getElementById('taskUpdate').value;
    }
    updateInterface(allTasks)
}

let deleteTask = (taskId) => {
    allTasks.splice(taskId, 1);
    updateInterface(allTasks);
}

let isFieldEmpty = (fieldId) => {
    let content = document.getElementById(fieldId).value;
    if (!content) {
        return false;
    }
    return true;
}

let createButtons = (taskId, buttonName, onClickFunction) => {

        let button = document.createElement('button');
        button.id = taskId;
        button.classList.add('button');
        button.onclick = onClickFunction;
        let spanIcon = document.createElement('span');
        spanIcon.classList.add('material-icons', 'md-18');
        let nodeIcon = document.createTextNode(buttonName)
        spanIcon.appendChild(nodeIcon);
        button.appendChild(spanIcon);

    return { button: button};
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
    for (let id = 0; id < taskArray.length; id++) {
        let listItem = document.createElement('LI');
        listItem.id = id;
        listItem.classList.add('listStyleRemover', 'flexButtons')

        let p = document.createElement('p')
        p.classList.add('toDoItem');
        p.textContent = taskArray[id].taskValue
        

        let div = document.createElement('div')
        div.classList.add('buttons')

        listItem.appendChild(p)
        div.appendChild(createButtons(id,'edit', function(){editTask(id)}).button);
        div.appendChild(createButtons(id, 'delete',function(){deleteTask(id)}).button);
        listItem.appendChild(div);
        toDo.appendChild(listItem);
    }
}

let removeAllChildNodes = (parentNode) => {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}



