import "./style.css";
import { fetchTasks, updateTasks, createNewTask } from "./models/todoItems";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <p>
      <label for="new-task">Add Item</label>
      <input id="new-task" type="text" /><button id="add-button">Add</button>
    </p>
      
    <h3>Todo</h3>
    <ul id="incomplete-tasks"></ul>
      
    <h3>Completed</h3>
    <ul id="completed-tasks"></ul>
  </div>
`;

const todoItems = await fetchTasks();

const addTaskButton = document.getElementById("add-button");

if (addTaskButton) {
  addTaskButton.addEventListener("click", () => {
    console.log("event listener");
    const input = document.querySelector<HTMLInputElement>("#new-task");
    if (input) {
      const newTaskName = input.value;
      addNewTask(newTaskName);
    }
  });
}

const renderTasks = () => {
  todoItems.forEach((task) => {
    createNewTask(task.name);
  });
};

renderTasks();

const addNewTask = async (newTaskName: string) => {
  if (!todoItems.some((task) => task.name === newTaskName))
    await updateTasks([
      ...todoItems,
      {
        name: newTaskName,
        isCompleted: false,
      },
    ]);
  fetchTasks();
};
