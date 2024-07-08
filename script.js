
        let tasks = [];

        const taskInput = document.getElementById('taskInput');
        const taskDateTimeInput = document.getElementById('taskDateTime');
        const taskEndDateTimeInput = document.getElementById('taskEndDateTime');
        const addTaskButton = document.getElementById('addTask');
        const taskList = document.getElementById('taskList');
        const clearTasksButton = document.getElementById('clearTasks');

 
        addTaskButton.addEventListener('click', addTask);

 
        clearTasksButton.addEventListener('click', clearTasks);


        function addTask() {
            const taskText = taskInput.value.trim();
            const taskDateTime = taskDateTimeInput.value;
            const taskEndDateTime = taskEndDateTimeInput.value;

            if (taskText === '' || taskDateTime === '' || taskEndDateTime === '') {
                alert('zehmet olmasa taski baslama bitis tarixini elave et');
                return;
            }


            const task = {
                id: Date.now(),
                text: taskText,
                dateTime: taskDateTime,
                endDateTime: taskEndDateTime,
                completed: false
            };

            
            tasks.push(task);

            
            renderTask(task);

            
            taskInput.value = '';
            taskDateTimeInput.value = '';
            taskEndDateTimeInput.value = '';

            
            saveTasksToLocalStorage();
        }

        
        function renderTask(task) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <span>Başlama tarixi: ${task.dateTime}</span>
                <span>Bitiş tarixi: ${task.endDateTime}</span>
                <button class="editTask"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="deleteTask"><i class="fa-solid fa-trash"></i></button>
                <button class="completeTask">${task.completed ? 'Tamamlandı' : 'Tamamlanmamış'}</button>
            `;
            taskList.appendChild(taskItem);

           
            const editButton = taskItem.querySelector('.editTask');
            const deleteButton = taskItem.querySelector('.deleteTask');
            const completeButton = taskItem.querySelector('.completeTask');

            editButton.addEventListener('click', () => editTask(task));
            deleteButton.addEventListener('click', () => deleteTask(task));
            completeButton.addEventListener('click', () => toggleCompleteTask(task, completeButton));

           
            updateCompleteStatus(completeButton, task);
        }

        function editTask(task) {
            const newText = prompt('yeni task elave et', task.text);
            if (newText !== null) {
                task.text = newText;
                renderTaskList();
                saveTasksToLocalStorage();
            }
        }

       
        function deleteTask(task) {
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                renderTaskList();
            }
        }

     
        function toggleCompleteTask(task, completeButton) {
            task.completed = !task.completed;
            updateCompleteStatus(completeButton, task);
            saveTasksToLocalStorage();
        }

        
        function updateCompleteStatus(completeButton, task) {
            completeButton.textContent = task.completed ? 'Tamamlandı' : 'Tamamlanmamış';
        }

        
        function renderTaskList() {
            taskList.innerHTML = '';
            tasks.forEach(renderTask);
        }

        
        function clearTasks() {
            tasks = tasks.filter(task => !task.completed);
            renderTaskList();
            saveTasksToLocalStorage();
        }

       
        window.addEventListener('load', () => {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                tasks = JSON.parse(savedTasks);
                renderTaskList();
            }
        });

        
        function saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }