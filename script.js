var buttonAdicionar = document.querySelector('.button_add')
var InputTask = document.getElementById('task')
var ListComplet = document.querySelector('.list_tasks')

let ListTaks = []

buttonAdicionar.addEventListener('click', addTask)

InputTask.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        addTask()
    }
})

function addTask() {

    var valorInputTask = InputTask.value
    if (valorInputTask === "") {
        alert("Por favor adicione uma tarefa valida.")
    } else {
        ListTaks.push({
            task: valorInputTask,
            completed: false
        })
        InputTask.value = ''
        showTask()
    }

}

function showTask() {

    var newLi = ''

    ListTaks.forEach((Task, index) => {
        newLi = newLi + `
        <li class="task ${Task.completed && "done"}">
        <p>${Task.task}</p> 
        <div class="container_buttons">
            <span class="button_check" onclick ="TaskCompleted(${index})"><i class="bi bi-check"></i></span>
            <span class="button_delete" onclick ="DeleteTask(${index})"> <i class="bi bi-x"></i></span>
        </div>
    </li>
        
        `
    })

    ListComplet.innerHTML = newLi

    localStorage.setItem('ListTasklocalStorage', JSON.stringify(ListTaks))

}

function TaskCompleted(index) {

    ListTaks[index].completed = !ListTaks[index].completed

    showTask()
}


function DeleteTask(index) {

    ListTaks.splice(index, 1)
    showTask()
}


function ReloadTasks() {
    var TasksLocalStorage = localStorage.getItem('ListTasklocalStorage')

    if (TasksLocalStorage) {
        ListTaks = JSON.parse(TasksLocalStorage)
    }
    showTask()
}

ReloadTasks()


