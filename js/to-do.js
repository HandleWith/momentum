const addList = document.querySelector('.to-do-inpur')
const todosContainer = document.querySelector('.todos')
const toDoBlock = document.querySelector('.to-do-list ')
const toDoTitle = document.querySelector('.to-do-text')
const doneBtn = document.querySelector('.save')
const clearBtn = document.querySelector('.clear')
const toDo = document.querySelector('.to-do')

export {toDo, doneBtn, clearBtn, toDoTitle, addList}

function onpageLoaded() {
    function createTodo() {
        const li = document.createElement('li')
        const input = document.createElement('input')
        li.classList.add('to-do-item')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('class', 'to-do-check')
        const todo = addList.value
        li.innerHTML = todo
    
        todosContainer.appendChild(li);
        addList.value = ""
    }

    addList.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    
    function done(e) {
        if(e.target.tagName === "LI") {
            e.target.classList.toggle('done')
        }
    }
    
    doneBtn.addEventListener('click', () => {
        localStorage.setItem('todos', todosContainer.innerHTML)
    })

    
    clearBtn.addEventListener("click", () => {
        todosContainer.innerHTML = "";
        localStorage.removeItem('todos', todosContainer.innerHTML);
    });

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            todosContainer.innerHTML = data;
        }
    }

    loadTodos()

    todosContainer.addEventListener('click', done)
    addList.addEventListener('change', createTodo)
}

function showToDo() {
    toDoBlock.classList.toggle('to-do-list-active')
}

document.addEventListener("DOMContentLoaded", onpageLoaded);
toDo.addEventListener('click', showToDo)

