let elTodoForm = document.querySelector('#form-todo'),
    elTodoTitle = document.querySelector('#title'),
    elTodoList = document.querySelector('.task-list'),
    elClearTodo = document.querySelector('.clear-btn');



function addNewTodo(e) {
    e.preventDefault();

    inpVal = elTodoTitle.value;
    if (inpVal === '') {
        alert('You did not enter anything in the section')
    } else {
        setTodoLocalStorage(inpVal)
        const newItem = document.createElement('div')
        newItem.className = "task"

        // let newTitle = document.createElement('span')
        // newTitle.textContent = inpVal;
        // newTitle.className = 'todo-title'
        // let newIcon = document.createElement('span')
        // newIcon.className = "fas fa-trash del-todo"

        // newItem.appendChild(newTitle);
        // newItem.appendChild(newIcon);
        // elTodoList.appendChild(newItem)
        // elTodoTitle.value = '';



        // Yangi elementning ichki HTMl kodini JS yordamida o'zgartirib qo'shib qo'yish
        newItem.innerHTML = `
            <span class="todo-title">${inpVal}</span>
            <span class="fas fa-trash del-todo"></span>
            <span class="fa fa-check-circle check-todo"></span>
        `;

        // Yaratilga yangi todoni ota elemga appen qilish
        elTodoList.prepend(newItem);

        //Yozilgan inputni tozalash
        elTodoTitle.value = '';

    }
}


function removeSingleTodo(e) {

    // Uidan todoni ochirish
    if (e.target.classList.contains('del-todo')) {
        e.target.parentElement.remove();
    }

    // Local Storagedan todoni ochirish

    // console.log(e.target.previousEl ementSibling.textContent);

    let todos = JSON.parse(localStorage.getItem('todos'));

    let filteredTodos = todos.filter(
        todo =>
        todo.toLowerCase() !==
        e.target.previousElementSibling.textContent.toLowerCase(),
    );

    localStorage.setItem('todos', JSON.stringify(filteredTodos))
}






function getAllTodosFromLS() {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(todo => {
        const newItem = document.createElement('div');
        newItem.className = 'task';

        // Yangi elementning ichki HTMl kodini JS yordamida o'zgartirib qo'shib qo'yish
        newItem.innerHTML = `
            <span class="todo-title">${todo}</span>
            <span class="fas fa-trash del-todo"></span>
            <span class="fa fa-check-circle check-todo"></span>
        `;
        elTodoList.appendChild(newItem);
    });
}



function setTodoLocalStorage(todo) {
    let todos;

    if (JSON.parse(localStorage.getItem('todos')) === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.unshift(todo);

    localStorage.setItem('todos', JSON.stringify(todos))
}





// ? Hamma eventlarni ishga tushuruvchi function

fireAllListener();

function fireAllListener() {
    elTodoList.addEventListener('click', removeSingleTodo);

    elTodoList.addEventListener('click', checkSingleTodo = (e) => {
        if (e.target.classList.contains('check-todo'), e.target.parentElement.style.backgroundColor === "cadetblue") {
            e.target.parentElement.style.backgroundColor = "white";
        } else {
            e.target.parentElement.style.backgroundColor = "cadetblue";

        }
    });

    elClearTodo.addEventListener('click', () => {
        localStorage.clear();
        elTodoList.innerHTML = '';
    });

    document.addEventListener('DOMContentLoaded', getAllTodosFromLS);

    elTodoForm.addEventListener('submit', addNewTodo);
}








// //? Local Storagega malumot saqlash //malumotni bu korinishda saqlash xato
// // localStorage.setItem('name1', 'Jasur');
// //? Local Storagega malumot saqlash 
// localStorage.setItem('name', JSON.stringify('Jasur'));



// // //? Local Storagedan malumotni olish // JSON da yozilgan korinishida
// // console.log(localStorage.getItem('name'))
// //? Local Storagedan malumotni olish // Malumotni JS string korinishida olish
// console.log(JSON.parse(localStorage.getItem('name')));

// //? Local Storage dan shu elementni olib tashlaydi 
// // localStorage.removeItem('name1');

// //? Local storagedan butunlay hamma narsani ochirib yuboradi 
// // localStorage.clear();