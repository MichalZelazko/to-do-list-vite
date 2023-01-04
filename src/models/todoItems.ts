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
