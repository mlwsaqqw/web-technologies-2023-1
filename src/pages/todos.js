import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";
import Form from "../components/form.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    // Загрузка ToDo
    const loadTodoItems = async () => {
        loading.start();
        const todos = await Todos.getAll();
        var doc = document.querySelector(".todoContainer")
        doc.innerHTML = "";
        todos.forEach(todo => {
            doc.insertAdjacentElement("beforeend", createNewTodoItem(todo));
        });
        loading.stop();
    }

    // Обновление ToDo
    const updateTodo = async(e, todoId) => {
        loading.start();
        const value = e.target.checked;
        e.target.checked = !e.target.checked;
        const response = await Todos.updateStatusById(todoId, value);
        loading.stop();
        if (response) {
            e.target.checked = !e.target.checked;
        } else {
            alert("Ошибка запроса");
        }
    } 

    // Добавление ToDo
    const addTodo = async (desc) => {
        loading.start();
        const response = await Todos.create(desc);
        loading.stop();
        if (response) {
            await loadTodoItems();
        } else {
            alert("Ошибка добавления");
        }
    }

    // Удаление ToDo
    const deleteToDo = async (values) => {
        await addTodo(values.description);
        await loadTodoItems();
    }

    function createNewTodoItem(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoItem");
        
        const todoCheckbox = document.createElement("input");
        todoCheckbox.setAttribute("type", "checkbox");
        todoCheckbox.checked = todo.completed;
        todoCheckbox.onchange = async function(event) {
            await updateTodo(event, todo.id);
        }

        const todoDesc = document.createElement("span");
        todoDesc.innerText = todo.description;

        const todoButton = document.createElement("button");
        todoButton.innerText = "Удалить";
        todoButton.addEventListener("click", async () => {
            await Todos.deleteById(todo.id);
            await loadTodoItems();
        })

        todoDiv.insertAdjacentElement("beforeend", todoCheckbox);
        todoDiv.insertAdjacentElement("beforeend", todoDesc);
        todoDiv.insertAdjacentElement("beforeend", todoButton);

        return todoDiv;
    }

    const form = document.getElementById("formAdding");
    new Form(form, {
        "description": () => false,
    }, async (values) => {
        await deleteToDo(values);
    })

    await loadTodoItems();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}