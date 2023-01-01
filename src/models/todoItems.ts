const BIN_ID = "63a345d415ab31599e220246" as const;
const X_ACCESS_KEY =
  "$2b$10$NCZOay8d2osjOwm1YCOPuORo2h/gSRzM.KhsRRpYlcArnA4/yPUaK" as const;

interface toDoItem {
  name: string;
  isCompleted: boolean;
}

export const fetchTasks = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
    },
  }).then(async (res) => await res.json());
  console.log(response.record);
  return response.record as toDoItem[];
};

export const updateTasks = async (toDoItems: toDoItem[]) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDoItems),
  }).then(async (res) => await res.json());
  console.log(response.record);
};

const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

const editButton = document.createElement("button");
editButton.classList.add("edit");
editButton.innerText = "Edit";

export const createNewTask = (newTaskName: string) => {
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
        } else {
          const toRemove = listItem.querySelector(".edit");
          if (toRemove) toRemove.remove();
          if (completedTasks) completedTasks.appendChild(listItem);
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
    });
  }

  newElement.appendChild(checkbox);
  newElement.appendChild(label);
  newElement.appendChild(text);
  newElement.appendChild(editButton);
  newElement.appendChild(deleteButton);

  //console.log(newElement);
  if (incompleteTasks) incompleteTasks.appendChild(newElement);
};
