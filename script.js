let todos = []

let input = document.querySelector("input")
let main = document.querySelector(".main")
let addButton = document.querySelector(".add-button")

const saveToTheLocalStorage = () => {
    const StringTodos = JSON.stringify(todos)
    localStorage.setItem("todos", StringTodos)
}

const pullFromTheLocalStorage = () =>{
    const savedData = localStorage.getItem("todos")
    if(savedData){
        todos = JSON.parse(savedData)
        render()
    }
}

const createTask = () => {
    let text = input.value.trim()
    if(text === "") return;

    const taskObj = {
        id: Date.now(),
        data: text,
        completed: false
    }
    todos.push(taskObj)
    saveToTheLocalStorage()
    input.value = "";
    render();
}

const deleteTask = (id) =>{
    todos = todos.filter(ele => ele.id !== id);
    saveToTheLocalStorage()
    render()
}

const updateTask = (id) =>{
    todos = todos.map(ele => {
        if(ele.id === id){
            return {...ele, completed: !ele.completed}
        }
        else{
            return ele
        }
    })
    saveToTheLocalStorage()
    render()
}

//read
const render = () => {
    document.querySelectorAll(".todos").forEach(ele => ele.remove())

    todos.forEach(ele => {
        const div = document.createElement("div")
        div.classList.add("todos")

        const span = document.createElement("span")
        span.classList.add("work")
        span.textContent = ele.data

        const cross = document.createElement("button")
        cross.classList.add("cancel-button")
        cross.textContent = "x"
        cross.addEventListener("click", () => deleteTask(ele.id))

        if(ele.completed){
            span.style.textDecoration = "line-through"
            span.style.opacity = "0.6"
        }
        span.addEventListener("click", () =>{
            updateTask(ele.id)
        })

        div.appendChild(span)
        div.appendChild(cross)

        main.appendChild(div)
    })

}
addButton.addEventListener("click",createTask)

pullFromTheLocalStorage()
