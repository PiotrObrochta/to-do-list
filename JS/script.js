{
    let tasks = [];
    let hideDoneTask = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...task.slice(0, taskIndex),
            ...task.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        task = [
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

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTask = () => {
        let taskListHtmlContent = "";

        for (const task of tasks) {
            taskListHtmlContent += `
            <li class="task__content">
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
        }

        document.querySelector(".js-tasks").innerHTML = taskListHtmlContent;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => {

    };

    const render = () => {
        renderTask();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
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