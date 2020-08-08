console.log('js is sourced');
$(document).ready(onReady);

function onReady() {
    console.log('jquery is working');
    $('#addTaskBtn').on('click', addTask); // jquery to read add button on click
}

function addTask() {
    console.log('addTask button clicked'); //works
    let taskToAdd = { // change input field value into object literal
        taskInfo: $('#newTask').val(),
        complete: "FALSE",
    };
    console.log(taskToAdd); //works

    $.ajax({
            type: 'POST',
            url: '/tasks',
            data: taskToAdd,
        }).then(function(response) {
            console.log('response from server', response);
            appendTask();
        }).catch(function(error) {
            console.log('error in POST', error);
            alert('unable to add a task at this time');
        });

}

function appendTask() {
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
        let $tr = $(`<tr data-task-id="${task.id}"></tr>`);
        $tr.data('task', task);
        $tr.append(`<td>${task.taskInfo}</td>`);
        $tr.append(`<td>${task.complete}</td>`);
        $('#toDoList').append($tr);
    };
}