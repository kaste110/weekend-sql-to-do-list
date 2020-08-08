console.log('js is sourced');
$(document).ready(onReady);

function onReady() {
    console.log('jquery is working');
    $('#addTaskBtn').on('click', addTask); // jquery to read add button on click
}

function addTask() {
    console.log('addTask button clicked'); //works
    let taskToAdd = { // change input field value into object literal
        task: $('#newTask').val(),
        complete: "FALSE",
    };
    console.log(taskToAdd); //works

    $.ajax({
            type: 'POST',
            url: '/tasks',
            data: taskToAdd,
        }).then(function(response) {
            console.log('response from server', response);
        }).catch(function(error) {
            console.log('error in POST', error);
            alert('unable to add a task at this time');
        });

}

// function addTask(taskToAdd) {
    
// }