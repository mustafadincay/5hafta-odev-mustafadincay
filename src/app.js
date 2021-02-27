import { doc } from 'prettier';
import { getDataFromApi, addTaskToApi, removeTaskToApi } from './data';

class PomodoroApp {
  constructor(options) {
    let { tableTbodySelector, taskFormSelector } = options;
    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('input');
    this.$addTaskButton = this.$taskForm.querySelector('button');
  }
  addTask(task) {
    this.$addTaskButton.textContent = 'ekleniyor';
    this.$addTaskButton.disabled = true;
    this.$taskFormInput.placeholder = 'ekleniyor';
    this.$taskFormInput.value = 'ekleniyor';
    this.$taskFormInput.disabled = true;
    addTaskToApi(task)
      .then((data) => data.json())
      .then((newTask) => {
        this.addTaskToTable(newTask);
        this.$addTaskButton.disabled = false;
        this.$addTaskButton.textContent = 'Add Task';
        this.$taskFormInput.disabled = false;
        this.$taskFormInput.placeholder = 'Task Title';
      });
  }

  deleteTask(id) {
    removeTaskToApi(id)
      .then((id) => id)
      .catch((err) => alert(err));
  }

  addTaskToTable(task, index) {
    const $newTaskEl = document.createElement('tr');
    $newTaskEl.id = `data-selectedTr-${index}`;
    $newTaskEl.innerHTML = `<th scope="row">${task.id}</th><td>${task.title}</td><td><button type="click" class="deleteBtn" id=data-selectedBtn-${index}"> <i class="fa fa-trash"></i></button></td></div>`;
    this.$tableTbody.appendChild($newTaskEl);
    this.$taskFormInput.value = '';
    const btnAtt = $newTaskEl.lastChild.firstChild;
    let removeBtn = btnAtt.addEventListener('click', (e) => {
      $newTaskEl.remove();
      this.deleteTask(task.id);
    });
    return {
      removeBtn,
    };
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = { title: this.$taskFormInput.value };
      this.addTask(task);
    });
  }

  handleRemoveTask() {
    let removeBtn = btnAtt.addEventListener('click', (e) => {
      $newTaskEl.remove();
      this.deleteTask(task);
      this.getDataFromApi();
    });
  }

  fillTasksTable() {
    getDataFromApi().then((currentTasks) => {
      currentTasks.forEach((task, index) => {
        this.addTaskToTable(task, index + 1);
      });
    });
  }

  init() {
    this.fillTasksTable();
    this.handleAddTask();
  }
}

export default PomodoroApp;
