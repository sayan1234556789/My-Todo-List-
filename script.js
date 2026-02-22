let todos = []

let input = document.querySelector("input")
let main = document.querySelector(".main")
let addButton = document.querySelector(".add-button")

const createTask = () => {
    let text = input.value.trim()
    if(text === "") return;

    const taskObj = {
        id: Date.now(),
        data: text,
        completed: false
    }
    todos.push(taskObj)
    input.value = "";
    render();
}

const deleteTask = (id) =>{
    todos = todos.filter(ele => ele.id !== id);
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