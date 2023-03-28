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
        const removeButtons = document.querySelectorAll(".js-remove");

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
    };
        const render = () => {
            let htmlString = "";

            for (const task of tasks) {
                htmlString += `
            <li class="container__list">
                    <button class="js-done task__button task__button--done">
                     ${task.done ? "✔" : ""}</button>
                    <p class="${task.done ? "task__done" : ""}">${task.content}</p>
                    <button class="js-remove task__button task__button--remove">🗑</button>
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
}