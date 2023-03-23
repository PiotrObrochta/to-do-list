{
    const tasks = [
        {
            content: "testowy wpis",
            done: false,
        },
        {
            content: "napisać dobrze kod",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js.remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const render = () => {
            let htmlString = "";

            for (const task of tasks) {
                htmlString += `
            <li class="container__list__item">
          
                    <button class="js-done button__done">
                     ${task.done ? "✔" : ""}</button>
                    <p class="list__item ${task.done ? "container__list__item--done" : ""}">${task.content}</p>
                    <button class="js-remove button__remove">🗑</button>
            </li>
            `;
            }

            document.querySelector(".js-tasks").innerHTML = htmlString;

            bindEvents();
        };

        const onFormSubmit = (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
            newTaskContent.value = "";
            newTaskContent.focus();

        };

        const init = () => {
            render();

            const form = document.querySelector(".js-form");

            form.addEventListener("submit", onFormSubmit);
        };

        init();
    };
}
