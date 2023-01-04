import "./style.css";
import { fetchTasks, updateTasks } from "./models/todoItems";

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

const addNewTask = async (newTaskName: string) => {
  if (!todoItems.some((task) => task.name === newTaskName)) {
    await updateTasks([
      ...todoItems,
      {
        name: newTaskName,
        isCompleted: false,
      },
    ]);
    renderTasks();
    // fix rendering of new task
  }
};

const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

const editButton = document.createElement("button");
editButton.classList.add("edit");
editButton.innerText = "Edit";

const createNewTask = (newTaskName: string) => {
  const newElement = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", () => {
    const listItem = checkbox.parentElement;
    if (listItem) {
      const list = listItem.parentElement;
      if (list) {
        const isIncompleted = list.id === "completed-tasks";
        if (isIncompleted) {
          listItem.appendChild(editButton);
          if (incompleteTasks) incompleteTasks.appendChild(listItem);
          // updateTasks() for new isCompleted value
        } else {
          const toRemove = listItem.querySelector(".edit");
          if (toRemove) toRemove.remove();
          if (completedTasks) completedTasks.appendChild(listItem);
          // updateTasks() for new isCompleted value
        }
      }
    }
  });

  const label = document.createElement("label");
  label.innerText = newTaskName;

  const text = document.createElement("input");
  text.setAttribute("type", "text");

  const editButton = document.createElement("button");
  if (editButton) {
    editButton.setAttribute("class", "edit");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      if (editButton.parentElement) {
        const label = editButton.parentElement.querySelector("label");
        const input = <HTMLInputElement>(
          editButton.parentElement.querySelector("input[type=text]")
        );
        if (label && input) {
          if (editButton.parentElement.classList.contains("editMode")) {
            editButton.parentElement.classList.remove("editMode");
            label.innerText = input.value;
            // updateTasks() for new name in bin
          } else {
            editButton.parentElement.classList.add("editMode");
            input.value = label.innerText;
          }
        }
      }
    });
  }

  const deleteButton = document.createElement("button");
  if (deleteButton) {
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      if (deleteButton.parentElement) deleteButton.parentElement.remove();
      if (todoItems.some((task) => task.name === newTaskName))
        updateTasks(todoItems.filter((task) => task.name !== newTaskName));
    });
  }

  newElement.appendChild(checkbox);
  newElement.appendChild(label);
  newElement.appendChild(text);
  newElement.appendChild(editButton);
  newElement.appendChild(deleteButton);

  if (incompleteTasks) incompleteTasks.appendChild(newElement);
};

const renderTasks = () => {
  if (incompleteTasks) incompleteTasks.innerHTML = "";
  if (completedTasks) completedTasks.innerHTML = "";
  todoItems.forEach((task) => {
    createNewTask(task.name);
  });
};

renderTasks();
