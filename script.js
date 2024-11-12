const WEEKLY_ALLOCATION = 24 * 7;

const randomIdGenerator = () => {
  let randomStringLength = 10;
  let randomString = "";
  let alphabetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < randomStringLength; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetString.length);
    randomString += alphabetString[randomIndex];
  }
  return randomString;
};

let taskList = [
  {
    id: "OQaCmVDVB3",
    task: "task1",
    hour: 10,
    type: "entry",
  },
  {
    id: "29JR1fr3iX",
    task: "task2",
    hour: 20,
    type: "entry",
  },
  {
    id: "d1mQJzpGgE",
    task: "task3",
    hour: 30,
    type: "entry",
  },
];

// Add a task to the list
const addTask = () => {
  console.log("ADD TASK CALLED");

  const taskField = document.getElementById("task");
  const hourField = document.getElementById("hour");

  if (taskField.value !== "" && hourField.value !== "") {
    const taskObject = {
      id: randomIdGenerator(),
      task: taskField.value,
      hour: parseInt(hourField.value),
      type: "entry",
    };

    if (taskObject.hour + calculateTotalhour() <= WEEKLY_ALLOCATION) {
      taskList.push(taskObject);
      displayTask();
      const toastLiveExample = document.getElementById("liveToast");
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    } else {
      alert("TASK HOUR ALLOCATION EXCEEDED");
    }
  } else {
    alert("Please enter task or hour!");
  }

  console.log(taskList);
};

// Display the task lists
const displayTask = () => {
  const goodListElement = document.getElementById("entry-list");
  const badListElement = document.getElementById("bad-list");

  goodListElement.innerHTML = "";
  badListElement.innerHTML = "";

  taskList.forEach((item, index) => {
    let goodTrValue = "";
    let badTrValue = "";

    if (item.type === "entry") {
      goodTrValue = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.task}</td>
          <td>${item.hour}</td>
          <td class="text-end">
            <button class="btn btn-danger me-1" onclick="deleteTask('${
              item.id
            }')">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-success" onclick="convertTask('${item.id}')">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </td>
        </tr>`;
    } else {
      badTrValue = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.task}</td>
          <td>${item.hour}</td>
          <td class="text-end">
            <button class="btn btn-warning" onclick="convertTask('${item.id}')">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="btn btn-danger ms-1" onclick="deleteTask('${
              item.id
            }')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>`;
    }

    goodListElement.innerHTML += goodTrValue;
    badListElement.innerHTML += badTrValue;
  });

  // Update total and bad hours dynamically
  const totalHourSpan = document.getElementById("totalHours");
  totalHourSpan.innerText = calculateTotalhour();

  const badHourSpan = document.getElementById("badHour");
  badHourSpan.innerText = calculateBadHours();
};

// Change task type between entry and bad
const convertTask = (id) => {
  console.log("TASK CONVERTED");
  const task = taskList.find((task) => task.id === id);
  task.type = task.type === "entry" ? "bad" : "entry";
  displayTask();
};

// Delete a task
const deleteTask = (id) => {
  console.log("ID TO DELETE:", id);

  if (confirm("Deleting Task...\n Are you sure?")) {
    taskList = taskList.filter((task) => task.id !== id);
    displayTask();
  }
};

// Calculate total hours of all tasks
const calculateTotalhour = () => {
  return taskList.reduce((acc, item) => acc + item.hour, 0);
};

// Calculate total hours of "bad" tasks
const calculateBadHours = () => {
  return taskList.reduce((acc, item) => {
    return acc + (item.type === "bad" ? item.hour : 0);
  }, 0);
};

// Initial display of tasks
displayTask();
