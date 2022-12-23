import "./style.css";
import { fetchTasks, updateTasks } from "./models/todoItems";

const todoItems = await fetchTasks();
const addNewTask = async (newTaskName: string) => {
  if (!todoItems.some((task) => task.name === newTaskName))
    await updateTasks([
      ...todoItems,
      {
        name: newTaskName,
        isCompleted: false,
      },
    ]);
};

const renderTasks = () => {
  const incompleteTasks =
    document.querySelector<HTMLUListElement>("#incomplete-tasks");
  todoItems.forEach((task) => {});
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
      <p>
        <label for="new-task">Add Item</label
        ><input id="new-task" type="text" /><button id="add-button">Add</button>
      </p>

      <h3>Todo</h3>
      <ul id="incomplete-tasks"></ul>

      <h3>Completed</h3>
      <ul id="completed-tasks"></ul>
    </div>
`;
