const todoForm = document.querySelector('.card-insertar');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.card-actividades');

let todos = [];

todoForm.addEventListener('submit', function(event){

    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {

    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}


function renderTodos(todos) {
    todoItemsList.innerHTML = ''; 

    todos.forEach(function(item){
        const checked = item.completed ? 'checked': null;

        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.setAttribute('data-key', item.id);

        div.innerHTML = `  
          ${item.name}
          <button class="delete-button">X</button>
        ` ;
        todoItemsList.append(div);

    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toogle(id) {
    todos.forEach(function(item){
        if(item.id == id){
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAtribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
}); 


