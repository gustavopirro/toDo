class App {
    constructor () {
        this.taskManager = new TaskManager();
        //this.taskId = 0;
    }

    createTask () {
        if (!this.isFieldEmpty(`taskInput`)) {
            const content = document.getElementById(`taskInput`).value
            let task = new Task(content);
            this.taskManager.addTask(task);
            this.updateInterface();
        } else {
            alert(`Please add task in the input field`);
        }
    }

    editTask (taskId) {
        const task = this.taskManager.getTask(taskId)

        let input = document.createElement(`input`);
        input.id = `taskUpdate`;
        input.placeholder = task.content;

        
        let confirmEditButton = document.createElement(`button`);
        confirmEditButton.onclick = function () {
            this.submitTaskEdit(taskId); // are we really supposed to pass the taskManager around like this?
        };

        let doneIcon = document.createElement(`span`);
        doneIcon.classList.add(`material-icons`,`md-18`);
        doneIcon.textContent = `done`;

        let taskElement = document.getElementById(taskId);
        
        this.removeAllChildNodes(taskElement);

        taskElement.appendChild(input);
        const doneButton = this.createButtons(taskId, `done`, _ => {this.submitTaskEdit(taskId)});
        taskElement.appendChild(doneButton);

    }

    submitTaskEdit (taskId) {
        if (!this.isFieldEmpty('taskUpdate')) {
            this.taskManager.getTask(taskId).content = document.getElementById(`taskUpdate`).value;
        }
        this.updateInterface()
    }

    deleteTask (taskId) {
        this.taskManager.deleteTask(taskId);
        this.updateInterface(); // does not belong here
    }

    isFieldEmpty (fieldId) {
        let content = document.getElementById(fieldId).value;
        return !content;
    }

    createButtons (taskId, buttonName, onClickFunction) {

        let button = document.createElement(`button`);
        button.id = taskId;
        button.classList.add(`button`);
        button.onclick = onClickFunction;
        let spanIcon = document.createElement(`span`);
        spanIcon.classList.add(`material-icons`, `md-18`);
        let nodeIcon = document.createTextNode(buttonName)
        spanIcon.appendChild(nodeIcon);
        button.appendChild(spanIcon);

        return button;
    }

    updateInterface () {
        let toDo = document.getElementById(`toDo`);
        this.removeAllChildNodes(toDo);
        for (let id = 0; id < this.taskManager.tasks.length; ++id) {
            let listItem = document.createElement(`LI`);
            listItem.id = id;
            listItem.classList.add(`listStyleRemover`, `flexButtons`)

            let p = document.createElement(`p`)
            p.classList.add(`toDoItem`);
            p.textContent = this.taskManager.getTask(id).content
            

            let div = document.createElement(`div`)
            div.classList.add(`buttons`)

            const editButton = this.createButtons(id, `edit`, _ => {this.editTask(id)}),
                deleteButton = this.createButtons(id, `delete`, _ => {this.deleteTask(id)})

            listItem.appendChild(p);
            div.appendChild(editButton);
            div.appendChild(deleteButton);
            listItem.appendChild(div);
            toDo.appendChild(listItem);
        }
    }

    removeAllChildNodes (parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild)
        }
    }
}