const taskInput = document.getElementById("task-input")
const submitTask = document.getElementById("submit-task")
const taskListContainer = document.querySelector(".task-list-container")

submitTask.addEventListener("click", async () => {
  let task = {
    title: taskInput.value,
  }

  let res = await fetch("/api/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })

  let data = await res.json()
  console.log(data)
})

const showTasks = async () => {
  const res = await fetch("/api/v1/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()
  const tasks = await data.tasks

  const allTasks = tasks
    .map((task) => {
      const { _id, title, completed, created } = task

      return `
        <div class="task-item">
            <span class="task-complete-sign"
            >
                ${completed ? '<i class="far fa-check-circle"></i>' : ""}
            </span>
            <div class="">
                <p class="task-title">${title}</p>
                <p class="text-muted">Created: ${created}</p>
            </div>
            <div class="action-btns">
                <a class="btn-edit" href="#"><i class="fas fa-edit"></i></a>
                <a href="#" class="btn-delete"><i class="fas fa-trash"></i></a>
            </div>
        </div>
        `
    })
    .join("")
  taskListContainer.innerHTML = allTasks
}

showTasks()
