{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };




    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="task__content ${task.done && hideDoneTasks ? "task__content--hidden" : ""}">
                    <button class="js-done task__button task__button--toggleDone">
                      ${task.done ? "✔" : ""}
                    </button>
                    <p class="${task.done ? "task__done" : ""}">
                      ${task.content}
                    </p>
                    <button class="js-remove task__button task__button--remove">
                    🗑
                    </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonHtmlString = "";

        if (tasks.length) {
            buttonHtmlString += `
            <button class="section__button js-toggleHideDoneTasksButton">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__button js-markAllTasksDoneButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
        };
            document.querySelector(".js-buttons").innerHTML = buttonHtmlString;
    };

    const bindButtonsEvents = () => {
        const button_toggleHideDoneTasks = document.querySelector(".js-toggleHideDoneTasks");

        if (button_toggleHideDoneTasks) {
            button_toggleHideDoneTasks.addEventListener("click", toggleHideDoneTasks);
        };

        const button_markAllTasksDone = document.querySelector(".js-markAllTasksDone");

        if (button_markAllTasksDone) {
            button_markAllTasksDone.addEventListener("click", markAllTasksDone);
        };
    };

    const render = () => {
        renderTask();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        newTaskInput.value = "";
        newTaskInput.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}