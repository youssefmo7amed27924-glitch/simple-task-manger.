const taskinput = document.getElementById("task-input");
const taskform = document.getElementById("task-form");
const tasklist = document.getElementById("task-list");
const filterall = document.getElementById("filter-all");
const filtercompleted = document.getElementById("filter-completed");
const filterpending = document.getElementById("filter-pending");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasksAtLocalStorege() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // تعديل الفاصلة لنقطة
}

function addtask(descrioption) {
    const task = {
        id: Date.now(),
        descrioption,
        completed: false
    };
    tasks.push(task);
    saveTasksAtLocalStorege();
    renderTasks();
}

function deletetask(taskid) {
    tasks = tasks.filter(task => task.id !== taskid);
    saveTasksAtLocalStorege();
    renderTasks();
}

function toggle(taskid) {
    const task = tasks.find(task => task.id === taskid);
    if (task) {
        task.completed = !task.completed;
        saveTasksAtLocalStorege();
        renderTasks();
    }
}

function renderTasks(filter = "all") {
    tasklist.innerHTML = '';
    
    // تصحيح task إلى tasks
    const filtertasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // لو "all" بيعرض الكل
    });

    filtertasks.forEach(task => {
        const taskelement = document.createElement('div');
        taskelement.classList.add('tasks');
        if (task.completed) taskelement.classList.add('completed');
        
        // تصحيح عرض الوصف '${task.descrioption}'
        taskelement.innerHTML = `
            <span>${task.descrioption}</span>
            <div>
                <button onclick="toggle(${task.id})">Toggle</button>
                <button onclick="deletetask(${task.id})">Delete</button>
            </div>
        `;
        tasklist.appendChild(taskelement);
    });
}

taskform.addEventListener('submit', function (event) {
    event.preventDefault(); // تصحيح الإملاء
    const taskdescripton = taskinput.value.trim(); // تصحيح ariaValueMax لـ value
    if (taskdescripton) {
        addtask(taskdescripton);
        taskinput.value = '';
    }
});

filterall.addEventListener("click", () => renderTasks('all'));
filtercompleted.addEventListener("click", () => renderTasks('completed'));
filterpending.addEventListener("click", () => renderTasks('pending'));

renderTasks();