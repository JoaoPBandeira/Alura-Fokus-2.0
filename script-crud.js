const btnAddTask = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const contentTask = document.querySelector('.app__form-textarea')
const cancelBtTask = document.querySelector('.app__form-footer__button--cancel')
const switchTextTask = document.querySelector('.app_button-edit')
const ulTasks = document.querySelector(".app__section-task-list")

const btCLearCompleteTasks = document.querySelector("#btn-remover-concluidas")
const btClearAllTasks = document.querySelector("#btn-remover-todas")

let paragraphTaskInProgress = document.querySelector(".app__section-active-task-description")

let taskSelected = null
let liSelected = null


let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function insertTaskInLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTaskElement(task){
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const svg = document.createElement("svg")
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
             fill="#01080E"></path>
    </svg>`

    const paragraph = document.createElement("p")
    paragraph.textContent = task.description
    paragraph.classList.add("app__section-task-list-item-description")

    const button = document.createElement("button")
    button.classList.add("app_button-edit")

                //switch content of task
    button.addEventListener('click', () => {
        newContentTask = prompt("Digite a nova tarefa")

        if (newContentTask){
            paragraph.textContent = newContentTask
            task.description = newContentTask
            
            insertTaskInLocalStorage()
            
            alert("Tarefa atualizada com sucesso!!!")
        }    
    })

    const imageBt = document.createElement("img")
    imageBt.setAttribute("src","/imagens/edit.png")
    button.append(imageBt)
    
    li.append(svg)
    li.append(paragraph)
    li.append(button)

    li.onclick = () => {
                        //cleaning all tasks
        document.querySelectorAll(".app__section-task-list-item")
            .forEach(element => {
                element.classList.remove("app__section-task-list-item-active")
            });
        
                        //double click check
        if(liSelected == li){
            liSelected.classList.remove("app__section-task-list-item-active")
            paragraphTaskInProgress.textContent = ''

            return
        }
                        // add active class
        taskSelected = task
        liSelected = li

        liSelected.classList.add("app__section-task-list-item-active")
        paragraphTaskInProgress.textContent = task.description
        
    }
    if(task.status == "complete"){
        li.classList.add("app__section-task-list-item-complete")
        button.disabled = "true"
        li.onclick = ""}

    return li
}

function insertTaksElement(task){
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)

    
}

function deleteTaskTextArea(){
    contentTask.value = ''
    formAddTask.classList.add('hidden')
}


btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle("hidden")
})


cancelBtTask.addEventListener('click', deleteTaskTextArea)


formAddTask.addEventListener('submit' , (evento) =>{
    evento.preventDefault();
    
    const task = {
        description: contentTask.value ,
        complete : "false"
    }
    tasks.push(task)
    insertTaksElement(task)
    insertTaskInLocalStorage()
    formAddTask.classList.add("hidden")
    contentTask.value = ""
})

tasks.forEach(task => {
    insertTaksElement(task)
    
});

document.addEventListener("focusFinished" , () => {
    if(taskSelected && liSelected){
        liSelected.classList.remove("app__section-task-list-item-active")
        liSelected.classList.add("app__section-task-list-item-complete")
        liSelected.querySelector(".app_button-edit").disabled = true
        paragraphTaskInProgress.textContent = ""
        
        taskSelected.complete = "true"
        insertTaskInLocalStorage()
    }
})

function clearTasks(onlyComplete) {
    let tasksListToClear = ""

    if (onlyComplete){
        tasksListToClear = document.querySelectorAll(".app__section-task-list-item-complete")
        tasks = tasks.filter(task => task.complete == 'false')
        insertTaskInLocalStorage()
    }else{
        tasksListToClear = document.querySelectorAll(".app__section-task-list-item")
        tasks = ""
        localStorage.clear()
    }
    tasksListToClear.forEach(taskToClear =>{
        taskToClear.remove()
    })
}

btCLearCompleteTasks.onclick = () =>  clearTasks(true)
btClearAllTasks.onclick = () => clearTasks(false)

