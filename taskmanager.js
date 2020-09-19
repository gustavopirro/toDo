class TaskManager {
	constructor () {
		this.tasks = []
		this._nextTaskId = 0
	}
	addTask (...tasks) {
		this.tasks = [...this.tasks, ...tasks]
		for (const task of tasks) {
			task.id = this._nextTaskId++;
		}
	}
	getTask (id) {
		return this.tasks[id]
	}
	containsTask (id) {
		return this.tasks[id].id === id
	}
	deleteTask (id) {
		this.tasks.splice(id, 1);
	}
	forEachTask (callback) {
		for (const task of tasks) {
			callback(task)
		}
	}
}