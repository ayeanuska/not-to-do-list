// const taskList = [];
// const addTask = () => {
//   // console.log("ADD TASK CALLED");

//   let taskField = document.getElementById("task");
//   let hourField = document.getElementById("hour");
//   // console.log(taskField.value);
//   // console.log(taskHour.value);

//   if (taskField.value != "" && hourField.value != "") {
//     const taskObject = {
//       task: taskField.value,
//       hour: hourField.value,
//     };
//     taskList.push(taskObject);
//   } else {
//     alert("please enter task or hour!!");
//   }
//   console.log(taskList);
// };

// generate unique string
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
    id: randomIdGenerator(),
    task: "GOOD TASK",
    hour: 20,
    type: "entry",
  },
  {
    id: randomIdGenerator(),
    task: "BAD TASK",
    hour: 20,
    type: "bad",
  },
];
// INPUT TASK AND HOUR
// ADD the TASK to task list
const addTask = () => {
  console.log("ADD TASK CALLED");

  const taskField = document.getElementById("task");
  const hourField = document.getElementById("hour");

  if (taskField.value != "" && hourField.value != "") {
    const taskObject = {
      id: randomIdGenerator(),
      task: taskField.value,
      hour: hourField.value,
      type: "entry",
    };

    taskList.push(taskObject);
    displayTask();
  } else {
    alert("Please enter task or hour!!");
  }

  console.log(taskList);
};

// displaying entry list and bad list
const displayTask = () => {
  const goodListElement = document.getElementById("entry-list");
  const badListElement = document.getElementById("bad-list");

  goodListElement.innerHTML = "";
  badListElement.innerHTML = "";

  taskList.map((item, index) => {
    let goodTrValue = "";
    let badTrValue = "";
    if (item.type == "entry") {
      goodTrValue = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td class="text-end ">
                       <button class="btn btn-danger me-1" onclick="deleteTask('${
                         item.id
                       }')"> <i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-success" onclick="convertTask('${
                          item.id
                        }')"><i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </td>
                </tr>
        `;
    } else {
      badTrValue = `
        <tr>
         <td>${index + 1}</td>
         <td>${item.task}</td>
         <td>${item.hour}</td>
            <td class="text-end "> <button class="btn btn-warning" onclick="convertTask('${
              item.id
            }')"><i class="fa-solid fa-arrow-left"></i></button>
                <button class="btn btn-danger ms-1" onclick="deleteTask('${
                  item.id
                }')"><i
                    class="fa-solid fa-trash"></i>
                 </button>
            </td>
        </tr>`;
    }
    goodListElement.innerHTML = goodListElement.innerHTML + goodTrValue;
    badListElement.innerHTML = badListElement.innerHTML + badTrValue;
  });
};

// change type from entry -> bad or bad -> entry
const convertTask = (id) => {
  console.log("TASK CONVERTED");

  let task = taskList.find((task) => task.id == id);

  task.type = task.type == "entry" ? "bad" : "entry";

  displayTask();
};

// Delete a task
const deleteTask = (id) => {
  console.log("ID TO DELETE:, id");
  taskList = taskList.filter((task) => task.id !== id);

  displayTask();
};

// Initial display of tasks

displayTask();
