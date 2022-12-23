const BIN_ID = "63a33cde01a72b59f23649bc" as const;
const X_ACCESS_KEY =
  "$2b$10$NCZOay8d2osjOwm1YCOPuORo2h/gSRzM.KhsRRpYlcArnA4/yPUaK" as const;

interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}

export const fetchUsers = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
    },
  }).then(async (res) => await res.json());
  console.log(response.record);
  return response.record as User[];
};

export const updateUsers = async (users: User[]) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  }).then(async (res) => await res.json());
  console.log(response.record);
};
