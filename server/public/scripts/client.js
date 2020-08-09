console.log('js is sourced');
$(document).ready(onReady);

function onReady() {
    console.log('jquery is working');
    $('#addTaskBtn').on('click', handleClick); // jquery to read add button on click
    $('#toDoList').on('click', '.deleteBtn', deleteTask);
    $('#toDoList').on('change', '.taskCompleteBox', toggleTaskComplete);
    getTasks();
}

function handleClick() {
    console.log('addTask button clicked'); //works
    let task = { // change input field value into object literal
        taskInfo: $('#newTask').val(),
        //complete: "FALSE",
    };
    console.log(task); //works
    
    addTask(task);
}

function addTask(taskToAdd) {

    $.ajax({
            type: 'POST',
            url: '/tasks',
            data: taskToAdd,
        }).then(function(response) {
            console.log('response from server', response);
            getTasks();
        }).catch(function(error) {
            console.log('error in POST', error);
            alert('unable to add a task at this time');
        });

    $('#newTask').val('');
}



function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then(function(response) {
        console.log('response from server', response);
        appendTasks(response);
    }).catch(function(error) {
        console.log('error in GET', error);
    });

}

function appendTasks(tasks) {
    $('#toDoList').empty();

    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        console.log(task.taskInfo);
        let $tr = $(`<tr class="addTableBorders" data-task-id="${task.id}"></tr>`);
        $tr.data('task', task);
        $tr.append(`<td>${task.taskInfo}</td>`);
        //$tr.append(`<td>${task.complete}</td>`);
        if (task.complete === true){
            $tr.append(`<td align="center"><input type="checkbox" class="taskCompleteBox" "checked"="checked"></td>`);
                // type: "checkbox",
                // "checked":"checked",
                // class: "taskCompleteBox"
            //$(this).closest('tr').toggleClass("taskCompletedBox");
        } else if (task.complete === false){
        $tr.append(`<td align="center"><input class="taskCompleteBox" type="checkbox"></td>`);
       };
        $tr.append(`
        <td>
            <button class="deleteBtn">DELETE</button>
        </td>`
        );
        $('#toDoList').append($tr); 
    };
}

function toggleTaskComplete() {
    let completedTaskId = $(this).closest('tr').data('task-id');
    console.log('box checked, task id is', completedTaskId);
    let isTaskComplete = {};

    if($(this).is(':checked')) {
        isTaskComplete.complete = true;
        $(this).closest('tr').toggleClass("taskCompletedBox");
    } else if(!$(this).is(':checked')) {
        isTaskComplete.complete = false;
    };
    $.ajax({
        method: 'PUT',
        url: `/tasks/${completedTaskId}`,
        data: isTaskComplete
    }).then(function(result) {
        console.log('task is ready to complete', result);
        //getTasks();
    }).catch(function(error) {
        console.log('error in client from PUT request', error);
    });
    
    
}

function deleteTask() {
    console.log('delete click works');
    let taskToDelete = $(this).closest('tr').data('task-id');
    $.ajax({
       type: 'DELETE',
       url: `/tasks/${taskToDelete}`, 
    }).then(function(response) {
        console.log('response from server/delete', response)
        getTasks();
    }).catch(function(error) {
        console.log('error in DELETE', error);
        alert('Unable to delete entry. Please try again later');
    });
}